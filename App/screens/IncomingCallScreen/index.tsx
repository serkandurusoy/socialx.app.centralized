import React, {Component} from 'react';

import {userHoc} from 'backend/graphql';
import {CallType, IUserDataResponse} from 'types';
import {IncomingCallComponent} from './screen';

interface IIncomingCallScreenProps {
	data: IUserDataResponse;
}

class IncomingCallScreen extends Component<IIncomingCallScreenProps> {
	public render() {
		return (
			<IncomingCallComponent
				user={this.props.data.user}
				callType={CallType.Video}
				onCallAnswer={this.onCallAnswerHandler}
				onCallReject={this.onCallRejectHandler}
			/>
		);
	}

	private onCallAnswerHandler = () => {
		alert('TODO: onCallAnswerHandler');
	}

	private onCallRejectHandler = () => {
		alert('TODO: onCallRejectHandler');
	}
}

const userDataWrapper = userHoc(IncomingCallScreen); // TODO: update fetch user from incoming call
export default userDataWrapper;
