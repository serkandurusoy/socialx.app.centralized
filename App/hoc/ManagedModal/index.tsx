// ManagedModal

import React from 'react';
import {Keyboard, Platform, View} from 'react-native';
import {OS_TYPES} from '../../constants';
import {ModalManager} from './manager';

interface IManagedModal {
	afterDismiss?: () => void;
	visiblePropName: string;
}

export const withManagedTransitions = (CustomModal: any) => {
	return class extends React.Component<IManagedModal> {
		public static getDerivedStateFromProps(nextProps: IManagedModal) {
			const visiblePropName = nextProps.visiblePropName;
			if (nextProps[visiblePropName]) {
				ModalManager.toggleModalShow(true);
			}
			return null;
		}

		private static defaultProps: Partial<IManagedModal> = {
			visiblePropName: 'visible',
		};

		public state = {};

		public render() {
			return <CustomModal {...this.props} onDismiss={this.onDismiss} onModalHide={this.onModalHide} />;
		}

		private onDismiss = () => {
			if (Platform.OS === OS_TYPES.iOS) {
				this.runAfterDismiss();
			}
		}

		private onModalHide = () => {
			if (Platform.OS === OS_TYPES.Android) {
				this.runAfterDismiss();
			}
		}

		private runAfterDismiss = () => {
			ModalManager.toggleModalShow(false);
			if (this.props.afterDismiss) {
				this.props.afterDismiss();
			}
		}
	};
};
