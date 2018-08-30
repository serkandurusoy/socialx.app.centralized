import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import {WithManagedTransitions} from 'hoc';
import {IModalConfirmationStateProps} from 'types';
import {WithTranslations} from 'utilities';
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
}) => (
	<WithManagedTransitions modalVisible={confirmActive}>
		{({onDismiss, onModalHide}) => (
			<WithTranslations>
				{({getText}) => (
					<Modal
						isVisible={confirmActive}
						backdropOpacity={0.2}
						animationIn={'zoomIn'}
						animationOut={'zoomOut'}
						onBackdropPress={declineHandler}
						style={style.container}
						onDismiss={onDismiss} // lib. TS issue!
						onModalHide={onModalHide}
					>
						<View style={style.boxContainer}>
							{title && (
								<View style={style.titleBorder}>
									<Text style={style.title}>{getText(title)}</Text>
								</View>
							)}
							{message && (
								<View style={style.messageBorder}>
									<Text style={style.message}>{getText(message)}</Text>
								</View>
							)}
							<View style={style.buttonsContainer}>
								<TouchableOpacity style={[style.button, style.leftButton]} onPress={declineHandler}>
									<Text style={[style.buttonText, style.buttonTextCancel]}>{getText(cancelButton)}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={style.button} onPress={confirmHandler}>
									<Text style={[style.buttonText, style.buttonTextConfirm]}>{getText(confirmButton)}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
				)}
			</WithTranslations>
		)}
	</WithManagedTransitions>
);

ModalConfirmationComponent.defaultProps = {
	confirmButton: 'button.yes',
	cancelButton: 'button.no',
};

const mapStateToProps: any = (state: any): IModalConfirmationStateProps => ({
	...state.confirmation,
});

export const ModalConfirmation = connect(mapStateToProps)(ModalConfirmationComponent);
