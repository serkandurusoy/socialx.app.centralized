import React from 'react';
import {Keyboard, View} from 'react-native';

export interface IWithResizeOnKeyboardShowProps {
	marginBottom: number;
	safeRunAfterKeyboardHide: (handler: () => void) => void;
}

export const withResizeOnKeyboardShow = (BaseComponent: any) => {
	return class extends React.Component {
		public state = {
			marginBottom: 0,
			isHidden: false,
		};

		private onHideHandlers: Array<() => void> = [];

		private keyboardDidShowListener: any;
		private keyboardDidHideListener: any;

		public componentDidMount() {
			this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
			this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
		}

		public componentWillUnmount() {
			this.keyboardDidShowListener.remove();
			this.keyboardDidHideListener.remove();
		}

		public render() {
			return (
				<BaseComponent
					{...this.props}
					marginBottom={this.state.marginBottom}
					safeRunAfterKeyboardHide={this.safeRunAfterKeyboardHideHandler}
				/>
			);
		}

		private keyboardDidShow = (event: any) => {
			this.setState({
				isHidden: false,
				marginBottom: event.endCoordinates.height,
			});
		}

		private keyboardDidHide = () => {
			this.setState({
				isHidden: true,
				marginBottom: 0,
			});
			this.onHideHandlers.forEach((handler) => {
				handler();
			});
			this.onHideHandlers = [];
		}

		private safeRunAfterKeyboardHideHandler = (handler: () => void) => {
			if (this.state.isHidden) {
				handler(); // Keyboard is already hidden run the handler right away
			} else {
				this.onHideHandlers.push(handler); // Added handler to run after keyboard hide
			}
		}
	};
};
