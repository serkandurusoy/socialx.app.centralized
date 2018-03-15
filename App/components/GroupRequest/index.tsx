import React from 'react';
import {Image, Text, View} from 'react-native';

import {Colors} from '../../theme';
import {AvatarImage} from '../AvatarImage';
import {ButtonSizes, SXButton} from '../Button';
import style from './style';

export interface IGroupRequestProps {
	avatarURL: string;
	fullName: string;
	groupName: string;
	onGroupConfirmed: () => void;
}

export const GroupRequest: React.SFC<IGroupRequestProps> = (props) => {
	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{props.fullName}</Text>
					<Text style={style.inviteText}>{'Invited you to group'}</Text>
					<Text style={style.groupName}>{'@' + props.groupName}</Text>
				</View>
			</View>
			<SXButton
				label={'Confirm'}
				size={ButtonSizes.Small}
				autoWidth={true}
				borderColor={Colors.transparent}
				onPress={props.onGroupConfirmed}
			/>
		</View>
	);
};
