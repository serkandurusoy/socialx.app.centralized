import {ModalTagFriends} from 'components/Modals/TagFriends';
import React from 'react';
import {findNodeHandle, Keyboard, View} from 'react-native';
import {NavigationStackScreenOptions} from 'react-navigation';
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

export const withModalForAddFriends = (
	BaseComponent: React.ComponentType<IModalForAddFriendsProps>,
	navOptions: Partial<NavigationStackScreenOptions>,
) => {
	return class extends React.Component<any, IWithModalForAddFriendsState> {
		private static navigationOptions = navOptions;

		public state = {
			modalVisible: false,
			blurViewRef: null,
			friendsSearchResults: [],
			taggedFriendsInModal: [],
			taggedFriends: [],
		};

		private baseScreen: any = null;

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
						ref={(ref) => (this.baseScreen = ref)}
					/>
				</View>
			);
		}

		private handleTagFriendsEditFinished = () => {
			this.setState({
				taggedFriends: this.state.taggedFriendsInModal,
				modalVisible: false,
			});
		}

		private showTagFriendsModal = () => {
			this.setState({
				taggedFriendsInModal: this.state.taggedFriends,
				modalVisible: true,
			});
		}

		private closeTagFriendsModal = () => {
			this.setState({
				modalVisible: false,
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
	};
};
