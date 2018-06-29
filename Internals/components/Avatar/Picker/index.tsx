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

const showGalleryPhotoPicker = async (afterImagePick: (image: string) => void) => {
	const galleryMediaObject = await getGalleryMediaObject(AVATAR_PICKER_OPTIONS);
	if (galleryMediaObject) {
		afterImagePick(galleryMediaObject.path);
	}
};

const takeCameraPhoto = async (afterImagePick: (image: string) => void) => {
	const cameraMediaObject = await getCameraMediaObject(AVATAR_CAMERA_OPTIONS);
	if (cameraMediaObject) {
		afterImagePick(cameraMediaObject.path);
	}
};

const pickUserAvatar = (afterImagePick: (image: string) => void) => {
	ActionSheet.show(
		{
			options: [PICK_FROM_GALLERY, TAKE_A_PHOTO, CANCEL],
			cancelButtonIndex: 2,
			title: ACTION_SHEET_TITLE,
		},
		(buttonIndex: number) => {
			switch (buttonIndex) {
				case 0:
					showGalleryPhotoPicker(afterImagePick);
					break;
				case 1:
					takeCameraPhoto(afterImagePick);
					break;
			}
		},
	);
};

export const AvatarPicker: React.SFC<IAvatarPickerProps> = ({avatarImage, avatarSize, afterImagePick}) => {
	const avatarSizeStyle = {
		width: avatarSize,
		height: avatarSize,
		borderRadius: avatarSize / 2,
	};

	const iconSize = Math.min(35, Math.round(avatarSize / 5));

	return (
		<View>
			<AvatarImage image={avatarImage} style={[style.avatarImage, avatarSizeStyle]} />
			<TouchableOpacity onPress={() => pickUserAvatar(afterImagePick)} style={style.editIcon}>
				<Icon name={'camera'} size={iconSize} color={Colors.postFullName} />
			</TouchableOpacity>
		</View>
	);
};

AvatarPicker.defaultProps = {
	avatarSize: Sizes.smartHorizontalScale(80),
};
