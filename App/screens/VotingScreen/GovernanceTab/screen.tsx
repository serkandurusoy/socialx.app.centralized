import React, {Component, ReactElement} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';

import {GovernanceCard} from 'components';
import {IGovPostData} from './index';
import style from './style';

interface IGovernanceTabScreenProps {
	showFullScreenMedia: () => void;
	wallPosts: IGovPostData[];
	refreshing: boolean;
	onRefresh: () => void;
	onLoadMore: () => void;
	loadingMore: boolean;
	hasMore: boolean;
}

export default class GovernanceTabScreen extends Component<IGovernanceTabScreenProps> {
	public render() {
		return (
			<View style={style.container}>
				<FlatList
					windowSize={5}
					refreshing={this.props.refreshing}
					onRefresh={this.props.onRefresh}
					data={this.props.wallPosts}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderGovernanceCard}
					onEndReached={this.props.onLoadMore}
					onEndReachedThreshold={0.2}
					// alwaysBounceVertical={false}
					keyboardShouldPersistTaps={'handled'}
					ListFooterComponent={this.renderFooterWhenLoading}
				/>,
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
				onStartVote={this.onStartVoteHandler}
				onShowFullScreen={this.props.showFullScreenMedia}
			/>
		);
	}

	private onStartVoteHandler = () => {
		alert('onStartVoteHandler');
	}

	private renderFooterWhenLoading = (): ReactElement<any> => {
		if (this.props.loadingMore && this.props.hasMore) {
			return (
				<View style={style.bottomLoadingContainer}>
					<ActivityIndicator size={'large'} />
				</View>
			);
		}
		return null;
	}
}
