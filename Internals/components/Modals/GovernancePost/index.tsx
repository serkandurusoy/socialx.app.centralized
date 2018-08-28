import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {IWallPostCardProp, ScreenHeaderButton, WallPostCard} from 'components';
import {WithManagedTransitions} from 'hoc';
import {Icons, Sizes} from 'theme';
import style from './style';

interface IModalGovernancePostProps {
	visible: boolean;
	onVoteUp: () => void;
	onVoteDown: () => void;
	onCloseModal: () => void;
	govPost: IWallPostCardProp;
}

export const ModalGovernancePost: React.SFC<IModalGovernancePostProps> = ({
	visible,
	onVoteUp,
	onVoteDown,
	onCloseModal,
	govPost,
}) => {
	return (
		<WithManagedTransitions modalVisible={visible}>
			{({onDismiss, onModalHide}) => (
				<Modal
					isVisible={visible}
					backdropOpacity={0.7}
					animationIn={'zoomIn'}
					animationOut={'zoomOut'}
					onBackdropPress={onCloseModal}
					style={style.container}
					onDismiss={onDismiss}
					onModalHide={onModalHide}
				>
					<View style={style.boxContainer}>
						<View style={style.titleContainer}>
							<View style={style.backContainer}>
								<ScreenHeaderButton
									onPress={onCloseModal}
									iconName={'ios-arrow-back'}
									iconSize={Sizes.smartHorizontalScale(35)}
								/>
							</View>
							<Text style={style.title}>{'Details'}</Text>
						</View>
						<View style={style.postContainer}>{govPost && <WallPostCard {...govPost} governanceVersion={true} />}</View>
						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={onVoteDown}>
								<Image source={Icons.greenCrossGovernance} />
							</TouchableOpacity>
							<TouchableOpacity style={style.button} onPress={onVoteUp}>
								<Image source={Icons.redCheckGovernance} />
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}
		</WithManagedTransitions>
	);
};
