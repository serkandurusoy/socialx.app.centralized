import React from 'react';
import {Animated, Dimensions, RefreshControl, ScrollView, View} from 'react-native';
import {AnimatedValue} from 'react-navigation';
import {DataProvider} from 'recyclerlistview';

import {IWallPostCardProp, NoPhotos, PhotoGrid, ProfileTopContainer, WallPostCard} from 'components';
import {PROFILE_TAB_ICON_TYPES} from 'consts';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {Colors} from 'theme';
import {IUserQuery, SearchResultKind} from 'types';

import style from './style';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface IUserProfileScreenProps extends IWithLoaderProps {
	avatarURL: any;
	fullName: string;
	username?: string;
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	numberOfViews: number;
	onAddFriend: () => Promise<any>;
	onShowFriendshipOptions: () => void;
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
	currentUserId: string;
	ownUser: boolean;
	onIconPress: (tab: string) => void;
	listTranslate: AnimatedValue;
	gridTranslate: AnimatedValue;
	activeTab: string;
	containerHeight: number;
	onLayoutChange: (height: number) => void;
}

const UserProfileScreenComponent: React.SFC<IUserProfileScreenProps> = ({
	refreshing,
	gridMediaProvider,
	avatarURL,
	fullName,
	username,
	numberOfPhotos,
	onAddFriend,
	onShowFriendshipOptions,
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
	numberOfViews,
	currentUserId,
	ownUser,
	onIconPress,
	listTranslate,
	gridTranslate,
	activeTab,
	containerHeight,
	onLayoutChange,
}) => {
	const hasPhotos = numberOfPhotos !== 0;

	let contentContainerStyle;
	if (activeTab === PROFILE_TAB_ICON_TYPES.GRID && containerHeight !== 0) {
		if (containerHeight < SCREEN_HEIGHT / 2) {
			contentContainerStyle = [style.contentContainer, {height: SCREEN_HEIGHT / 2}];
		} else {
			contentContainerStyle = [style.contentContainer, {height: containerHeight}];
		}
	} else {
		contentContainerStyle = style.contentContainer;
	}

	const scrollContainerStyles = hasPhotos ? style.scrollContainer : [style.scrollContainer, {flex: 1}];

	return (
		<View style={style.container}>
			<View style={[style.whiteBottomView, {height: SCREEN_HEIGHT / 2}]} />
			<ScrollView
				contentContainerStyle={scrollContainerStyles}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.white} />}
				disabled={hasPhotos}
			>
				<ProfileTopContainer
					avatarURL={avatarURL}
					fullName={fullName}
					username={username}
					numberOfFollowers={numberOfFollowers}
					numberOfFollowing={numberOfFollowing}
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfViews={numberOfViews}
					onViewProfilePhoto={onViewProfilePhoto}
					onAddFriend={onAddFriend}
					onShowFriendshipOptions={onShowFriendshipOptions}
					friendRequestStatus={friendRequestStatus}
					ownUser={ownUser}
					onIconPress={onIconPress}
					aboutMeText={aboutMeText}
					tabs={true}
					activeTab={activeTab}
				/>
				{hasPhotos && (
					<View style={contentContainerStyle}>
						<Animated.View style={[style.postsContainer, {transform: [{translateX: listTranslate}]}]}>
							{recentPosts.map((post, i) => {
								const likedByMe = !!post.likes.find((like: IUserQuery) => like.userId === currentUserId);

								return (
									<View style={style.wallPostContainer} key={i}>
										<WallPostCard
											{...post}
											likedByMe={likedByMe}
											canDelete={false}
											onCommentClick={() => onCommentClick(post.id, null)}
											onImageClick={(index: number) => onImageClick(index, post.media || post.Media)}
											onLikeButtonClick={() => onLikeClick(likedByMe, post.id)}
											noInput={true}
										/>
									</View>
								);
							})}
						</Animated.View>
						<Animated.View
							onLayout={(event: any) => {
								if (containerHeight !== event.nativeEvent.layout.height) {
									onLayoutChange(event.nativeEvent.layout.height);
								}
							}}
							style={[style.gridContainer, {transform: [{translateX: gridTranslate}]}]}
						>
							<PhotoGrid
								loadMorePhotosHandler={loadMorePhotosHandler}
								gridMediaProvider={gridMediaProvider}
								onViewMediaFullScreen={onViewMediaFullScreen}
								header={{
									element: <View style={{width: 1, height: 1}} />,
									height: hasPhotos ? 1 : SCREEN_HEIGHT,
								}}
								disabled={hasPhotos}
							/>
						</Animated.View>
					</View>
				)}
				{!hasPhotos && <NoPhotos />}
			</ScrollView>
		</View>
	);
};

export default withInlineLoader(UserProfileScreenComponent);
