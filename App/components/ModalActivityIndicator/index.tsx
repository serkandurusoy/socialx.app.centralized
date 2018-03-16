import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../theme';
import style from './style';

export interface IModalActivityIndicatorProps {
	title?: string | null;
	message?: string | null;
	visible: boolean;
}

export const ModalActivityIndicator: React.SFC<IModalActivityIndicatorProps> = (props) => {
	const renderMessage = () => {
		if (props.message) {
			return <Text style={style.message}>{props.message}</Text>;
		}
		return null;
	};

	return (
		<Modal
			isVisible={props.visible}
			backdropOpacity={0.2}
			animationIn={'slideInDown'}
			animationOut={'slideOutUp'}
			style={style.container}
		>
			<View style={style.boxContainer}>
				<Text style={style.title}>{props.title}</Text>
				{renderMessage()}
				<ActivityIndicator size='large' color={Colors.pink} />
			</View>
		</Modal>
	);
};

ModalActivityIndicator.defaultProps = {
	title: 'Please wait',
	visible: false,
};
