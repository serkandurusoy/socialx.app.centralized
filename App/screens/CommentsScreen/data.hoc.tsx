import React from 'react';
import {hoistStatics} from 'recompose';

import CommentsScreen, {IWithGetComments} from './index';

const SAMPLE_USER = {
	userId: '585832b2-3ce5-4924-b75c-81e18bbf46de',
	name: 'test user',
	username: 'testname',
	avatar: {
		id: '2a098fd6-03b2-4b88-9bbb-8356727b480f',
		hash: 'QmcPjeRF774dU5oMrF7j3ceuKJcwp8wKFwrdu74z6MnpsY',
		type: 'image/jpeg',
		size: 123,
	},
};

const MOCK_COMMENTS = [
	{
		id: 'comment_id_1',
		owner: SAMPLE_USER,
		createdAt: new Date().getTime() / 1000 - 2000,
		text: 'Sample mock comment',
		likes: [SAMPLE_USER],
		comments: [],
	},
];

const withMockComments = (BaseComponent: React.ComponentType<IWithGetComments>): React.SFC => (props) => (
	<BaseComponent {...props} getComments={MOCK_COMMENTS} />
);

export default hoistStatics(withMockComments)(CommentsScreen);
