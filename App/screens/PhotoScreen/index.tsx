import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Alert, InteractionManager} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {addMediaHoc, createPostHoc, userHoc} from 'backend/graphql';
import {ModalCloseButton, ScreenHeaderButton} from 'components';
import {ModalManager, WithModalForAddFriends} from 'hoc';
import {FriendsSearchResult, IUserDataResponse, WallPostPhotoOptimized} from 'types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	getUserAvatar,
	IWithTranslationProps,
	MediaUploader,
	PickerImageMultiple,
	withTranslations,
} from 'utilities';
import PhotoScreenComponent from './screen';

interface WallPostPhoto {
	title?: string;
	location?: string;
	taggedFriends?: FriendsSearchResult[];
}

interface IPhotoScreenNavParams {
	params: {
		mediaObjects: WallPostPhotoOptimized[];
		onSendPress: () => void;
	};
}

interface IPhotoScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<IPhotoScreenNavParams>;
	navigationOptions: NavigationScreenConfig<any>;
	data: IUserDataResponse;
	addMedia: any;
	createPost: any;
	// redux
	updateUploadProgress: any;
	startPostAdd: any;
	stopLoading: any;
}

interface IPhotoScreenState {
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	shareText: string;
	mediaObjects: WallPostPhotoOptimized[];
}

class PhotoScreen extends Component<IPhotoScreenProps, IPhotoScreenState> {
	private static navigationOptions = (props: IPhotoScreenProps) => ({
		title: props.navigationOptions.getText('photo.screen.title'),
		headerLeft: <ModalCloseButton navigation={props.navigation} />,
		headerRight: <ScreenHeaderButton iconName={'md-checkmark'} onPress={props.navigation.state.params.onSendPress} />,
	});

	public state = {
		locationEnabled: false,
		tagFriends: false,
		location: '',
		shareText: '',
		mediaObjects: [...this.props.navigation.state.params.mediaObjects],
	};

	private addedFriends: FriendsSearchResult[] = [];

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({onSendPress: this.sendPostHandler});
		});
	}

	public render() {
		const {data} = this.props;
		const {locationEnabled, location, tagFriends, shareText, mediaObjects} = this.state;
		return (
			<WithModalForAddFriends>
				{({showAddFriendsModal, addedFriends}) => {
					this.addedFriends = addedFriends; // TODO: addedFriends is needed in other methods here.. options?
					return (
						<PhotoScreenComponent
							isLoading={data.loading}
							showTagFriendsModal={showAddFriendsModal}
							avatarURL={getUserAvatar(data)}
							mediaObjects={mediaObjects.map((mediaObject) => mediaObject.path)}
							taggedFriends={addedFriends}
							locationEnabled={locationEnabled}
							location={location}
							tagFriends={tagFriends}
							onTagFriendsToggle={this.onTagFriendsToggleHandler}
							onLocationTextUpdate={this.onLocationTextUpdate}
							onLocationToggle={this.onLocationToggle}
							onShareTextUpdate={this.onShareTextUpdateHandler}
							shareText={shareText}
							onAddMedia={this.onAddMediaHandler}
						/>
					);
				}}
			</WithModalForAddFriends>
		);
	}

	private onTagFriendsToggleHandler = () => {
		this.setState({
			tagFriends: !this.state.tagFriends,
		});
	};

	private onLocationTextUpdate = (value: string) => {
		this.setState({
			location: value,
		});
	};

	private onLocationToggle = () => {
		this.setState({
			locationEnabled: !this.state.locationEnabled,
		});
	};

	private onShareTextUpdateHandler = (value: string) => {
		this.setState({
			shareText: value,
		});
	};

	private getWallPostData = (): WallPostPhoto => {
		const {tagFriends, shareText, locationEnabled, location} = this.state;

		// TODO: get rid of replace in shareText after we sort out SOC-148
		return {
			location: locationEnabled && location !== '' ? location : undefined,
			taggedFriends: tagFriends && this.addedFriends.length > 0 ? this.addedFriends : undefined,
			title: shareText ? shareText.replace(/\n/g, '\\n') : undefined,
		};
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

	private sendPostHandler = () => {
		const {mediaObjects} = this.state;
		const {addMedia, updateUploadProgress} = this.props;
		const mediaUploader = new MediaUploader(
			mediaObjects,
			this.completeCreateWallPost,
			this.showErrorMessage,
			addMedia,
			updateUploadProgress,
		);
		mediaUploader.startUpload();
	};

	private completeCreateWallPost = async (mediaIDs: string[]) => {
		try {
			const {createPost, startPostAdd, stopLoading} = this.props;
			const {title, location} = this.getWallPostData();
			// start adding post loading
			startPostAdd();
			// create post
			if (title) {
				await createPost({variables: {text: title, Media: mediaIDs, location}});
			} else {
				await createPost({variables: {Media: mediaIDs, location}});
			}
			stopLoading();
			this.props.navigation.goBack(null);
		} catch (ex) {
			this.showErrorMessage(ex);
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
}

const MapDispatchToProps = (dispatch: any, {getText}: IPhotoScreenProps) => ({
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

export default compose(
	userHoc,
	createPostHoc,
	addMediaHoc,
	withTranslations,
	connect(
		null,
		MapDispatchToProps,
	),
)(PhotoScreen as any);
