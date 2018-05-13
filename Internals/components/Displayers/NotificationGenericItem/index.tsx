import React from 'react';
import {Dimensions, LayoutChangeEvent, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from 'components';
import style from './style';

export interface INotificationGIProps {
	avatarURL: string;
	fullName: string;
	username: string;
	text: string;
	onCheckNotification: (confirmed: boolean) => void;
}

interface INotificationGIState {
	swipeOutHeight: number;
}

export class NotificationGI extends React.Component<INotificationGIProps, INotificationGIState> {
	public state = {
		swipeOutHeight: 0,
	};

	private firstLayoutEvent = false;

	public render() {
		const containerProps: any = {
			style: style.container,
		};
		if (!this.firstLayoutEvent) {
			this.firstLayoutEvent = true;
			containerProps.onLayout = this.layoutHandler;
		}
		return (
			<View {...containerProps}>
				<Swipeable
					leftContent={this.getLeftContent()}
					onLeftActionRelease={() => this.props.onCheckNotification(true)}
					leftActionActivationDistance={Dimensions.get('window').width / 2}
				>
					<View style={style.swipeContainer}>
						<View style={style.leftContainer}>
							<AvatarImage image={{uri: this.props.avatarURL}} style={style.avatarImage} />
							<View style={style.avatarNameContainer}>
								<Text style={style.fullName}>{this.props.fullName}</Text>
								{this.props.username && <Text style={style.username}>{'@' + this.props.username}</Text>}
								<Text style={style.friendRequest}>{this.props.text}</Text>
							</View>
						</View>
						<TouchableOpacity onPress={() => this.props.onCheckNotification(false)}>
							<Icon name={'md-close'} style={style.iconButton} />
						</TouchableOpacity>
					</View>
				</Swipeable>
			</View>
		);
	}

	private layoutHandler = (event: LayoutChangeEvent) => {
		this.setState({
			swipeOutHeight: event.nativeEvent.layout.height,
		});
	}

	private getLeftContent = () => {
		const swiperStyles = [style.leftSwipeContainer];
		swiperStyles.push({height: this.state.swipeOutHeight});
		return (
			<View style={swiperStyles}>
				<Text style={style.leftText}>{'Dismiss'}</Text>
			</View>
		);
	}
}
