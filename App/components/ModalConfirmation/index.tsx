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
}

export interface IModalConfirmationState {
	modalVisible: boolean;
}

export class ModalConfirmation extends Component<IModalConfirmationProps, IModalConfirmationState> {
	public static defaultProps: Partial<IModalConfirmationProps> = {
		confirmButton: 'Yes!',
		cancelButton: 'No',
	};

	public state = {
		modalVisible: this.props.visible,
	};

	public componentWillReceiveProps(nextProps: Readonly<IModalConfirmationProps>): void {
		this.setState({modalVisible: nextProps.visible});
	}

	public render() {
		return (
			<Modal
				isVisible={this.state.modalVisible}
				backdropOpacity={0.2}
				animationIn={'zoomIn'}
				animationOut={'zoomOut'}
				onBackdropPress={() => this.setState({modalVisible: false})}
				style={style.container}
			>
				<View style={style.boxContainer}>
					<Text style={style.title}>{this.props.title}</Text>
					<View style={style.borderContainer}>
						<Text style={style.message}>{this.props.message}</Text>
					</View>
					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.actionCanceled}>
							<Text style={[style.buttonText, style.buttonTextCancel]}>{this.props.cancelButton}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={this.actionConfirmed}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>{this.props.confirmButton}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

	private actionConfirmed = () => {
		this.setState({
			modalVisible: false,
		});
		if (this.props.confirmHandler) {
			this.props.confirmHandler();
		}
	};

	private actionCanceled = () => {
		this.setState({
			modalVisible: false,
		});
		if (this.props.declineHandler) {
			this.props.declineHandler();
		}
	};
}
