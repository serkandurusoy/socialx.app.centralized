import {date, number, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {CommentCard} from '../../App/components/Displayers';
import {Colors} from '../../App/theme/';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

const SAMPLE_COMMENT = {
	text: 'This is some very long text comment. It should be displayed on multiple lines',
	user: {
		fullName: 'Ionut Movila',
		avatarURL: 'https://placeimg.com/101/101/any',
	},
	timestamp: new Date(2018, 3, 11, 11, 10),
	numberOfLikes: 3,
	replies: [
		{
			text: 'Hey Ionut, I might be there for this launch event',
			user: {
				fullName: 'John Smith',
				avatarURL: 'https://placeimg.com/103/103/people',
			},
			timestamp: new Date('Mar 24 2018'),
			numberOfLikes: 1,
		},
		{
			text: 'Hey Ionut, I might be there for this launch event',
			user: {
				fullName: 'Derek Hammond long name that I have',
				avatarURL: 'https://placeimg.com/106/106/any',
			},
			timestamp: new Date('Apr 11 2018'),
			numberOfLikes: 3,
		},
		{
			text: 'Hey Ionut, I might be there for this launch event',
			user: {
				fullName: 'John Smith',
				avatarURL: 'https://placeimg.com/103/103/people',
			},
			timestamp: new Date('Mar 24 2018'),
			numberOfLikes: 1,
		},
		{
			text: 'Last reply from @Ionut, I might be there for this launch event',
			user: {
				fullName: 'Derek1 Hammond long name that I have',
				avatarURL: 'https://placeimg.com/106/106/any',
			},
			timestamp: new Date('Apr 11 2018'),
			numberOfLikes: 3,
		},
	],
};

storiesOf('CommentCard', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with replies', () => {
		return <CommentCard comment={SAMPLE_COMMENT} />;
	});
