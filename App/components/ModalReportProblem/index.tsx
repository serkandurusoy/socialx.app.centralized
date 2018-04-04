import React, {Component} from 'react';
import {Image, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';
import {OS_TYPES} from '../../constants';
import {withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {Colors} from '../../theme';
import Icons from '../../theme/Icons';
import {SXTextInput} from '../TextInput';
import style from './style';

export interface IModalReportProblemComponentProps {
	visible: boolean;
	confirmHandler: (data: IReportData) => void;
	declineHandler: () => void;
	marginBottom: number;
	onModalHide: () => void;
	pickerOptions: any;
}

export interface IReportData {
	reportReason: string;
	description: string;
}

interface IModalReportProblemComponentState extends IReportData {}

const REPORT_REASONS = [
	'Nothing',
	'Anything',
	'Everything',
	'Some very long reason goes here. Should display in more lines',
];

class ModalReportProblemComponent extends Component<
	IModalReportProblemComponentProps,
	IModalReportProblemComponentState
> {
	public state = {
		reportReason: REPORT_REASONS[0],
		description: '',
	};

	public render() {
		const backDropOpacity = Platform.OS === OS_TYPES.iOS ? 0 : 0.7;
		return (
			<Modal
				isVisible={this.props.visible}
				backdropOpacity={backDropOpacity}
				animationIn={'slideInDown'}
				animationOut={'slideOutUp'}
				style={style.container}
				onModalHide={this.props.onModalHide}
			>
				{this.renderOSBlurView()}
				<View style={this.getResizableStyles()}>
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
									numberOfLines={3}
									borderColor={Colors.dustWhite}
									placeholder={'Describe your Report'}
									onChangeText={this.updateReportDescription}
									blurOnSubmit={false}
								/>
							</View>
						</View>

						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.props.declineHandler}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>{'Cancel'}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.button} onPress={() => this.props.confirmHandler(this.state)}>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Send'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	private renderOSBlurView = () => {
		if (Platform.OS === OS_TYPES.iOS) {
			return (
				// TODO: check why this onPress is not working!
				<TouchableWithoutFeedback onPress={this.props.declineHandler}>
					<BlurView style={style.blurView} blurType='dark' blurAmount={2} />
				</TouchableWithoutFeedback>
			);
		}
		return null;
	}

	private setNewSelection = (index: number, value: string) => {
		this.setState({
			reportReason: value,
		});
	}

	private getResizableStyles = () => {
		const ret = [style.keyboardView];
		if (Platform.OS === OS_TYPES.iOS) {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}

	private updateReportDescription = (text: string) => {
		this.setState({description: text});
	}
}

export const ModalReportProblem = withResizeOnKeyboardShow(ModalReportProblemComponent);
