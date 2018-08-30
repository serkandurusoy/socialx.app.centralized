import React, {ReactText} from 'react';
import {TouchableOpacity} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {MediaObjectViewer, NewGridPhotos} from 'components';
import {IWithLoaderProps, withInlineLoader} from 'hoc';
import {ISimpleMediaObject} from 'types';
import style, {USER_MEDIA_THUMB_SIZE} from './style';

interface IPhotoGridProps extends IWithLoaderProps {
	gridMediaProvider: DataProvider;
	loadMorePhotosHandler: () => void;
	onViewMediaFullScreen: (index: number) => void;
	header: any;
	disabled: boolean;
}

const GridItem: React.SFC<{
	type: ReactText;
	mediaData: ISimpleMediaObject;
	onViewMediaFullScreen: (index: number) => void;
}> = ({mediaData, onViewMediaFullScreen}) => {
	const styles = (mediaData.index! - 1) % 3 === 0 ? [style.gridMediaThumb, style.centerGridItem] : style.gridMediaThumb;
	return (
		<TouchableOpacity onPress={() => onViewMediaFullScreen(mediaData.index!)}>
			<MediaObjectViewer type={mediaData.type} uri={mediaData.url} style={styles} thumbOnly={true} />
		</TouchableOpacity>
	);
};

const PhotosGrid: React.SFC<IPhotoGridProps> = ({
	loadMorePhotosHandler,
	gridMediaProvider,
	onViewMediaFullScreen,
	disabled,
	header,
}) => (
	<NewGridPhotos
		thumbWidth={USER_MEDIA_THUMB_SIZE}
		thumbHeight={USER_MEDIA_THUMB_SIZE}
		renderGridItem={(type: ReactText, data: ISimpleMediaObject) => (
			<GridItem type={type} mediaData={data} onViewMediaFullScreen={onViewMediaFullScreen} />
		)}
		onLoadMore={loadMorePhotosHandler}
		dataProvider={gridMediaProvider}
		header={header}
		scrollViewProps={{
			bounces: true,
			showsVerticalScrollIndicator: false,
			scrollEnabled: disabled,
		}}
	/>
);

export const PhotoGrid = withInlineLoader(PhotosGrid);
