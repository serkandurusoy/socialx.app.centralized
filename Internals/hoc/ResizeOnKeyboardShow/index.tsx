import React from 'react';
import {Keyboard} from 'react-native';
import {hoistStatics} from 'recompose';

export interface IWithResizeOnKeyboardShowProps {
	marginBottom: number;
	safeRunAfterKeyboardHide: (handler: () => void) => void;
}

export const withResizeOnKeyboardShowInt = <P extends IWithResizeOnKeyboardShowProps>(
	BaseComponent: React.ComponentType<P>,
) => {
	return class extends React.Component<P> {
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
		};

		private keyboardDidHide = () => {
			this.setState({
				isHidden: true,
				marginBottom: 0,
			});
			// todo: @serkan @jake what???
			this.onHideHandlers.forEach((handler) => {
				handler();
			});
			this.onHideHandlers = [];
		};

		private safeRunAfterKeyboardHideHandler = (handler: () => void) => {
			if (this.state.isHidden) {
				handler(); // Keyboard is already hidden run the handler right away
			} else {
				// todo: @serkan @jake what???
				this.onHideHandlers.push(handler); // Added handler to run after keyboard hide
			}
		};
	};
};

export const withResizeOnKeyboardShow = hoistStatics(withResizeOnKeyboardShowInt);
