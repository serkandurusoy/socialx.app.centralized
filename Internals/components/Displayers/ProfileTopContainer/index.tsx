import React from 'react';
import {Text, View} from 'react-native';

import {AvatarImage, ButtonSizes, SXButton} from 'components';
import {Colors, Sizes} from 'theme';
import {SearchResultKind} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
import ProfileTabs from './ProfileTabs';
import Statistics from './Statistics';
import style from './style';

export interface ITopContainerSharedProps extends IWithTranslationProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfViews: number;
	onAddFriend?: () => Promise<any>;
	onRemoveFriendship?: () => void;
	friendRequestStatus?: SearchResultKind;
	onViewProfilePhoto?: () => void;
	ownUser: boolean;
	onEditProfile?: () => void;
	tabs: boolean;
	activeTab?: string;
	onIconPress?: () => void;
	aboutMeText: string;
}

const TopContainer: React.SFC<ITopContainerSharedProps> = ({
	avatarURL,
	fullName,
	username,
	numberOfPhotos,
	numberOfLikes,
	numberOfFollowers,
	numberOfViews,
	onAddFriend,
	onRemoveFriendship,
	friendRequestStatus,
	ownUser,
	onEditProfile,
	onIconPress,
	aboutMeText,
	tabs,
	activeTab,
}) => {
	const friendButtonHandler = friendRequestStatus === SearchResultKind.Friend ? onRemoveFriendship: onAddFriend;
	const buttonStatusLabel = friendRequestStatus === SearchResultKind.Friend ? 'FRIENDS' : 'ADD FRIEND';
	const ownUserLabel = ownUser ? 'EDIT PROFILE' : 'MESSAGE';

	return (
		<View style={style.topContainer}>
			<View style={style.background} />
			<View style={style.avatarContainer}>
				<AvatarImage image={{uri: avatarURL}} style={style.avatar} />
			</View>
			<View style={style.statisticsContainer}>
				<View style={style.leftStatistics}>
					<Statistics text='photos' value={numberOfPhotos} />
					<Statistics text='likes' value={numberOfLikes} />
				</View>
				<View style={style.rightStatistics}>
					<Statistics text='friends' value={numberOfFollowers} />
					<Statistics text='views' value={numberOfViews} />
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
						label={buttonStatusLabel}
						size={ButtonSizes.Small}
						borderColor={Colors.white}
						textColor={Colors.white}
						containerStyle={style.button}
						onPress={friendButtonHandler}
					/>
				)}
				<SXButton
					width={Sizes.smartHorizontalScale(150)}
					label={ownUserLabel}
					size={ButtonSizes.Small}
					borderColor={Colors.pink}
					textColor={Colors.pink}
					containerStyle={style.ghostButton}
					onPress={ownUser ? onEditProfile : () => {}}
				/>
			</View>
			{tabs && <ProfileTabs onIconPress={onIconPress!} activeTab={activeTab!} />}
		</View>
	);
};

export const ProfileTopContainer = withTranslations(TopContainer as any);
