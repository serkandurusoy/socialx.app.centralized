import React from 'react';

import { ActionSheet } from 'native-base';
import { ImageRequireSource, ImageURISource, TouchableOpacity, View } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../theme/';
import { AvatarImage } from '../AvatarImage';
import style from './style';

const PICK_FROM_GALLERY = 'Pick from gallery';
const TAKE_A_PHOTO = 'Take a photo';
const CANCEL = 'Cancel';
const ACTION_SHEET_TITLE = 'Add profile photo';
const IMAGE_CROP_SIZE = 300;

export interface IAvatarPickerProps {
	avatarImage: ImageURISource | ImageRequireSource;
	afterImagePick: (localURL: string) => void;
}

export const AvatarPicker: React.SFC<IAvatarPickerProps> = (props) => {
	const showGalleryPhotoPicker = async () => {
		const image: Image | Image[] = await ImagePicker.openPicker({
			width: IMAGE_CROP_SIZE,
			height: IMAGE_CROP_SIZE,
			cropping: true,
			mediaType: 'photo',
		});
		props.afterImagePick((image as Image).path);
	};

	const takeCameraPhoto = async () => {
		const image: Image | Image[] = await ImagePicker.openCamera({
			width: IMAGE_CROP_SIZE,
			height: IMAGE_CROP_SIZE,
			cropping: true,
			mediaType: 'photo',
			useFrontCamera: true,
		});
		props.afterImagePick((image as Image).path);
	};

	const pickUserAvatar = () => {
		ActionSheet.show(
			{
				options: [PICK_FROM_GALLERY, TAKE_A_PHOTO, CANCEL],
				cancelButtonIndex: 2,
				title: ACTION_SHEET_TITLE,
			},
			(buttonIndex: number) => {
				switch (buttonIndex) {
					case 0:
						showGalleryPhotoPicker();

					case 1:
						takeCameraPhoto();
				}
			},
		);
	};

	return (
		<View style={style.container}>
			<AvatarImage image={props.avatarImage} style={style.avatarImage} />
			<TouchableOpacity onPress={pickUserAvatar} style={style.editIcon}>
				<Icon name={'camera'} size={20} color={Colors.postFullName} />
			</TouchableOpacity>
		</View>
	);
};
