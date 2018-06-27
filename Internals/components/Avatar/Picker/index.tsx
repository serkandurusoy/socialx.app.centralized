import React from 'react';

import {ActionSheet} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Sizes} from 'theme';
import {getCameraMediaObject, getGalleryMediaObject} from 'utilities';
import {AvatarImage} from '../Image';
import style from './style';

const PICK_FROM_GALLERY = 'Pick from gallery';
const TAKE_A_PHOTO = 'Take a photo';
const CANCEL = 'Cancel';
const ACTION_SHEET_TITLE = 'Add profile photo';
const IMAGE_CROP_SIZE = 300;

const AVATAR_PICKER_OPTIONS = {
	width: IMAGE_CROP_SIZE,
	height: IMAGE_CROP_SIZE,
	cropping: true,
	mediaType: 'photo',
	includeBase64: true,
};

const AVATAR_CAMERA_OPTIONS = {
	width: IMAGE_CROP_SIZE,
	height: IMAGE_CROP_SIZE,
	cropping: true,
	mediaType: 'photo',
	useFrontCamera: true,
};

export interface IAvatarPickerProps {
	avatarImage: string;
	afterImagePick: (image: string) => void;
	avatarSize?: number;
}

export const AvatarPicker: React.SFC<IAvatarPickerProps> = (props) => {
	const showGalleryPhotoPicker = async () => {
		const galleryMediaObject = await getGalleryMediaObject(AVATAR_PICKER_OPTIONS);
		if (galleryMediaObject) {
			const base64Image = `data:${galleryMediaObject.mime};base64,${galleryMediaObject.data}`;
			props.afterImagePick(base64Image);
		}
	};

	// TODO: @Jake: decide what format we use here: base64, or local path?
	// See also usages of this component in SettingsScreen and SignUpScreen

	const takeCameraPhoto = async () => {
		const cameraMediaObject = await getCameraMediaObject(AVATAR_CAMERA_OPTIONS);
		if (cameraMediaObject) {
			props.afterImagePick(cameraMediaObject.path);
		}
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
						break;
					case 1:
						takeCameraPhoto();
						break;
				}
			},
		);
	};

	const avatarSizeStyle = {
		width: props.avatarSize,
		height: props.avatarSize,
		borderRadius: props.avatarSize / 2,
	};

	const iconSize = Math.min(35, Math.round(props.avatarSize / 5));

	return (
		<View>
			<AvatarImage image={props.avatarImage} style={[style.avatarImage, avatarSizeStyle]} />
			<TouchableOpacity onPress={pickUserAvatar} style={style.editIcon}>
				<Icon name={'camera'} size={iconSize} color={Colors.postFullName} />
			</TouchableOpacity>
		</View>
	);
};

AvatarPicker.defaultProps = {
	avatarSize: Sizes.smartHorizontalScale(80),
};
