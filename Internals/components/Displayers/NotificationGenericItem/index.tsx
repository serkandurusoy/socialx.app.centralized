import React from 'react';
import {ActivityIndicator, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {hideModalConfirmation, showModalConfirmation} from 'backend/actions';
import {AvatarImage} from 'components';
import {IModalConfirmationProps} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

export interface INotificationGIProps extends IWithTranslationProps {
	avatarURL: string;
	fullName: string;
	username: string;
	userId: string;
	text: string;
	onCheckNotification: (requestId: string) => void;
	showConfirm: (confirmationOptions: IModalConfirmationProps) => void;
	hideConfirm: () => void;
	requestId: string;
	onViewUserProfile: (userId: string) => void;
	loading: boolean;
}

const SwipeLeftContent: React.SFC<{label: string}> = ({label}) => (
	<View style={style.leftSwipeContainer}>
		<Text style={style.leftText}>{label}</Text>
	</View>
);

const confirmDismissNotification = (
	confirmed: boolean,
	requestId: string,
	showConfirm: (confirmationOptions: IModalConfirmationProps) => void,
	hideConfirm: () => void,
	onCheckNotification: (requestId: string) => void,
	confirmTitle: string,
) => {
	if (!confirmed) {
		showConfirm({
			title: confirmTitle,
			confirmHandler: () => {
				hideConfirm();
				onCheckNotification(requestId);
			},
			declineHandler: () => {
				hideConfirm();
			},
		});
	} else {
		onCheckNotification(requestId);
	}
};

const NotificationGIComp: React.SFC<INotificationGIProps> = ({
	loading,
	onViewUserProfile,
	userId,
	avatarURL,
	fullName,
	username,
	text,
	requestId,
	showConfirm,
	hideConfirm,
	onCheckNotification,
	getText,
}) => {
	const confirmTitle = getText('notifications.card.generic.hide.notification');
	return (
		<View style={style.container}>
			<Swipeable
				leftContent={<SwipeLeftContent label={getText('notifications.card.generic.swipeout.label')} />}
				onLeftActionRelease={() =>
					confirmDismissNotification(true, requestId, showConfirm, hideConfirm, onCheckNotification, confirmTitle)
				}
				leftActionActivationDistance={Dimensions.get('window').width / 2}
			>
				<View style={style.swipeContainer}>
					<TouchableOpacity style={style.leftContainer} onPress={() => onViewUserProfile(userId)}>
						<AvatarImage image={{uri: avatarURL}} style={style.avatarImage} />
						<View style={style.avatarNameContainer}>
							<Text style={style.fullName}>{fullName}</Text>
							{username && <Text style={style.username}>{'@' + username}</Text>}
							<Text style={style.friendRequest}>{text}</Text>
						</View>
					</TouchableOpacity>
					{!loading && (
						<TouchableOpacity
							onPress={() =>
								confirmDismissNotification(
									false,
									requestId,
									showConfirm,
									hideConfirm,
									onCheckNotification,
									confirmTitle,
								)
							}
						>
							<Icon name={'md-close'} style={style.iconButton} />
						</TouchableOpacity>
					)}
					{loading && <ActivityIndicator size={'small'} />}
				</View>
			</Swipeable>
		</View>
	);
};

const mapDispatchToProps = (dispatch: any) => ({
	showConfirm: (confirmationOptions: IModalConfirmationProps) => dispatch(showModalConfirmation(confirmationOptions)),
	hideConfirm: () => dispatch(hideModalConfirmation()),
});

export const NotificationGI = compose(
	connect(
		null,
		mapDispatchToProps,
	),
	withTranslations,
)(NotificationGIComp as any);
