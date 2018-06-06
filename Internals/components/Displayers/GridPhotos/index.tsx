import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

import {MediaObjectViewer} from 'components';
import {Sizes} from 'theme';
import {IMediaViewerObject} from 'types';
import {getTypePropsForMediaViewerObject, getURLForMediaViewerObject} from 'utilities';
import style from './style';

export interface IGridPhotosProps {
	loadMorePhotos: () => IMediaViewerObject[];
	itemPressed?: (i: number) => void;
	pageSize?: number;
	thumbWidth?: number;
	thumbHeight?: number;
	onScroll?: (rawEvent: any, offsetX: number, offsetY: number) => void;
	renderGridItem?: (mediaData: IMediaViewerObject) => any;
	showsVerticalScrollIndicator?: boolean;
	bounces?: boolean;
}

export interface IGridPhotosState {
	dataProvider: DataProvider;
}

export class GridPhotos extends Component<IGridPhotosProps, IGridPhotosState> {
	public static defaultProps: Partial<IGridPhotosProps> = {
		thumbWidth: Sizes.getThumbSize(),
		thumbHeight: Sizes.getThumbSize(),
		pageSize: 20,
		showsVerticalScrollIndicator: true,
		bounces: true,
	};

	// todo: @serkan @jake shouldn't this be in the constructor?
	private girdProvider = new LayoutProvider(
		(index: any) => {
			return 0; // use different values if we need to render object with different types
		},
		(type: any, dim: any) => {
			dim.width = this.props.thumbWidth;
			dim.height = this.props.thumbHeight;
		},
	);

	// todo: @serkan @jake shouldn't this be in the constructor?
	private dataProvider = new DataProvider((row1: any, row2: any) => {
		return row1.id !== row2.id;
	});

	constructor(props: IGridPhotosProps) {
		super(props);
		this.state = {
			dataProvider: this.dataProvider.cloneWithRows(this.loadInitialPhotos()),
		};
	}

	public render() {
		return (
			<RecyclerListView
				renderAheadOffset={1500}
				// disableRecycling={true}
				style={style.recyclerGrid}
				layoutProvider={this.girdProvider}
				showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
				dataProvider={this.state.dataProvider}
				rowRenderer={this.renderGridRow}
				onEndReached={this.loadMorePhotos}
				onScroll={this.props.onScroll}
				bounces={this.props.bounces}
			/>
		);
	}

	private renderGridRow = (type: any, mediaData: IMediaViewerObject) => {
		if (!this.props.renderGridItem) {
			// We can set a placeholder with defaultSource but it will be used only for the images on the first "page"
			const mediaURL = getURLForMediaViewerObject(mediaData);
			const mediaTypeProps = getTypePropsForMediaViewerObject(mediaData);
			return (
				<TouchableOpacity onPress={() => (this.props.itemPressed ? this.props.itemPressed(mediaData.index) : null)}>
					<MediaObjectViewer
						{...mediaTypeProps}
						uri={mediaURL}
						style={{width: this.props.thumbWidth, height: this.props.thumbHeight}}
						thumbOnly={true}
					/>
				</TouchableOpacity>
			);
		} else {
			return this.props.renderGridItem(mediaData);
		}
	};

	private loadInitialPhotos = () =>
		[...this.props.loadMorePhotos()].map((photoData: Partial<IMediaViewerObject>, index: number) => ({
			...photoData,
			index,
		}));

	private loadMorePhotos = () => {
		const {dataProvider} = this.state;
		const nextPhotos = this.props.loadMorePhotos();
		if (nextPhotos.length > 0) {
			const loadedPhotos = dataProvider.getAllData();
			const allPhotos = [...loadedPhotos, ...nextPhotos].map((photoData: IMediaViewerObject, index: number) => ({
				...photoData,
				index,
			}));
			this.setState({
				dataProvider: dataProvider.cloneWithRows(allPhotos),
			});
		}
	};
}
