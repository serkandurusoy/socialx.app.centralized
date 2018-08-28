import React from 'react';
import {Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import {OS_TYPES} from 'consts';
import {WithManagedTransitions} from 'hoc';
import style from './style';

export interface IShareOption {
	label?: string;
	icon: string;
	key: string;
}

export const SHARE_OPTION_FB: IShareOption = {
	label: 'Facebook',
	icon: 'logo-facebook',
	key: 'facebook',
};

export const SHARE_GOOGLE_PLUS: IShareOption = {
	label: 'Google+',
	icon: 'logo-googleplus',
	key: 'google+',
};

export const SHARE_TWITTER: IShareOption = {
	label: 'Twitter',
	icon: 'logo-twitter',
	key: 'twitter',
};

export const SHARE_INSTAGRAM: IShareOption = {
	label: 'Instagram',
	icon: 'logo-instagram',
	key: 'instagram',
};

export const SHARE_WHATS_APP: IShareOption = {
	label: 'WhatsApp',
	icon: 'logo-whatsapp',
	key: 'whats-app',
};

export const SHARE_YOUTUBE: IShareOption = {
	label: 'Youtube',
	icon: 'logo-youtube',
	key: 'youtube',
};

interface IModalExternalShareOptionsProps {
	visible: boolean;
	closeHandler: Func;
	enabledShareOptions: IShareOption[];
	hideLabel: boolean;
	onOptionSelected: (option: IShareOption) => void;
}

export const ModalExternalShareOptions: React.SFC<IModalExternalShareOptionsProps> = ({
	visible,
	closeHandler,
	enabledShareOptions,
	hideLabel,
	onOptionSelected,
}) => {
	const renderOSBlurView = () => {
		if (Platform.OS === OS_TYPES.IOS) {
			return (
				<TouchableWithoutFeedback onPress={closeHandler}>
					<BlurView style={style.blurView} blurType='dark' blurAmount={2} />
				</TouchableWithoutFeedback>
			);
		}
		return null;
	};

	const backDropOpacity = Platform.OS === OS_TYPES.IOS ? 0 : 0.7;

	const getLayoutProps = () => {
		let ret = {
			numberOfRows: 1,
			itemsInRow: 3,
		};
		const numberOfShareOptions = enabledShareOptions.length;
		if (numberOfShareOptions === 4) {
			ret = {
				numberOfRows: 2,
				itemsInRow: 2,
			};
		} else if (numberOfShareOptions > 4) {
			ret = {
				numberOfRows: Math.ceil(numberOfShareOptions / 3),
				itemsInRow: 3,
			};
		}
		return ret;
	};

	const layoutProps = getLayoutProps();

	// todo @serkan @jake what?
	const renderOneRowWithButtons = (rowNumber: number) => {
		const ret = [];
		for (let i = 0; i < layoutProps.itemsInRow; i++) {
			const buttonIndex = rowNumber * layoutProps.itemsInRow + i;
			if (buttonIndex < enabledShareOptions.length) {
				const shareButton = enabledShareOptions[buttonIndex];
				ret.push(
					<TouchableOpacity key={i} style={style.buttonLayout} onPress={() => onOptionSelected(shareButton)}>
						<Icon name={shareButton.icon} style={style.buttonIcon} />
						{!hideLabel ? <Text style={style.buttonLabel}>{shareButton.label}</Text> : null}
					</TouchableOpacity>,
				);
			} else if (layoutProps.numberOfRows > 1) {
				ret.push(<View style={style.buttonLayout} key={i} />);
			}
		}
		return ret;
	};

	return (
		<WithManagedTransitions modalVisible={visible}>
			{({onDismiss, onModalHide}) => (
				<Modal
					onDismiss={onDismiss}
					onModalHide={onModalHide}
					isVisible={visible}
					backdropOpacity={backDropOpacity}
					style={style.container}
					onBackButtonPress={closeHandler}
					onBackdropPress={closeHandler}
				>
					{renderOSBlurView()}
					<View style={style.boxContainer}>
						{[...Array(layoutProps.numberOfRows).keys()].map((i) => (
							<View style={style.rowContainer} key={i}>
								{renderOneRowWithButtons(i)}
							</View>
						))}
					</View>
				</Modal>
			)}
		</WithManagedTransitions>
	);
};
