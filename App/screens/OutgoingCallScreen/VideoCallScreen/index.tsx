import moment from 'moment';
import React, {Component} from 'react';
import {Image, ImageRequireSource, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Icons} from 'theme';
import {IUserQuery} from 'types';
import style from './style';

interface IVideoCallScreenProps {
	user: IUserQuery;
	onCameraSwitch: () => void;
	onCallCancel: () => void;
	onMicrophoneToggle: () => void;
	onCameraToggle: () => void;
	callStartTime: Date | null;
	currentCallTime: Date | null;
	microphoneIconSource: ImageRequireSource;
	cameraIconSource: ImageRequireSource;
}

export class VideoCallScreen extends Component<IVideoCallScreenProps> {
	public render() {
		const {user} = this.props;

		return (
			<View style={style.container}>
				{user && (
					<SafeAreaView style={style.safeView}>
						<View style={style.safeAreaContent}>
							<View style={style.topContainer} />
							{this.renderCallButtons()}
						</View>
					</SafeAreaView>
				)}
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
