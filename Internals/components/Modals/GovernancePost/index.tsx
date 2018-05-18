import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {IWallPostCardProp, ScreenHeaderButton, WallPostCard} from 'components';
import {IManagedModal} from 'hoc';
import {withManagedTransitions} from 'hoc/ManagedModal';
import {Icons, Sizes} from 'theme';
import style from './style';

interface IModalGovernancePostProps extends IManagedModal {
	visible: boolean;
	onVoteUp: () => void;
	onVoteDown: () => void;
	onCloseModal: () => void;
	govPost: IWallPostCardProp;
}

const ModalGovernancePostSFC: React.SFC<IModalGovernancePostProps> = (props) => {
	return (
		<Modal
			isVisible={props.visible}
			backdropOpacity={0.7}
			animationIn={'zoomIn'}
			animationOut={'zoomOut'}
			onBackdropPress={props.onCloseModal}
			style={style.container}
			onDismiss={props.onDismiss}
			onModalHide={props.onModalHide}
		>
			<View style={style.boxContainer}>
				<View style={style.titleContainer}>
					<View style={style.backContainer}>
						<ScreenHeaderButton
							onPress={props.onCloseModal}
							iconName={'ios-arrow-back'}
							iconSize={Sizes.smartHorizontalScale(35)}
						/>
					</View>
					<Text style={style.title}>{'Details'}</Text>
				</View>
				<View style={style.postContainer}>
					{props.govPost && <WallPostCard {...props.govPost} governanceVersion={true} />}
				</View>
				<View style={style.buttonsContainer}>
					<TouchableOpacity style={[style.button, style.leftButton]} onPress={props.onVoteDown}>
						<Image source={Icons.greenCrossGovernance} />
					</TouchableOpacity>
					<TouchableOpacity style={style.button} onPress={props.onVoteUp}>
						<Image source={Icons.redCheckGovernance} />
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

ModalGovernancePostSFC.defaultProps = {};

export const ModalGovernancePost = withManagedTransitions(ModalGovernancePostSFC);
