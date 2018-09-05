// MIGRATION: migrated to components/displayers

import React, {RefObject} from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {MediaObjectViewer} from 'components';
import style from './style';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface IMediaHorizontalScrollerProps {
	mediaURIs: string[];
}

const scrollView: RefObject<ScrollView> = React.createRef();

const onScrollContentSizeChange = () => {
	if (scrollView.current) {
		scrollView.current.scrollToEnd({animated: true});
	}
};

export const MediaHorizontalScroller: React.SFC<IMediaHorizontalScrollerProps> = ({mediaURIs}) => {
	return (
		<ScrollView
			ref={scrollView}
			contentContainerStyle={style.scrollContent}
			horizontal={true}
			alwaysBounceHorizontal={false}
			showsHorizontalScrollIndicator={false}
			onContentSizeChange={onScrollContentSizeChange}
		>
			{mediaURIs.map((mediaURI) => (
				<MediaObjectViewer
					key={mediaURI}
					uri={mediaURI}
					thumbOnly={true}
					style={[style.mediaObject, {width: mediaURIs.length > 1 ? SCREEN_WIDTH * 0.4 : SCREEN_WIDTH * 0.8}]}
				/>
			))}
		</ScrollView>
	);
};
