import React from 'react';
import {Image, Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {ActionSheet} from 'native-base';
import ImagePicker, {Image as PickerImage} from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {Colors, Icons} from '../../theme';
import {AvatarImage} from '../AvatarImage';
import {ButtonSizes, SXButton} from '../Button';
import {SXTextInput} from '../TextInput';
import style from './style';

const PICK_FROM_GALLERY = 'Pick from gallery';
const TAKE_A_PHOTO = 'Take a photo/video';
const CANCEL = 'Cancel';
const ACTION_SHEET_TITLE = 'Add media file';

const MEDIA_TYPE_VIDEO = 'video';
const MEDIA_TYPE_IMAGE = 'image';

interface IAddWallPostModalProps {
	visible: boolean;
	fullName: string;
	avatarImage: any;
	postCreate: (data: any) => void;
}

interface IAddWallPostModalState {
	modalVisible: boolean;
	marginBottom: number;
	mediaObjects: any[];
}

export class AddWallPostModal extends React.Component<IAddWallPostModalProps, IAddWallPostModalState> {
	public static getDerivedStateFromProps(nextProps: Readonly<IAddWallPostModalProps>) {
		return {
			modalVisible: nextProps.visible,
		};
	}

	public state = {
		modalVisible: this.props.visible,
		marginBottom: 0,
		mediaObjects: [],
	};

	private keyboardDidShowListener: any;
	private keyboardDidHideListener: any;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	public componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	public render() {
		return (
			<Modal
				isVisible={this.state.modalVisible}
				backdropOpacity={0.7}
				animationInTiming={700}
				animationOutTiming={700}
				backdropColor={Colors.black}
				animationIn={'slideInDown'}
				animationOut={'slideOutUp'}
				onBackdropPress={this.backDropPressHandler}
				style={[style.container, {marginBottom: this.state.marginBottom}]}
			>
				<View style={style.boxContainer}>
					<View style={style.topContainer}>
						<AvatarImage image={this.props.avatarImage} style={style.avatarImage} />
						<Text style={style.fullName}>{this.props.fullName}</Text>
					</View>
					<View style={style.inputContainer}>
						<SXTextInput
							numberOfLines={3}
							borderColor={Colors.dustWhite}
							placeholder={'Type a message'}
							autoFocus={true}
						/>
					</View>
					<TouchableOpacity style={style.addMediaButton} onPress={this.addMediaHandler}>
						<Image source={Icons.iconNewPostAddMedia} style={style.photoIcon} resizeMode={'contain'} />
						<Text style={style.addMediaText}>{'Attach Photo/Video'}</Text>
					</TouchableOpacity>
					<ScrollView style={style.photosContainer} horizontal={true}>
						{this.renderPostMediaObjects()}
					</ScrollView>
					<SXButton label={'SEND'} size={ButtonSizes.Small} />
				</View>
			</Modal>
		);
	}

	private backDropPressHandler = () => {
		this.setState({modalVisible: false});
		// Keyboard.dismiss(); // doesn't work!
	}

	private keyboardDidShow = (event: any) => {
		this.setState({
			marginBottom: event.endCoordinates.height,
		});
	}

	private keyboardDidHide = () => {
		this.setState({
			marginBottom: 0,
		});
	}

	private addMediaHandler = () => {
		ActionSheet.show(
			{
				options: [PICK_FROM_GALLERY, TAKE_A_PHOTO, CANCEL],
				cancelButtonIndex: 2,
				title: ACTION_SHEET_TITLE,
			},
			(buttonIndex: number) => {
				switch (buttonIndex) {
					case 0:
						this.showGalleryPhotoPicker();
						break;
					case 1:
						this.takeCameraPhoto();
						break;
				}
			},
		);
	}

	private showGalleryPhotoPicker = async () => {
		const image: PickerImage | PickerImage[] = await ImagePicker.openPicker({
			cropping: false,
			mediaType: 'any',
		});
		const mediaMimeType = (image as PickerImage).mime;
		const localImagePath: any[] = [
			{
				path: (image as PickerImage).path,
				type: mediaMimeType.startsWith(MEDIA_TYPE_VIDEO) ? MEDIA_TYPE_VIDEO : MEDIA_TYPE_IMAGE,
			},
		];
		this.setState({
			mediaObjects: this.state.mediaObjects.concat(localImagePath),
		});
	}

	private takeCameraPhoto = async () => {
		alert('takeCameraPhoto');
	}

	private renderPostMediaObjects = () => {
		const ret: any = [];
		this.state.mediaObjects.forEach((mediaObject: any, index) => {
			if (mediaObject.type === MEDIA_TYPE_VIDEO) {
				ret.push(
					<Video
						key={index}
						source={{uri: 'file://' + mediaObject.path}}
						resizeMode={'cover'}
						paused={true}
						style={style.mediaObject}
					/>,
				);
			} else {
				ret.push(
					<Image
						key={index}
						source={{uri: 'file://' + mediaObject.path}}
						resizeMode={'cover'}
						style={style.mediaObject}
					/>,
				);
			}
		});
		return ret;
	}
}
