import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';

import {userHoc} from 'backend/graphql';
import {CallType, CameraMode, IUserDataResponse} from 'types';
import {OutgoingCallComponent} from './screen';

interface IOutgoingCallScreenProps {
	data: IUserDataResponse;
	navigation: NavigationScreenProp<any>;
}

interface IOutgoingCallScreenState {
	callStartTime: Date | null;
	callMode: CallType;
	cameraInUse: CameraMode;
}

class OutgoingCallScreen extends Component<IOutgoingCallScreenProps, IOutgoingCallScreenState> {
	public state = {
		callStartTime: null,
		callMode: CallType.Voice,
		cameraInUse: CameraMode.Front,
	};

	public componentDidMount() {
		setTimeout(() => {
			this.setState({
				callStartTime: new Date(),
			});
		}, 5000); // simulate call answer in 5 seconds
	}

	public render() {
		return (
			<OutgoingCallComponent
				user={this.props.data.user}
				onCallCancel={this.onCallCancelHandler}
				onCameraToggle={this.onCameraToggleHandler}
				onCameraSwitch={this.onCameraSwitchHandler}
				onMicrophoneToggle={this.onMicrophoneToggleHandler}
				onSoundToggle={this.onSoundToggleHandler}
				callStartTime={this.state.callStartTime}
				// mode={this.state.callMode}
				mode={CallType.Video}
			/>
		);
	}

	private onCallCancelHandler = () => {
		// TODO: other cleaning stuff to stop the outgoing call!
		this.props.navigation.goBack();
	}

	private onCameraToggleHandler = (on: boolean) => {
		// TODO: other stuff to switch from voice to video call and back
		this.setState({
			callMode: on ? CallType.Video : CallType.Voice,
		});
	}

	private onMicrophoneToggleHandler = (on: boolean) => {
		console.log('TODO: onMicrophoneToggleHandler ' + on);
	}

	private onSoundToggleHandler = (on: boolean) => {
		console.log('TODO: onSoundToggleHandler ' + on);
	}

	private onCameraSwitchHandler = () => {
		const newCameraInUse = this.state.cameraInUse === CameraMode.Front ? CameraMode.Back : CameraMode.Front;
		console.log('TODO: onCameraSwitchHandler', newCameraInUse);
		this.setState({
			cameraInUse: newCameraInUse,
		});
	}
}

const userDataWrapper = userHoc(OutgoingCallScreen); // TODO: user should be sent via nav params!
export default userDataWrapper;
