import React, {Component, ReactElement} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';

import {GovernanceCard, IWallPostCardProp, ModalGovernancePost} from 'components';
import {IMediaProps} from 'types';
import {IGovPostData} from './index';
import style from './style';

interface IGovernanceTabScreenProps {
	wallPosts: IGovPostData[];
	refreshing: boolean;
	loadingMore: boolean;
	hasMore: boolean;
	onRefresh: () => void;
	onLoadMore: () => void;
	showFullScreenMedia: (media: IMediaProps) => void;
	onVoteUp: (govPost: IGovPostData) => void;
	onVoteDown: (govPost: IGovPostData) => void;
}

interface IGovernanceTabScreenState {
	selectedPost: IWallPostCardProp | null;
	showVoteModal: boolean;
}

export default class GovernanceTabScreen extends Component<IGovernanceTabScreenProps, IGovernanceTabScreenState> {
	public state = {
		selectedPost: null,
		showVoteModal: false,
	};

	public render() {
		return (
			<View style={style.container}>
				<ModalGovernancePost
					visible={this.state.showVoteModal}
					govPost={this.state.selectedPost}
					onCloseModal={this.closeVoteModalHandler}
					onVoteUp={this.voteUpHandler}
					onVoteDown={this.voteDownHandler}
				/>
				<FlatList
					windowSize={5}
					refreshing={this.props.refreshing}
					onRefresh={this.props.onRefresh}
					data={this.props.wallPosts}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderGovernanceCard}
					onEndReached={this.props.onLoadMore}
					onEndReachedThreshold={0.2}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps={'handled'}
					ListFooterComponent={this.renderFooterWhenLoading}
				/>
			</View>
		);
	}

	private keyExtractor = (item: IGovPostData, index: number) => item.id;

	private renderGovernanceCard = (data: {item: IGovPostData}) => {
		const govPost = data.item;
		return (
			<GovernanceCard
				mediaObject={govPost.media}
				upVotes={govPost.upVotes}
				downVotes={govPost.downVotes}
				onStartVote={() => this.onStartVoteHandler(govPost)}
				onShowFullScreen={() => this.props.showFullScreenMedia(govPost.media)}
			/>
		);
	};

	private renderFooterWhenLoading = (): ReactElement<any> => {
		if (this.props.loadingMore && this.props.hasMore) {
			return (
				<View style={style.bottomLoadingContainer}>
					<ActivityIndicator size={'large'} />
				</View>
			);
		}
		return null;
	};

	private onStartVoteHandler = (govPost: IGovPostData) => {
		this.setState({
			showVoteModal: true,
			selectedPost: {...govPost, media: [govPost.media]},
		});
	};

	private closeVoteModalHandler = () => {
		this.setState({
			showVoteModal: false,
		});
	};

	private voteDownHandler = () => {
		this.closeVoteModalHandler();
		this.props.onVoteDown(this.state.selectedPost);
	};

	private voteUpHandler = () => {
		this.closeVoteModalHandler();
		this.props.onVoteUp(this.state.selectedPost);
	};
}
