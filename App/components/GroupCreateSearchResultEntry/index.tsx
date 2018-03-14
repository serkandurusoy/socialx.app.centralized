import React from 'react';
import {Image, Text, View} from 'react-native';
import {Colors, Icons} from '../../theme';
import {AvatarImage} from '../AvatarImage';
import {ButtonSizes, SXButton} from '../Button';
import style from './style';

export interface IFriendRequestProps {
	avatarURL?: string;
	fullName: string;
	location: string;
	selected: boolean;
	addHandler?: () => void;
}

export const GroupCreateSearchResultEntry: React.SFC<IFriendRequestProps> = (props) => {
	const renderIsFriend = () => {
		return <Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isFiendIcon} />;
	};

	const renderAddFriend = () => {
		return (
			<SXButton
				label={'Add'}
				size={ButtonSizes.Small}
				autoWidth={true}
				borderColor={Colors.transparent}
				onPress={props.addHandler}
			/>
		);
	};

	const conditionalRendering = () => {
		return props.selected ? renderIsFriend() : renderAddFriend();
	};

	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{props.fullName}</Text>
					<Text style={style.location}>{props.location}</Text>
				</View>
			</View>
			{conditionalRendering()}
		</View>
	);
};
