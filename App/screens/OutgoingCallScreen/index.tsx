import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';

import {userHoc} from 'backend/graphql';
import {IUserDataResponse} from 'types';
import {OutgoingCallComponent} from './screen';

interface IOutgoingCallScreenProps {
	data: IUserDataResponse;
	navigation: NavigationScreenProp<any>;
}

interface IOutgoingCallScreenState {
	callStartTime: Date | null;
}

class OutgoingCallScreen extends Component<IOutgoingCallScreenProps, IOutgoingCallScreenState> {
	public state = {
		callStartTime: null,
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
				onMicrophoneToggle={this.onMicrophoneToggleHandler}
				onSoundToggle={this.onSoundToggleHandler}
				callStartTime={this.state.callStartTime}
			/>
		);
	}

	private onCallCancelHandler = () => {
		// TODO: other cleaning stuff to stop the outgoing call!
		this.props.navigation.goBack();
	}

	private onCameraToggleHandler = (on: boolean) => {
		// console.log('TODO: onCameraToggleHandler ' + on);
	}

	private onMicrophoneToggleHandler = (on: boolean) => {
		// console.log('TODO: onMicrophoneToggleHandler ' + on);
	}

	private onSoundToggleHandler = (on: boolean) => {
		// console.log('TODO: onSoundToggleHandler ' + on);
	}
}

const userDataWrapper = userHoc(OutgoingCallScreen); // TODO: user should be sent via nav params!
export default userDataWrapper;
