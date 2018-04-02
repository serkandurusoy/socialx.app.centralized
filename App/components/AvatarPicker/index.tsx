import React from 'react';

import {ActionSheet} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Sizes} from '../../theme';
import {AvatarImage} from '../AvatarImage';
import style from './style';

const PICK_FROM_GALLERY = 'Pick from gallery';
const TAKE_A_PHOTO = 'Take a photo';
const CANCEL = 'Cancel';
const ACTION_SHEET_TITLE = 'Add profile photo';
const IMAGE_CROP_SIZE = 300;

export interface IAvatarPickerProps {
	avatarImage: string;
	afterImagePick: (image: string) => void;
	avatarSize?: number;
}

export const AvatarPicker: React.SFC<IAvatarPickerProps> = (props) => {
	const showGalleryPhotoPicker = async () => {
		const image: Image | Image[] = await ImagePicker.openPicker({
			width: IMAGE_CROP_SIZE,
			height: IMAGE_CROP_SIZE,
			cropping: true,
			mediaType: 'photo',
			includeBase64: true,
		});
		const retImage = image as Image;
		const base64Image = `data:${retImage.mime};base64,${retImage.data}`;
		props.afterImagePick(base64Image);
	};

	const takeCameraPhoto = async () => {
		const image: Image | Image[] = await ImagePicker.openCamera({
			width: IMAGE_CROP_SIZE,
			height: IMAGE_CROP_SIZE,
			cropping: true,
			mediaType: 'photo',
			useFrontCamera: true,
			includeBase64: true,
		});
		const retImage = image as Image;
		const base64Image = `data:${retImage.mime};base64,${retImage.data}`;
		props.afterImagePick(base64Image);
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

	const iconSize = Math.max(20, Math.round(props.avatarSize / 5));

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
