import React, {Component} from 'react';
import {Image, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';

import {SXTextInput} from 'components';
import {OS_TYPES} from 'consts';
import {WithManagedTransitions, WithResizeOnKeyboardShow} from 'hoc';
import {Colors, Icons} from 'theme';
import style from './style';

export interface IReportData {
	reportReason: string;
	description: string;
}

interface IModalReportProblemComponentProps {
	visible: boolean;
	confirmHandler: (data: IReportData) => void;
	declineHandler: () => void;
	pickerOptions: any;
}

interface IModalReportProblemComponentState extends IReportData {}

const REPORT_REASONS = [
	'Nothing',
	'Anything',
	'Everything',
	'Some very long reason goes here. Should display in more lines',
];

export class ModalReportProblem extends Component<
	IModalReportProblemComponentProps,
	IModalReportProblemComponentState
> {
	public state = {
		reportReason: REPORT_REASONS[0],
		description: '',
	};

	public render() {
		const backDropOpacity = Platform.OS === OS_TYPES.IOS ? 0 : 0.7;
		const {visible, confirmHandler, declineHandler} = this.props;
		return (
			<WithManagedTransitions modalVisible={visible}>
				{({onDismiss, onModalHide}) => (
					<Modal
						onDismiss={onDismiss}
						onModalHide={onModalHide}
						isVisible={visible}
						backdropOpacity={backDropOpacity}
						animationIn={'slideInDown'}
						animationOut={'slideOutUp'}
						style={style.container}
					>
						{Platform.OS === OS_TYPES.IOS && (
							<TouchableWithoutFeedback onPress={this.props.declineHandler}>
								<BlurView style={style.blurView} blurType='dark' blurAmount={2} />
							</TouchableWithoutFeedback>
						)}
						<WithResizeOnKeyboardShow>
							{({marginBottom}) => (
								<View style={[style.keyboardView, Platform.OS === OS_TYPES.IOS ? {marginBottom} : {}]}>
									<View style={style.boxContainer}>
										<View style={style.titleContainer}>
											<Text style={style.title}>{'Report a Problem'}</Text>
										</View>

										<View style={style.inputContainer}>
											<View style={style.pickerContainer}>
												<View style={style.iconContainer}>
													<Image source={Icons.iconDropDown} style={style.icon} resizeMode={'contain'} />
												</View>
												<ModalDropdown
													keyboardShouldPersistTaps={'handled'}
													style={style.pickerStyle}
													dropdownStyle={style.dropdownStyle}
													dropdownTextStyle={style.dropdownTextStyle}
													textStyle={style.dropdownTextStyle}
													options={REPORT_REASONS}
													defaultValue={REPORT_REASONS[0]}
													onSelect={this.setNewSelection}
												/>
											</View>

											<View style={style.descriptionContainer}>
												<SXTextInput
													autoCapitalize={'sentences'}
													autoCorrect={true}
													numberOfLines={3}
													borderColor={Colors.dustWhite}
													placeholder={'Describe your Report'}
													onChangeText={this.updateReportDescription}
													blurOnSubmit={false}
												/>
											</View>
										</View>

										<View style={style.buttonsContainer}>
											<TouchableOpacity style={[style.button, style.leftButton]} onPress={declineHandler}>
												<Text style={[style.buttonText, style.buttonTextCancel]}>{'Cancel'}</Text>
											</TouchableOpacity>
											<TouchableOpacity style={style.button} onPress={() => confirmHandler(this.state)}>
												<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Send'}</Text>
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

	private setNewSelection = (index: number, value: string) => {
		this.setState({
			reportReason: value,
		});
	};

	private updateReportDescription = (text: string) => {
		this.setState({description: text});
	};
}

/**
 * TODO list:
 * 1. Use Formik to get rid of state here!
 * 2. Add translations!
 */
