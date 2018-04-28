import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {Sizes} from 'theme';
import style from './style';

export interface IGridPhotosProps {
	loadMorePhotos: any;
	itemPressed?: (i: number) => void;
	pageSize?: number;
	thumbSize?: number;
	onScroll?: (rawEvent: any, offsetX: number, offsetY: number) => void;
}

export interface IGridPhotosState {
	dataProvider: DataProvider;
}

export class GridPhotos extends Component<IGridPhotosProps, IGridPhotosState> {
	public static defaultProps: Partial<IGridPhotosProps> = {
		thumbSize: Sizes.getThumbSize(),
		pageSize: 20,
	};

	private girdProvider = new LayoutProvider(
		(index: any) => {
			return 0; // use different values if we need to render object with different types
		},
		(type: any, dim: any) => {
			dim.width = this.props.thumbSize;
			dim.height = this.props.thumbSize;
		},
	);

	private dataProvider = new DataProvider((row1: any, row2: any) => {
		return row1.id !== row2.id;
	});

	constructor(props: IGridPhotosProps) {
		super(props);
		this.state = {
			dataProvider: this.dataProvider.cloneWithRows(this.props.loadMorePhotos()),
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
				showsVerticalScrollIndicator={true}
				dataProvider={this.state.dataProvider}
				rowRenderer={this.renderGridRow}
				onEndReached={this.loadMorePhotos}
				onScroll={this.props.onScroll}
			/>
		);
	}

	private renderGridRow = (type: any, photoData: any) => {
		// We can set a placeholder with defaultSource but it will be used only for the images on the first "page"
		return (
			<TouchableOpacity onPress={() => this.props.itemPressed ? this.props.itemPressed(photoData.index) : null}>
				<Image
					// defaultSource={icons.iconPostSuperLike}
					style={{width: this.props.thumbSize, height: this.props.thumbSize}}
					source={{uri: photoData.url}}
					resizeMode={'cover'}
				/>
			</TouchableOpacity>
		);
	}

	private loadMorePhotos = () => {
		const {dataProvider} = this.state;
		const nextPhotos = this.props.loadMorePhotos();
		if (nextPhotos.length > 0) {
			const loadedPhotos = dataProvider.getAllData();
			const allPhotos = loadedPhotos.concat(nextPhotos);
			this.setState({
				dataProvider: dataProvider.cloneWithRows(allPhotos),
			});
		}
	}
}
