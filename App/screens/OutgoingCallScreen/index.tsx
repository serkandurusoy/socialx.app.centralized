import padStart from 'lodash/padStart';
import moment from 'moment';
import React, {Component} from 'react';
import {Platform} from 'react-native';
import WebRTC from 'react-native-webrtc';
import {NavigationScreenProp} from 'react-navigation';

import {userHoc} from 'backend/graphql';
import {LOCAL_VIDEO_STREAM, OS_TYPES} from 'consts';
import {CallType, CameraMode, IUserDataResponse} from 'types';
import {OutgoingCallComponent} from './screen';

const {
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView,
	MediaStream,
	MediaStreamTrack,
	getUserMedia,
} = WebRTC;

interface IOutgoingCallScreenProps {
	data: IUserDataResponse;
	navigation: NavigationScreenProp<any>;
}

interface IOutgoingCallScreenState {
	callMode: CallType;
	cameraInUse: CameraMode;
	selfVideoStreamSrc: string | null;
	callStartTime: Date | null;
	currentCallTime: Date | null;
}

class OutgoingCallScreen extends Component<IOutgoingCallScreenProps, IOutgoingCallScreenState> {
	public state = {
		callMode: CallType.Voice,
		cameraInUse: CameraMode.Front,
		selfVideoStreamSrc: null,
		callStartTime: null,
		currentCallTime: null,
	};

	private localVideoStream: any;
	private screenComponentRef: OutgoingCallComponent | null = null;

	public componentDidMount() {
		setTimeout(() => {
			this.stopDialingAnimation();
			this.setState({
				callStartTime: new Date(),
				currentCallTime: new Date(),
			});
			setInterval(this.updateConversationTime, 1000);
		}, 5000); // simulate call answer in 5 seconds
	}

	public render() {
		return (
			<OutgoingCallComponent
				ref={(ref) => (this.screenComponentRef = ref)}
				user={this.props.data.user}
				onCallCancel={this.onCallCancelHandler}
				onCameraToggle={this.onCameraToggleHandler}
				onCameraSwitch={this.onCameraSwitchHandler}
				onMicrophoneToggle={this.onMicrophoneToggleHandler}
				onSoundToggle={this.onSoundToggleHandler}
				callStartTime={this.state.callStartTime}
				currentCallTime={this.state.currentCallTime}
				selfVideoStreamSrc={this.state.selfVideoStreamSrc}
				callText={this.getCallText()}
				mode={this.state.callMode}
				// mode={CallType.Video}
			/>
		);
	}

	private onCallCancelHandler = () => {
		// TODO: other cleaning stuff to stop the outgoing call!
		this.props.navigation.goBack();
	}

	private onCameraToggleHandler = () => {
		// TODO: other stuff to switch from voice to video call and back
		const newCallMode = this.state.callMode === CallType.Voice ? CallType.Video : CallType.Voice;
		if (newCallMode === CallType.Voice) {
			// canceling video call going to voice only mode
			if (this.localVideoStream) {
				this.localVideoStream.release();
				this.localVideoStream = null;
			}
		} else if (newCallMode === CallType.Video) {
			// entering video call mode
			this.getLocalStream(CameraMode.Front, (stream: any) => {
				this.setState({
					selfVideoStreamSrc: stream.toURL(),
					cameraInUse: CameraMode.Front,
				});
			});
		}
		this.setState({
			callMode: newCallMode,
		});
	}

	private onMicrophoneToggleHandler = (on: boolean) => {
		// console.log('TODO: onMicrophoneToggleHandler ' + on);
	}

	private onSoundToggleHandler = (on: boolean) => {
		// console.log('TODO: onSoundToggleHandler ' + on);
	}

	private onCameraSwitchHandler = () => {
		const newCameraInUse = this.state.cameraInUse === CameraMode.Front ? CameraMode.Back : CameraMode.Front;
		this.getLocalStream(newCameraInUse, (stream: any) => {
			this.setState({
				selfVideoStreamSrc: stream.toURL(),
				cameraInUse: newCameraInUse,
			});
		});
	}

	private async getLocalStream(cameraInUse: CameraMode, callback: any) {
		const isFront = cameraInUse === CameraMode.Front;
		let videoSourceId;
		// on android, you don't have to specify sourceId manually, just use facingMode
		if (Platform.OS === OS_TYPES.IOS) {
			const streamTrackSources = await MediaStreamTrack.getSources();
			for (let i = 0; i < streamTrackSources.length; i++) {
				const sourceInfo = streamTrackSources[i];
				if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
					videoSourceId = sourceInfo.id;
				}
			}
		}
		// console.log('getUserMedia START');
		getUserMedia(
			{
				audio: true,
				video: {
					mandatory: {
						minWidth: LOCAL_VIDEO_STREAM.width,
						minHeight: LOCAL_VIDEO_STREAM.height,
						minFrameRate: LOCAL_VIDEO_STREAM.frameRate,
					},
					facingMode: cameraInUse,
					optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
				},
			},
			(stream: any) => {
				// console.log('getUserMedia success', stream);
				if (this.localVideoStream) {
					this.localVideoStream.release();
				}
				this.localVideoStream = stream;
				callback(stream);
			},
			(error: any) => {
				console.log('getUserMedia error', error);
			},
		);
	}

	private updateConversationTime = () => {
		this.setState({
			currentCallTime: new Date(),
		});
	}

	private getCallText = () => {
		let callText = 'Calling...';
		if (this.state.callStartTime !== null && this.state.currentCallTime !== null) {
			const startMoment = this.state.callStartTime.getTime();
			const momentNow = this.state.currentCallTime.getTime();
			const callDuration = moment.duration(momentNow - startMoment, 'milliseconds');
			const seconds = padStart(Math.floor(callDuration.asSeconds() % 60).toString(), 2, '0');
			const minutes = Math.floor(callDuration.asMinutes()).toString();
			callText = `${minutes}:${seconds}`;
		}
		return callText.toUpperCase();
	}

	private stopDialingAnimation = () => {
		if (this.screenComponentRef && this.screenComponentRef.voiceScreenRef) {
			this.screenComponentRef.voiceScreenRef.stopAnimation();
		}
	}
}

const userDataWrapper = userHoc(OutgoingCallScreen); // TODO: user should be sent via nav params!
export default userDataWrapper;
