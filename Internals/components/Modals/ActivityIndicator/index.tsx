import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import {WithManagedTransitions} from 'hoc';
import {Colors} from 'theme';
import style from './style';

interface IModalActivityIndicatorProps {
	activityIndicatorTitle?: string | null;
	activityIndicatorMessage?: string | null;
	showActivityIndicator: boolean;
}

const ManagedModalActivityIndicator: React.SFC<IModalActivityIndicatorProps> = ({
	activityIndicatorTitle,
	activityIndicatorMessage,
	showActivityIndicator,
}) => (
	<WithManagedTransitions modalVisible={showActivityIndicator}>
		{({onDismiss, onModalHide}) => (
			<Modal
				onDismiss={onDismiss} // lib. TS issue, onDismiss prop is inherited from Modal in 'react-native'
				onModalHide={onModalHide}
				isVisible={showActivityIndicator}
				backdropOpacity={0.2}
				animationIn={'slideInDown'}
				animationOut={'slideOutUp'}
				style={style.container}
			>
				<View style={style.boxContainer}>
					<Text style={style.title}>{activityIndicatorTitle || 'Please wait'}</Text>
					{activityIndicatorMessage ? <Text style={style.message}>{activityIndicatorMessage}</Text> : null}
					<ActivityIndicator size='large' color={Colors.pink} />
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);

// TODO: @serkan @jake we should use a combined redux State type for this
const mapStateToProps: any = (state: any): IModalActivityIndicatorProps => ({
	...state.popups,
});

export const ModalActivityIndicator = connect(mapStateToProps)(ManagedModalActivityIndicator);
