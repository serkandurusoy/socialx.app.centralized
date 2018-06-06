import {withManagedTransitions} from 'hoc/ManagedModal';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {Colors} from 'theme';
import style from './style';

export interface IModalActivityIndicatorProps {
	activityIndicatorTitle?: string | null;
	activityIndicatorMessage?: string | null;
	showActivityIndicator: boolean;
	onDismiss: () => void;
	onModalHide: () => void;
}

// TODO: @serkan @jake an example to simplify and also marginally improve performance of a component
// TODO: in this one, the big one is the extra render function! that was creating a new function instance per render!
const ModalActivityIndicatorSFC: React.SFC<IModalActivityIndicatorProps> = (props) => (
	<Modal
		// TODO: @serkan @jake there is no such prop on Modal's prop types.
		// Ionut: onDismiss prop is required by HOC withManagedTransitions.
		// Happy if we can improve this to get rid of the IDE warning..
		onDismiss={props.onDismiss}
		onModalHide={props.onModalHide}
		isVisible={props.showActivityIndicator}
		backdropOpacity={0.2}
		animationIn={'slideInDown'}
		animationOut={'slideOutUp'}
		style={style.container}
	>
		<View style={style.boxContainer}>
			<Text style={style.title}>{props.activityIndicatorTitle || 'Please wait'}</Text>
			{props.activityIndicatorMessage ? <Text style={style.message}>{props.activityIndicatorMessage}</Text> : null}
			<ActivityIndicator size='large' color={Colors.pink} />
		</View>
	</Modal>
);

const ManagedModalActivityIndicator = withManagedTransitions(ModalActivityIndicatorSFC);

// TODO: @serkan @jake we should use a combined redux State type for this
const mapStateToProps: any = (state: any): IModalActivityIndicatorProps => ({
	...state.popups,
});

export const ModalActivityIndicator = connect<any>(mapStateToProps)(ManagedModalActivityIndicator as any);
