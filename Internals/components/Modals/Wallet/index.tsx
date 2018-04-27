import {OS_TYPES} from 'consts';
import {withManagedTransitions} from 'hoc/ManagedModal';
import React, {Component} from 'react';
import {Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import {Colors} from 'theme';
import {Icons} from 'theme/Icons';
import {TKeyboardKeys, WalletInputField} from '../../Inputs';
import {SXButton} from '../../Interaction';
import style from './style';

const PAGE_TEXTS = {
	title: ' SOCX in wallet',
	buttonText: 'Send',
	sendField: {
		label: 'Send:',
		rightLabel: 'SOCX',
	},
	destoField: {
		label: 'To:',
		rightLabel: 'User',
	},
	feesGas: {
		label: 'Fees/Gas:',
		rightLabel: 'Gas',
	},
};

const IN_ANIMATION_NAME = 'bounceIn';
const IN_ANIMATION_DURATION = 300;
const OUT_ANIMATION_NAME = 'bounceOut';
const OUT_ANIMATION_DURATION = 300;

interface IModalWalletProps {
	visible: boolean;
	blurViewRef: any;
	socXWallet: any;
	addHandler: () => void;
	onCloseButtonHandler: () => void;
	onDismiss: () => void;
	onModalHide: () => void;
}

class ModalWalletComponent extends Component<IModalWalletProps, any> {
	public state = {
		postText: '',
		socXInWallet: '53,680',
		sendSocXAmount: '0',
		destinationToSend: '',
		FeeGas: '14000',
		selected: false,
	};

	private animatedButton: any = null;

	public render() {
		return (
			<Modal
				onDismiss={this.props.onDismiss}
				onModalHide={this.props.onModalHide}
				isVisible={this.props.visible}
				backdropOpacity={0}
				style={style.container}
			>
				<BlurView style={style.blurView} viewRef={this.props.blurViewRef} blurType='dark' blurAmount={2} />
				<View style={this.getResizableStyles()}>
					<View style={style.boxContainer}>
						<TouchableOpacity style={style.closeModalButtonContainer} onPress={this.props.onCloseButtonHandler}>
							<Image source={Icons.iconModalClose} style={style.closeModalButton} />
						</TouchableOpacity>
						<View style={style.topContainer}>
							<View style={style.socialXIconContainer}>
								<Image source={Icons.socxCoinIcon} style={style.socialXIcon} />
							</View>
							<Text style={style.topText}>
								{this.state.socXInWallet}
								{PAGE_TEXTS.title}
							</Text>
						</View>

						<WalletInputField
							value={this.state.sendSocXAmount}
							keyboardType={TKeyboardKeys.numeric}
							label={PAGE_TEXTS.sendField.label}
							rightLabel={PAGE_TEXTS.sendField.rightLabel}
							updateTextInput={this.updateSentText}
						/>
						<WalletInputField
							value={this.state.destinationToSend}
							label={PAGE_TEXTS.destoField.label}
							rightLabel={PAGE_TEXTS.destoField.rightLabel}
							updateTextInput={this.updateDestinationText}
						/>
						<WalletInputField
							value={this.state.FeeGas}
							keyboardType={TKeyboardKeys.numeric}
							label={PAGE_TEXTS.feesGas.label}
							rightLabel={PAGE_TEXTS.feesGas.rightLabel}
							updateTextInput={this.updateFeeText}
						/>
						<View style={style.sendButtonContainer}>{this.conditionalRendering()}</View>
					</View>
				</View>
			</Modal>
		);
	}

	private onButtonHandler() {
		if (!this.state.selected) {
			this.setState({selected: true});
		}
	}

	private renderIsSelected = () => {
		return (
			<Animatable.View
				animation={IN_ANIMATION_NAME}
				easing='ease-out'
				iterationCount={1}
				duration={IN_ANIMATION_DURATION}
			>
				<Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isSendSelected} />
			</Animatable.View>
		);
	}

	private addButtonPressedHandler = () => {
		this.animatedButton.animate(OUT_ANIMATION_NAME, OUT_ANIMATION_DURATION).then(() => {
			this.onButtonHandler();
		});
	}

	private renderSend = () => {
		return (
			<Animatable.View ref={(ref: any) => (this.animatedButton = ref)}>
				<SXButton
					label={'SEND'}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.addButtonPressedHandler}
				/>
			</Animatable.View>
		);
	}

	private conditionalRendering = () => {
		return this.state.selected ? this.renderIsSelected() : this.renderSend();
	}

	private getResizableStyles = () => {
		const ret = [style.keyboardView];
		if (Platform.OS === OS_TYPES.iOS) {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}

	private updateSentText = (text: string) => {
		this.setState({sendSocXAmount: text});
	}

	private updateDestinationText = (text: string) => {
		this.setState({destinationToSend: text});
	}

	private updateFeeText = (text: string) => {
		this.setState({FeeGas: text});
	}
}

export const ModalWallet = withManagedTransitions(ModalWalletComponent);
