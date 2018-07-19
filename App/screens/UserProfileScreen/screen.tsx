import React from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {
	ADD_FRIEND_CONTAINER_HEIGHT,
	AVATAR_NAME_HEIGHT,
	DEFAULT_AVATAR_SIZE,
	HEADER_TOP_PADDING,
	IWallPostCardProp,
	PROFILE_STATS_HEIGHT,
	ProfileTopContainer,
	WallPostCard,
} from 'components';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {SearchResultKind} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
import MyProfileScreenComponent from '../MyProfileScreen/screen';
import style from './style';

interface IUserProfileScreenProps extends IWithLoaderProps, IWithTranslationProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	onAddFriend: () => Promise<any>;
	friendRequestStatus: SearchResultKind;
	onViewProfilePhoto: () => void;
	isFollowed: boolean;
	aboutMeText: string;
	recentPosts: IWallPostCardProp[];
	loadMorePhotosHandler: () => void;
	onCommentClick: any;
	onImageClick: (index: number, media: any) => void;
	onLikeClick: (likedByMe: boolean, postId: string) => void;
	onRefresh: () => Promise<any>;
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	onViewMediaFullScreen: (index: number) => void;
}

const TOTAL_HEADER_HEIGHT =
	HEADER_TOP_PADDING + DEFAULT_AVATAR_SIZE + AVATAR_NAME_HEIGHT + PROFILE_STATS_HEIGHT + ADD_FRIEND_CONTAINER_HEIGHT;

const UserProfileScreenComponent: React.SFC<IUserProfileScreenProps> = ({
	isFollowed,
	refreshing,
	gridMediaProvider,
	avatarURL,
	fullName,
	username,
	numberOfPhotos,
	onAddFriend,
	numberOfLikes,
	numberOfFollowing,
	numberOfFollowers,
	onViewProfilePhoto,
	friendRequestStatus,
	onRefresh,
	onViewMediaFullScreen,
	loadMorePhotosHandler,
	recentPosts,
	onCommentClick,
	onImageClick,
	onLikeClick,
	aboutMeText,
	getText,
}) => (
	<View style={style.container}>
		{isFollowed && (
			<MyProfileScreenComponent
				isLoading={false}
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFollowers={numberOfFollowers}
				numberOfFollowing={numberOfFollowing}
				avatarURL={avatarURL}
				fullName={fullName}
				username={username}
				loadMorePhotosHandler={loadMorePhotosHandler}
				onRefresh={onRefresh}
				refreshing={refreshing}
				gridMediaProvider={gridMediaProvider}
				onViewProfilePhoto={onViewProfilePhoto}
				onAddFriend={onAddFriend}
				friendRequestStatus={friendRequestStatus}
				hasPhotos={gridMediaProvider.getSize() > 1}
				emptyGalleryMessage={'user.profile.screen.empty.gallery'}
				onViewMediaFullScreen={onViewMediaFullScreen}
				headerHeight={TOTAL_HEADER_HEIGHT}
			/>
		)}
		{!isFollowed && (
			<ScrollView
				contentContainerStyle={style.scrollContainer}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<ProfileTopContainer
					avatarURL={avatarURL}
					fullName={fullName}
					username={username}
					numberOfFollowers={numberOfFollowers}
					numberOfFollowing={numberOfFollowing}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					onViewProfilePhoto={onViewProfilePhoto}
					onAddFriend={onAddFriend}
					friendRequestStatus={friendRequestStatus}
					hasPhotos={true}
				/>
				<View style={style.aboutMeContainer}>
					<Text style={style.aboutMeTitle}>{getText('user.profile.screen.about.me')}</Text>
					<Text style={style.aboutMeText}>{aboutMeText}</Text>
				</View>
				<Text style={style.recentPostsTitle}>{getText('user.profile.screen.recent.posts')}</Text>
				{recentPosts.map((post, i) => (
					<View style={style.wallPostContainer} key={i}>
						<WallPostCard
							{...post}
							canDelete={false}
							onCommentClick={() => onCommentClick(post.id, null)}
							onImageClick={(index: number) => onImageClick(index, post.media || post.Media)}
							// onLikeButtonClick={() => onLikeClick(post.likedByMe || false, post.id)}
						/>
					</View>
				))}
			</ScrollView>
		)}
	</View>
);

export default withTranslations(withInlineLoader(UserProfileScreenComponent, false));
