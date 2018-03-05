import {boolean, color, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {UserAvatar} from '../../App/components/UserAvatar';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('UserAvatar')
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const avatarURL = text(
			'User avatar URL',
			'https://www.exclutips.com/wp-content/uploads/2015/08/wordpress-custom-user-avatar.png',
		);
		const fullName = text('User full name', 'Lester Wheeler');
		const fullNameColor = color('Full name color', Colors.userAvatarFullName);
		const username = text('Username', 'LesterWheeler');
		const usernameColor = color('Username color', Colors.postText);
		return (
			<UserAvatar
				avatarURL={{uri: avatarURL}}
				fullName={fullName}
				username={username}
				fullNameColor={fullNameColor}
				usernameColor={usernameColor}
			/>
		);
	});
