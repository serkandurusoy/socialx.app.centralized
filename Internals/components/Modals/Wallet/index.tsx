import {SXButton} from 'components';
import {OS_TYPES} from 'consts';
import {IManagedModal, withManagedTransitions} from 'hoc/ManagedModal';
import {IWithResizeOnKeyboardShowProps, withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import numeral from 'numeral';
import React, {Component} from 'react';
import {Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import {Colors} from 'theme';
import {Icons} from 'theme/Icons';
import {IUserQuery} from 'types';
import {TKeyboardKeys, WalletInputField} from '../../Inputs';
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
const DELAY_BEFORE_DOWNLOAD_START = 1000;

const SOCX_WALLET_AMOUNT_FORMAT = '0,0';

interface IModalWalletProps extends IManagedModal, IWithResizeOnKeyboardShowProps {
	visible: boolean;
	blurViewRef: any;
	onCloseButton: () => void;
	socXInWallet: number;
	sendSocXAmount: number;
	destinationUser: IUserQuery;
	tokensSent: boolean;
	onSend: (gas: number) => void;
	onStartDownload: () => void;
}

interface IModalWalletState {
	gas: string;
	sendInProgress: boolean;
	tokensSent: boolean;
	visible: boolean;
}

class ModalWalletComponent extends Component<IModalWalletProps, IModalWalletState> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IModalWalletProps>,
		prevState: Readonly<IModalWalletState>,
	) {
		if (nextProps.visible !== prevState.visible) {
			const updatedState: Partial<IModalWalletState> = {
				visible: nextProps.visible,
			};
			if (nextProps.visible) {
				updatedState.tokensSent = false;
				updatedState.sendInProgress = false;
			}
			return updatedState;
		}
		return null;
	}

	public state = {
		gas: '14000',
		sendInProgress: false,
		tokensSent: false,
		visible: false,
	};

	private animatedButton: Animatable.View | undefined;

	public shouldComponentUpdate(nextProps: IModalWalletProps, nextState: IModalWalletState): boolean {
		if (nextProps.tokensSent !== this.props.tokensSent && this.animatedButton) {
			this.animatedButton.animate(OUT_ANIMATION_NAME, OUT_ANIMATION_DURATION).then(() => {
				this.setState({
					tokensSent: nextProps.tokensSent,
				});
				setTimeout(() => {
					this.props.onStartDownload();
				}, DELAY_BEFORE_DOWNLOAD_START); // have little delay for the animation to be visible
			});
		}
		return true;
	}

	public render() {
		const myCoinsWithFormat = numeral(this.props.socXInWallet).format(SOCX_WALLET_AMOUNT_FORMAT);
		const amountToSendWithFormat = numeral(this.props.sendSocXAmount).format(SOCX_WALLET_AMOUNT_FORMAT);
		return (
			<Modal
				onDismiss={this.props.onDismiss}
				onModalHide={this.props.onModalHide}
				isVisible={this.state.visible}
				backdropOpacity={0}
				style={style.container}
			>
				<BlurView style={style.blurView} viewRef={this.props.blurViewRef} blurType='dark' blurAmount={2} />
				<View style={this.getResizableStyles()}>
					<View style={style.boxContainer}>
						<TouchableOpacity style={style.closeModalButtonContainer} onPress={this.props.onCloseButton}>
							<Image source={Icons.iconModalClose} />
						</TouchableOpacity>
						<View style={style.topContainer}>
							<View style={style.socialXIconContainer}>
								<Image source={Icons.socxCoinIcon} style={style.socialXIcon} />
							</View>
							<Text style={style.topText}>
								{myCoinsWithFormat}
								{PAGE_TEXTS.title}
							</Text>
						</View>

						<WalletInputField
							disabled={true}
							value={amountToSendWithFormat}
							label={PAGE_TEXTS.sendField.label}
							rightLabel={PAGE_TEXTS.sendField.rightLabel}
						/>
						<WalletInputField
							disabled={true}
							value={this.props.destinationUser.userId}
							label={PAGE_TEXTS.destoField.label}
							rightLabel={PAGE_TEXTS.destoField.rightLabel}
						/>
						<WalletInputField
							value={this.state.gas}
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

	private renderIsSent = () => {
		return (
			<Animatable.View
				animation={IN_ANIMATION_NAME}
				easing='ease-out'
				iterationCount={1}
				duration={IN_ANIMATION_DURATION}
			>
				<Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isSent} />
			</Animatable.View>
		);
	}

	private sendButtonPressedHandler = async () => {
		this.setState({
			sendInProgress: true,
		});
		this.props.onSend(parseInt(this.state.gas, 10));
	}

	private renderSend = () => {
		return (
			<Animatable.View ref={(ref: any) => (this.animatedButton = ref)}>
				<SXButton
					disabled={this.state.sendInProgress}
					label={'SEND'}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.sendButtonPressedHandler}
				/>
			</Animatable.View>
		);
	}

	private conditionalRendering = () => {
		return this.state.tokensSent ? this.renderIsSent() : this.renderSend();
	}

	private getResizableStyles = () => {
		const ret = [style.keyboardView];
		if (Platform.OS === OS_TYPES.IOS) {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}

	private updateFeeText = (text: string) => {
		this.setState({gas: text});
	}
}

export const ModalWallet = withManagedTransitions(withResizeOnKeyboardShow(ModalWalletComponent));
