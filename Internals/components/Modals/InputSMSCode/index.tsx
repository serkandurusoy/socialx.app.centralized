import {OS_TYPES} from 'consts';
import {withManagedTransitions} from 'hoc/ManagedModal';
import {withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import React, {Component} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from 'theme';
import {TKeyboardKeys} from '../../Inputs';
import style from './style';

const NUMBER_OF_DIGITS = 6;

const INITIAL_STATE = {
	inputHasValue: new Array(NUMBER_OF_DIGITS).fill(false),
	inputValues: new Array(NUMBER_OF_DIGITS).fill(''),
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
	inputHasValue: boolean[];
	inputValues: string[];
}

class ModalInputSMSCodeComponent extends Component<IModalInputSMSCodeComponentProps, IModalInputSMSCodeComponentState> {
	public state = INITIAL_STATE;

	private inputRefs: any[] = [];

	public render() {
		const okDisabled = this.state.inputValues.join('').length < 4;
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
							{Array.from(Array(NUMBER_OF_DIGITS).keys()).map((i) => (
								<TextInput
									key={i}
									onChangeText={(value: string) => this.digitUpdatedHandler(i, value)}
									onKeyPress={(event: any) => this.onKeyPress(i, event)}
									ref={(component: any) => (this.inputRefs[i] = component)}
									maxLength={1}
									style={this.getDigitInputStyles(i)}
									keyboardType={TKeyboardKeys.numeric}
									underlineColorAndroid={Colors.transparent}
								/>
							))}
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
		const smsCode = this.state.inputValues.join('');
		this.props.confirmHandler(smsCode);
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

	private getDigitInputStyles = (index: number) => [
		style.digitInput,
		...(this.state.inputHasValue[index] ? [style.digitInputWithValue] : []),
	];

	private digitUpdatedHandler = (index: number, value: string) => {
		// TODO @serkan @jake use of slice is generally confusing, prefer filter and also, here, why? are you simply
		// trying to get a shallow copy? but then, you are mutating the state by assigning new value to that reference!
		// let's refactor this together to achieve what you want to do
		const inputValues = this.state.inputValues.slice();
		inputValues[index] = value;
		const inputHasValue = this.state.inputHasValue.slice();
		const hasNextToFocus = index < NUMBER_OF_DIGITS - 1;
		if (value.length > 0) {
			inputHasValue[index] = true;
			if (hasNextToFocus) {
				this.inputRefs[index + 1].focus();
			}
		}
		this.setState({inputValues, inputHasValue});
	};

	private onKeyPress = (index: number, event: any) => {
		if (event.nativeEvent.key.toLowerCase() === 'backspace') {
			// todo @serkan @jake see above
			const inputHasValue = this.state.inputHasValue.slice();
			inputHasValue[index] = false;
			const inputValues = this.state.inputValues.slice();
			const hasPreviousToFocus = index > 0;
			const isEmpty = inputValues[index].length === 0;
			if (hasPreviousToFocus && isEmpty) {
				const previousIndex = index - 1;
				this.inputRefs[previousIndex].focus();
				this.inputRefs[previousIndex].clear();
				inputValues[previousIndex] = '';
				inputHasValue[previousIndex] = false;
			}
			this.setState({inputValues, inputHasValue});
		}
	};
}

export const ModalInputSMSCode: any = withManagedTransitions(withResizeOnKeyboardShow(ModalInputSMSCodeComponent));
