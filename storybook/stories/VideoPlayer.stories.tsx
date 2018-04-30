import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import {VideoPlayer} from 'components/Interaction/VideoPlayer';
import React from 'react';
import {Colors} from 'theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('VideoPlayer', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		// const videoURL = 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4';
		const videoURL = 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4';
		return <VideoPlayer videoURL={videoURL} />;
	});
