import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';

import {IManagedModal} from 'hoc';
import {withManagedTransitions} from 'hoc/ManagedModal';
import {IModalConfirmationStateProps} from 'types';
import style from './style';

interface IModalConfirmationPropsExtended extends IModalConfirmationStateProps, IManagedModal {}

const ModalConfirmationSFC: React.SFC<IModalConfirmationPropsExtended> = (props) => {
	return (
		<Modal
			isVisible={props.confirmActive}
			backdropOpacity={0.2}
			animationIn={'zoomIn'}
			animationOut={'zoomOut'}
			onBackdropPress={props.declineHandler}
			style={style.container}
			onDismiss={props.onDismiss}
			onModalHide={props.onModalHide}
		>
			<View style={style.boxContainer}>
				<Text style={style.title}>{props.title}</Text>
				{props.message ? (
					<View style={style.borderContainer}>
						<Text style={style.message}>{props.message}</Text>
					</View>
				) : null}
				<View style={style.buttonsContainer}>
					<TouchableOpacity style={[style.button, style.leftButton]} onPress={props.declineHandler}>
						<Text style={[style.buttonText, style.buttonTextCancel]}>{props.cancelButton}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.button} onPress={props.confirmHandler}>
						<Text style={[style.buttonText, style.buttonTextConfirm]}>{props.confirmButton}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

ModalConfirmationSFC.defaultProps = {
	confirmButton: 'Yes!',
	cancelButton: 'No',
};

export const ModalConfirmationComponent = withManagedTransitions(ModalConfirmationSFC);

const mapStateToProps: any = (state: any): IModalConfirmationStateProps => ({
	...state.confirmation,
});

export const ModalConfirmation = connect<any>(mapStateToProps)(ModalConfirmationComponent);
