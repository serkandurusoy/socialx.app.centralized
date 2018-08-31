import noop from 'lodash/noop';
import React from 'react';
import {Text, View} from 'react-native';

import {AvatarImage, ButtonSizes, SXButton} from 'components';
import {Colors, Sizes} from 'theme';
import {SearchResultKind} from 'types';
import {WithTranslations} from 'utilities';
import {ProfileTabs} from './ProfileTabs';
import {Statistics} from './Statistics';
import style from './style';

export interface ITopContainerSharedProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfViews: number;
	onAddFriend?: () => Promise<any>;
	onShowFriendshipOptions?: () => void;
	friendRequestStatus?: SearchResultKind;
	onViewProfilePhoto?: () => void;
	ownUser: boolean;
	onEditProfile?: () => void;
	tabs: boolean;
	activeTab?: string;
	onIconPress?: () => void;
	aboutMeText: string;
}

export const ProfileTopContainer: React.SFC<ITopContainerSharedProps> = ({
	avatarURL,
	fullName,
	username,
	numberOfPhotos,
	numberOfLikes,
	numberOfFollowers,
	numberOfViews,
	onAddFriend,
	onShowFriendshipOptions,
	friendRequestStatus,
	ownUser,
	onEditProfile,
	onIconPress,
	aboutMeText,
	tabs,
	activeTab,
}) => {
	const friendButtonHandler = friendRequestStatus === SearchResultKind.Friend ? onShowFriendshipOptions : onAddFriend;

	return (
		<WithTranslations>
			{({getText}) => (
				<View style={style.topContainer}>
					<View style={style.background} />
					<View style={style.avatarContainer}>
						<AvatarImage image={{uri: avatarURL}} style={style.avatar} />
					</View>
					<View style={style.statisticsContainer}>
						<View style={style.leftStatistics}>
							<Statistics text={getText('profile.statistics.photos')} value={numberOfPhotos} />
							<Statistics text={getText('profile.statistics.likes')} value={numberOfLikes} />
						</View>
						<View style={style.rightStatistics}>
							<Statistics text={getText('profile.statistics.friends')} value={numberOfFollowers} />
							<Statistics text={getText('profile.statistics.view.count')} value={numberOfViews} />
						</View>
					</View>
					<View style={style.textContainer}>
						<Text style={style.name}>{fullName}</Text>
						<Text style={style.username}>@{username}</Text>
						<Text style={style.about}>{aboutMeText}</Text>
					</View>
					<View style={style.buttonsContainer}>
						{!ownUser && (
							<SXButton
								width={Sizes.smartHorizontalScale(150)}
								label={
									friendRequestStatus === SearchResultKind.Friend
										? getText('profile.top.container.button.friends')
										: getText('profile.top.container.button.not.friends')
								}
								size={ButtonSizes.Small}
								borderColor={Colors.white}
								textColor={Colors.white}
								containerStyle={style.button}
								onPress={friendButtonHandler}
							/>
						)}
						<SXButton
							width={Sizes.smartHorizontalScale(150)}
							label={
								ownUser
									? getText('profile.top.container.button.edit.profile')
									: getText('profile.top.container.button.send.message')
							}
							size={ButtonSizes.Small}
							borderColor={Colors.pink}
							textColor={Colors.pink}
							containerStyle={style.ghostButton}
							onPress={ownUser ? onEditProfile : noop}
						/>
					</View>
					{tabs && <ProfileTabs onIconPress={onIconPress!} activeTab={activeTab!} />}
				</View>
			)}
		</WithTranslations>
	);
};
