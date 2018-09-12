// MIGRATION: migrated to screens/mainStack/CreateWallPostScreen

import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {addMediaHoc, createPostHoc} from 'backend/graphql';
import {ModalCloseButton} from 'components';
import {ModalManager} from 'hoc';
import {WallPostPhotoOptimized} from 'types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IWithTranslationProps,
	MediaUploader,
	PickerImageMultiple,
	withTranslations,
} from 'utilities';
import {NewWallPostScreenComponent} from './screen';

interface INewWallPostScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	addMedia: any;
	createPost: any;
	updateUploadProgress: any;
	startPostAdd: any;
	stopLoading: any;
}

interface INewWallPostScreenState {
	mediaObjects: WallPostPhotoOptimized[];
	uploadProgress: number;
	shareText: string;
}

class NewWallPostScreenInt extends Component<INewWallPostScreenProps, INewWallPostScreenState> {
	private static navigationOptions = (props: INewWallPostScreenProps) => ({
		title: props.navigationOptions.getText('new.wall.post.screen.title'),
		headerRight: <ModalCloseButton navigation={props.navigation} />,
		headerLeft: <View />,
	});

	public state = {
		mediaObjects: [],
		uploadProgress: 0,
		shareText: '',
	};

	public render() {
		const {navigation} = this.props;
		const {shareText, mediaObjects, uploadProgress} = this.state;
		const {avatarImage} = navigation.state.params;
		return (
			<NewWallPostScreenComponent
				avatarImage={avatarImage}
				shareText={shareText}
				mediaObjects={mediaObjects.map((mediaObject) => mediaObject.path)}
				uploadProgress={uploadProgress}
				onShareTextUpdate={this.onShareTextUpdateHandler}
				onAddMedia={this.onAddMediaHandler}
				onPostSend={this.onPostSendHandler}
			/>
		);
	}

	private onShareTextUpdateHandler = (value: string) => {
		this.setState({
			shareText: value,
		});
	};

	private onAddMediaHandler = () => {
		const {getText} = this.props;
		ActionSheet.show(
			{
				options: [
					getText('new.wall.post.screen.menu.pick.from.gallery'),
					getText('new.wall.post.screen.menu.take.photo'),
					getText('button.CANCEL'),
				],
				cancelButtonIndex: 2,
				title: getText('new.wall.post.screen.menu.title'),
			},
			async (buttonIndex: number) => {
				let selectedMediaObjects: PickerImageMultiple = [];
				if (buttonIndex === 0) {
					selectedMediaObjects = await getGalleryMediaObjectMultiple();
				} else if (buttonIndex === 1) {
					selectedMediaObjects = await getCameraMediaObjectMultiple();
				}
				if (selectedMediaObjects.length > 0) {
					const optimizedMediaObjects = await Promise.all(
						selectedMediaObjects.map(async (mObject) => getOptimizedMediaObject(mObject)),
					);
					this.setState({mediaObjects: [...this.state.mediaObjects, ...optimizedMediaObjects]});
				}
			},
		);
	};

	private onPostSendHandler = () => {
		const {getText} = this.props;
		const {mediaObjects, shareText} = this.state;
		const {addMedia, updateUploadProgress} = this.props;
		if (mediaObjects.length < 1 && !shareText) {
			Alert.alert(
				getText('new.wall.post.screen.post.not.allowed.title'),
				getText('new.wall.post.screen.post.not.allowed.message'),
			);
		} else {
			const mediaUploader = new MediaUploader(
				mediaObjects,
				this.completeCreateWallPost,
				this.showErrorMessage,
				addMedia,
				updateUploadProgress,
			);
			mediaUploader.startUpload();
		}
	};

	private showErrorMessage = (ex: any) => {
		const {stopLoading, getText} = this.props;
		stopLoading();
		ModalManager.safeRunAfterModalClosed(() => {
			Alert.alert(getText('photo.screen.create.post.error'));
		});
		console.log(ex);
	};

	private completeCreateWallPost = async (mediaIDs: string[]) => {
		try {
			const {createPost, startPostAdd, stopLoading, navigation} = this.props;
			let {shareText} = this.state;
			// start adding post loading
			startPostAdd();
			// create post
			if (shareText) {
				// TODO: get rid of replace in shareText after we sort out SOC-148
				shareText = shareText.replace(/\n/g, '\\n');
				await createPost({variables: {text: shareText, Media: mediaIDs}});
			} else {
				await createPost({variables: {Media: mediaIDs}});
			}
			stopLoading();
			navigation.state.params.afterPostCreate();
			navigation.goBack(null);
		} catch (ex) {
			this.showErrorMessage(ex);
		}
	};
}

const MapDispatchToProps = (dispatch: any, {getText}: INewWallPostScreenProps) => ({
	updateUploadProgress: (fileProgress: number, globalProgress: string) =>
		dispatch(
			showActivityIndicator(
				getText('photo.screen.media.uploading.title', globalProgress),
				getText('photo.screen.media.uploading.message', fileProgress),
			),
		),
	startPostAdd: () =>
		dispatch(
			showActivityIndicator(getText('photo.screen.creating.post.title'), getText('photo.screen.creating.post.message')),
		),
	stopLoading: () => dispatch(hideActivityIndicator()),
});

export const NewWallPostScreen = compose(
	createPostHoc,
	addMediaHoc,
	withTranslations,
	connect(
		null,
		MapDispatchToProps,
	),
)(NewWallPostScreenInt as any);
