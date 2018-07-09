import numeral from 'numeral';
import React from 'react';
import {Linking, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {compose} from 'recompose';

import {IManagedModal, withManagedTransitions} from 'hoc';
import {MediaTypes} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

export interface IMediaInfoOverlayProps extends IManagedModal, IWithTranslationProps {
	visible: boolean;
	mediaHash: string;
	mediaSize: number;
	mediaName?: string;
	mediaType: MediaTypes;
	mediaURL: string;
	closeHandler: () => void;
}

const openURL = async (url: string, errorText: string) => {
	try {
		const supported = await Linking.canOpenURL(url);
		if (!supported) {
			alert(`${errorText}: ${url}`);
		} else {
			return Linking.openURL(url);
		}
	} catch (ex) {
		console.log(ex);
	}
};

const MediaInfoOverlayComponent: React.SFC<IMediaInfoOverlayProps> = ({
	onDismiss,
	onModalHide,
	visible,
	getText,
	mediaHash,
	mediaSize,
	mediaName,
	mediaType,
	mediaURL,
	closeHandler,
}) => (
	<Modal
		onDismiss={onDismiss}
		onModalHide={onModalHide}
		isVisible={visible}
		backdropOpacity={0.2}
		animationIn={'zoomIn'}
		animationOut={'zoomOut'}
		onBackButtonPress={closeHandler}
		onBackdropPress={closeHandler}
		style={style.container}
	>
		<View style={style.boxContainer}>
			<Text style={style.title}>{getText('media.info.title')}</Text>
			<View style={style.infoContainer}>
				<View style={style.infoTitles}>
					<Text style={style.fieldTitle}>{getText('media.info.hash')}</Text>
					<Text style={style.fieldTitle}>{getText('media.info.size')}</Text>
					<Text style={style.fieldTitle}>{getText('media.info.name')}</Text>
					<Text style={style.fieldTitle}>{getText('media.info.type')}</Text>
				</View>
				<View style={{flex: 1}}>
					<Text
						style={[style.fieldValue, style.filedValueLink]}
						numberOfLines={1}
						onPress={() => openURL(mediaURL, getText('message.link.not.supported'))}
					>
						{mediaHash}
					</Text>
					<Text style={style.fieldValue} numberOfLines={1}>
						{numeral(mediaSize).format('0.00 b')}
					</Text>
					<Text style={style.fieldValue} numberOfLines={1}>
						{mediaName || '-'}
					</Text>
					<Text style={style.fieldValue} numberOfLines={1}>
						{getText('media.types.' + mediaType.name.toLowerCase())}
					</Text>
				</View>
			</View>
		</View>
	</Modal>
);

export const MediaInfoModal = compose(
	withManagedTransitions,
	withTranslations,
)(MediaInfoOverlayComponent);
