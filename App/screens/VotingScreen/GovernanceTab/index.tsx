import findIndex from 'lodash/findIndex';
import React from 'react';
import {NavigationScreenProp} from 'react-navigation';

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
		title: 'sample video test',
		timestamp: new Date(),
		owner: SAMPLE_OWNER,
		media: {
			hash: 'QmNbsEi16AeUeUoYA1mRRkt1u4XSZLhM5yqRDUoTyYYWHb',
			id: 'a3404939-9b6b-475e-b347-f471fcc87ce0',
			optimizedHash: 'QmNbsEi16AeUeUoYA1mRRkt1u4XSZLhM5yqRDUoTyYYWHb',
			type: 'mp4',
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

const TOTAL_NUMBER_OF_POSTS = 20;

interface IGovernanceTabProps {
	screenProps: {
		topLevelNav: NavigationScreenProp<any>;
	};
}

interface IGovernanceTabState {
	refreshing: boolean;
	loadingMore: boolean;
	hasMore: boolean;
	govPosts: IGovPostData[];
}

export default class GovernanceTab extends React.Component<IGovernanceTabProps, IGovernanceTabState> {
	public state = {
		refreshing: false,
		loadingMore: false,
		hasMore: true,
		govPosts: [...GOVERNANCE_POSTS],
	};

	public render() {
		return (
			<GovernanceTabScreen
				wallPosts={this.state.govPosts}
				refreshing={this.state.refreshing}
				loadingMore={this.state.loadingMore}
				hasMore={this.state.hasMore}
				onRefresh={this.onRefreshHandler}
				onLoadMore={this.onLoadMoreHandler}
				showFullScreenMedia={this.showFullScreenMediaHandler}
				onVoteUp={this.onVoteUpHandler}
				onVoteDown={this.onVoteDownHandler}
			/>
		);
	}

	private showFullScreenMediaHandler = (media: IMediaProps) => {
		this.props.screenProps.topLevelNav.navigate('MediaViewerScreen', {
			mediaObjects: [media],
			startIndex: 0,
		});
	};

	private onRefreshHandler = () => {
		this.setState({refreshing: true, hasMore: true});
		setTimeout(() => {
			this.setState({
				refreshing: false,
				govPosts: [...GOVERNANCE_POSTS],
			});
		}, 2000);
	};

	private onLoadMoreHandler = () => {
		if (this.state.hasMore && !this.state.loadingMore) {
			this.setState({
				loadingMore: true,
			});
			setTimeout(() => {
				// todo @serkan @jake why stringify and parse????
				const allGovPosts = [...this.state.govPosts, ...JSON.parse(JSON.stringify(GOVERNANCE_POSTS))];
				this.updateIdsForNewGovPosts(allGovPosts);
				this.setState({
					loadingMore: false,
					govPosts: allGovPosts,
					hasMore: allGovPosts.length < TOTAL_NUMBER_OF_POSTS,
				});
			}, 2000);
		}
	};

	// TODO: can be deleted when we have data with unique IDs
	private updateIdsForNewGovPosts = (allGovPosts: IGovPostData[]) =>
		allGovPosts.map((govPost, index) => ({
			...govPost,
			id: index.toString(),
		}));

	private onVoteUpHandler = (govPost: IGovPostData) => {
		// TODO: network call to update upVotes, maybe hide this card?
		const updatedGovPosts = [...this.state.govPosts];
		const foundIndex = findIndex(updatedGovPosts, {id: govPost.id});
		updatedGovPosts[foundIndex].upVotes += 1;
		this.setState({
			govPosts: updatedGovPosts,
		});
	};

	private onVoteDownHandler = (govPost: IGovPostData) => {
		// TODO: network call to update downVotes, maybe hide this card?
		const updatedGovPosts = [...this.state.govPosts];
		const foundIndex = findIndex(updatedGovPosts, {id: govPost.id});
		updatedGovPosts[foundIndex].downVotes += 1;
		this.setState({
			govPosts: updatedGovPosts,
		});
	};
}
