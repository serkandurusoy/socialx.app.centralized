import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Alert, InteractionManager} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {addMediaHoc, createPostHoc, userHoc} from 'backend/graphql';
import {ModalCloseButton, ScreenHeaderButton} from 'components';
import {IModalForAddFriendsProps, ModalManager, withModalForAddFriends} from 'hoc';
import {FriendsSearchResult, IUserDataResponse, WallPostPhotoOptimized} from 'types';
import {
	getCameraMediaObject,
	getGalleryMediaObject,
	getOptimizedMediaObject,
	getUserAvatar,
	IWithTranslationProps,
	withTranslations,
} from 'utilities';
import {addFileBN, addFilesBN} from 'utilities/ipfs';
import PhotoScreenComponent from './screen';

interface WallPostPhoto {
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
	startMediaFilesUpload: any;
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

interface MediaUploadCompleteResponse {
	responseCode: number;
	responseBody: any;
}

type MultipleMediaUploadCompleteResponse = Array<{
	index: number;
	data: MediaUploadCompleteResponse;
}>;

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
		mediaObjects: [this.props.navigation.state.params.mediaObject],
	};

	private mediaObjectUploading: WallPostPhotoOptimized | undefined;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({onSendPress: this.sendPostHandler});
		});
	}

	public render() {
		const {data, showAddFriendsModal, addedFriends} = this.props;
		const {locationEnabled, location, tagFriends, shareText, mediaObjects} = this.state;
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
			location: locationEnabled && location !== '' ? location : undefined,
			taggedFriends: tagFriends && addedFriends.length > 0 ? addedFriends : undefined,
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
				let selectedMediaObject;
				if (buttonIndex === 0) {
					selectedMediaObject = await getGalleryMediaObject();
				} else if (buttonIndex === 1) {
					selectedMediaObject = await getCameraMediaObject();
				}
				if (selectedMediaObject) {
					const optimizedMedia = await getOptimizedMediaObject(selectedMediaObject);
					this.setState({mediaObjects: [...this.state.mediaObjects, optimizedMedia]});
				}
			},
		);
	};

	private sendPostHandler = () => {
		this.uploadMediaFiles();
		this.completeCreateWallPost();
	};

	// private sendPostHandlerOld = async () => {
	// 	const {addMedia, createPost, startMediaFilesUpload, startPostAdd, stopLoading} = this.props;
	//
	// 	try {
	// 		const wallPostData = this.getWallPostData();
	//
	// 		const {title, location, mediaObjects} = wallPostData;
	// 		const {mime, pathx, contentOptimizedPath} = media;
	//
	// 		const onStart = () => {
	// 			// start adding media loading
	// 			startMediaFilesUpload(0);
	// 		};
	//
	// 		const onError = (err: any, id: any) => {
	// 			console.log(err, id);
	// 			this.showErrorMessage(err);
	// 		};
	//
	// 		const onProgress = (progress: any, id: any) => {
	// 			console.log('progress:', progress, id);
	// 			startMediaFilesUpload(Math.round(progress));
	// 		};
	//
	// 		if (contentOptimizedPath) {
	// 			await addFilesBN([pathx, contentOptimizedPath], onStart, onProgress, onError, onComplete);
	// 		} else {
	// 			await addFileBN(pathx, onStart, onProgress, onError, onComplete);
	// 		}
	// 	} catch (ex) {
	// 		this.showErrorMessage(ex);
	// 	}
	// };

	private uploadMediaFiles = () => {
		const {mediaObjects} = this.state;
		mediaObjects.forEach((mediaObject) => {
			this.mediaObjectUploading = mediaObject;
		});
	};

	private uploadSingleMediaFile = async (mediaObject: WallPostPhotoOptimized) => {
		const {mime, pathx, contentOptimizedPath} = mediaObject;
		if (contentOptimizedPath) {
			await addFilesBN(
				[pathx, contentOptimizedPath],
				this.onMediaFileUploadStart,
				this.onMediaFileUploadProgress,
				this.onMediaFileUploadError,
				this.onMediaFileUploadComplete,
			);
		} else {
			await addFileBN(
				pathx,
				this.onMediaFileUploadStart,
				this.onMediaFileUploadProgress,
				this.onMediaFileUploadError,
				this.onMediaFileUploadComplete,
			);
		}
	};

	private onMediaFileUploadStart = () => {
		this.props.startMediaFilesUpload(0);
	};

	private onMediaFileUploadProgress = (progress: any, id: any) => {
		console.log('progress:', progress, id);
		this.props.startMediaFilesUpload(Math.round(progress));
	};

	private onMediaFileUploadError = (err: any, id: any) => {
		console.log(err, id);
		this.showErrorMessage(err);
	};

	private onMediaFileUploadComplete = async (
		data: MultipleMediaUploadCompleteResponse | MediaUploadCompleteResponse,
	) => {
		try {
			const {addMedia} = this.props;

			let mediaOb: any = null;
			let opMediaOb: any = null;

			console.log('Upload completed', data);
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
					type: this.mediaObjectUploading!.mime,
					optimizedHash: opMediaOb !== null ? opMediaOb.Hash : mediaOb.Hash,
				},
			});

			const mediaId = addResp.data.addMedia.id;
		} catch (ex) {
			this.showErrorMessage(ex);
		}
	};

	private completeCreateWallPost = async () => {
		const {createPost, startPostAdd, stopLoading} = this.props;
		const {title, location} = this.getWallPostData();
		// start adding post loading
		startPostAdd();
		// create post
		if (title) {
			// TODO: mediaID should be a string[]!
			await createPost({variables: {text: title, Media: mediaId, location}});
		} else {
			await createPost({variables: {Media: mediaId, location}});
		}
		stopLoading();
		this.props.navigation.goBack(null);
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
	startMediaFilesUpload: (progress: string) =>
		dispatch(
			showActivityIndicator(
				// TODO consider include in title the number of current media uploading, like 3/5
				getText('photo.screen.media.uploading.title'),
				getText('photo.screen.media.uploading.message', progress),
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
	withModalForAddFriends,
)(PhotoScreen as any);
