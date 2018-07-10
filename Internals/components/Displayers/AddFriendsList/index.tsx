import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';

import {Icons} from 'theme';
import {FriendsSearchResult} from 'types';
import style from './style';

export interface IAddFriendsListProps {
	showTagFriendsModal: () => void;
	taggedFriends: FriendsSearchResult[];
}

export const AddFriendsList: React.SFC<IAddFriendsListProps> = ({taggedFriends, showTagFriendsModal}) => (
	<View style={style.tagFriendsContainer}>
		<ScrollView alwaysBounceHorizontal={false} horizontal={true} style={style.taggedFriendsScroll}>
			{taggedFriends.map((taggedFriend) => (
				<Image
					key={taggedFriend.id}
					source={{uri: taggedFriend.avatarURL}}
					resizeMode={'cover'}
					style={style.taggedFriendIcon}
				/>
			))}
		</ScrollView>
		<TouchableOpacity onPress={showTagFriendsModal} style={style.tagFriendsButton}>
			<Image source={Icons.tagFriendSmall} />
		</TouchableOpacity>
	</View>
);
