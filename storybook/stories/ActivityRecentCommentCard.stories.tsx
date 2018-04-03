import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {
	ActivityRecentCommentCard,
	ActivityRecentCommentCardPosts,
} from '../../App/components/ActivityRecentCommentCard';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

const groupConfirmedHandler = () => {
	alert('groupConfirmedHandler');
};

const getThumbsForFivePosts = (): ActivityRecentCommentCardPosts[] => {
	return [
		{
			postThumbURL: 'https://placeimg.com/140/140/nature',
			postId: '11',
		},
		{
			postThumbURL: 'https://placeimg.com/141/141/nature',
			postId: '22',
		},
		{
			postThumbURL: 'https://placeimg.com/142/142/nature',
			postId: '33',
		},
		{
			postThumbURL: 'https://placeimg.com/143/143/nature',
			postId: '44',
		},
		{
			postThumbURL: 'https://placeimg.com/144/144/nature',
			postId: '55',
		},
	];
};

const postThumbPressedHandler = (postId: string) => {
	alert('postThumbPressedHandler for ID ' + postId);
};

storiesOf('Activity recent comment', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('editable', () => {
		const avatarURL = text('User avatar URL', 'https://placeimg.com/150/150/tech');
		const fullName = text('User full name', 'Seth Saunders');
		return (
			<ActivityRecentCommentCard
				avatarURL={avatarURL}
				fullName={fullName}
				timestamp={new Date('Feb 20 2018')}
				wallPosts={getThumbsForFivePosts()}
				onThumbPress={postThumbPressedHandler}
			/>
		);
	});
