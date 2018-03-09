import React from 'react';
import {Keyboard, View} from 'react-native';

export const withResizeOnKeyboardShow = (BaseComponent: any) => {
	return class extends React.Component {
		public state = {
			marginBottom: 0,
		};

		private keyboardDidShowListener: any;
		private keyboardDidHideListener: any;

		public componentWillMount() {
			this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
			this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
		}

		public componentWillUnmount() {
			this.keyboardDidShowListener.remove();
			this.keyboardDidHideListener.remove();
		}

		public render() {
			return <BaseComponent {...this.props} marginBottom={this.state.marginBottom} />;
		}

		private keyboardDidShow = (event: any) => {
			this.setState({
				marginBottom: event.endCoordinates.height,
			});
		}

		private keyboardDidHide = () => {
			this.setState({
				marginBottom: 0,
			});
		}
	};
};
