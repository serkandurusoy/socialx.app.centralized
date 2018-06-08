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
	onCameraToggle: () => void;
	onCameraSwitch: () => void;
	callStartTime: Date | null;
	mode: CallType;
	selfVideoStreamSrc: string | null;
	currentCallTime: Date | null;
	callText: string;
}

interface IOutgoingCallComponentState {
	soundOn: boolean;
	microphoneOn: boolean;
}

export class OutgoingCallComponent extends Component<IOutgoingCallComponentProps, IOutgoingCallComponentState> {
	public state = {
		soundOn: true,
		microphoneOn: true,
	};

	public voiceScreenRef: VoiceCallScreen | null = null;

	public render() {
		return (
			<View style={{flex: 1}}>
				<VoiceCallScreen
					ref={(ref) => (this.voiceScreenRef = ref)}
					user={this.props.user}
					onCallCancel={this.props.onCallCancel}
					onMicrophoneToggle={this.onMicrophoneToggleHandler}
					onSoundToggle={this.onSoundToggleHandler}
					onCameraToggle={this.props.onCameraToggle}
					callStartTime={this.props.callStartTime}
					currentCallTime={this.props.currentCallTime}
					microphoneIconSource={this.getMicrophoneIconSource()}
					soundIconSource={this.getSoundIconSource()}
					cameraIconSource={Icons.videoCallCameraOn}
					callText={this.props.callText}
				/>
				{this.props.mode === CallType.Video && (
					<View style={{height: '100%', position: 'absolute', width: '100%'}}>
						<VideoCallScreen
							onCameraSwitch={this.props.onCameraSwitch}
							onCallCancel={this.props.onCallCancel}
							onMicrophoneToggle={this.onMicrophoneToggleHandler}
							onCameraToggle={this.props.onCameraToggle}
							microphoneIconSource={this.getMicrophoneIconSource()}
							selfVideoStreamSrc={this.props.selfVideoStreamSrc}
							callText={this.props.callText}
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
}
