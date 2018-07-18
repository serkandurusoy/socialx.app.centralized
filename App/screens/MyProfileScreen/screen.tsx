import React, {ReactText} from 'react';
import {RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationScreenProp} from 'react-navigation';
import {DataProvider} from 'recyclerlistview';

import {
	AVATAR_NAME_HEIGHT,
	DEFAULT_AVATAR_SIZE,
	MediaObjectViewer,
	NewGridPhotos,
	PROFILE_STATS_HEIGHT,
	ProfileStatistics,
	UserAvatar,
} from 'components';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {Colors, Sizes} from 'theme';
import {IMediaProps, ISimpleMediaObject} from 'types';
import style, {HEADER_TOP_PADDING, USER_MEDIA_THUMB_SIZE} from './style';

interface ITopContainerProps {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	avatarURL: any;
	fullName: string;
	username?: string;
	getAllPhotos: IMediaProps[];
}

interface IMyProfileScreenProps extends ITopContainerProps, IWithLoaderProps {
	refreshing: boolean;
	gridMediaProvider: DataProvider;
	loadMorePhotosHandler: () => void;
	navigation: NavigationScreenProp<any>; // TODO: @Serkan -> send navigation here or not?
	onRefresh: () => Promise<any>;
}

const TopContainer: React.SFC<ITopContainerProps> = ({
	avatarURL,
	fullName,
	username,
	numberOfPhotos,
	numberOfLikes,
	numberOfFollowers,
	numberOfFollowing,
	getAllPhotos,
}) => (
	<View style={style.topContainer}>
		<UserAvatar avatarURL={{uri: avatarURL}} fullName={fullName} username={username} />
		<ProfileStatistics
			numberOfPhotos={numberOfPhotos}
			numberOfLikes={numberOfLikes}
			numberOfFollowers={numberOfFollowers}
			numberOfFollowing={numberOfFollowing}
		/>
		{getAllPhotos.length === 0 && (
			<View style={style.noPhotosContainer}>
				<Icon name={'th'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
				<Text style={style.noPhotosText}>{'Your photo gallery is empty.'}</Text>
			</View>
		)}
	</View>
);

const onPhotoPressHandler = (index: number, navigation: any, getAllPhotos: IMediaProps[]) => {
	navigation.navigate('MediaViewerScreen', {
		mediaObjects: getAllPhotos,
		startIndex: index,
	});
};

const GridItem: React.SFC<{
	type: ReactText;
	mediaData: ISimpleMediaObject;
	navigation: NavigationScreenProp<any>;
	getAllPhotos: IMediaProps[];
}> = ({type, mediaData, navigation, getAllPhotos}) => (
	<TouchableOpacity onPress={() => onPhotoPressHandler(mediaData.index, navigation, getAllPhotos)}>
		<MediaObjectViewer type={mediaData.type} uri={mediaData.url} style={style.gridMediaThumb} thumbOnly={true} />
	</TouchableOpacity>
);

const TOTAL_HEADER_HEIGHT = HEADER_TOP_PADDING + DEFAULT_AVATAR_SIZE + AVATAR_NAME_HEIGHT + PROFILE_STATS_HEIGHT;

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
	getAllPhotos,
	loadMorePhotosHandler,
	gridMediaProvider,
	navigation,
}) => (
	<View style={style.container}>
		<NewGridPhotos
			thumbWidth={USER_MEDIA_THUMB_SIZE}
			thumbHeight={USER_MEDIA_THUMB_SIZE}
			renderGridItem={(type: ReactText, data: ISimpleMediaObject) => (
				<GridItem type={type} mediaData={data} navigation={navigation} getAllPhotos={getAllPhotos} />
			)}
			onLoadMore={loadMorePhotosHandler}
			dataProvider={gridMediaProvider}
			header={{
				element: (
					<TopContainer
						avatarURL={avatarURL}
						fullName={fullName}
						username={username}
						numberOfFollowers={numberOfFollowers}
						numberOfFollowing={numberOfFollowing}
						numberOfLikes={numberOfLikes}
						numberOfPhotos={numberOfPhotos}
						getAllPhotos={getAllPhotos}
					/>
				),
				height: TOTAL_HEADER_HEIGHT,
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
