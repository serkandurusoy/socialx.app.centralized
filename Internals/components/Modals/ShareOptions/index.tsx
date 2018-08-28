import React from 'react';
import {Platform, TouchableWithoutFeedback, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';

import {ShareOptionsButton} from 'components';
import {OS_TYPES} from 'consts';
import {WithManagedTransitions} from 'hoc';
import {Icons} from 'theme';
import style from './style';

const BUTTON_NAMES = {
	wallet: 'Wallet',
	camera: 'Camera',
	media: 'Media',
	audio: 'Audio',
	location: 'Location',
	contact: 'Contact',
};

interface IRenderOSBlurViewProps {
	closeHandler: Func;
}

const RenderOSBlurView: React.SFC<IRenderOSBlurViewProps> = ({closeHandler}) =>
	Platform.OS === OS_TYPES.IOS ? (
		<TouchableWithoutFeedback onPress={closeHandler}>
			<BlurView style={style.blurView} blurType='dark' blurAmount={2} />
		</TouchableWithoutFeedback>
	) : null;

interface IModalShareOptionsProps {
	visible: boolean;
	walletHandlerPressed: Func;
	cameraHandlerPressed: Func;
	mediaHandlerPressed: Func;
	audioHandlerPressed: Func;
	locationHandlerPressed: Func;
	contactHandlerPressed: Func;
	closeHandler: Func;
}

export const ModalShareOptions: React.SFC<IModalShareOptionsProps> = ({
	visible,
	walletHandlerPressed,
	cameraHandlerPressed,
	mediaHandlerPressed,
	audioHandlerPressed,
	locationHandlerPressed,
	contactHandlerPressed,
	closeHandler,
}) => (
	<WithManagedTransitions modalVisible={visible}>
		{({onModalHide, onDismiss}) => (
			<Modal
				onDismiss={onDismiss}
				onModalHide={onModalHide}
				isVisible={visible}
				backdropOpacity={Platform.OS === OS_TYPES.IOS ? 0 : 0.7}
				style={style.container}
				onBackButtonPress={closeHandler}
				onBackdropPress={closeHandler}
			>
				<RenderOSBlurView closeHandler={closeHandler} />
				<View style={style.boxContainer}>
					<View style={style.rowContainer}>
						<ShareOptionsButton
							iconSource={Icons.iconWallet}
							onPress={walletHandlerPressed}
							label={BUTTON_NAMES.wallet}
						/>
						<ShareOptionsButton
							iconSource={Icons.iconCamera}
							onPress={cameraHandlerPressed}
							label={BUTTON_NAMES.camera}
						/>
						<ShareOptionsButton
							iconSource={Icons.iconShareMedia}
							onPress={mediaHandlerPressed}
							label={BUTTON_NAMES.media}
						/>
					</View>
					<View style={style.rowContainer}>
						<ShareOptionsButton iconSource={Icons.iconSound} onPress={audioHandlerPressed} label={BUTTON_NAMES.audio} />
						<ShareOptionsButton
							iconSource={Icons.iconLocation}
							onPress={locationHandlerPressed}
							label={BUTTON_NAMES.location}
						/>
						<ShareOptionsButton
							iconSource={Icons.iconPerson}
							onPress={contactHandlerPressed}
							label={BUTTON_NAMES.contact}
						/>
					</View>
				</View>
			</Modal>
		)}
	</WithManagedTransitions>
);
