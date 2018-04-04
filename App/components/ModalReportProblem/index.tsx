import React, {Component} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
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
	blurViewRef: any;
	confirmHandler: () => void;
	declineHandler: () => void;
	marginBottom: number;
	onModalHide: () => void;
	pickerOptions: any;
}

const PICKER_OPTIONS = ['Something', 'Nothing', 'Anything', 'Everything'];

class ModalReportProblemComponent extends Component<IModalReportProblemComponentProps, any> {
	public state = {
		outAnimation: 'slideOutLeft',
		pickerSelected: '',
		description: '',
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
				<BlurView style={style.blurView} blurType='dark' blurAmount={2} />
				<View style={this.getResizableStyles()}>
					<View style={style.boxContainer}>
						<View style={style.titleContainer}>
							<Text style={style.title}>{'Report a Problem'}</Text>
						</View>

						<View style={style.inputContainer}>
							<View style={style.pickerContainer}>
								<ModalDropdown
									style={style.pickerStyle}
									dropdownTextStyle={style.dropdownTextStyle}
									textStyle={style.dropdownTextStyle}
									options={PICKER_OPTIONS}
									defaultValue={PICKER_OPTIONS[0]}
									onSelect={(index: any, value: any) => this.setNewSelection(value)}
								/>
								<Image source={Icons.iconDropDown} style={style.icon} resizeMode={'contain'} />
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
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.declineHandler}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>{'Cancel'}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.button} onPress={this.confirmHandler}>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Send'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	private setNewSelection(selectedValue: any) {
		this.setState({
			pickerSelected: selectedValue,
		});
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
		if (Platform.OS === OS_TYPES.iOS) {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}
	private updateReport = (text: string) => {
		this.setState({reason: text});
	}
	private updateReportDescription = (text: string) => {
		this.setState({description: text});
	}
}

export const ModalReportProblem = withResizeOnKeyboardShow(ModalReportProblemComponent);
