import React from 'react';

import {getPublicPostsHoc} from 'backend/graphql';
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

// TODO: @Jake: make proper query here to get only posts from friends
const withAllPosts = getPublicPostsHoc(UserFeedScreen);
export default withFriendsUserFeed(withAllPosts as any);
