import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import {withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {Colors} from '../../theme';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../TextInput';
import style from './style';

export interface IModalCreateGroupProps {
	visible: boolean;
	blurViewRef: any;
	confirmHandler: () => void;
	declineHandler: () => void;
	updateGroupName: (text: string) => void;
	updateGroupDescription: (text: string) => void;
	marginBottom: number;
	onModalHide: () => void;
}

class ModalCreateGroupComponent extends Component<IModalCreateGroupProps, any> {
	public state = {
		outAnimation: 'slideOutLeft',
	};

	public render() {
		return (
			<Modal
				isVisible={this.props.visible}
				backdropOpacity={0}
				animationIn={'slideInDown'}
				animationOut={this.state.outAnimation}
				style={style.container}
				onModalHide={this.props.onModalHide}
			>
				<BlurView style={style.blurView} viewRef={this.props.blurViewRef} blurType='dark' blurAmount={2} />
				<View style={this.getResizableStyles()}>
					<View style={style.boxContainer}>
						<View style={style.titleContainer}>
							<Text style={style.title}>{'Create group'}</Text>
						</View>

						<View style={style.inputContainer}>
							<SXTextInput
								autoFocus={true}
								numberOfLines={1}
								borderColor={Colors.dustWhite}
								placeholder={'Group name'}
								onChangeText={this.props.updateGroupName}
								returnKeyType={TRKeyboardKeys.done}
								blurOnSubmit={true}
								size={InputSizes.Small}
							/>
							<View style={style.descriptionContainer}>
								<SXTextInput
									numberOfLines={3}
									borderColor={Colors.dustWhite}
									placeholder={'Description'}
									onChangeText={this.props.updateGroupDescription}
									blurOnSubmit={false}
								/>
							</View>
						</View>

						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.declineHandler}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>{'Cancel'}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.button} onPress={this.confirmHandler}>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Next'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	private declineHandler = () => {
		this.setState(
			{
				outAnimation: 'slideOutUp',
			},
			() => {
				this.props.declineHandler();
			},
		);
	}

	private confirmHandler = () => {
		this.setState(
			{
				outAnimation: 'slideOutLeft',
			},
			() => {
				this.props.confirmHandler();
			},
		);
	}

	private getResizableStyles = () => {
		const ret = [style.keyboardView];
		if (Platform.OS === 'ios') {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}
}

export const ModalCreateGroup = withResizeOnKeyboardShow(ModalCreateGroupComponent);
