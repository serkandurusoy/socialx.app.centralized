import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {ModalCloseButton} from 'components';
import {MediaTypeImage} from 'types';
import {
	getCameraMediaObject,
	getGalleryMediaObject,
	IWithTranslationProps,
	PickerImage,
	withTranslations,
} from 'utilities';
import {addFileBN, addFilesBN} from 'utilities/ipfs';
import {NewWallPostScreenComponent} from './screen';

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

interface INewWallPostScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
}

interface INewWallPostScreenState {
	mediaObjects: MediaObject[];
	isUploading: boolean;
	uploadProgress: number;
	shareText: string;
}

class NewWallPostScreenInt extends Component<INewWallPostScreenProps, INewWallPostScreenState> {
	private static navigationOptions = (props: INewWallPostScreenProps) => ({
		title: props.navigationOptions.getText('new.wall.post.screen.title'),
		headerRight: <ModalCloseButton navigation={props.navigation} />,
		headerLeft: <View />,
	});

	public state = {
		mediaObjects: [],
		isUploading: false,
		uploadProgress: 0,
		shareText: '',
	};

	public render() {
		const {navigation} = this.props;
		const {isUploading, shareText, mediaObjects, uploadProgress} = this.state;
		const {avatarImage} = navigation.state.params;
		return (
			<NewWallPostScreenComponent
				avatarImage={avatarImage}
				shareText={shareText}
				isUploading={isUploading}
				mediaObjects={mediaObjects}
				uploadProgress={uploadProgress}
				onShareTextUpdate={this.onShareTextUpdateHandler}
				onAddMedia={this.onAddMediaHandler}
				onPostSend={this.onPostSendHandler}
			/>
		);
	}

	private onShareTextUpdateHandler = (value: string) => {
		this.setState({
			shareText: value,
		});
	};

	private onAddMediaHandler = () => {
		const {getText} = this.props;
		ActionSheet.show(
			{
				options: [
					getText('new.wall.post.screen.menu.pick.from.gallery'),
					getText('new.wall.post.screen.menu.take.photo'),
					getText('button.CANCEL'),
				],
				cancelButtonIndex: 2,
				title: getText('new.wall.post.screen.menu.title'),
			},
			async (buttonIndex: number) => {
				switch (buttonIndex) {
					case 0:
						const galleryMediaObject = await getGalleryMediaObject();
						this.addNewMediaObject(galleryMediaObject);
						break;
					case 1:
						const cameraMediaObject = await getCameraMediaObject();
						this.addNewMediaObject(cameraMediaObject);
						break;
				}
			},
		);
	};

	private addNewMediaObject = async (mediaObject: PickerImage | undefined) => {
		// TODO: @Serkan -> some hints to refactor this very big method?
		if (!mediaObject) {
			return;
		}

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
			const mediaPath = mediaObject.path;
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

	private onPostSendHandler = () => {
		const {mediaObjects, shareText} = this.state;
		const {navigation, getText} = this.props;
		if (mediaObjects.length < 1 && !shareText) {
			Alert.alert(
				getText('new.wall.post.screen.post.not.allowed.title'),
				getText('new.wall.post.screen.post.not.allowed.message'),
			);
		} else {
			// TODO: get rid of replace in shareText after we sort out SOC-148
			const wallPostData: NewWallPostData = {
				text: shareText.replace(/\n/g, '\\n'),
				mediaObjects,
			};
			navigation.state.params.postCreate(wallPostData);
			navigation.goBack(null);
		}
	};
}

export const NewWallPostScreen = withTranslations(NewWallPostScreenInt);
