import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Images} from '../../theme/';
import {AvatarImage} from '../AvatarImage';
import style from './style';

const PICK_FROM_GALLERY = 'Pick from gallery';
const TAKE_A_PHOTO = 'Take a photo';
const CANCEL = 'Cancel';
const ACTION_SHEET_TITLE = 'Add profile photo';
const IMAGE_CROP_SIZE = 300;

export class AvatarPicker extends Component {
	public render() {
		return (
			<View style={style.container}>
				<AvatarImage image={Images.user_avatar_placeholder} style={style.avatarImage} />
				<TouchableOpacity onPress={this.pickUserAvatar} style={style.editIcon}>
					<Icon name={'camera'} size={20} color={Colors.postFullName} />
				</TouchableOpacity>
			</View>
		);
	}

	private pickUserAvatar = () => {
		ActionSheet.show(
			{
				options: [PICK_FROM_GALLERY, TAKE_A_PHOTO, CANCEL],
				cancelButtonIndex: 2,
				title: ACTION_SHEET_TITLE,
			},
			(buttonIndex) => {
				if (buttonIndex === 0) {
					this.showGalleryPhotoPicker();
				} else if (buttonIndex === 1) {
					this.takeCameraPhoto();
				}
			},
		);
	}

	private showGalleryPhotoPicker = () => {
		ImagePicker.openPicker({
			width: IMAGE_CROP_SIZE,
			height: IMAGE_CROP_SIZE,
			cropping: true,
			mediaType: 'photo',
		}).then(
			(image) => {
				// console.log('Gallery image', image);
			},
			(error) => {
				// console.warn('Gallery pick error', error);
			},
		);
	}

	private takeCameraPhoto = () => {
		alert('takeCameraPhoto');
	}
}
