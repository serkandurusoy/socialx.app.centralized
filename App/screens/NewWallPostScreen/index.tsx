import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {ActivityIndicator, Image, Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker, {Image as PickerImage} from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import {NavigationScreenProp} from 'react-navigation';

import {AvatarImage} from 'components/Avatar';
import {MediaObjectViewer} from 'components/Displayers/MediaObject';
import {SXTextInput} from 'components/Inputs';
import {ButtonSizes, SXButton} from 'components/Interaction';
import {ModalCloseButton} from 'components/Modals';
import {Colors, Icons, Sizes} from 'theme';
import {MediaTypeImage} from 'types';
import style from './style';

import {addFileBN, addFilesBN} from 'utilities/ipfs';

const PICK_FROM_GALLERY = 'Pick from gallery';
const TAKE_A_PHOTO = 'Take a photo/video';
const CANCEL = 'Cancel';
const ACTION_SHEET_TITLE = 'Add media file';

const DEFAULT_MARGIN_BOTTOM = Sizes.smartVerticalScale(20);

export interface MediaObject {
	path: string;
	content: {
		Hash: string;
		Name: string;
		Size: string;
	};
	contentOptimized?: {
		Hash: string;
		Name: string;
		Size: string;
	};
}

export interface NewWallPostData {
	text: string;
	mediaObjects: MediaObject[];
}

interface INewWallPostScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface INewWallPostScreenState {
	marginBottom: number;
	mediaObjects: MediaObject[];
	postText: string;
	isUploading: boolean;
	uploadProgress: number;
}

export class NewWallPostScreen extends Component<INewWallPostScreenProps, INewWallPostScreenState> {
	private static navigationOptions = (props: INewWallPostScreenProps) => ({
		title: 'MESSAGE',
		headerRight: <ModalCloseButton navigation={props.navigation} />,
		headerLeft: <View />,
	});

	public state = {
		marginBottom: DEFAULT_MARGIN_BOTTOM,
		mediaObjects: [] as MediaObject[],
		postText: '',
		isUploading: false,
		uploadProgress: 0,
	};

	private keyboardDidShowListener: any;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
	}

	public componentWillUnmount() {
		this.keyboardDidShowListener.remove();
	}

	public render() {
		const {avatarImage, fullName} = this.props.navigation.state.params;
		return (
			<View style={[style.container, {paddingBottom: this.state.marginBottom}]}>
				<View style={style.topContainer}>
					<AvatarImage image={avatarImage} style={style.avatarImage} />
					<Text style={style.fullName}>{fullName}</Text>
				</View>
				<View style={style.inputContainer}>
					<SXTextInput
						value={this.state.postText}
						borderColor={Colors.dustWhite}
						placeholder={'Type a message'}
						autoFocus={true}
						onChangeText={this.updatePostText}
						multiline={true}
					/>
				</View>
				<TouchableOpacity style={style.addMediaButton} onPress={this.addMediaHandler} disabled={this.state.isUploading}>
					<Image source={Icons.iconNewPostAddMedia} style={style.photoIcon} resizeMode={'contain'} />
					<Text style={style.addMediaText}>{'Attach Photo/Video'}</Text>
				</TouchableOpacity>
				<ScrollView style={style.photosContainer} horizontal={true}>
					{this.renderPostMediaObjects()}
				</ScrollView>
				<SXButton
					label={'SEND'}
					size={ButtonSizes.Small}
					width={Sizes.smartHorizontalScale(100)}
					onPress={this.sendPostHandler}
					disabled={(this.state.postText.length < 0 && this.state.mediaObjects.length < 0) || this.state.isUploading}
				/>
			</View>
		);
	}

	private keyboardDidShow = (event: any) => {
		this.setState({
			marginBottom: event.endCoordinates.height + DEFAULT_MARGIN_BOTTOM / 2,
		});
	};

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
	};

	// TODO: show the user that he has excceded the maximum file size
	private checkFileSize = (mediaOb: any): boolean => mediaOb.size < 50000;

	private showGalleryPhotoPicker = async () => {
		try {
			const mediaObject: PickerImage | PickerImage[] = await ImagePicker.openPicker({
				cropping: false,
				mediaType: 'any',
			});
			this.addNewMediaObject(mediaObject as PickerImage);
		} catch (ex) {
			console.log(ex);
		}
	};

	private takeCameraPhoto = async () => {
		try {
			const mediaObject: PickerImage | PickerImage[] = await ImagePicker.openCamera({
				cropping: false,
				mediaType: 'any',
				useFrontCamera: false,
			});
			this.addNewMediaObject(mediaObject as PickerImage);
		} catch (ex) {
			console.log(ex);
		}
	};

	private addNewMediaObject = async (mediaObject: PickerImage) => {
		const {mediaObjects} = this.state;

		// if mediaObject is an image, upload 2 media files
		// 1) original
		// 2) optimized
		// and append the id parameter:
		// id: 0 => original
		// id: 1 => optimized
		// otherwise upload a single file -> video
		const onProgress = (progress: any, id?: any) => {
			console.log('progress:', progress, id);
			this.setState({
				uploadProgress: Math.round(progress),
			});
		};

		const onStart = () => {
			console.log('started uploading');
			this.setState({
				isUploading: true,
			});
		};

		const onError = (err: any, id?: any) => {
			// handle errors here?
			console.log('upload err:', err, id);
			this.setState({
				isUploading: false,
			});
		};

		const onPicturesCompleted = (data: Array<{index: number; data: {responseCode: number; responseBody: any}}>) => {
			const localMediaObject: MediaObject = {
				path: (mediaObject as PickerImage).path,
				content: null,
				contentOptimized: null,
			};

			for (let i = 0; i < data.length; i++) {
				const current = data[i];
				if (current.index === 0) {
					localMediaObject.content = JSON.parse(current.data.responseBody);
				} else {
					localMediaObject.contentOptimized = JSON.parse(current.data.responseBody);
				}
			}
			this.setState({
				mediaObjects: [...mediaObjects, localMediaObject],
				isUploading: false,
			});
		};

		const onVideoCompleted = (data: {responseCode: number; responseBody: any}) => {
			const localMediaObject: MediaObject = {
				path: (mediaObject as PickerImage).path,
				content: JSON.parse(data.responseBody),
				contentOptimized: null,
			};

			this.setState({
				mediaObjects: [...mediaObjects, localMediaObject],
				isUploading: false,
			});
		};

		try {
			const mediaPath = mediaObject.path.replace('file://', '');
			let imageOptimizedPath = null;

			if (mediaObject.mime.startsWith(MediaTypeImage.key)) {
				const optimized = await ImageResizer.createResizedImage(
					mediaObject.path,
					mediaObject.width,
					mediaObject.height,
					'JPEG',
					50,
				);
				imageOptimizedPath = optimized.path;

				console.log([mediaPath, imageOptimizedPath]);
				await addFilesBN([mediaPath, imageOptimizedPath], onStart, onProgress, onError, onPicturesCompleted);
			} else {
				// video
				await addFileBN(mediaPath, onStart, onProgress, onError, onVideoCompleted);
			}
		} catch (ex) {
			console.log(ex);
		}
	};

	private renderPostMediaObjects = () => [
		...this.state.mediaObjects.map((mediaObject: MediaObject, index) => (
			<MediaObjectViewer key={index} uri={mediaObject.path} style={style.mediaObject} thumbOnly={true} />
		)),
		...(this.state.isUploading
			? [
					(
						<View key={this.state.mediaObjects.length} style={[style.mediaObject, style.mediaUploadingPlaceholder]}>
							<ActivityIndicator size={'large'} color={Colors.pink} />
							<Text style={style.progressText}>{this.state.uploadProgress + ' %'}</Text>
						</View>
					),
			] : []),
	]

	private sendPostHandler = () => {
		const escapedText = this.state.postText.replace(/\n/g, '\\n');
		const wallPostData: NewWallPostData = {
			text: escapedText,
			mediaObjects: this.state.mediaObjects,
		};
		this.props.navigation.state.params.postCreate(wallPostData);
		this.props.navigation.goBack(null);
	};

	private updatePostText = (text: string) => {
		this.setState({postText: text});
	};
}
