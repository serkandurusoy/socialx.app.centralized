// MIGRATION: migrated components/managedTransitions/ManagedKeyboard

import React, {Component} from 'react';
import {Keyboard} from 'react-native';

export interface IResizeProps {
	// external use only needed in some particular cases!
	marginBottom: number;
	safeRunAfterKeyboardHide: (handler: () => void) => void;
}

interface IWithResizeOnKeyboardShowProps {
	children(props: IResizeProps): JSX.Element;
}

interface IWithResizeOnKeyboardShowState {
	marginBottom: number;
	keyboardIsHidden: boolean;
}

export class WithResizeOnKeyboardShow extends Component<
	IWithResizeOnKeyboardShowProps,
	IWithResizeOnKeyboardShowState
> {
	public state = {
		marginBottom: 0,
		keyboardIsHidden: false,
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
		return this.props.children({
			marginBottom: this.state.marginBottom,
			safeRunAfterKeyboardHide: this.safeRunAfterKeyboardHideHandler,
		});
	}

	private keyboardDidShow = (event: any) => {
		this.setState({
			keyboardIsHidden: false,
			marginBottom: event.endCoordinates.height,
		});
	};

	private keyboardDidHide = () => {
		this.setState({
			keyboardIsHidden: true,
			marginBottom: 0,
		});
		// todo: @serkan @jake what???
		this.onHideHandlers.forEach((handler) => {
			handler();
		});
		this.onHideHandlers = [];
	};

	private safeRunAfterKeyboardHideHandler = (handler: () => void) => {
		if (this.state.keyboardIsHidden) {
			handler(); // Keyboard is already hidden run the handler right away
		} else {
			// todo: @serkan @jake what???
			this.onHideHandlers.push(handler); // Added handler to run after keyboard hide
		}
	};
}
