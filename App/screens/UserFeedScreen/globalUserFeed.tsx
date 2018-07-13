import React from 'react';

import {getPublicPostsHoc} from 'backend/graphql';
import UserFeedScreen, {IFeedProps} from './index';

const withGlobalUserFeed = (BaseComponent: React.ComponentType<IFeedProps>): React.SFC => (props) => (
	<BaseComponent shareSectionPlaceholder={'Share with the world what you think'} {...props} />
);

const withAllPosts = getPublicPostsHoc(UserFeedScreen);
export default withGlobalUserFeed(withAllPosts as any);
