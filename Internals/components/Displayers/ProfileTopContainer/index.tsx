import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {AddFriendButton, ProfileStatistics, UserAvatar} from 'components';
import {Colors, Sizes} from 'theme';
import {SearchResultKind} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style, {FRIEND_CONTAINER_HEIGHT, TOP_PADDING} from './style';

export const ADD_FRIEND_CONTAINER_HEIGHT = FRIEND_CONTAINER_HEIGHT;
export const HEADER_TOP_PADDING = TOP_PADDING;

export interface ITopContainerSharedProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	numberOfViews: number;
	hasPhotos: boolean;
	emptyGalleryMessage: string;
	onAddFriend?: () => Promise<any>;
	friendRequestStatus?: SearchResultKind;
	onViewProfilePhoto?: () => void;
}

interface ITopContainerTranslatedProps extends ITopContainerSharedProps, IWithTranslationProps {}

const TopContainerTranslated: React.SFC<ITopContainerTranslatedProps> = ({
	avatarURL,
	fullName,
	username,
	numberOfPhotos,
	numberOfLikes,
	numberOfFollowers,
	numberOfFollowing,
	hasPhotos,
	getText,
	onAddFriend,
	friendRequestStatus,
	emptyGalleryMessage,
	onViewProfilePhoto,
	numberOfViews,
}) => (
	<View style={style.topContainer}>
		<TouchableOpacity onPress={onViewProfilePhoto} disabled={!onViewProfilePhoto}>
			<UserAvatar avatarURL={{uri: avatarURL}} fullName={fullName} username={username} />
		</TouchableOpacity>
		<ProfileStatistics
			numberOfPhotos={numberOfPhotos}
			numberOfLikes={numberOfLikes}
			numberOfFollowers={numberOfFollowers}
			numberOfFollowing={numberOfFollowing}
			profileViews={numberOfViews}
		/>
		{friendRequestStatus &&
			onAddFriend && (
				<View style={style.addFriendContainer}>
					<AddFriendButton
						kind={friendRequestStatus}
						onAddFriend={onAddFriend}
						addLabel={getText('button.add.friend')}
						outAnimation={'zoomOut'}
					/>
				</View>
			)}
		{!hasPhotos && (
			<View style={style.noPhotosContainer}>
				<Icon name={'th'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
				<Text style={style.noPhotosText}>{getText(emptyGalleryMessage)}</Text>
			</View>
		)}
	</View>
);

export const ProfileTopContainer = withTranslations(TopContainerTranslated);
