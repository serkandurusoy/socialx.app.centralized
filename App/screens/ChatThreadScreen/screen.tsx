import {ModalShareOptions} from 'components/Modals';
import {OS_TYPES} from 'consts';
import {ModalManager} from 'hoc/ManagedModal/manager';
import moment from 'moment';
import React, {Component} from 'react';
import {Alert, findNodeHandle, Image, PermissionsAndroid, Platform, Text, TouchableOpacity, View} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import ImagePicker, {Image as PickerImage} from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from 'theme';
import {isStringPureEmoji} from 'utilities';
import {requestResourcePermission} from 'utilities/permissions';
import uuidv4 from 'uuid/v4';
import {MessageData} from './index';
import style from './style';

interface IChatThreadScreenComponentProps {
	sendOwnMessage: (message: MessageData) => void;
	messages: MessageData[];
	loadEarlierMessages: () => void;
	isLoadingEarlier: boolean;
	hasMore: boolean;
	renderFooter: any;
	text: string;
	onTextChange: any;
}

interface IChatThreadScreenComponentState {
	modalVisible: boolean;
}

enum SHARE_OPTIONS {
	Wallet = 'Wallet',
	Camera = 'Camera',
	Media = 'Media',
	Audio = 'Audio',
	Location = 'Location',
	Contact = 'Contact',
}

const MESSAGE_MAX_WIDTH = '60%';
const REQUEST_LOCATION_TITLE = 'Location access request';
const REQUEST_LOCATION_MESSAGE =
	'In order to share your location with friends please allow the app' + ' to read your device location.';
const LOCATION_ACCESS_DENIED = 'Location access was denied';

export default class ChatThreadScreenComponent extends Component<
	IChatThreadScreenComponentProps,
	IChatThreadScreenComponentState
> {
	public state = {
		modalVisible: false,
	};

	private giftedChat: any;

	public componentDidMount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustResize();
		}
	}

	public componentWillUnmount(): void {
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		return (
			<View style={style.container}>
				<ModalShareOptions
					visible={this.state.modalVisible}
					closeHandler={this.toggleShareOptionsModal}
					walletHandlerPressed={() => this.onShareButtonPressed(SHARE_OPTIONS.Wallet)}
					cameraHandlerPressed={() => this.onShareButtonPressed(SHARE_OPTIONS.Camera)}
					mediaHandlerPressed={() => this.onShareButtonPressed(SHARE_OPTIONS.Media)}
					audioHandlerPressed={() => this.onShareButtonPressed(SHARE_OPTIONS.Audio)}
					locationHandlerPressed={() => this.onShareButtonPressed(SHARE_OPTIONS.Location)}
					contactHandlerPressed={() => this.onShareButtonPressed(SHARE_OPTIONS.Contact)}
				/>
				<GiftedChat
					ref={(chatRef: any) => (this.giftedChat = chatRef)}
					messages={this.props.messages}
					onSend={this.addOwnMessage}
					isAnimated={false}
					renderMessage={this.renderMessage}
					textInputStyle={style.textInputStyles}
					containerStyle={style.inputContainer}
					renderSend={this.renderSendButton}
					renderActions={this.renderShareButton}
					loadEarlier={this.props.hasMore}
					onLoadEarlier={this.props.loadEarlierMessages}
					isLoadingEarlier={this.props.isLoadingEarlier}
					text={this.props.text}
					onInputTextChanged={this.props.onTextChange}
					renderFooter={this.props.renderFooter} // can be used for something like typing
				/>
			</View>
		);
	}

	private addOwnMessage = (newMessages: MessageData[] = []) => {
		newMessages[0].ownMessage = true;
		this.props.sendOwnMessage(newMessages[0]);
	}

	private renderText = (text: string) => {

	}

	private renderMessage = (props: any) => {
		const currentMessage: MessageData = props.currentMessage;
		const messageDateWithFormat = moment(currentMessage.createdAt).format('hh:mm A');
		if (currentMessage.ownMessage) {
			return this.renderOwnMessage(currentMessage, messageDateWithFormat);
		} else {
			return this.renderFriendMessage(currentMessage, messageDateWithFormat);
		}
	}

	private renderOwnMessage = (currentMessage: MessageData, messageDateWithFormat: string) => {
		const messageContent = this.renderMessageContent(currentMessage, style.ownMessageText);
		const shadowStyles = [style.ownMessageShadow];
		shadowStyles.push(currentMessage.imageURL ? {width: MESSAGE_MAX_WIDTH} : {maxWidth: MESSAGE_MAX_WIDTH});
		return (
			<View style={style.messageContainer}>
				<View style={{flex: 1}} />
				<View style={shadowStyles}>
					<LinearGradient
						start={{x: 0, y: 0.5}}
						end={{x: 1, y: 0.5}}
						colors={[Colors.fuchsiaBlue, Colors.pink]}
						style={style.ownMessageGradient}
					>
						{messageContent}
						<Text style={style.ownMessageDate}>{messageDateWithFormat}</Text>
					</LinearGradient>
				</View>
			</View>
		);
	}

	private renderFriendMessage = (currentMessage: MessageData, messageDateWithFormat: string) => {
		const messageContent = this.renderMessageContent(currentMessage, style.friendMessageText);
		const borderStyles = [style.friendMessageBorder];
		borderStyles.push(currentMessage.imageURL ? {width: MESSAGE_MAX_WIDTH} : {maxWidth: MESSAGE_MAX_WIDTH});
		return (
			<View style={style.messageContainer}>
				<View style={borderStyles}>
					{messageContent}
					<Text style={style.friendMessageDate}>{messageDateWithFormat}</Text>
				</View>
				<View style={{flex: 1}} />
			</View>
		);
	}

	private renderMessageContent = (currentMessage: MessageData, textStyle: number) => {
		if (currentMessage.text) {
			const isTextPureEmoji = isStringPureEmoji(currentMessage.text);
			const textStyleUpdated = isTextPureEmoji ? style.pureEmojiText : textStyle;
			return (
				<Text style={textStyleUpdated} selectable={true}>
					{currentMessage.text}
				</Text>
			);
		} else if (currentMessage.imageURL) {
			return <Image source={{uri: currentMessage.imageURL}} style={style.chatImage} resizeMode={'cover'} />;
		} else if (currentMessage.geolocation) {
			return (
				<Text style={textStyle} selectable={true}>
					{'My location:\n'}
					{currentMessage.geolocation.latitude}
					{', '}
					{currentMessage.geolocation.longitude}
				</Text>
			);
		}
		return null;
	}

	private renderSendButton = (props: any) => {
		return (
			<Send {...props} containerStyle={style.sendContainer}>
				<Icon name={'md-send'} size={Sizes.smartHorizontalScale(30)} color={Colors.fuchsiaBlue} />
			</Send>
		);
	}

	private renderShareButton = () => {
		return (
			<TouchableOpacity style={style.shareButton} onPress={this.toggleShareOptionsModal}>
				<Icon name={'md-add'} size={Sizes.smartHorizontalScale(30)} color={Colors.tundora} />
			</TouchableOpacity>
		);
	}

	private toggleShareOptionsModal = () => {
		this.setState({
			modalVisible: !this.state.modalVisible,
		});
	}

	private onShareButtonPressed = (selectedOption: SHARE_OPTIONS) => {
		this.toggleShareOptionsModal();
		if (selectedOption === SHARE_OPTIONS.Media) {
			ModalManager.safeRunAfterModalClosed(this.showGalleryPhotoPicker);
		} else if (selectedOption === SHARE_OPTIONS.Camera) {
			ModalManager.safeRunAfterModalClosed(this.takeCameraPhoto);
		} else if (selectedOption === SHARE_OPTIONS.Location) {
			ModalManager.safeRunAfterModalClosed(this.shareMyCurrentPosition);
		} else {
			ModalManager.safeRunAfterModalClosed(this.shareOptionNotImplementedHandler);
		}
	}

	private showGalleryPhotoPicker = async () => {
		const image: PickerImage | PickerImage[] = await ImagePicker.openPicker({
			cropping: false,
			mediaType: 'photo',
			includeBase64: false, // picker is getting really slow with this option!
		});
		this.sendPhotoMessage(image);
	}

	private takeCameraPhoto = async () => {
		const image: PickerImage | PickerImage[] = await ImagePicker.openCamera({
			cropping: false,
			mediaType: 'photo',
			includeBase64: false,
		});
		this.sendPhotoMessage(image);
	}

	private sendPhotoMessage = (image: PickerImage | PickerImage[]) => {
		const pickImage = image as PickerImage;
		// const base64Image = `data:${pickImage.mime};base64,${pickImage.data}`;
		const newImageMessage: MessageData = {
			_id: uuidv4(),
			imageURL: 'file://' + pickImage.path,
			createdAt: new Date(),
			ownMessage: true,
			// base64Image,
		};
		this.props.sendOwnMessage(newImageMessage);
		this.giftedChat.scrollToBottom();
	}

	private shareOptionNotImplementedHandler = () => {
		alert('Share option TBD');
	}

	private shareMyCurrentPosition = () => {
		// TODO: 1. check why location high accuracy does not work on Android?
		// 2. handle the case when device location is turned off,
		// see https://github.com/webyonet/react-native-android-location-services-dialog-box
		const locationHighAccuracyEnabled = Platform.OS === OS_TYPES.IOS;
		requestResourcePermission(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			REQUEST_LOCATION_TITLE,
			REQUEST_LOCATION_MESSAGE,
		).then((permissionResult: boolean) => {
			if (permissionResult) {
				navigator.geolocation.getCurrentPosition(
					(position: Position) => {
						const newLocationMessage: MessageData = {
							_id: uuidv4(),
							createdAt: new Date(),
							ownMessage: true,
							geolocation: {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
							},
						};
						this.props.sendOwnMessage(newLocationMessage);
						this.giftedChat.scrollToBottom();
					},
					(error: PositionError) => {
						Alert.alert('Position error', error.message);
					},
					{enableHighAccuracy: locationHighAccuracyEnabled, timeout: 20000},
				);
			} else {
				Alert.alert(LOCATION_ACCESS_DENIED);
			}
		});
	}
}
