import React, {Component} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {AddWallPostModal} from '../../components/AddWallPost';
import {AvatarImage} from '../../components/AvatarImage';
import {WallPostCard} from '../../components/WallPostCard';
import style from './style';

interface IUserFeedScreenProps {
	avatarImage: any;
	initialPosts: any[];
	loadMorePosts: () => any[];
	addWallPost: (data: any) => void;
}

export interface IUserFeedScreenComponentState {
	modalVisible: boolean;
}

export default class UserFeedScreenComponent extends Component<IUserFeedScreenProps, IUserFeedScreenComponentState> {
	public static defaultProps: Partial<IUserFeedScreenProps> = {};

	public state = {
		modalVisible: false,
	};

	public render() {
		// TODO: switch to FlatList
		return (
			<ScrollView style={style.container} contentContainerStyle={style.contentContainer} alwaysBounceVertical={false}>
				<AddWallPostModal visible={this.state.modalVisible} />
				<View style={style.shareMessageContainer}>
					<AvatarImage image={this.props.avatarImage} style={style.avatarImage} />
					<TouchableWithoutFeedback onPress={this.showModalCreatePost}>
						<View style={style.shareTextContainer}>
							<Text style={style.shareTextPlaceholder}>{'Share with your group what you think'}</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
				{this.renderWallPosts()}
			</ScrollView>
		);
	}

	private showModalCreatePost = () => {
		this.setState({
			modalVisible: true,
		});
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
