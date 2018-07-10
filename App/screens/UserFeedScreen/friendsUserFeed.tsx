import React from 'react';

import {getFriendsPostsHoc} from 'backend/graphql';
import UserFeedScreen, {IFeedProps} from './index';
import {ITabbedScreenProps} from './TabbedFeed';

const withFriendsUserFeed = (BaseComponent: React.ComponentType<IFeedProps>) => {
	return class extends React.Component<ITabbedScreenProps> {
		public render() {
			const {screenProps} = this.props;
			return (
				<BaseComponent
					navigation={screenProps.topLevelNav}
					hideShareSection={false}
					searchTerm={screenProps.searchTerm}
				/>
			);
		}
	};
};

const withFriendsPosts = getFriendsPostsHoc(UserFeedScreen);
export default withFriendsUserFeed(withFriendsPosts as any);
