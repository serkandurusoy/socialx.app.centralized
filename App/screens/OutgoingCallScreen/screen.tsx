import React, {Component} from 'react';
import {View} from 'react-native';

import {Icons} from 'theme';
import {CallType, IUserQuery} from 'types';
import {VideoCallScreen} from './VideoCallScreen';
import {VoiceCallScreen} from './VoiceCallScreen';

interface IOutgoingCallComponentProps {
	user: IUserQuery;
	onCallCancel: () => void;
	onMicrophoneToggle: (on: boolean) => void;
	onSoundToggle: (on: boolean) => void;
	onCameraToggle: (on: boolean) => void;
	onCameraSwitch: () => void;
	callStartTime: Date | null;
	mode: CallType;
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

	private voiceScreenRef: VoiceCallScreen | null = null;

	public shouldComponentUpdate(
		nextProps: Readonly<IOutgoingCallComponentProps>,
		nextState: Readonly<IOutgoingCallComponentState>,
	): boolean {
		if (nextProps.callStartTime !== this.props.callStartTime) {
			if (this.voiceScreenRef) {
				this.voiceScreenRef.stopAnimation();
			}
			this.updateConversationTime();
			setInterval(this.updateConversationTime, 1000);
		}
		return true;
	}

	public render() {
		return (
			<View style={{flex: 1}}>
				<VoiceCallScreen
					ref={(ref) => (this.voiceScreenRef = ref)}
					user={this.props.user}
					onCallCancel={this.props.onCallCancel}
					onMicrophoneToggle={this.onMicrophoneToggleHandler}
					onSoundToggle={this.onSoundToggleHandler}
					onCameraToggle={this.onCameraToggleHandler}
					callStartTime={this.props.callStartTime}
					currentCallTime={this.state.currentCallTime}
					microphoneIconSource={this.getMicrophoneIconSource()}
					soundIconSource={this.getSoundIconSource()}
					cameraIconSource={this.getCameraIconSource()}
				/>
				{this.props.mode === CallType.Video && (
					<View style={{height: '100%', position: 'absolute', width: '100%'}}>
						<VideoCallScreen
							user={this.props.user}
							onCameraSwitch={this.props.onCameraSwitch}
							onCallCancel={this.props.onCallCancel}
							onMicrophoneToggle={this.onMicrophoneToggleHandler}
							onCameraToggle={this.onCameraToggleHandler}
							callStartTime={this.props.callStartTime}
							currentCallTime={this.state.currentCallTime}
							microphoneIconSource={this.getMicrophoneIconSource()}
							cameraIconSource={this.getCameraIconSource()}
						/>
					</View>
				)}
			</View>
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
}
