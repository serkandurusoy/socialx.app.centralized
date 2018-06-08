import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {AddFriendButton, AvatarImage} from 'components';
import {SearchResultKind} from 'types';
import style from './style';

export interface IUserRequestSearchProps {
	avatarURL?: string;
	fullName: string;
	username: string;
	kind: SearchResultKind;
	addFriendHandler: () => Promise<any>;
	onEntrySelect?: () => void;
}

export class SearchResultEntry extends React.Component<IUserRequestSearchProps> {
	public render() {
		return (
			<View style={style.container}>
				<TouchableOpacity style={style.leftContainer} onPress={this.props.onEntrySelect}>
					<AvatarImage image={{uri: this.props.avatarURL}} style={style.avatarImage} />
					<View style={style.avatarNameContainer}>
						<Text style={style.fullName}>{this.props.fullName}</Text>
						{this.renderUsername()}
					</View>
				</TouchableOpacity>
				<AddFriendButton kind={this.props.kind} onAddFriend={this.props.addFriendHandler} />
			</View>
		);
	}

	private renderUsername = () => {
		if (this.props.username !== '') {
			return <Text style={style.username}>{'@' + this.props.username}</Text>;
		}
		return null;
	};
}
