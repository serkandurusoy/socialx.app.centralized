import React, {ReactText} from 'react';
import {Dimensions, RefreshControl, TouchableOpacity, View} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {ITopContainerSharedProps, MediaObjectViewer, NewGridPhotos, ProfileTopContainer} from 'components';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {ISimpleMediaObject} from 'types';
import style, {USER_MEDIA_THUMB_SIZE} from './style';

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
}

const GridItem: React.SFC<{
	type: ReactText;
	mediaData: ISimpleMediaObject;
	onViewMediaFullScreen: (index: number) => void;
}> = ({type, mediaData, onViewMediaFullScreen}) => {
	const styles = (mediaData.index - 1) % 3 === 0 ? [style.gridMediaThumb, style.centerGridItem] : style.gridMediaThumb;
	return (
		<TouchableOpacity onPress={() => onViewMediaFullScreen(mediaData.index)}>
			<MediaObjectViewer type={mediaData.type} uri={mediaData.url} style={styles} thumbOnly={true} />
		</TouchableOpacity>
	);
};

const MyProfileScreenComponent: React.SFC<IMyProfileScreenProps> = ({
	refreshing,
	onRefresh,
	avatarURL,
	fullName,
	username,
	numberOfPhotos,
	numberOfLikes,
	numberOfFollowing,
	numberOfFollowers,
	numberOfViews,
	loadMorePhotosHandler,
	gridMediaProvider,
	onViewMediaFullScreen,
	headerHeight,
	onViewProfilePhoto,
	onAddFriend,
	friendRequestStatus,
	emptyGalleryMessage,
	hasPhotos,
	ownUser,
	onEditProfile,
}) => (
	<View style={style.container}>
		<NewGridPhotos
			thumbWidth={USER_MEDIA_THUMB_SIZE}
			thumbHeight={USER_MEDIA_THUMB_SIZE}
			renderGridItem={(type: ReactText, data: ISimpleMediaObject) => (
				<GridItem type={type} mediaData={data} onViewMediaFullScreen={onViewMediaFullScreen} />
			)}
			onLoadMore={loadMorePhotosHandler}
			dataProvider={gridMediaProvider}
			header={{
				element: (
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
						hasPhotos={hasPhotos}
						emptyGalleryMessage={emptyGalleryMessage}
						numberOfViews={numberOfViews}
						ownUser={ownUser}
						onEditProfile={onEditProfile}
					/>
				),
				height: hasPhotos ? headerHeight : SCREEN_HEIGHT,
			}}
			scrollViewProps={{
				bounces: true,
				showsVerticalScrollIndicator: false,
				refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
			}}
		/>
	</View>
);

export default withInlineLoader(MyProfileScreenComponent, false);
