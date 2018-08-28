import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import {WithManagedTransitions} from 'hoc';
import {IModalConfirmationStateProps} from 'types';
import style from './style';

interface IModalConfirmationPropsExtended extends IModalConfirmationStateProps {}

const ModalConfirmationComponent: React.SFC<IModalConfirmationPropsExtended> = ({
	confirmActive,
	title,
	message,
	confirmButton,
	confirmHandler,
	cancelButton,
	declineHandler,
}) => {
	return (
		<WithManagedTransitions modalVisible={confirmActive}>
			{({onDismiss, onModalHide}) => (
				<Modal
					isVisible={confirmActive}
					backdropOpacity={0.2}
					animationIn={'zoomIn'}
					animationOut={'zoomOut'}
					onBackdropPress={declineHandler}
					style={style.container}
					onDismiss={onDismiss}
					onModalHide={onModalHide}
				>
					<View style={style.boxContainer}>
						<Text style={style.title}>{title}</Text>
						{message ? (
							<View style={style.borderContainer}>
								<Text style={style.message}>{message}</Text>
							</View>
						) : null}
						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={declineHandler}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>{cancelButton}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.button} onPress={confirmHandler}>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>{confirmButton}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}
		</WithManagedTransitions>
	);
};

ModalConfirmationComponent.defaultProps = {
	confirmButton: 'Yes!',
	cancelButton: 'No',
};

const mapStateToProps: any = (state: any): IModalConfirmationStateProps => ({
	...state.confirmation,
});

export const ModalConfirmation = connect(mapStateToProps)(ModalConfirmationComponent);
