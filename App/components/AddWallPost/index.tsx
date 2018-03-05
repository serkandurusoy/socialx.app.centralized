import React from 'react';
import {Keyboard, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../../theme';
import {SXButton} from '../Button';
import {SXTextInput} from '../TextInput';
import style from './style';

export interface IAddWallPostModalProps {
	visible: boolean;
}

export class AddWallPostModal extends React.Component<IAddWallPostModalProps, any> {
	public state = {
		modalVisible: this.props.visible,
	};

	public componentWillReceiveProps(nextProps: Readonly<IAddWallPostModalProps>): void {
		this.setState({modalVisible: nextProps.visible});
	}

	public render() {
		return (
			<Modal
				isVisible={this.state.modalVisible}
				backdropOpacity={0.7}
				animationInTiming={700}
				animationOutTiming={700}
				backdropColor={Colors.black}
				animationIn={'slideInDown'}
				animationOut={'slideOutUp'}
				onBackdropPress={this.backDropPressHandler}
				style={style.container}
			>
				<View style={style.boxContainer}>
					<SXTextInput
						numberOfLines={3}
						borderColor={Colors.dustWhite}
						placeholder={'Type a message'}
						autoFocus={true}
					/>
					<SXButton label={'SEND'} />
				</View>
			</Modal>
		);
	}

	private backDropPressHandler = () => {
		this.setState({modalVisible: false});
		// Keyboard.dismiss(); // doesn't work!
	}
}
