import React from 'react';

import {getPublicPostsHoc} from 'backend/graphql';
import UserFeedScreen, {IFeedProps} from './index';
import {ITabbedScreenProps} from './TabbedFeed';

const withGlobalUserFeed = (BaseComponent: React.ComponentType<IFeedProps>) => {
	return class extends React.Component<ITabbedScreenProps> {
		public render() {
			const {screenProps} = this.props;
			return (
				<BaseComponent
					navigation={screenProps.topLevelNav}
					hideShareSection={true}
					searchTerm={screenProps.searchTerm}
				/>
			);
		}
	};
};

const withAllPosts = getPublicPostsHoc(UserFeedScreen);
export default withGlobalUserFeed(withAllPosts as any);
