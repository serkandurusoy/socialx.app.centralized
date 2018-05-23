import moment from 'moment';
import React, {Component} from 'react';
import {Animated, Image, ImageRequireSource, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Icons, Sizes} from 'theme';
import {IUserQuery} from 'types';
import {getUserAvatar, getUserFullName} from 'utilities';
import style from './style';

const ANIMATION_INTERVAL = 1000;
const PULSE_MIN_SIZE = Sizes.smartHorizontalScale(155);
const PULSE_MAX_SIZE = Sizes.smartHorizontalScale(250);
const PULSE_MAX_OPACITY = 0.5;
const PULSE_MIN_OPACITY = 0.01;

interface IOutgoingCallComponentProps {
	user: IUserQuery;
	onCallCancel: () => void;
	onMicrophoneToggle: (on: boolean) => void;
	onSoundToggle: (on: boolean) => void;
	onCameraToggle: (on: boolean) => void;
	callStartTime: Date | null;
}

interface IOutgoingCallComponentState {
	soundOn: boolean;
	microphoneOn: boolean;
	cameraOn: boolean;
	currentCallTime: Date | null;
}

export class OutgoingCallComponent extends Component<IOutgoingCallComponentProps, IOutgoingCallComponentState> {
	public state = {
		soundOn: true,
		microphoneOn: true,
		cameraOn: false,
		currentCallTime: null,
	};

	private pulseAnimation = new Animated.Value(0);
	private animationRef: Animated.CompositeAnimation | null = null;

	public shouldComponentUpdate(
		nextProps: Readonly<IOutgoingCallComponentProps>,
		nextState: Readonly<IOutgoingCallComponentState>,
	): boolean {
		if (nextProps.callStartTime !== this.props.callStartTime) {
			this.updateConversationTime();
			if (this.animationRef) {
				this.pulseAnimation.setValue(0);
				this.animationRef.stop();
			}
			setInterval(this.updateConversationTime, 1000);
		}
		return true;
	}

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
								<View style={style.callButtonsContainer}>
									{this.renderCallButton(this.getMicrophoneIconSource(), this.onMicrophoneToggleHandler)}
									{this.renderCallButton(this.getSoundIconSource(), this.onSoundToggleHandler)}
									{this.renderCallButton(this.getCameraIconSource(), this.onCameraToggleHandler)}
								</View>
							</View>
							{this.renderCancelButton()}
						</View>
					</SafeAreaView>
				)}
			</View>
		);
	}

	private renderCancelButton = () => {
		return (
			<TouchableOpacity style={[style.roundButton, style.rejectButton]} onPress={this.props.onCallCancel}>
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

	private getMicrophoneIconSource = () => {
		return this.state.microphoneOn ? Icons.videoCallMicrophoneOn : Icons.videoCallMicrophoneOff;
	}

	private onMicrophoneToggleHandler = () => {
		const newState = !this.state.microphoneOn;
		this.setState({
			microphoneOn: newState,
		});
		this.props.onMicrophoneToggle(newState);
	}

	private getSoundIconSource = () => {
		return this.state.soundOn ? Icons.videoCallSoundOn : Icons.videoCallSoundOff;
	}

	private onSoundToggleHandler = () => {
		const newState = !this.state.soundOn;
		this.setState({
			soundOn: newState,
		});
		this.props.onSoundToggle(newState);
	}

	private getCameraIconSource = () => {
		return this.state.cameraOn ? Icons.videoCallCameraOn : Icons.videoCallCameraOff;
	}

	private onCameraToggleHandler = () => {
		const newState = !this.state.cameraOn;
		this.setState({
			cameraOn: newState,
		});
		this.props.onCameraToggle(newState);
	}

	private updateConversationTime = () => {
		this.setState({
			currentCallTime: new Date(),
		});
	}

	private getCallText = () => {
		let callText = 'Calling...';
		if (this.props.callStartTime !== null && this.state.currentCallTime !== null) {
			const startMoment = this.props.callStartTime.getTime();
			const momentNow = this.state.currentCallTime.getTime();
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
