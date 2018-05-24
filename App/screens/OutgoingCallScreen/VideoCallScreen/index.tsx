import React, {Component} from 'react';
import {Image, ImageRequireSource, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WebRTC from 'react-native-webrtc';

import {Icons} from 'theme';
import style from './style';

interface IVideoCallScreenProps {
	onCameraSwitch: () => void;
	onCallCancel: () => void;
	onMicrophoneToggle: () => void;
	onCameraToggle: () => void;
	microphoneIconSource: ImageRequireSource;
	selfVideoStreamSrc: string | null;
	callText: string;
}

export class VideoCallScreen extends Component<IVideoCallScreenProps> {
	public render() {
		return (
			<View style={style.container}>
				{this.props.selfVideoStreamSrc && (
					<WebRTC.RTCView streamURL={this.props.selfVideoStreamSrc} style={style.localCameraView} />
				)}
				<SafeAreaView style={style.safeView}>
					<View style={style.safeAreaContent}>
						<View style={style.topContainer}>
							<View style={style.cameraToggleContainer}>
								{this.renderCallButton(Icons.videoCallCameraOff, this.props.onCameraToggle)}
							</View>
						</View>
						{this.renderCallButtons()}
						<Text style={style.callText}>{this.props.callText}</Text>
					</View>
				</SafeAreaView>
			</View>
		);
	}

	private renderCallButtons = () => {
		return (
			<View style={style.callButtonsContainer}>
				{this.renderCallButton(Icons.videoCallCameraSwap, this.props.onCameraSwitch)}
				{this.renderCancelButton()}
				{this.renderCallButton(this.props.microphoneIconSource, this.props.onMicrophoneToggle)}
			</View>
		);
	}

	private renderCancelButton = () => {
		return (
			<TouchableOpacity style={style.rejectButton} onPress={this.props.onCallCancel}>
				<Icon name={'md-call'} style={style.rejectIcon} />
			</TouchableOpacity>
		);
	}

	private renderCallButton = (iconSource: ImageRequireSource, handler: () => void) => {
		return (
			<TouchableOpacity style={style.callButton} onPress={handler}>
				<Image source={iconSource} />
			</TouchableOpacity>
		);
	}
}
