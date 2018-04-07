import React, {Component} from 'react';
import {findNodeHandle, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {ModalCloseButton, ModalTagFriends} from '../../components/Modals';
import PhotoScreenComponent from './screen';
import {SendPostButton} from './SendPostButton';

import {graphql} from 'react-apollo';
import {addMediaHoc, createPostHoc, userHoc} from '../../graphql';
import {IUserDataResponse} from '../../types/gql';

import base from '../../config/ipfs';
import {IBlobData} from '../../lib/ipfs';
import {addBlob} from '../../utils/ipfs';

import {Images} from '../../theme';

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

interface IPhotoScreenProps {
	navigation: NavigationScreenProp<any>;
	data: IUserDataResponse;
	addMedia: any;
	createPost: any;
}

interface IPhotoScreenState {
	avatarURL: string;
	showTagFriendsModal: boolean;
	blurViewRef: any;
	friendsSearchResults: FriendsSearchResult[];
	taggedFriendsInModal: FriendsSearchResult[];
	taggedFriends: FriendsSearchResult[];
}

const SEARCH_RESULTS_TAG_FRIENDS: FriendsSearchResult[] = [
	{
		id: '0',
		fullName: 'Ionut Movila',
		location: 'Belgium',
		avatarURL: 'https://placeimg.com/100/100/people',
	},
	{
		id: '1',
		fullName: 'Teresa Lamb',
		location: 'Poland',
		avatarURL: 'https://placeimg.com/101/101/people',
	},
	{
		id: '2',
		fullName: 'Terosa McCarthy',
		location: 'Vietnam',
		avatarURL: 'https://placeimg.com/102/102/people',
	},
	{
		id: '3',
		fullName: 'Terosa McCarthy',
		location: 'Romania',
		avatarURL: 'https://placeimg.com/103/103/people',
	},
	{
		id: '4',
		fullName: 'Gregory Bates',
		location: 'Latvia',
		avatarURL: 'https://placeimg.com/104/104/people',
	},
	{
		id: '5',
		fullName: 'Patrick Mullins',
		location: 'Singapore',
		avatarURL: 'https://placeimg.com/105/105/people',
	},
];

class PhotoScreen extends Component<IPhotoScreenProps, IPhotoScreenState> {
	private static navigationOptions = (props: IPhotoScreenProps) => ({
		title: 'ADD PHOTO',
		headerLeft: <ModalCloseButton navigation={props.navigation} />,
		headerRight: <SendPostButton navParams={props.navigation.state.params} />,
	})

	public state = {
		avatarURL: 'https://placeimg.com/120/120/people',
		showTagFriendsModal: false,
		blurViewRef: null,
		friendsSearchResults: [],
		taggedFriendsInModal: [],
		taggedFriends: [],
	};

	private photoScreen: PhotoScreenComponent | null = null;

	public componentDidMount() {
		const blurViewHandle = findNodeHandle(this.photoScreen);
		this.setState({blurViewRef: blurViewHandle});
		this.props.navigation.setParams({onSendPress: this.sendPostHandler});
	}

	public render() {
		const {data} = this.props;
		if (data.loading) {
			// TODO: content load
			return <View />;
		}
		return (
			<View style={{flex: 1}}>
				<ModalTagFriends
					visible={this.state.showTagFriendsModal}
					doneHandler={this.handleTagFriendsEditFinished}
					cancelHandler={this.closeTagFriendsModal}
					blurViewRef={this.state.blurViewRef}
					onSearchUpdated={this.friendsSearchUpdatedHandler}
					searchResults={this.state.friendsSearchResults}
					selectTagUserInModal={this.tagFriendHandler}
					selectedUsers={this.state.taggedFriendsInModal}
				/>
				<PhotoScreenComponent
					showTagFriendsModal={this.showTagFriendsModal}
					avatarURL={data.user.avatar ? base.ipfs_URL + data.user.avatar.hash : Images.user_avatar_placeholder}
					localPhotoURL={this.props.navigation.state.params.image.path}
					taggedFriends={this.state.taggedFriends}
					ref={(ref) => (this.photoScreen = ref)}
				/>
			</View>
		);
	}

	private handleTagFriendsEditFinished = () => {
		this.setState({
			taggedFriends: this.state.taggedFriendsInModal,
			showTagFriendsModal: false,
		});
	}

	private showTagFriendsModal = () => {
		this.setState({
			taggedFriendsInModal: this.state.taggedFriends,
			showTagFriendsModal: true,
		});
	}

	private closeTagFriendsModal = () => {
		this.setState({
			showTagFriendsModal: false,
		});
	}

	private tagFriendHandler = (friend: FriendsSearchResult) => {
		this.setState({taggedFriendsInModal: this.state.taggedFriendsInModal.concat([friend])});
	}

	private friendsSearchUpdatedHandler = (term: string) => {
		// TODO: make real search here
		let friendsSearchResults: FriendsSearchResult[] = [];
		if (term.length > 3 && term.length < 8) {
			friendsSearchResults = SEARCH_RESULTS_TAG_FRIENDS;
		}
		this.setState({friendsSearchResults});
	}

	private sendPostHandler = async () => {
		const {addMedia, createPost} = this.props;
		if (this.photoScreen) {
			const wallPostDataInScreen = this.photoScreen.getWallPostData();
			const localPhotoData: Partial<WallPostPhoto> = {
				image: this.props.navigation.state.params.image,
			};
			if (wallPostDataInScreen.includeTaggedFriends && this.state.taggedFriends.length > 0) {
				localPhotoData.taggedFriends = this.state.taggedFriends;
			}
			const wallPostData: WallPostPhoto = {...wallPostDataInScreen, ...localPhotoData};
			delete wallPostData.includeTaggedFriends;

			const {title, text, location, taggedFriends, image} = wallPostData;
			const {content, size, mime, path} = image;

			const imageName = path.split('/')[path.split('/').length - 2];

			// add image to ipfs
			let ipfsResp = await addBlob([{filename: imageName, data: content, name: imageName.split('.')[0]}]);
			ipfsResp = JSON.parse(ipfsResp.data);
			// parse ipfs response
			const {Size, Hash} = ipfsResp;

			// create media object on aws
			const addResp = await addMedia({variables: {hash: Hash, size, Size, type: mime}});

			const mediaId = addResp.data.addMedia.id;
			// create post
			if (title) {
				await createPost({variables: {text: title, Media: mediaId}});
			} else {
				await createPost({variables: {Media: mediaId}});
			}

			this.props.navigation.goBack();
		}
	}
}

const addMediaWrapper = addMediaHoc(PhotoScreen);
const createPostWrapper = createPostHoc(addMediaWrapper);
const userWrapper = userHoc(createPostWrapper);

export default userWrapper;
