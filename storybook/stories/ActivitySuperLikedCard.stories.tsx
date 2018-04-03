import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {ActivitySuperLikedCard, ActivitySuperLikedCardPosts} from '../../App/components/ActivitySuperLikedCard';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

const groupConfirmedHandler = () => {
	alert('groupConfirmedHandler');
};

const getThumbsForFivePosts = (): ActivitySuperLikedCardPosts[] => {
	return [
		{
			postThumbURL: 'https://placeimg.com/130/130/arch',
			postId: '130',
		},
		{
			postThumbURL: 'https://placeimg.com/131/131/arch',
			postId: '131',
		},
		{
			postThumbURL: 'https://placeimg.com/132/132/arch',
			postId: '132',
		},
		{
			postThumbURL: 'https://placeimg.com/133/133/arch',
			postId: '133',
		},
		{
			postThumbURL: 'https://placeimg.com/135/135/arch',
			postId: '134',
		},
	];
};

const profilePhotoPressedHandler = (postId: string) => {
	alert('profilePhotoPressedHandler for ID ' + postId);
};

storiesOf('Activity Superliked card', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('editable', () => {
		const avatarURL = text('User avatar URL', 'https://placeimg.com/152/152/tech');
		const fullName = text('User full name', 'Cory Maxwell');
		return (
			<ActivitySuperLikedCard
				avatarURL={avatarURL}
				fullName={fullName}
				timestamp={new Date(2018, 2, 12, 3, 32, 11)}
				wallPosts={getThumbsForFivePosts()}
				onThumbPress={profilePhotoPressedHandler}
			/>
		);
	});
