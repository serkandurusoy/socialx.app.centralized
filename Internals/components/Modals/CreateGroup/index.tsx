import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';

import {OS_TYPES} from 'consts';
import {WithManagedTransitions, WithResizeOnKeyboardShow} from 'hoc';
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
	afterDismiss: () => void;
}

export class ModalCreateGroup extends Component<IModalCreateGroupProps, any> {
	public state = {
		outAnimation: 'slideOutLeft',
	};

	public render() {
		const {visible, blurViewRef, afterDismiss, updateGroupName, updateGroupDescription} = this.props;
		return (
			<WithManagedTransitions modalVisible={visible}>
				{({onDismiss, onModalHide}) => (
					<Modal
						onDismiss={onDismiss}
						onModalHide={onModalHide}
						isVisible={visible}
						backdropOpacity={0}
						animationIn={'slideInDown'}
						animationOut={this.state.outAnimation}
						style={style.container}
						afterDismiss={afterDismiss}
					>
						<BlurView style={style.blurView} viewRef={blurViewRef} blurType='dark' blurAmount={2} />
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
												onChangeText={updateGroupName}
												returnKeyType={TRKeyboardKeys.done}
												blurOnSubmit={true}
												size={InputSizes.Small}
											/>
											<View style={style.descriptionContainer}>
												<SXTextInput
													numberOfLines={3}
													borderColor={Colors.dustWhite}
													placeholder={'Description'}
													onChangeText={updateGroupDescription}
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
				)}
			</WithManagedTransitions>
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
