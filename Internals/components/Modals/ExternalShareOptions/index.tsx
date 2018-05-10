import {OS_TYPES} from 'consts';
import {IManagedModal, withManagedTransitions} from 'hoc/ManagedModal';
import React from 'react';
import {Platform, ScrollView, Text, Tou, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
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

interface IModalExternalShareOptionsProps extends IManagedModal {
	visible: boolean;
	closeHandler: Func;
	enabledShareOptions: IShareOption[];
	hideLabel: boolean;
	onOptionSelected: (option: IShareOption) => void;
}

const ModalExternalShareOptionsSFC: React.SFC<IModalExternalShareOptionsProps> = (props) => {
	const renderOSBlurView = () => {
		if (Platform.OS === OS_TYPES.IOS) {
			return (
				<TouchableWithoutFeedback onPress={props.closeHandler}>
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
		const numberOfShareOptions = props.enabledShareOptions.length;
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

	const renderOneRowWithButtons = (rowNumber: number) => {
		const ret = [];
		for (let i = 0; i < layoutProps.itemsInRow; i++) {
			const buttonIndex = rowNumber * layoutProps.itemsInRow + i;
			if (buttonIndex < props.enabledShareOptions.length) {
				const shareButton = props.enabledShareOptions[buttonIndex];
				ret.push(
					<TouchableOpacity key={i} style={style.buttonLayout} onPress={() => props.onOptionSelected(shareButton)}>
						<Icon name={shareButton.icon} style={style.buttonIcon} />
						{!props.hideLabel ? <Text style={style.buttonLabel}>{shareButton.label}</Text> : null}
					</TouchableOpacity>,
				);
			} else if (layoutProps.numberOfRows > 1) {
				ret.push(<View style={style.buttonLayout} key={i} />);
			}
		}
		return ret;
	};

	const renderButtonsInRows = () => {
		const ret = [];
		for (let i = 0; i < layoutProps.numberOfRows; i++) {
			ret.push(
				<View style={style.rowContainer} key={i}>
					{renderOneRowWithButtons(i)}
				</View>,
			);
		}
		return ret;
	};

	return (
		<Modal
			onDismiss={props.onDismiss}
			onModalHide={props.onModalHide}
			isVisible={props.visible}
			backdropOpacity={backDropOpacity}
			style={style.container}
			onBackButtonPress={props.closeHandler}
			onBackdropPress={props.closeHandler}
		>
			{renderOSBlurView()}
			<View style={style.boxContainer}>{renderButtonsInRows()}</View>
		</Modal>
	);
};

export const ModalExternalShareOptions = withManagedTransitions(ModalExternalShareOptionsSFC);
