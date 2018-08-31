import noop from 'lodash/noop';
import React from 'react';
import {View} from 'react-native';

import {Colors} from 'theme';
import {WithTranslations} from 'utilities';
import {ButtonSizes, SXButton} from '../../Interaction';
import {AvatarImage} from '../Image';
import {AvatarName} from '../Name';
import style from './style';

interface IUserAvatarProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	usernameColor?: string;
	fullNameColor?: string;
	ownUser?: boolean;
	onEditProfile?: () => void;
}

export const UserAvatar: React.SFC<IUserAvatarProps> = ({
	avatarURL,
	fullName,
	username,
	usernameColor,
	fullNameColor,
	ownUser,
	onEditProfile,
}) => (
	<WithTranslations>
		{({getText}) => (
			<View style={style.container}>
				<View style={style.imageContainer}>
					<AvatarImage image={avatarURL} />
				</View>
				<View style={style.dataContainer}>
					<AvatarName
						fullName={fullName}
						username={username}
						fullNameColor={fullNameColor}
						userNameColor={usernameColor}
					/>
					<SXButton
						label={getText(ownUser ? 'user.avatar.button.label.own.user' : 'user.avatar.button.label.other.user')}
						size={ButtonSizes.Small}
						borderColor={Colors.grayText}
						textColor={Colors.background}
						containerStyle={style.buttonContainer}
						onPress={ownUser ? onEditProfile : noop}
					/>
				</View>
			</View>
		)}
	</WithTranslations>
);
