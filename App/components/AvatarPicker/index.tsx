import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {ImageRequireSource, ImageURISource, TouchableOpacity, View} from 'react-native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../theme/';
import {AvatarImage} from '../AvatarImage';
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

export class AvatarPicker extends Component<IAvatarPickerProps, any> {
	public render() {
		return (
			<View style={style.container}>
				<AvatarImage image={this.props.avatarImage} style={style.avatarImage} />
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
		}).then((image: Image | Image[]) => {
			this.props.afterImagePick((image as Image).path);
		});
	}

	private takeCameraPhoto = () => {
		ImagePicker.openCamera({
			width: IMAGE_CROP_SIZE,
			height: IMAGE_CROP_SIZE,
			cropping: true,
			mediaType: 'photo',
			useFrontCamera: true,
		}).then((image: Image | Image[]) => {
			this.props.afterImagePick((image as Image).path);
		});
	}
}
