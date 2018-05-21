import React from 'react';
import {NavigationScreenProp} from 'react-navigation';

import {getPublicPostsHoc} from 'backend/graphql';
import UserFeedScreen, {IFeedProps} from './index';

interface IWithRegularUserFeedProps {
	screenProps: {
		topLevelNav: NavigationScreenProp<any>;
	};
}

const withFriendsUserFeed = (BaseComponent: React.ComponentType<IFeedProps>) => {
	return class extends React.Component<IWithRegularUserFeedProps> {
		public render() {
			return <BaseComponent navigation={this.props.screenProps.topLevelNav} hideShareSection={false} />;
		}
	};
};

// TODO: @Jake: make proper query here to get only posts from friends
const withAllPosts = getPublicPostsHoc(UserFeedScreen);
export default withFriendsUserFeed(withAllPosts as any);
