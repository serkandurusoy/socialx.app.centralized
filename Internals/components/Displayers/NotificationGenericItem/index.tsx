import React from 'react';
import {ActivityIndicator, Dimensions, LayoutChangeEvent, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {hideModalConfirmation, showModalConfirmation} from 'backend/actions';
import {AvatarImage} from 'components';
import {IModalConfirmationProps} from 'types';
import {showToastMessage} from 'utilities';
import style from './style';

export interface INotificationGIProps {
	avatarURL: string;
	fullName: string;
	username: string;
	userId: string;
	text: string;
	onCheckNotification: (requestId: string) => Promise<any>;
	showConfirm: (confirmationOptions: IModalConfirmationProps) => void;
	hideConfirm: () => void;
	requestId: string;
	onViewUserProfile: (userId: string) => void;
}

interface INotificationGIState {
	swipeOutHeight: number;
	loading: boolean;
}

class NotificationGIComp extends React.Component<INotificationGIProps, INotificationGIState> {
	public state = {
		swipeOutHeight: 0,
		loading: false,
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
					onLeftActionRelease={() => this.confirmDismissNotification(true)}
					leftActionActivationDistance={Dimensions.get('window').width / 2}
				>
					<View style={style.swipeContainer}>
						<TouchableOpacity
							style={style.leftContainer}
							onPress={() => this.props.onViewUserProfile(this.props.userId)}
						>
							<AvatarImage image={{uri: this.props.avatarURL}} style={style.avatarImage} />
							<View style={style.avatarNameContainer}>
								<Text style={style.fullName}>{this.props.fullName}</Text>
								{this.props.username && <Text style={style.username}>{'@' + this.props.username}</Text>}
								<Text style={style.friendRequest}>{this.props.text}</Text>
							</View>
						</TouchableOpacity>
						{this.renderCloseButtonWithLoading()}
					</View>
				</Swipeable>
			</View>
		);
	}

	private renderCloseButtonWithLoading = () => {
		if (!this.state.loading) {
			return (
				<TouchableOpacity onPress={() => this.confirmDismissNotification(false)}>
					<Icon name={'md-close'} style={style.iconButton} />
				</TouchableOpacity>
			);
		}
		return <ActivityIndicator size={'small'} />;
	};

	private layoutHandler = (event: LayoutChangeEvent) => {
		this.setState({
			swipeOutHeight: event.nativeEvent.layout.height,
		});
	};

	private getLeftContent = () => {
		const swiperStyles = [style.leftSwipeContainer, {height: this.state.swipeOutHeight}];
		return (
			<View style={swiperStyles}>
				<Text style={style.leftText}>{'Dismiss'}</Text>
			</View>
		);
	};

	private confirmDismissNotification = (confirmed: boolean) => {
		if (!confirmed) {
			this.props.showConfirm({
				title: 'Hide notification?',
				confirmHandler: () => {
					this.props.hideConfirm();
					this.checkNotificationHandler();
				},
				declineHandler: () => {
					this.props.hideConfirm();
				},
			});
		} else {
			this.checkNotificationHandler();
		}
	};

	private checkNotificationHandler = async () => {
		try {
			this.setState({
				loading: true,
			});
			await this.props.onCheckNotification(this.props.requestId);
		} catch (ex) {
			console.log(`ex: ${ex}`);
			showToastMessage('Could not check notification at this time. Try again later..');
			this.setState({
				loading: false,
			});
		}
	};
}

const mapDispatchToProps = (dispatch: any) => ({
	showConfirm: (confirmationOptions: IModalConfirmationProps) => dispatch(showModalConfirmation(confirmationOptions)),
	hideConfirm: () => dispatch(hideModalConfirmation()),
});

export const NotificationGI = connect(
	null,
	mapDispatchToProps,
)(NotificationGIComp as any);
