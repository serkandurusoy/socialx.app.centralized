import React from 'react';

import {ISimpleWallPostCardProps} from 'components';
import {IMediaProps} from 'types';
import GovernanceTabScreen from './screen';

export interface IGovPostData extends ISimpleWallPostCardProps {
	upVotes: number;
	downVotes: number;
	media: IMediaProps;
}

export const SAMPLE_OWNER = {
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

const GOVERNANCE_POSTS: IGovPostData[] = [
	{
		id: '1',
		title: 'here is caption',
		timestamp: new Date(),
		owner: SAMPLE_OWNER,
		media: {
			hash: 'QmVMFdKJrXFSzNAnd81Di8vyxQnCSWKojSTwvqLFmNk7cQ',
			id: '41937a32-378c-4dfa-acc7-3e2edf9922a7',
			optimizedHash: 'Qmde5fWt9bAuAtWnUsWND7vuTisnbd1U6WpgXc1NKyeq5V',
			type: 'image/jpeg',
			size: 123456,
		},
		upVotes: 1,
		downVotes: 8,
	},
	{
		id: '2',
		title: 'guten morgen',
		timestamp: new Date(),
		owner: SAMPLE_OWNER,
		media: {
			hash: 'QmVMFdKJrXFSzNAnd81Di8vyxQnCSWKojSTwvqLFmNk7cQ',
			id: '41937a32-378c-4dfa-acc7-3e2edf9922a7',
			optimizedHash: 'Qmde5fWt9bAuAtWnUsWND7vuTisnbd1U6WpgXc1NKyeq5V',
			type: 'image/jpeg',
			size: 123456,
		},
		upVotes: 0,
		downVotes: 26,
	},
	{
		id: '3',
		title: 'test photo',
		timestamp: new Date(),
		owner: SAMPLE_OWNER,
		media: {
			hash: 'QmVMFdKJrXFSzNAnd81Di8vyxQnCSWKojSTwvqLFmNk7cQ',
			id: '41937a32-378c-4dfa-acc7-3e2edf9922a7',
			optimizedHash: 'Qmde5fWt9bAuAtWnUsWND7vuTisnbd1U6WpgXc1NKyeq5V',
			type: 'image/jpeg',
			size: 123456,
		},
		upVotes: 111,
		downVotes: 23,
	},
];

export default class GovernanceTab extends React.Component {
	private static navigationOptions = {
		header: null,
	};

	public render() {
		return <GovernanceTabScreen showFullScreenMedia={this.showFullScreenMediaHandler} wallPosts={GOVERNANCE_POSTS} />;
	}

	private showFullScreenMediaHandler = () => {
		alert('showFullScreenMediaHandler');
	}
}
