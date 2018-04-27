import {withManagedTransitions} from 'hoc/ManagedModal';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import style from './style';

export interface IModalConfirmationProps {
	title: string;
	message: string;
	visible: boolean;
	confirmButton?: string;
	cancelButton?: string;
	confirmHandler?: () => void;
	declineHandler?: () => void;
	onDismiss: () => void;
	onModalHide: () => void;
}

class ModalConfirmationComponent extends Component<IModalConfirmationProps> {
	public static defaultProps: Partial<IModalConfirmationProps> = {
		confirmButton: 'Yes!',
		cancelButton: 'No',
	};

	public render() {
		return (
			<Modal
				onDismiss={this.props.onDismiss}
				onModalHide={this.props.onModalHide}
				isVisible={this.props.visible}
				backdropOpacity={0.2}
				animationIn={'zoomIn'}
				animationOut={'zoomOut'}
				onBackdropPress={this.props.declineHandler}
				style={style.container}
			>
				<View style={style.boxContainer}>
					<Text style={style.title}>{this.props.title}</Text>
					<View style={style.borderContainer}>
						<Text style={style.message}>{this.props.message}</Text>
					</View>
					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.props.declineHandler}>
							<Text style={[style.buttonText, style.buttonTextCancel]}>{this.props.cancelButton}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={this.props.confirmHandler}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>{this.props.confirmButton}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
}

export const ModalConfirmation = withManagedTransitions(ModalConfirmationComponent);
