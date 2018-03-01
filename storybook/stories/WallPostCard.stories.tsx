import {date, number, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {WallPostCard} from '../../App/components/WallPostCard';
import {Colors} from '../../App/theme/';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

storiesOf('WallPostCard')
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const postText = text(
			'Post text',
			/* tslint:disable-line */ 'This is a very long text that will be truncated and only the first 3 lines will be displayed. Then ellipsis will show to indicate that more text is hidden.  To a general advertiser outdoor advertising is worthy of consideration',
		);
		const imageSource = text('Post image URL', 'https://c1.staticflickr.com/8/7378/13997705508_a218e00c81_b.jpg');
		const smallAvatar = text('User small avatar URL', 'https://s.yimg.com/pw/images/buddyicon00.png');
		const fullName = text('User full name', 'Tom Thompson');
		const defaultTimestamp = new Date('Jan 20 2018');
		const timestamp = date('Timestamp', defaultTimestamp);
		const numberOfLikes = number('Number of Likes', 122);
		const numberOfSuperLikes = number('Number of SuperLikes', 5);
		const numberOfComments = number('Number of Comments', 2);
		const numberOfWalletCoins = number('Your Wallet Coins', 42);
		return (
			<WallPostCard
				text={postText}
				imageSource={imageSource}
				smallAvatar={smallAvatar}
				fullName={fullName}
				timestamp={timestamp}
				numberOfLikes={numberOfLikes}
				numberOfSuperLikes={numberOfSuperLikes}
				numberOfComments={numberOfComments}
				numberOfWalletCoins={numberOfWalletCoins}
			/>
		);
	});
