import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {Colors} from '../../theme';
import style from './style';

export interface IModalActivityIndicatorProps {
	activityIndicatorTitle?: string | null;
	activityIndicatorMessage?: string | null;
	showActivityIndicator: boolean;
}

const ModalActivityIndicatorSFC: React.SFC<IModalActivityIndicatorProps> = (props) => {
	const renderMessage = () => {
		if (props.activityIndicatorMessage) {
			return <Text style={style.message}>{props.activityIndicatorMessage}</Text>;
		}
		return null;
	};

	const title = props.activityIndicatorTitle || 'Please wait';

	return (
		<Modal
			isVisible={props.showActivityIndicator}
			backdropOpacity={0.2}
			animationIn={'slideInDown'}
			animationOut={'slideOutUp'}
			style={style.container}
		>
			<View style={style.boxContainer}>
				<Text style={style.title}>{title}</Text>
				{renderMessage()}
				<ActivityIndicator size='large' color={Colors.pink} />
			</View>
		</Modal>
	);
};

const mapStateToProps: any = (state: any): IModalActivityIndicatorProps => ({
	...state.popups,
});

export const ModalActivityIndicator = connect<any>(mapStateToProps)(ModalActivityIndicatorSFC);