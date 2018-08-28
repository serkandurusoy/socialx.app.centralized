import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';

import {OS_TYPES} from 'consts';
import {withManagedTransitions, WithResizeOnKeyboardShow} from 'hoc';
import {Colors} from 'theme';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../Inputs';
import style from './style';

export interface IModalCreateGroupProps {
	visible: boolean;
	blurViewRef: any;
	confirmHandler: () => void;
	declineHandler: () => void;
	updateGroupName: (text: string) => void;
	updateGroupDescription: (text: string) => void;
	onModalHide: () => void;
	onDismiss: () => void;
	afterDismiss: () => void;
}

class ModalCreateGroupComponent extends Component<IModalCreateGroupProps, any> {
	public state = {
		outAnimation: 'slideOutLeft',
	};

	public render() {
		return (
			<Modal
				onDismiss={this.props.onDismiss}
				onModalHide={this.props.onModalHide}
				isVisible={this.props.visible}
				backdropOpacity={0}
				animationIn={'slideInDown'}
				animationOut={this.state.outAnimation}
				style={style.container}
				afterDismiss={this.props.afterDismiss}
			>
				<BlurView style={style.blurView} viewRef={this.props.blurViewRef} blurType='dark' blurAmount={2} />
				<WithResizeOnKeyboardShow>
					{({marginBottom}) => (
						<View style={[style.keyboardView, Platform.OS === OS_TYPES.IOS ? {marginBottom} : {}]}>
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
					)}
				</WithResizeOnKeyboardShow>
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
	};

	private confirmHandler = () => {
		this.setState(
			{
				outAnimation: 'slideOutLeft',
			},
			() => {
				this.props.confirmHandler();
			},
		);
	};
}

export const ModalCreateGroup = withManagedTransitions(ModalCreateGroupComponent);
