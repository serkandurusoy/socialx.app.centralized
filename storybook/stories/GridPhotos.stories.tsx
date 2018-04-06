import {number, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {GridPhotos} from '../../App/components/Displayers';
import {Colors, Sizes} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

const getPhotosStartingWithIndex = (numberOfResults: number, maxResults: number) => {
	const ret = [];
	const endIndex = currentIndex + numberOfResults;
	for (let i = currentIndex; i < endIndex; i++) {
		if (currentIndex < maxResults) {
			ret.push({
				url: 'https://avatars2.githubusercontent.com/u/' + i,
				index: i,
			});
			currentIndex++;
		}
	}
	return ret;
};

let currentIndex = 0;

storiesOf('GridPhotos', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with github avatars', () => {
		const pageSize = number('Page size', 30);
		const maxResults = number('Max. number of photos', 500);
		const thumbSize = number('Thumb size', Sizes.getThumbSize());
		return (
			<GridPhotos
				loadMorePhotos={() => getPhotosStartingWithIndex(pageSize, maxResults)}
				itemPressed={(index) => alert('Photo pressed ' + index)}
				pageSize={pageSize}
				thumbSize={thumbSize}
			/>
		);
	});
