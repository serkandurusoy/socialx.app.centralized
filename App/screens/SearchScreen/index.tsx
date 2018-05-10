import {ModalCreateGroup, ModalInvitePeople, SearchHeader} from 'components';
import React, {Component} from 'react';
import {findNodeHandle, InteractionManager, Platform, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import SearchScreenComponent from './screen';

import {ipfsConfig as base} from 'configuration';

import {addFriendHoc, searchUsersHoc} from 'backend/graphql';

export enum SearchFilterValues {
	People = 'people',
	Groups = 'groups',
}

export enum SearchResultKind {
	Friend = 'friend',
	NotFriend = 'notFriend',
	Group = 'group',
}

export interface SearchResultPeople {
	id: string;
	kind: SearchResultKind;
	fullName: string;
	username: string;
	avatarURL?: string;
}

export interface SearchResultGroups {
	id: string;
	kind: SearchResultKind;
	fullName: string;
	username: string;
	avatarURL?: string;
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
	searchResults: SearchResultPeople[] | SearchResultGroups[];
	selectedFilter: SearchFilterValues;
	invitePeopleModalVisible: boolean;
	blurViewRef: any;
	createGroupSearchResults: SearchResultCreateGroup[];
	selectedUsers: string[];
	groupInfoModalVisible: boolean;
	groupName: string;
	groupDescription: string;
	nextShowInvitePeople: boolean;
}

class SearchScreen extends Component<ISearchScreenProps, ISearchScreenState> {
	private static navigationOptions = (props: ISearchScreenProps) => ({
		headerTitle: () => {
			const params = props.navigation.state.params || {};
			return <SearchHeader searchInputUpdated={params.searchInputUpdatedHandler} />;
		},
	})

	public state = {
		invitePeopleModalVisible: false,
		searchTerm: '',
		searchResults: [],
		selectedFilter: SearchFilterValues.People,
		blurViewRef: null,
		createGroupSearchResults: [],
		selectedUsers: [],
		groupInfoModalVisible: false,
		groupName: '',
		groupDescription: '',
		nextShowInvitePeople: false,
	};

	private blurView = null;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({searchInputUpdatedHandler: this.updateSearchTerm});
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
				/>
			</View>
		);
	}

	private doSearch = async (query: string) => {
		const {search} = this.props;
		const results: SearchResultPeople[] = [];
		if (query.length < 2) {
			return results;
		}
		try {
			let resp = await search({variables: {query}});
			resp = resp.data.searchUsers;
			if (resp.length === 0) {
				return results;
			}
			for (let i = 0; i < resp.length; i++) {
				const current = resp[i];
				results.push({
					id: current.userId,
					kind: SearchResultKind.NotFriend,
					fullName: current.name,
					username: current.username,
					avatarURL: current.avatar
						? base.ipfs_URL + current.avatar.hash
						: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
				});
			}
			return results;
		} catch (ex) {
			return results;
		}
	}

	private updateSearchTerm = async (term: string) => {
		const {search} = this.props;
		this.setState({
			searchTerm: term,
			searchResults: await this.doSearch(term),
		});
	}

	private updateSelectedFilter = async (value: SearchFilterValues) => {
		this.setState({
			selectedFilter: value,
			searchResults: await this.doSearch(this.state.searchTerm),
		});
	}

	private toggleInvitePeopleModal = () => {
		this.setState({
			invitePeopleModalVisible: !this.state.invitePeopleModalVisible,
			createGroupSearchResults: [],
			selectedUsers: [],
		});
	}

	private selectNewUserForGroupHandler = (userId: string) => {
		this.setState({selectedUsers: this.state.selectedUsers.concat([userId])});
	}

	private toggleGroupInfoModal = (prepareNext = false) => {
		this.setState({
			groupInfoModalVisible: !this.state.groupInfoModalVisible,
			groupName: '',
			groupDescription: '',
			nextShowInvitePeople: prepareNext,
		});
	}

	private updateGroupNameHanlder = (text: string) => {
		this.setState({groupName: text});
	}

	private updateGroupDescriptionHandler = (text: string) => {
		this.setState({groupDescription: text});
	}

	private onGroupInfoModalHide = () => {
		if (this.state.nextShowInvitePeople) {
			this.toggleInvitePeopleModal();
			this.setState({nextShowInvitePeople: false});
		}
	}

	private getSearchResults = (term: string, filterValue: SearchFilterValues = this.state.selectedFilter) => {
		let ret: SearchResultPeople[] | SearchResultGroups[] = [];
		if (term.length > 3 && term.length < 8) {
			ret = filterValue === SearchFilterValues.People ? SEARCH_RESULTS_PEOPLE : SEARCH_RESULTS_GROUPS;
		}
		return ret;
	}

	private addFriendHandler = async (friendId: string) => {
		const {addFriend} = this.props;
		try {
			await addFriend({variables: {
				user: friendId,
			}});
		} catch (ex) {
			// TODO: notify user that friend request didn't process
			console.log(`ex: ${ex}`);
		}
		// alert('Add friend with ID ' + friendId);
	}

	private handleCreateNewGroup = () => {
		this.toggleInvitePeopleModal();
		// TODO: check state variables: groupName, groupDescription, selectedUsers
	}

	private createGroupSearchUpdated = (term: string) => {
		let createGroupSearchResults: SearchResultCreateGroup[] = [];
		if (term.length > 3 && term.length < 8) {
			createGroupSearchResults = SEARCH_RESULTS_CREATE_GROUP;
		}
		this.setState({createGroupSearchResults});
	}
}

const searchUsersWrapper = searchUsersHoc(SearchScreen);
const addFriendWrapper = addFriendHoc(searchUsersWrapper);

export default addFriendWrapper;
