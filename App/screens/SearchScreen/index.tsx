import React, {Component} from 'react';
import {findNodeHandle, InteractionManager, Keyboard, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import {ModalCreateGroup, ModalInvitePeople} from 'components';
import SearchScreenComponent from './screen';

import {ipfsConfig as base} from 'configuration';

import {addFriendHoc, searchUsersHoc} from 'backend/graphql';
import {AvatarImagePlaceholder} from 'consts';
import {SearchResultData, SearchResultKind, SearchResultPeople} from 'types';
import {SearchHeader} from './Components';

export enum SearchFilterValues {
	Top = 'top',
	People = 'people',
	Tags = 'tags',
	Places = 'places',
}

export interface SearchResultCreateGroup {
	id: string;
	fullName: string;
	location: string;
	avatarURL?: string;
}

interface ISearchScreenProps {
	navigation: NavigationScreenProp<any>;
	search: any;
	addFriend: any;
}

interface ISearchScreenState {
	searchTerm: string;
	searchResults: SearchResultData[];
	selectedFilter: SearchFilterValues;
	invitePeopleModalVisible: boolean;
	blurViewRef: any;
	createGroupSearchResults: SearchResultCreateGroup[];
	selectedUsers: string[];
	groupInfoModalVisible: boolean;
	groupName: string;
	groupDescription: string;
	nextShowInvitePeople: boolean;
	trendingVisible: boolean;
	searching: boolean;
}

class SearchScreen extends Component<ISearchScreenProps, ISearchScreenState> {
	private static navigationOptions = (props: ISearchScreenProps) => ({
		header: () => {
			const params = props.navigation.state.params || {};
			return (
				<SearchHeader
					backVisible={params.backVisible}
					searchInputUpdated={params.searchInputUpdatedHandler}
					onBack={params.backHandler}
					onFocusUpdated={params.onFocusUpdatedHandler}
					searchValue={params.searchValue}
				/>
			);
		},
	});

	public state = {
		invitePeopleModalVisible: false,
		searchTerm: '',
		searchResults: [],
		selectedFilter: SearchFilterValues.Top,
		blurViewRef: null,
		createGroupSearchResults: [],
		selectedUsers: [],
		groupInfoModalVisible: false,
		groupName: '',
		groupDescription: '',
		nextShowInvitePeople: false,
		trendingVisible: true,
		searching: false,
	};

	private blurView = null;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({
				backVisible: false,
				searchInputUpdatedHandler: this.updateSearchTerm,
				backHandler: this.setTrendingVisible,
				onFocusUpdatedHandler: this.onFocusUpdatedHandler,
				searchValue: '',
			});
		});
		const blurViewHandle = findNodeHandle(this.blurView);
		this.setState({blurViewRef: blurViewHandle});
	}

	public render() {
		return (
			<View style={{flex: 1}}>
				<ModalCreateGroup
					visible={this.state.groupInfoModalVisible}
					confirmHandler={() => this.toggleGroupInfoModal(true)}
					declineHandler={() => this.toggleGroupInfoModal()}
					updateGroupName={this.updateGroupNameHanlder}
					updateGroupDescription={this.updateGroupDescriptionHandler}
					blurViewRef={this.state.blurViewRef}
					afterDismiss={this.onGroupInfoModalHide}
				/>
				<ModalInvitePeople
					visible={this.state.invitePeopleModalVisible}
					createHandler={this.handleCreateNewGroup}
					cancelHandler={this.toggleInvitePeopleModal}
					blurViewRef={this.state.blurViewRef}
					onSearchUpdated={this.createGroupSearchUpdated}
					searchResults={this.state.createGroupSearchResults}
					selectNewUserForGroup={this.selectNewUserForGroupHandler}
					selectedUsers={this.state.selectedUsers}
				/>
				<SearchScreenComponent
					ref={(view: any) => (this.blurView = view)}
					addFriendHandler={this.addFriendHandler}
					searchTerm={this.state.searchTerm}
					searchResults={this.state.searchResults}
					selectedFilter={this.state.selectedFilter}
					setNewFilter={this.updateSelectedFilter}
					createGroupHandler={() => this.toggleGroupInfoModal()}
					onSearchResultSelect={this.onSearchResultSelectHandler}
					trendingVisible={this.state.trendingVisible}
					searching={this.state.searching}
				/>
			</View>
		);
	}

	// todo @serkan @jake let's discuss this
	private doSearch = async (query: string) => {
		const {search} = this.props;
		const results: SearchResultPeople[] = [];
		if (query.length < 2) {
			return results;
		}
		try {
			this.setState({
				searching: true,
			});

			let resp = await search({variables: {query}});
			resp = resp.data.searchUsers;

			this.setState({
				searching: false,
			});

			if (resp.length === 0) {
				return results;
			}
			return resp.map(({connection, user: current}) => ({
				id: current.userId,
				kind: connection,
				fullName: current.name,
				username: current.username,
				avatarURL: current.avatar ? base.ipfs_URL + current.avatar.hash : AvatarImagePlaceholder,
			}));
		} catch (ex) {
			return results;
		}
	};

	private updateSearchTerm = async (term: string) => {
		this.setState({
			searchTerm: term,
			searchResults: await this.doSearch(term),
		});
		this.props.navigation.setParams({
			searchValue: term,
		});
	};

	private updateSelectedFilter = async (value: SearchFilterValues) => {
		this.setState({
			selectedFilter: value,
			searchResults: await this.doSearch(this.state.searchTerm),
		});
	};

	private toggleInvitePeopleModal = () => {
		this.setState({
			invitePeopleModalVisible: !this.state.invitePeopleModalVisible,
			createGroupSearchResults: [],
			selectedUsers: [],
		});
	};

	private selectNewUserForGroupHandler = (userId: string) => {
		this.setState({selectedUsers: [...this.state.selectedUsers, userId]});
	};

	private toggleGroupInfoModal = (prepareNext = false) => {
		this.setState({
			groupInfoModalVisible: !this.state.groupInfoModalVisible,
			groupName: '',
			groupDescription: '',
			nextShowInvitePeople: prepareNext,
		});
	};

	private updateGroupNameHanlder = (text: string) => {
		this.setState({groupName: text});
	};

	private updateGroupDescriptionHandler = (text: string) => {
		this.setState({groupDescription: text});
	};

	private onGroupInfoModalHide = () => {
		if (this.state.nextShowInvitePeople) {
			this.toggleInvitePeopleModal();
			this.setState({nextShowInvitePeople: false});
		}
	};

	private addFriendHandler = async (friendId: string) => {
		const {addFriend} = this.props;

		await addFriend({
			variables: {
				user: friendId,
			},
		});
	};

	private handleCreateNewGroup = () => {
		this.toggleInvitePeopleModal();
		// TODO: check state variables: groupName, groupDescription, selectedUsers
	};

	private createGroupSearchUpdated = (term: string) => {
		// let createGroupSearchResults: SearchResultCreateGroup[] = [];
		// if (term.length > 3 && term.length < 8) {
		// 	createGroupSearchResults = SEARCH_RESULTS_CREATE_GROUP;
		// }
		// this.setState({createGroupSearchResults});
	};

	private onSearchResultSelectHandler = (result: SearchResultData) => {
		if (
			result.kind === SearchResultKind.Friend ||
			result.kind === SearchResultKind.NotFriend ||
			result.kind === SearchResultKind.FriendRequestSent
		) {
			this.props.navigation.navigate('UserProfileScreen', {userId: result.id});
		}
	};

	private setTrendingVisible = () => {
		this.toggleBackVisible(false);
		Keyboard.dismiss();
	};

	private toggleBackVisible = (visible: boolean) => {
		this.props.navigation.setParams({
			backVisible: visible,
			searchValue: '',
		});
		this.setState({
			trendingVisible: !visible,
			searchResults: [],
		});
	};

	private onFocusUpdatedHandler = (value: boolean) => {
		if (value) {
			this.toggleBackVisible(true);
		}
	};
}

const searchUsersWrapper = searchUsersHoc(SearchScreen);
const addFriendWrapper = addFriendHoc(searchUsersWrapper);

export default addFriendWrapper;
