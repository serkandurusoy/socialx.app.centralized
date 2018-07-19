import React, {ReactText} from 'react';
import {RefreshControl, TouchableOpacity, View} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {ITopContainerSharedProps, MediaObjectViewer, NewGridPhotos, ProfileTopContainer} from 'components';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {ISimpleMediaObject} from 'types';
import style, {USER_MEDIA_THUMB_SIZE} from './style';

interface IMyProfileScreenProps extends ITopContainerSharedProps, IWithLoaderProps {
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	loadMorePhotosHandler: () => void;
	onRefresh: () => Promise<any>;
	onViewMediaFullScreen: (index: number) => void;
	headerHeight: number;
}

const GridItem: React.SFC<{
	type: ReactText;
	mediaData: ISimpleMediaObject;
	onViewMediaFullScreen: (index: number) => void;
}> = ({type, mediaData, onViewMediaFullScreen}) => (
	<TouchableOpacity onPress={() => onViewMediaFullScreen(mediaData.index)}>
		<MediaObjectViewer type={mediaData.type} uri={mediaData.url} style={style.gridMediaThumb} thumbOnly={true} />
	</TouchableOpacity>
);

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
	loadMorePhotosHandler,
	gridMediaProvider,
	onViewMediaFullScreen,
	headerHeight,
	onViewProfilePhoto,
	onAddFriend,
	friendRequestStatus,
	emptyGalleryMessage,
	hasPhotos,
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
					/>
				),
				height: headerHeight,
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
