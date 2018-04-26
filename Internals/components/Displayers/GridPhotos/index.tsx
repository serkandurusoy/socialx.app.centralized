import {ipfsConfig as base} from 'configuration';
import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {Sizes} from 'theme';
import {IMediaProps} from 'types';
import {MediaObjectViewer} from '../MediaObject';
import style from './style';

interface IExtendedMediaProps extends IMediaProps {
	index: number;
}

export interface IGridPhotosProps {
	loadMorePhotos: () => IMediaProps[];
	itemPressed?: (i: number) => void;
	pageSize?: number;
	thumbWidth?: number;
	thumbHeight?: number;
	onScroll?: (rawEvent: any, offsetX: number, offsetY: number) => void;
	renderGridItem?: (photoData: any) => any;
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

	private girdProvider = new LayoutProvider(
		(index: any) => {
			return 0; // use different values if we need to render object with different types
		},
		(type: any, dim: any) => {
			dim.width = this.props.thumbWidth;
			dim.height = this.props.thumbHeight;
		},
	);

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
				useWindowScroll={true}
				showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
				dataProvider={this.state.dataProvider}
				rowRenderer={this.renderGridRow}
				onEndReached={this.loadMorePhotos}
				onScroll={this.props.onScroll}
				bounces={this.props.bounces}
			/>
		);
	}

	private renderGridRow = (type: any, photoData: any) => {
		if (!this.props.renderGridItem) {
			// We can set a placeholder with defaultSource but it will be used only for the images on the first "page"
			return (
				<TouchableOpacity onPress={() => (this.props.itemPressed ? this.props.itemPressed(mediaData.index) : null)}>
					<MediaObjectViewer
						uri={mediaURL}
						style={{width: this.props.thumbWidth, height: this.props.thumbHeight}}
						extension={mediaData.type}
						thumbOnly={true}
					/>
				</TouchableOpacity>
			);
		} else {
			return this.props.renderGridItem(photoData);
		}
	}

	private loadInitialPhotos = () => {
		const initialPhotos = [].concat(this.props.loadMorePhotos());
		initialPhotos.forEach((photoData: Partial<IExtendedMediaProps>, index: number) => {
			initialPhotos[index] = {...photoData, index};
		});
		return initialPhotos;
	}

	private loadMorePhotos = () => {
		const {dataProvider} = this.state;
		const nextPhotos = this.props.loadMorePhotos();
		if (nextPhotos.length > 0) {
			const loadedPhotos = dataProvider.getAllData();
			const allPhotos = loadedPhotos.concat(nextPhotos);
			allPhotos.forEach((photoData: IExtendedMediaProps, index: number) => {
				photoData.index = index;
			});
			this.setState({
				dataProvider: dataProvider.cloneWithRows(allPhotos),
			});
		}
	}
}
