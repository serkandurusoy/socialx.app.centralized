import React, {Component} from 'react';
import {findNodeHandle, Platform, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {ModalCreateGroup} from '../../components/ModalCreateGroup';
import {ModalInvitePeople} from '../../components/ModalInvitePeople';
import {SearchHeader} from '../../components/SearchHeader';
import SearchScreenComponent from './screen';

export enum SearchFilterValues {
	People = 'people',
	Groups = 'groups',
}

export enum SearchResultKind {
	Friend = 'friend',
	NotFriend = 'notFriend',
	Group = 'group',
}

const SEARCH_RESULTS_CREATE_GROUP: SearchResultCreateGroup[] = [
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

const SEARCH_RESULTS_PEOPLE: SearchResultPeople[] = [
	{
		id: '0',
		kind: SearchResultKind.Friend,
		fullName: 'Ionut Movila',
		username: 'ionut.movila',
		avatarURL: 'https://placeimg.com/100/100/people',
	},
	{
		id: '1',
		kind: SearchResultKind.NotFriend,
		fullName: 'Teresa Lamb',
		username: 'terlamb',
		avatarURL: 'https://placeimg.com/101/101/people',
	},
	{
		id: '2',
		kind: SearchResultKind.Friend,
		fullName: 'Terosa McCarthy',
		username: 'terosaMcCarthy',
		avatarURL: 'https://placeimg.com/102/102/people',
	},
];

const SEARCH_RESULTS_GROUPS: SearchResultGroups[] = [
	{
		id: '3',
		kind: SearchResultKind.Group,
		fullName: 'Group name',
		username: 'afsfnaklsj.dfsaiog',
		avatarURL: 'https://placeimg.com/100/100/tech',
	},
	{
		id: '4',
		kind: SearchResultKind.Group,
		fullName: 'Timisoara JS meetup',
		username: 'timjs.meet',
		avatarURL: 'https://placeimg.com/101/101/tech',
	},
	{
		id: '5',
		kind: SearchResultKind.Group,
		fullName: 'AMG owners',
		username: 'amg.owners',
		avatarURL: 'https://placeimg.com/102/102/tech',
	},
];

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

export default class SearchScreen extends Component<ISearchScreenProps, ISearchScreenState> {
	private static navigationOptions = (props: ISearchScreenProps) => ({
		header: () => {
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

	public componentWillMount() {
		this.props.navigation.setParams({searchInputUpdatedHandler: this.updateSearchTerm});
	}

	public componentDidMount() {
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
					onModalHide={this.onGroupInfoModalHide}
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

	private updateSearchTerm = (term: string) => {
		this.setState({
			searchTerm: term,
			searchResults: this.getSearchResults(term),
		});
	}

	private updateSelectedFilter = (value: SearchFilterValues) => {
		this.setState({
			selectedFilter: value,
			searchResults: this.getSearchResults(this.state.searchTerm, value),
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

	private addFriendHandler = (friendId: string) => {
		alert('Add friend with ID ' + friendId);
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