import React, {RefObject} from 'react';
import {findNodeHandle, View} from 'react-native';
import {hoistStatics} from 'recompose';

import {ModalTagFriends} from 'components';
import {FriendsSearchResult} from 'types';
import {SEARCH_RESULTS_TAG_FRIENDS} from 'utilities';

export interface IModalForAddFriendsProps {
	addedFriends: FriendsSearchResult[];
	showAddFriendsModal: () => void;
}

interface IWithModalForAddFriendsState {
	modalVisible: boolean;
	blurViewRef: any;
	friendsSearchResults: FriendsSearchResult[];
	taggedFriendsInModal: FriendsSearchResult[];
	taggedFriends: FriendsSearchResult[];
}

const withModalForAddFriendsInt = (BaseComponent: React.ComponentType<IModalForAddFriendsProps>) => {
	return class extends React.Component<any, IWithModalForAddFriendsState> {
		public state = {
			modalVisible: false,
			blurViewRef: null,
			friendsSearchResults: [],
			taggedFriendsInModal: [],
			taggedFriends: [],
		};

		private baseScreen: RefObject<any> = React.createRef();

		public componentDidMount() {
			const blurViewHandle = findNodeHandle(this.baseScreen);
			this.setState({blurViewRef: blurViewHandle});
		}

		public render() {
			return (
				<View style={{flex: 1}}>
					<ModalTagFriends
						visible={this.state.modalVisible}
						doneHandler={this.handleTagFriendsEditFinished}
						cancelHandler={this.closeTagFriendsModal}
						blurViewRef={this.state.blurViewRef}
						onSearchUpdated={this.friendsSearchUpdatedHandler}
						searchResults={this.state.friendsSearchResults}
						selectTagUserInModal={this.tagFriendHandler}
						selectedUsers={this.state.taggedFriendsInModal}
					/>
					<BaseComponent
						addedFriends={this.state.taggedFriends}
						showAddFriendsModal={this.showTagFriendsModal}
						{...this.props}
						ref={this.baseScreen}
					/>
				</View>
			);
		}

		private handleTagFriendsEditFinished = () => {
			this.setState({
				taggedFriends: this.state.taggedFriendsInModal,
				modalVisible: false,
			});
		};

		private showTagFriendsModal = () => {
			this.setState({
				taggedFriendsInModal: this.state.taggedFriends,
				modalVisible: true,
			});
		};

		private closeTagFriendsModal = () => {
			this.setState({
				modalVisible: false,
			});
		};

		private tagFriendHandler = (friend: FriendsSearchResult) => {
			this.setState({taggedFriendsInModal: [...this.state.taggedFriendsInModal, friend]});
		};

		private friendsSearchUpdatedHandler = (term: string) => {
			// TODO: make real search here
			let friendsSearchResults: FriendsSearchResult[] = [];
			if (term.length > 3 && term.length < 8) {
				friendsSearchResults = SEARCH_RESULTS_TAG_FRIENDS;
			}
			this.setState({friendsSearchResults});
		};
	};
};

export const withModalForAddFriends = hoistStatics(withModalForAddFriendsInt);
