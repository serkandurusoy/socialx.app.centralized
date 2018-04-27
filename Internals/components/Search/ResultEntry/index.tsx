import React from 'react';
import {Image, Text, View} from 'react-native';
import {Colors, Icons} from 'theme';
import {SearchResultKind} from 'types';
import {AvatarImage} from '../../Avatar';
import {ButtonSizes, SXButton} from '../../Interaction';
import style from './style';

export interface IUserRequestSearchProps {
	avatarURL?: string;
	fullName: string;
	username: string;
	kind: SearchResultKind;
	addFriendHandler?: () => void;
}

export const SearchResultEntry: React.SFC<IUserRequestSearchProps> = (props) => {
	const renderUsername = () => {
		if (props.username !== '') {
			return <Text style={style.username}>{'@' + props.username}</Text>;
		}
		return null;
	};

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
				onPress={props.addFriendHandler}
			/>
		);
	};

	const conditionalRendering = () => {
		let ret = null;
		if (props.kind === SearchResultKind.NotFriend) {
			ret = renderAddFriend();
		} else if (props.kind === SearchResultKind.Friend) {
			ret = renderIsFriend();
		} else if (props.kind === SearchResultKind.Group) {
			ret = null;
		}
		return ret;
	};

	return (
		<View style={style.container}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{props.fullName}</Text>
					{renderUsername()}
				</View>
			</View>
			{conditionalRendering()}
		</View>
	);
};
