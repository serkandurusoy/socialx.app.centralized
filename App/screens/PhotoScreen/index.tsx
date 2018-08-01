import React, {Component, RefObject} from 'react';
import {Alert, InteractionManager} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {addMediaHoc, createPostHoc, userHoc} from 'backend/graphql';
import {ModalCloseButton, ScreenHeaderButton} from 'components';
import {IModalForAddFriendsProps, ModalManager, withModalForAddFriends} from 'hoc';
import {FriendsSearchResult, IUserDataResponse, WallPostPhotoOptimized} from 'types';
import {getUserAvatar, IWithTranslationProps, withTranslations} from 'utilities';
import {addFileBN, addFilesBN} from 'utilities/ipfs';
import PhotoScreenComponent from './screen';

interface WallPostPhoto {
	media: WallPostPhotoOptimized;
	title?: string;
	location?: string;
	taggedFriends?: FriendsSearchResult[];
}

interface IPhotoScreenNavParams {
	params: {
		mediaObject: WallPostPhotoOptimized;
		onSendPress: () => void;
	};
}

interface IPhotoScreenProps extends IModalForAddFriendsProps, IWithTranslationProps {
	navigation: NavigationScreenProp<IPhotoScreenNavParams>;
	navigationOptions: NavigationScreenConfig<any>;
	data: IUserDataResponse;
	addMedia: any;
	createPost: any;
	// redux
	startMediaPost: any;
	startPostAdd: any;
	stopLoading: any;
}

interface IPhotoScreenState {
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
	shareText: string;
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
	};

	private photoScreen: RefObject<any> = React.createRef();

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({onSendPress: this.sendPostHandler});
		});
	}

	public render() {
		const {data, showAddFriendsModal, addedFriends, navigation} = this.props;
		const {locationEnabled, location, tagFriends, shareText} = this.state;
		return (
			<PhotoScreenComponent
				isLoading={data.loading}
				showTagFriendsModal={showAddFriendsModal}
				avatarURL={getUserAvatar(data)}
				mediaObject={navigation.state.params.mediaObject}
				taggedFriends={addedFriends}
				ref={this.photoScreen}
				locationEnabled={locationEnabled}
				location={location}
				tagFriends={tagFriends}
				onTagFriendsToggle={this.onTagFriendsToggleHandler}
				onLocationTextUpdate={this.onLocationTextUpdate}
				onLocationToggle={this.onLocationToggle}
				onShareTextUpdate={this.onShareTextUpdateHandler}
				shareText={shareText}
			/>
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
		const {addedFriends} = this.props;

		// TODO: get rid of replace in shareText after we sort out SOC-148
		return {
			media: this.props.navigation.state.params.mediaObject,
			location: locationEnabled && location !== '' ? location : undefined,
			taggedFriends: tagFriends && addedFriends.length > 0 ? addedFriends : undefined,
			title: shareText ? shareText.replace(/\n/g, '\\n') : undefined,
		};
	};

	private sendPostHandler = async () => {
		const {addMedia, createPost, startMediaPost, startPostAdd, stopLoading} = this.props;

		try {
			const wallPostData = this.getWallPostData();

			const {title, location, media} = wallPostData;
			const {mime, pathx, contentOptimizedPath} = media;

			const onStart = () => {
				// start adding media loading
				startMediaPost(0);
			};

			const onError = (err: any, id: any) => {
				console.log(err, id);
				this.showErrorMessage(err);
			};

			const onProgress = (progress: any, id: any) => {
				console.log('progress:', progress, id);
				startMediaPost(Math.round(progress));
			};

			const onComplete = async (data: Array<{index: number; data: {responseCode: number; responseBody: any}}>) => {
				try {
					let mediaOb: any = null;
					let opMediaOb: any = null;

					console.log('Completed! ->', data);
					if (Array.isArray(data)) {
						for (let i = 0; i < data.length; i++) {
							const current = data[i];
							if (current.index === 0) {
								mediaOb = JSON.parse(current.data.responseBody);
							} else {
								opMediaOb = JSON.parse(current.data.responseBody);
							}
						}
					} else {
						// TODO: @Jake: this needs better handling!
						mediaOb = JSON.parse(data.responseBody);
					}

					// create media object on aws
					const addResp = await addMedia({
						variables: {
							hash: mediaOb.Hash,
							size: parseInt(mediaOb.Size, undefined),
							type: mime,
							optimizedHash: opMediaOb !== null ? opMediaOb.Hash : mediaOb.Hash,
						},
					});

					const mediaId = addResp.data.addMedia.id;

					// start adding post loading
					startPostAdd();
					// create post
					if (title) {
						await createPost({variables: {text: title, Media: mediaId, location}});
					} else {
						await createPost({variables: {Media: mediaId, location}});
					}
					stopLoading();
					this.props.navigation.goBack(null);
				} catch (ex) {
					this.showErrorMessage(ex);
				}
			};

			if (contentOptimizedPath) {
				await addFilesBN([pathx, contentOptimizedPath], onStart, onProgress, onError, onComplete);
			} else {
				await addFileBN(pathx, onStart, onProgress, onError, onComplete);
			}
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

const MapDispatchToProps = (dispatch: any, props: IPhotoScreenProps) => {
	const {getText} = props;
	return {
		startMediaPost: (progress: string) =>
			dispatch(
				showActivityIndicator(
					getText('photo.screen.media.uploading.title'),
					getText('photo.screen.media.uploading.message', progress),
				),
			),
		startPostAdd: () =>
			dispatch(
				showActivityIndicator(
					getText('photo.screen.creating.post.title'),
					getText('photo.screen.creating.post.message'),
				),
			),
		stopLoading: () => dispatch(hideActivityIndicator()),
	};
};

export default compose(
	userHoc,
	createPostHoc,
	addMediaHoc,
	withTranslations,
	connect(
		null,
		MapDispatchToProps,
	),
	withModalForAddFriends,
)(PhotoScreen as any);
