import React from 'react';
import {ActivityIndicator, ConnectionInfo, ConnectionType, NetInfo, SafeAreaView, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {IManagedModal} from 'hoc';
import {withManagedTransitions} from 'hoc/ManagedModal';
import {Colors} from 'theme';
import style from './style';

const CONNECTION_EVENT_NAME = 'connectionChange';

export interface IOfflineOverlayProps extends IManagedModal {}

class OfflineOverlayComponent extends React.Component<IOfflineOverlayProps> {
	public state = {
		offline: false,
	};

	public componentDidMount(): void {
		NetInfo.getConnectionInfo().then(this.connectionStatusUpdated);
		NetInfo.addEventListener(CONNECTION_EVENT_NAME, this.connectionStatusUpdated);
	}

	public componentWillUnmount(): void {
		NetInfo.removeEventListener(CONNECTION_EVENT_NAME, this.connectionStatusUpdated);
	}

	public render() {
		return (
			<Modal
				onDismiss={this.props.onDismiss}
				onModalHide={this.props.onModalHide}
				isVisible={this.state.offline}
				backdropOpacity={0.2}
				animationIn={'slideInDown'}
				animationOut={'slideOutUp'}
				style={style.container}
			>
				<SafeAreaView>
					<View style={style.boxContainer}>
						<ActivityIndicator size={'small'} color={Colors.white} />
						<Text style={style.message}>{'Offline. Waiting for connection..'}</Text>
					</View>
				</SafeAreaView>
			</Modal>
		);
	}

	private connectionStatusUpdated = (connectionInfo: ConnectionInfo | ConnectionType) => {
		connectionInfo = connectionInfo as ConnectionInfo;
		const isOffline = connectionInfo.type === 'none' || connectionInfo.type === 'unknown';
		this.setState({
			offline: isOffline,
		});
	}
}

export const OfflineOverlay = withManagedTransitions(OfflineOverlayComponent);
