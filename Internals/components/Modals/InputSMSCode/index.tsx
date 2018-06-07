import {TKeyboardKeys} from 'components';
import {OS_TYPES} from 'consts';
import {withManagedTransitions} from 'hoc/ManagedModal';
import {withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import React, {Component} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from 'theme';
import style from './style';

const NUMBER_OF_DIGITS = 6;

const INITIAL_STATE = {
	inputValue: '',
};

export interface IModalInputSMSCodeComponentProps {
	visible: boolean;
	confirmHandler: (code: string) => void;
	declineHandler: () => void;
	resendHandler: () => void;
	phoneNumber: string;
	marginBottom: number;
	onDismiss: () => void;
	onModalHide: () => void;
	errorMessage?: string;
}

export interface IModalInputSMSCodeComponentState {
	inputValue: string;
}

class ModalInputSMSCodeComponent extends Component<IModalInputSMSCodeComponentProps, IModalInputSMSCodeComponentState> {
	public state = INITIAL_STATE;

	public render() {
		const okDisabled = this.state.inputValue.length < NUMBER_OF_DIGITS;
		const modalStyles = [
			style.container,
			...(Platform.OS === OS_TYPES.IOS ? [{marginBottom: this.props.marginBottom}] : []),
		];

		return (
			<Modal
				onDismiss={this.props.onDismiss}
				onModalHide={this.props.onModalHide}
				isVisible={this.props.visible}
				backdropOpacity={0.7}
				animationIn={'zoomIn'}
				animationOut={'zoomOut'}
				onBackdropPress={this.actionCanceled}
				style={modalStyles}
			>
				<View style={style.boxContainer}>
					<Text style={style.title}>{'Verification Code'}</Text>
					<View style={style.borderContainer}>
						<Text style={style.message}>{'Please type the verification code sent to ' + this.props.phoneNumber}</Text>
						<View style={style.inputCellsContainer}>
							<TextInput
								style={[style.codeInput, style.inputText]}
								placeholder={'123456'}
								keyboardType={TKeyboardKeys.numeric}
								maxLength={6}
								onChangeText={this.handleTextChange}
								underlineColorAndroid={Colors.transparent}
							>
								<Text style={style.inputText}>{this.state.inputValue}</Text>
							</TextInput>
						</View>
					</View>
					{this.props.errorMessage && <Text style={style.errorMessage}>{this.props.errorMessage}</Text>}
					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button]} onPress={this.actionResend}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Resend Code'}</Text>
						</TouchableOpacity>
					</View>
					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.actionCanceled}>
							<Text style={[style.buttonText, style.buttonTextCancel]}>{'Cancel'}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={this.actionConfirmed} disabled={okDisabled}>
							<View>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>{'OK!'}</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

	private actionConfirmed = () => {
		this.props.confirmHandler(this.state.inputValue);
		this.setState(INITIAL_STATE);
	};

	private actionCanceled = () => {
		this.props.declineHandler();
		this.setState(INITIAL_STATE);
	};

	private actionResend = () => {
		this.props.resendHandler();
		this.setState(INITIAL_STATE);
	};

	private handleTextChange = (value: string) => {
		this.setState({
			inputValue: value,
		});
	};
}

export const ModalInputSMSCode: any = withManagedTransitions(withResizeOnKeyboardShow(ModalInputSMSCodeComponent));
