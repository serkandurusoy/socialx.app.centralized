import React, {Component, ReactText} from 'react';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {Sizes} from 'theme';
import style from './style';

export interface INewGridPhotosProps {
	onLoadMore: () => void;
	pageSize?: number;
	thumbWidth?: number;
	thumbHeight?: number;
	onScroll?: (rawEvent: any, offsetX: number, offsetY: number) => void;
	renderGridItem: (type: ReactText, data: any, index: number) => JSX.Element;
	showsVerticalScrollIndicator?: boolean;
	bounces?: boolean;
	dataProvider: DataProvider;
	extendedState?: any;
	scrollViewProps?: any;
}

export class NewGridPhotos extends Component<INewGridPhotosProps> {
	public static defaultProps: Partial<INewGridPhotosProps> = {
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

	public render() {
		return (
			<RecyclerListView
				renderAheadOffset={1500}
				style={style.recyclerGrid}
				layoutProvider={this.girdProvider}
				showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
				dataProvider={this.props.dataProvider}
				rowRenderer={this.props.renderGridItem}
				onEndReached={this.props.onLoadMore}
				onScroll={this.props.onScroll}
				bounces={this.props.bounces}
				extendedState={this.props.extendedState}
				scrollViewProps={this.props.scrollViewProps}
			/>
		);
	}
}
