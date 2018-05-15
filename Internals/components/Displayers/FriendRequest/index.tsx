import React from 'react';
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from 'react-native';

import {AvatarImage} from 'components';
import {Icons} from 'theme';
import {showToastMessage} from 'utilities';
import style from './style';

export interface IFriendRequestProps {
	avatarURL: string;
	fullName: string;
	username: string;
	onRequestConfirmed: () => Promise<any>;
	onRequestDeclined: () => Promise<any>;
}

interface IFriendRequestState {
	loadingConfirmed: boolean;
	loadingDeclined: boolean;
}

export class FriendRequest extends React.Component<IFriendRequestProps, IFriendRequestState> {
	public state = {
		loadingConfirmed: false,
		loadingDeclined: false,
	};

	get isLoading() {
		return this.state.loadingConfirmed || this.state.loadingDeclined;
	}

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
				{this.renderWithInlineLoader(
					<TouchableOpacity onPress={this.requestConfirmedHandler} style={style.iconTouch} disabled={this.isLoading}>
						<Image source={Icons.greenRoundCheck} style={style.iconImage} />
					</TouchableOpacity>,
					this.state.loadingConfirmed,
				)}
				{this.renderWithInlineLoader(
					<TouchableOpacity onPress={this.requestDeclinedHandler} style={style.iconTouch} disabled={this.isLoading}>
						<Image source={Icons.redRoundCross} style={style.iconImage} />
					</TouchableOpacity>,
					this.state.loadingDeclined,
				)}
			</View>
		);
	}

	private renderWithInlineLoader = (component: React.ReactElement<any>, loading: boolean) => {
		if (!loading) {
			return component;
		}
		return (
			<View style={style.iconTouch}>
				<ActivityIndicator size={'small'} />
			</View>
		);
	}

	private renderUsername = () => {
		if (this.props.username !== '') {
			return <Text style={style.username}>{'@' + this.props.username}</Text>;
		}
		return null;
	}

	private requestConfirmedHandler = async () => {
		try {
			this.setState({
				loadingConfirmed: true,
			});
			await this.props.onRequestConfirmed();
		} catch (ex) {
			console.log(`ex: ${ex}`);
			this.setState({
				loadingConfirmed: false,
			});
			showToastMessage('Friend request could not be accepted at this time. Try again later..');
		}
	}

	private requestDeclinedHandler = async () => {
		try {
			this.setState({
				loadingDeclined: true,
			});
			await this.props.onRequestDeclined();
		} catch (ex) {
			console.log(`ex: ${ex}`);
			this.setState({
				loadingDeclined: false,
			});
			showToastMessage('Friend request could not be declined at this time. Try again later..');
		}
	}
}
