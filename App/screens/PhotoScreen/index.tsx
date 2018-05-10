import React, {Component} from 'react';
import {Alert, findNodeHandle, InteractionManager, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';

import {ModalCloseButton} from 'components/Modals';
import PhotoScreenComponent from './screen';
import {SendPostButton} from './SendPostButton';

import {addMediaHoc, createPostHoc, userHoc} from 'backend/graphql';
import {IUserDataResponse} from 'types';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';

import {ModalManager} from 'hoc/ManagedModal/manager';

import {ipfsConfig as base} from 'configuration';
import {addFilesBN} from 'utilities/ipfs';

import {IModalForAddFriendsProps, withModalForAddFriends} from 'hoc/WithModalForAddFriends';

import {Image as PickerImage} from 'react-native-image-crop-picker';

export interface FriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatarURL?: string;
}

export interface WallPostPhoto {
	title?: string;
	text?: string;
	location?: string;
	taggedFriends?: FriendsSearchResult[];
	image: any;
	includeTaggedFriends: boolean;
}

interface IPhotoScreenNavParams {
	params: {
		mediaObject: PickerImage;
		onSendPress: () => void;
	};
}

interface IPhotoScreenProps extends IModalForAddFriendsProps {
	navigation: NavigationScreenProp<IPhotoScreenNavParams>;
	data: IUserDataResponse;
	addMedia: any;
	createPost: any;
	// redux
	startMediaPost: any;
	startPostadd: any;
	stopLoading: any;
}

interface IPhotoScreenState {
	avatarURL: string;
}

class PhotoScreen extends Component<IPhotoScreenProps, IPhotoScreenState> {
	public state = {
		avatarURL: 'https://placeimg.com/120/120/people',
	};

	private photoScreen: PhotoScreenComponent | null = null;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({onSendPress: this.sendPostHandler});
		});
	}

	public render() {
		const {data} = this.props;
		console.log('PhotoScreen render', data);
		const placeHolder = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
		return (
			<PhotoScreenComponent
				isLoading={data.loading}
				showTagFriendsModal={this.props.showAddFriendsModal}
				avatarURL={data.user.avatar ? base.ipfs_URL + data.user.avatar.hash : placeHolder}
				mediaObject={this.props.navigation.state.params.mediaObject}
				taggedFriends={this.props.addedFriends}
				ref={(ref) => (this.photoScreen = ref)}
			/>
		);
	}

	private sendPostHandler = async () => {
		const {addMedia, createPost, startMediaPost, startPostadd, stopLoading} = this.props;

		if (this.photoScreen) {
			try {
				const wallPostDataInScreen = this.photoScreen.getOriginalRef().getWallPostData();
				const localPhotoData: Partial<WallPostPhoto> = {
					image: this.props.navigation.state.params.mediaObject,
				};
				if (wallPostDataInScreen.includeTaggedFriends && this.props.addedFriends.length > 0) {
					localPhotoData.taggedFriends = this.props.addedFriends;
				}
				const wallPostData: WallPostPhoto = {...wallPostDataInScreen, ...localPhotoData};
				delete wallPostData.includeTaggedFriends;

				const {title, text, location, taggedFriends, image} = wallPostData;
				const {content, size, mime, pathx, contentOptimizedpath} = image;

				const onStart = () => {
					// start adding media loading
					startMediaPost();
				};

				const onError = (err: any, id: any) => {
					console.log(err, id);
				};

				const onProgress = (progress: any, id: any) => {
					// @ionut: TODO -> image upload progress..
					console.log('progress:', progress, id);
				};

				const onComplete = async (data: Array<{index: number; data: {responseCode: number; responseBody: any}}>) => {
					let mediaOb: any = null;
					let opMediaOb: any = null;

					console.log('Completed! ->', data);
					for (let i = 0; i < data.length; i++) {
						const current = data[i];
						if (current.index === 0) {
							mediaOb = JSON.parse(current.data.responseBody);
						} else {
							opMediaOb = JSON.parse(current.data.responseBody);
						}
					}
					// create media object on aws
					const addResp = await addMedia({
						variables: {
							hash: mediaOb.Hash,
							size: parseInt(mediaOb.Size, undefined),
							type: mime,
							optimizedHash: opMediaOb.Hash,
						}});

					const mediaId = addResp.data.addMedia.id;

					// start adding post loading
					startPostadd();
					// create post
					if (title) {
						await createPost({variables: {text: title, Media: mediaId}});
					} else {
						await createPost({variables: {Media: mediaId}});
					}
					stopLoading();
				};

				await addFilesBN([pathx, contentOptimizedpath], onStart, onProgress, onError, onComplete);
			} catch (ex) {
				stopLoading();
				ModalManager.safeRunAfterModalClosed(() => {
					Alert.alert('Something went wrong, try again');
				});
				console.log(ex);
			}
			this.props.navigation.goBack(null);
		}
	}
}

const navigationOptions = (props: IPhotoScreenProps) => ({
	title: 'ADD MEDIA',
	headerLeft: <ModalCloseButton navigation={props.navigation} />,
	headerRight: <SendPostButton navParams={props.navigation.state.params} />,
});

const withAddFriends = withModalForAddFriends(PhotoScreen as any, navigationOptions as any);

const MapDispatchToProps = (dispatch: any) => ({
	startMediaPost: () => dispatch(showActivityIndicator('Decentralizing your media', 'Please wait..')),
	startPostadd: () => dispatch(showActivityIndicator('Creating your post', 'finalizing post..')),
	stopLoading: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(null, MapDispatchToProps)(withAddFriends as any);

const addMediaWrapper = addMediaHoc(reduxWrapper);
const createPostWrapper = createPostHoc(addMediaWrapper);
const userWrapper = userHoc(createPostWrapper);

export default userWrapper;
