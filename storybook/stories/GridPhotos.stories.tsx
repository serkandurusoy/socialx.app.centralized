import {number, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React, {ReactText} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {NewGridPhotos} from 'components';
import {Sizes} from 'theme';
import {IMediaViewerObject, ISimpleMediaObject} from 'types';

const PAGE_SIZE = 20;
const THUMB_SIZE = Sizes.getThumbSize();

const gridPhotosProvider = new DataProvider((row1: IMediaViewerObject, row2: IMediaViewerObject) => {
	return row1.index !== row2.index;
});

const GridItem: React.SFC<{
	type: ReactText;
	mediaData: ISimpleMediaObject;
	onViewMediaFullScreen: (index: number) => void;
}> = ({type, mediaData, onViewMediaFullScreen}) => (
	<TouchableOpacity onPress={() => onViewMediaFullScreen(mediaData.index)}>
		<Image source={{uri: mediaData.url}} style={{width: THUMB_SIZE, height: THUMB_SIZE}} />
	</TouchableOpacity>
);

const onViewFullScreenMedia = (index: number) => alert('onViewFullScreenMedia: ' + index);

interface INewGridPhotosWithDataState {
	gridMediaProvider: DataProvider;
}

class NewGridPhotosWithData extends React.Component<any, INewGridPhotosWithDataState> {
	public state = {
		gridMediaProvider: gridPhotosProvider,
	};

	private lastLoadedIndex = 0;

	public render() {
		return (
			<NewGridPhotos
				thumbWidth={THUMB_SIZE}
				thumbHeight={THUMB_SIZE}
				renderGridItem={(type: ReactText, data: ISimpleMediaObject) => (
					<GridItem type={type} mediaData={data} onViewMediaFullScreen={() => onViewFullScreenMedia(data.index)} />
				)}
				scrollViewProps={{
					bounces: true,
					showsVerticalScrollIndicator: false,
				}}
				onLoadMore={this.loadMorePhotosHandler}
				dataProvider={this.state.gridMediaProvider}
			/>
		);
	}

	private loadMorePhotosHandler = () => {
		const {gridMediaProvider} = this.state;
		const newMediaObjects = new Array(PAGE_SIZE).fill(0).map((val, index) => ({
			url: 'https://avatars2.githubusercontent.com/u/' + (this.lastLoadedIndex + index),
			index: this.lastLoadedIndex + index,
		}));
		this.lastLoadedIndex += PAGE_SIZE;
		const loadedMedia = gridMediaProvider.getAllData();
		this.setState({
			gridMediaProvider: gridMediaProvider.cloneWithRows([...loadedMedia, ...newMediaObjects]),
		});
	};
}

storiesOf('NewGridPhotos', module)
	.addDecorator(withKnobs)
	.add('with github avatars', () => {
		return <NewGridPhotosWithData />;
	});
