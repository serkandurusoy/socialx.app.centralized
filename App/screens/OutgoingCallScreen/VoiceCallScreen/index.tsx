import moment from 'moment';
import React, {Component} from 'react';
import {Animated, Image, ImageRequireSource, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from 'theme';
import {IUserQuery} from 'types';
import {getUserAvatar, getUserFullName} from 'utilities';
import style from './style';

const ANIMATION_INTERVAL = 1000;
const PULSE_MIN_SIZE = Sizes.smartHorizontalScale(155);
const PULSE_MAX_SIZE = Sizes.smartHorizontalScale(250);
const PULSE_MAX_OPACITY = 0.5;
const PULSE_MIN_OPACITY = 0.01;

interface IVoiceCallScreenProps {
	user: IUserQuery;
	onCallCancel: () => void;
	onMicrophoneToggle: () => void;
	onSoundToggle: () => void;
	onCameraToggle: () => void;
	callStartTime: Date | null;
	currentCallTime: Date | null;
	microphoneIconSource: ImageRequireSource;
	soundIconSource: ImageRequireSource;
	cameraIconSource: ImageRequireSource;
}

export class VoiceCallScreen extends Component<IVoiceCallScreenProps> {
	private pulseAnimation = new Animated.Value(0);
	private animationRef: Animated.CompositeAnimation | null = null;

	public componentDidMount() {
		this.pulseAnimation.setValue(0);
		const compositeAnimation = Animated.timing(this.pulseAnimation, {
			toValue: 1,
			duration: ANIMATION_INTERVAL,
		});
		this.animationRef = Animated.loop(compositeAnimation, {iterations: -1});
		this.animationRef.start();
	}

	public render() {
		const {user} = this.props;
		const fullName = getUserFullName(user);
		const avatarURL = getUserAvatar(user);

		return (
			<View style={{flex: 1}}>
				<LinearGradient
					start={{x: 0, y: 0.5}}
					end={{x: 1, y: 0.5}}
					colors={[Colors.fuchsiaBlue, Colors.pink]}
					style={style.backgroundView}
				/>
				{user && (
					<SafeAreaView style={style.safeView}>
						<View style={style.safeAreaContent}>
							<View style={style.topContainer}>
								<Text style={style.fullName}>{fullName}</Text>
								<Text style={style.callText}>{this.getCallText()}</Text>
								<View style={style.avatarContainer}>
									{this.renderPulsatingAnimation()}
									<Image source={{uri: avatarURL}} style={style.avatarPhoto} />
								</View>
								{this.renderCallButtons()}
							</View>
							{this.renderCancelButton()}
						</View>
					</SafeAreaView>
				)}
			</View>
		);
	}

	public stopAnimation = () => {
		if (this.animationRef) {
			this.pulseAnimation.setValue(0);
			this.animationRef.stop();
		}
	}

	private renderCallButtons = () => {
		return (
			<View style={style.callButtonsContainer}>
				{this.renderCallButton(this.props.microphoneIconSource, this.props.onMicrophoneToggle)}
				{this.renderCallButton(this.props.soundIconSource, this.props.onSoundToggle)}
				{this.renderCallButton(this.props.cameraIconSource, this.props.onCameraToggle)}
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

	private renderPulsatingAnimation = () => {
		const sizeValue = this.pulseAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [PULSE_MIN_SIZE, PULSE_MAX_SIZE],
		});

		const radiusValue = this.pulseAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [PULSE_MIN_SIZE / 2, PULSE_MAX_SIZE / 2],
		});

		const opacityValue = this.pulseAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [PULSE_MAX_OPACITY, PULSE_MIN_OPACITY],
		});

		const animatedStyles = {
			width: sizeValue,
			height: sizeValue,
			borderRadius: radiusValue,
			opacity: opacityValue,
		};

		return <Animated.View style={[style.avatarPulsing, animatedStyles]} />;
	}

	private renderCallButton = (iconSource: ImageRequireSource, handler: () => void) => {
		return (
			<TouchableOpacity style={style.callButton} onPress={handler}>
				<Image source={iconSource} />
			</TouchableOpacity>
		);
	}

	private getCallText = () => {
		let callText = 'Calling...';
		if (this.props.callStartTime !== null && this.props.currentCallTime !== null) {
			const startMoment = this.props.callStartTime.getTime();
			const momentNow = this.props.currentCallTime.getTime();
			const callDuration = moment.duration(momentNow - startMoment, 'milliseconds');
			const seconds = Math.floor(callDuration.asSeconds() % 60)
				.toString()
				.padStart(2, '0');
			const minutes = Math.floor(callDuration.asMinutes()).toString();
			callText = `${minutes}:${seconds}`;
		}
		return callText.toUpperCase();
	}
}
