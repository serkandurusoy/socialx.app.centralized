import React, {Component, RefObject} from 'react';
import {Alert, InteractionManager} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';

import {ModalCloseButton} from 'components/Modals';
import PhotoScreenComponent from './screen';
import {SendPostButton} from './SendPostButton';

import {addMediaHoc, createPostHoc, userHoc} from 'backend/graphql';
import {IUserDataResponse, WallPostPhotoOptimized} from 'types';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';

import {ModalManager} from 'hoc/ManagedModal/manager';

import {ipfsConfig as base} from 'configuration';
import {addFileBN, addFilesBN} from 'utilities/ipfs';

import {AvatarImagePlaceholder} from 'consts';

import {IModalForAddFriendsProps, withModalForAddFriends} from 'hoc/WithModalForAddFriends';
import {getUserAvatar, PickerImage} from 'utilities';

export interface FriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatarURL?: string;
}

export interface WallPostPhoto {
	title?: string;
	location?: string;
	taggedFriends?: FriendsSearchResult[];
	media: WallPostPhotoOptimized;
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

class PhotoScreen extends Component<IPhotoScreenProps> {
	private photoScreen: RefObject<any> = React.createRef();

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({onSendPress: this.sendPostHandler});
		});
	}

	public render() {
		const {data} = this.props;
		return (
			<PhotoScreenComponent
				isLoading={data.loading}
				showTagFriendsModal={this.props.showAddFriendsModal}
				avatarURL={getUserAvatar(data)}
				mediaObject={this.props.navigation.state.params.mediaObject}
				taggedFriends={this.props.addedFriends}
				ref={this.photoScreen}
			/>
		);
	}

	private sendPostHandler = async () => {
		const {addMedia, createPost, startMediaPost, startPostadd, stopLoading} = this.props;

		try {
			const wallPostDataInScreen = this.photoScreen.current.getOriginalRef().current.getWallPostData();
			const localPhotoData: Partial<WallPostPhoto> = {
				media: this.props.navigation.state.params.mediaObject,
			};
			if (wallPostDataInScreen.includeTaggedFriends && this.props.addedFriends.length > 0) {
				localPhotoData.taggedFriends = this.props.addedFriends;
			}
			const wallPostData: WallPostPhoto = {...wallPostDataInScreen, ...localPhotoData};
			delete wallPostData.includeTaggedFriends;

			const {title, location, taggedFriends, media} = wallPostData;
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
					startPostadd();
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
		this.props.stopLoading();
		ModalManager.safeRunAfterModalClosed(() => {
			Alert.alert('Something went wrong, try again');
		});
		console.log(ex);
	};
}

const navigationOptions = (props: IPhotoScreenProps) => ({
	title: 'ADD MEDIA',
	headerLeft: <ModalCloseButton navigation={props.navigation} />,
	headerRight: <SendPostButton navParams={props.navigation.state.params} />,
});

const withAddFriends = withModalForAddFriends(PhotoScreen as any, navigationOptions as any);

const MapDispatchToProps = (dispatch: any) => ({
	startMediaPost: (progress: string) =>
		dispatch(showActivityIndicator('Decentralizing your media', `Please wait..\n${progress} %`)),
	startPostadd: () => dispatch(showActivityIndicator('Creating your post', 'finalizing post..')),
	stopLoading: () => dispatch(hideActivityIndicator()),
});

const reduxWrapper = connect(
	null,
	MapDispatchToProps,
)(withAddFriends as any);

const addMediaWrapper = addMediaHoc(reduxWrapper);
const createPostWrapper = createPostHoc(addMediaWrapper);
const userWrapper = userHoc(createPostWrapper);

export default userWrapper;
