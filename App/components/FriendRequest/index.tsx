import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

import {Colors} from '../../theme';
import {AvatarImage} from '../AvatarImage';
import {ButtonSizes, SXButton} from '../Button';
import style from './style';

export interface IFriendRequestProps {
	avatarURL: string;
	fullName: string;
	username: string;
}

export class FriendRequest extends Component<IFriendRequestProps> {
	public static defaultProps: Partial<IFriendRequestProps> = {};

	public render() {
		return (
			<View style={style.container}>
				<View style={style.leftContainer}>
					<AvatarImage image={{uri: this.props.avatarURL}} style={style.avatarImage} />
					<View style={style.avatarNameContainer}>
						<Text style={style.fullName}>{this.props.fullName}</Text>
						{this.renderUsername()}
						<Text style={style.friendRequest}>{'Friend Request'}</Text>
					</View>
				</View>
				<SXButton
					label={'Approve'}
					size={ButtonSizes.Small}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.approveFriendRequestHandler}
				/>
			</View>
		);
	}

	private renderUsername = () => {
		if (this.props.username !== '') {
			return <Text style={style.username}>{'@' + this.props.username}</Text>;
		}
		return null;
	}

	private approveFriendRequestHandler = () => {
		alert('TBD: approveFriendRequestHandler');
	}
}
