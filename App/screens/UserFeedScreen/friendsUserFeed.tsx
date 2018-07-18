import React from 'react';

import {getFriendsPostsHoc} from 'backend/graphql';
import UserFeedScreen, {IFeedProps} from './index';

const withFriendsUserFeed = (BaseComponent: React.ComponentType<IFeedProps>): React.SFC => (props) => (
	<BaseComponent shareSectionPlaceholder={'Share with your friends what you think'} {...props} />
);

const withFriendsPosts = getFriendsPostsHoc(UserFeedScreen);
export default withFriendsUserFeed(withFriendsPosts as any);
