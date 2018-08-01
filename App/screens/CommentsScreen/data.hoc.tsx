import React from 'react';

import {MOCK_COMMENTS} from 'utilities';
import CommentsScreen, {IWithGetComments} from './index';

const withMockComments = (BaseComponent: React.ComponentType<IWithGetComments>): React.SFC => (props) => (
	<BaseComponent {...props} getComments={MOCK_COMMENTS} />
);

export default withMockComments(CommentsScreen);
