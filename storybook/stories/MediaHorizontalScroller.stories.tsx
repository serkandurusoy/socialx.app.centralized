import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {View} from 'react-native';

import {MediaHorizontalScroller} from 'components';
import CenterView from '../CenterView';

const getRandomMediaPhotos = (limit: number) => {
	return new Array(limit).fill(0).map((value) => {
		const randWidth = Math.round(Math.random() * 500) + 600;
		const randHeight = Math.round(Math.random() * 500) + 600;
		return `https://placeimg.com/${randWidth}/${randHeight}/any`;
	});
};

storiesOf('MediaHorizontalScroller', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('default', () => {
		return (
			<View style={{width: '100%', height: 150}}>
				<MediaHorizontalScroller mediaURIs={getRandomMediaPhotos(3)} />
			</View>
		);
	});
