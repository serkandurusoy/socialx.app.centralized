import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {Colors} from '../../theme';
import {SXTextInput} from '../TextInput';
import style from './style';

export interface IModalCreateGroupProps {
	groupMessage: string;
	descriptionMessage: string;
	visible: boolean;
	confirmHandler?: () => void;
	declineHandler?: () => void;
	marginBottom: number;
}

export interface IModalCreateGroupState {
	modalVisible: boolean;
}

class ModalCreateGroupComponent extends Component<IModalCreateGroupProps, IModalCreateGroupState> {
	public state = {
		modalVisible: this.props.visible,
		groupMessage: '',
		descriptionMessage: '',
	};

	public componentWillReceiveProps(nextProps: Readonly<IModalCreateGroupProps>): void {
		this.setState({modalVisible: nextProps.visible});
	}

	public render() {
		return (
			<Modal
				isVisible={this.state.modalVisible}
				backdropOpacity={0.45}
				animationIn={'zoomIn'}
				animationOut={'zoomOut'}
				onBackdropPress={() => this.setState({modalVisible: false})}
				style={this.getModalStyles()}
			>
				<View style={style.boxContainer}>
					<View style={style.titleContainer}>
						<Text style={style.title}>{'Create group'}</Text>
					</View>

					<View style={style.inputContainer}>
						<SXTextInput
							value={this.state.groupMessage}
							numberOfLines={1}
							borderColor={Colors.dustWhite}
							placeholder={'Group name'}
							onChangeText={this.updateGroupMessage}
						/>
						<View style={style.descriptionContainer}>
							<SXTextInput
								value={this.state.descriptionMessage}
								numberOfLines={3}
								borderColor={Colors.dustWhite}
								placeholder={'Description'}
								onChangeText={this.updateDescriptionMessage}
							/>
						</View>
					</View>

					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.actionCanceled}>
							<Text style={[style.buttonText, style.buttonTextCancel]}>{'Cancel'}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={this.actionConfirmed}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Next'}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

	private getModalStyles = () => {
		const ret = [style.container];
		if (Platform.OS === 'ios') {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}

	private actionConfirmed = () => {
		this.setState({
			modalVisible: false,
		});
		if (this.props.confirmHandler) {
			this.props.confirmHandler();
		}
	}

	private actionCanceled = () => {
		this.setState({
			modalVisible: false,
		});
		if (this.props.declineHandler) {
			this.props.declineHandler();
		}
	}

	private updateGroupMessage = (text: string) => {
		this.setState({groupMessage: text});
	}

	private updateDescriptionMessage = (text: string) => {
		this.setState({descriptionMessage: text});
	}
}

export const ModalCreateGroup = withResizeOnKeyboardShow(ModalCreateGroupComponent);
