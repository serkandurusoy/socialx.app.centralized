import React, {Component} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {AvatarImage} from '../../components/AvatarImage';
import {WallPostCard} from '../../components/WallPostCard';
import style from './style';

interface IUserFeedScreenProps {
	avatarImage: any;
	initialPosts: any[];
	fullName: string;
	loadMorePosts: () => any[];
	addWallPost: (data: any) => void;
	showNewWallPostPage: () => void;
}

export interface IUserFeedScreenComponentState {}

export default class UserFeedScreenComponent extends Component<IUserFeedScreenProps, IUserFeedScreenComponentState> {
	public static defaultProps: Partial<IUserFeedScreenProps> = {};

	public render() {
		// TODO: switch to FlatList
		return (
			<ScrollView
				style={style.container}
				contentContainerStyle={style.contentContainer}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			>
				<View style={style.shareMessageContainer}>
					<AvatarImage image={this.props.avatarImage} style={style.avatarImage} />
					<TouchableWithoutFeedback onPress={this.props.showNewWallPostPage}>
						<View style={style.shareTextContainer}>
							<Text style={style.shareTextPlaceholder}>{'Share with your group what you think'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				{this.renderWallPosts()}
			</ScrollView>
		);
	}

	private renderWallPosts = () => {
		const ret: any = [];
		this.props.initialPosts.forEach((postData, index) => {
			ret.push(
				<View style={style.wallPostContainer} key={index}>
					<WallPostCard {...postData} />
				</View>,
			);
		});
		return ret;
	}
}
