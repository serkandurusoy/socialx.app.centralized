import React, {ReactElement, ReactText} from 'react';
import {Dimensions} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

import {Sizes} from 'theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

enum ViewTypes {
	ITEM_LAYOUT = 0,
	HEADER_LAYOUT = 1,
}

export interface IHeaderType {
	element: ReactElement<any>;
	height: number;
}

interface INewGridPhotosProps {
	onLoadMore: () => void;
	thumbWidth?: number;
	thumbHeight?: number;
	renderGridItem: (type: ReactText, data: any) => JSX.Element;
	dataProvider: DataProvider;
	scrollViewProps?: any;
	header?: IHeaderType;
	// TODO: later revisit below two props for used in MediaLicenceScreenComponent
	extendedState?: any;
	onScroll?: (rawEvent: any, offsetX: number, offsetY: number) => void;
}

let gridProviderInstance: LayoutProvider | null = null;
// TODO: @Serkan: any better options for a singleton here?
const getGridProvider = (thumbWidth: number, thumbHeight: number, header: IHeaderType) => {
	if (!gridProviderInstance) {
		gridProviderInstance = new LayoutProvider(
			(index: any) => {
				if (header && index === 0) {
					return ViewTypes.HEADER_LAYOUT;
				}
				return ViewTypes.ITEM_LAYOUT;
			},
			(type: ReactText, dim: any) => {
				if (type === ViewTypes.HEADER_LAYOUT) {
					dim.width = SCREEN_WIDTH;
					dim.height = header.height;
				} else {
					dim.width = thumbWidth;
					dim.height = thumbHeight;
				}
			},
		);
	}
	return gridProviderInstance;
};

const renderGridItemOrHeader = (
	type: ReactText,
	data: any,
	renderGridItem: (type: ReactText, data: any) => JSX.Element,
	header?: IHeaderType,
) => {
	if (type === ViewTypes.HEADER_LAYOUT && header) {
		return header.element;
	}
	return renderGridItem(type, data);
};

export const NewGridPhotos: React.SFC<INewGridPhotosProps> = ({
	dataProvider,
	renderGridItem,
	onLoadMore,
	onScroll,
	extendedState,
	scrollViewProps,
	thumbHeight,
	thumbWidth,
	header,
}) => (
	<RecyclerListView
		renderAheadOffset={1500}
		layoutProvider={getGridProvider(thumbWidth, thumbHeight, header)}
		dataProvider={dataProvider}
		rowRenderer={(...args) => renderGridItemOrHeader(args[0], args[1], renderGridItem, header)}
		onEndReached={onLoadMore}
		onEndReachedThreshold={100} // must be >0 for Android
		onScroll={onScroll}
		extendedState={extendedState}
		scrollViewProps={scrollViewProps}
	/>
);

NewGridPhotos.defaultProps = {
	thumbWidth: Sizes.getThumbSize(),
	thumbHeight: Sizes.getThumbSize(),
};
