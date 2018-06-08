import React, {Component} from 'react';
import {Animated, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from 'theme';
import {CallType, IUserQuery} from 'types';
import {getUserAvatar, getUserFullName} from 'utilities';
import style from './style';

interface IIncomingCallComponentProps {
	user: IUserQuery;
	callType: CallType;
	onCallAnswer: () => void;
	onCallReject: () => void;
}

const ANIMATION_INTERVAL = 1000;
const PULSE_MIN_SIZE = Sizes.smartHorizontalScale(155);
const PULSE_MAX_SIZE = Sizes.smartHorizontalScale(250);
const PULSE_MAX_OPACITY = 0.5;
const PULSE_MIN_OPACITY = 0.01;

export class IncomingCallComponent extends Component<IIncomingCallComponentProps> {
	private pulseAnimation = new Animated.Value(0);

	public componentDidMount() {
		this.pulseAnimation.setValue(0);
		const compositeAnimation = Animated.timing(this.pulseAnimation, {
			toValue: 1,
			duration: ANIMATION_INTERVAL,
		});
		Animated.loop(compositeAnimation, {iterations: -1}).start();
	}

	public render() {
		const {user, callType} = this.props;
		const callText = `Incoming ${callType} call...`;
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
								<Text style={style.callText}>{callText.toUpperCase()}</Text>
								<View style={style.avatarContainer}>
									{this.renderPulsatingAnimation()}
									<Image source={{uri: avatarURL}} style={style.avatarPhoto} />
								</View>
							</View>
							<View style={style.bottomButtons}>
								{this.renderRejectButton()}
								{this.renderAnswerButton()}
							</View>
						</View>
					</SafeAreaView>
				)}
			</View>
		);
	}

	private renderAnswerButton = () => {
		return (
			<TouchableOpacity style={[style.roundButton, style.answerButton]} onPress={this.props.onCallAnswer}>
				<Icon name={'md-call'} style={style.answerIcon} />
			</TouchableOpacity>
		);
	}

	private renderRejectButton = () => {
		return (
			<TouchableOpacity style={[style.roundButton, style.rejectButton]} onPress={this.props.onCallReject}>
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
}
