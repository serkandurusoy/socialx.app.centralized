import React, {Component} from 'react';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import style from './style';
import {Icons} from '../../theme';
import {ButtonIconWithName} from '../ButtonIconWithName';

const BUTTON_NAMES = {
	wallet: 'Wallet',
	camera: 'Camera',
	media: 'Media',
	audio: 'Audio',
	location: 'Location',
	contact: 'Contact' ,
}

interface IModalInvitePeopleProps {
	visible: boolean;
	blurViewRef: any;
	walletHandlerPressed?: Func;
	cameraHandlerPressed?: Func;
	mediaHandlerPressed?: Func;
	audioHandlerPressed?: Func;
	locationHandlerPressed?: Func;
	contactHandlerPressed?: Func;
}

export class ModalShareOptions extends Component<IModalInvitePeopleProps, any> {
	public render() {
		return (
			<Modal
				isVisible={this.props.visible}
				backdropOpacity={0}
				style={style.container}
			>
				<BlurView style={style.blurView} viewRef={this.props.blurViewRef} blurType='dark' blurAmount={2}/>
				<View style={style.boxContainer}>
					<View style={style.rowContainer}>
						<ButtonIconWithName
							iconSource={Icons.iconWallet}
							onPress={this.props.walletHandlerPressed}
							label={BUTTON_NAMES.wallet}
						/>
						<ButtonIconWithName
							iconSource={Icons.iconCamera}
							onPress={this.props.cameraHandlerPressed}
							label={BUTTON_NAMES.camera}
						/>
						<ButtonIconWithName
							iconSource={Icons.iconLandscape}
							onPress={this.props.mediaHandlerPressed}
							label={BUTTON_NAMES.media}
						/>
					</View>
					<View style={style.rowContainer}>
						<ButtonIconWithName
							iconSource={Icons.iconSound}
							onPress={this.props.audioHandlerPressed}
							label={BUTTON_NAMES.audio}
						/>
						<ButtonIconWithName
							iconSource={Icons.iconLocation}
							onPress={this.props.locationHandlerPressed}
							label={BUTTON_NAMES.location}
						/>
						<ButtonIconWithName
							iconSource={Icons.iconPerson}
							onPress={this.props.contactHandlerPressed}
							label={BUTTON_NAMES.contact}
						/>
					</View>
				</View>
			</Modal>
		);
	}
}