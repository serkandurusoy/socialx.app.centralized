import React, {Component} from 'react';
import {findNodeHandle, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {ModalCloseButton} from '../../components/ModalCloseButton';
import {ModalTagFriends} from '../../components/ModalTagFriends';
import PhotoScreenComponent from './screen';
import {SendPostButton} from './SendPostButton';

export interface FriendsSearchResult {
	id: string;
	fullName: string;
	location: string;
	avatarURL?: string;
}

export interface WallPostPhoto {
	caption?: string;
	location?: string;
	taggedFriends?: FriendsSearchResult[];
	description?: string;
	localPhotoURL: string;
	includeTaggedFriends: boolean;
}

interface IPhotoScreenProps {
	navigation: NavigationScreenProp<any>;
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

export default class PhotoScreen extends Component<IPhotoScreenProps, IPhotoScreenState> {
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
					avatarURL={this.state.avatarURL}
					localPhotoURL={this.props.navigation.state.params.imagePath}
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

	private sendPostHandler = () => {
		if (this.photoScreen) {
			const wallPostDataInScreen = this.photoScreen.getWallPostData();
			const localPhotoData: Partial<WallPostPhoto> = {
				localPhotoURL: this.props.navigation.state.params.imagePath,
			};
			if (wallPostDataInScreen.includeTaggedFriends && this.state.taggedFriends.length > 0) {
				localPhotoData.taggedFriends = this.state.taggedFriends;
			}
			const wallPostData: WallPostPhoto = {...wallPostDataInScreen, ...localPhotoData};
			delete wallPostData.includeTaggedFriends;
			// TODO: all data is prepared here to create a new wall post
			// console.log('Now send post with data', wallPostData);
			this.props.navigation.goBack();
		}
	}
}
