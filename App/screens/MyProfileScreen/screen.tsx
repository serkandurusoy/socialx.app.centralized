import React from 'react';
import {Dimensions, RefreshControl, ScrollView, View} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {ITopContainerSharedProps, NoPhotos, PhotoGrid, ProfileTopContainer} from 'components';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {Colors} from 'theme';
import style from './style';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface IMyProfileScreenProps extends ITopContainerSharedProps, IWithLoaderProps {
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	loadMorePhotosHandler: () => void;
	onRefresh: () => Promise<any>;
	onViewMediaFullScreen: (index: number) => void;
	headerHeight: number;
	ownUser: boolean;
	onEditProfile?: () => void;
	hasPhotos: boolean;
	bio: string | undefined;
}

const MyProfileScreenComponent: React.SFC<IMyProfileScreenProps> = ({
	refreshing,
	onRefresh,
	avatarURL,
	fullName,
	username,
	numberOfPhotos,
	numberOfLikes,
	numberOfFollowers,
	numberOfViews,
	bio,
	loadMorePhotosHandler,
	gridMediaProvider,
	onViewMediaFullScreen,
	onViewProfilePhoto,
	onAddFriend,
	friendRequestStatus,
	hasPhotos,
	ownUser,
	onEditProfile,
}) => {
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
					numberOfLikes={numberOfLikes}
					numberOfPhotos={numberOfPhotos}
					numberOfViews={numberOfViews}
					onViewProfilePhoto={onViewProfilePhoto}
					onAddFriend={onAddFriend}
					friendRequestStatus={friendRequestStatus}
					ownUser={ownUser}
					aboutMeText={bio}
					onEditProfile={onEditProfile}
				/>
				{hasPhotos && (
					<View style={style.gridContainer}>
						<PhotoGrid
							loadMorePhotosHandler={loadMorePhotosHandler}
							gridMediaProvider={gridMediaProvider}
							onViewMediaFullScreen={onViewMediaFullScreen}
							header={{
								element: <View style={{width: 1, height: 1}} />,
								height: 1,
							}}
							disabled={hasPhotos}
						/>
					</View>
				)}
				{!hasPhotos && <NoPhotos />}
			</ScrollView>
		</View>
	);
};

export default withInlineLoader(MyProfileScreenComponent);
