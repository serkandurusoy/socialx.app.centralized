// Base ManagedModal, a wrapper for Modal in 'react-native'

import React from 'react';
import {Keyboard, Modal, Platform} from 'react-native';
import {OS_TYPES} from '../../constants';
import {ModalManager} from './manager';

interface IManagedModalProps {
	afterDismiss?: () => void;
	visible: boolean;
}

export class BaseModalWithManagedTransitions extends React.Component<IManagedModalProps> {
	public static getDerivedStateFromProps(nextProps: IManagedModalProps) {
		if (nextProps.visible) {
			ModalManager.toggleModalShow(true);
		} else if (Platform.OS === OS_TYPES.Android) {
			// for Android toggling visible attribute is best way to know when a modal is hidden. No transition issues!
			BaseModalWithManagedTransitions.runAfterDismiss(nextProps);
		}
		return null;
	}

	private static runAfterDismiss(props: IManagedModalProps) {
		ModalManager.toggleModalShow(false);
		if (props.afterDismiss) {
			props.afterDismiss();
		}
	}

	public state = {};

	public render() {
		return <Modal onDismiss={this.onDismiss} {...this.props} />;
	}

	private onDismiss = () => {
		// this is only called only on iOS
		BaseModalWithManagedTransitions.runAfterDismiss(this.props);
	}
}
