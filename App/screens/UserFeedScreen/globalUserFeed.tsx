import React from 'react';
import {NavigationScreenProp} from 'react-navigation';

import {getPublicPostsHoc} from 'backend/graphql';
import UserFeedScreen, {IFeedProps} from './index';

interface IWithRegularUserFeedProps {
	screenProps: {
		topLevelNav: NavigationScreenProp<any>;
	};
}

const withGlobalUserFeed = (BaseComponent: React.ComponentType<IFeedProps>) => {
	return class extends React.Component<IWithRegularUserFeedProps> {
		public render() {
			return <BaseComponent navigation={this.props.screenProps.topLevelNav} hideShareSection={false} />;
		}
	};
};

const withAllPosts = getPublicPostsHoc(UserFeedScreen);
export default withGlobalUserFeed(withAllPosts as any);
