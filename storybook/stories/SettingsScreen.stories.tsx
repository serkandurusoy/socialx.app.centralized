import {storiesOf} from '@storybook/react-native';
import React from 'react';
import SettingsScreen, {SettingsData} from '../../App/screens/SettingsScreen';
import {Images} from '../../App/theme';

const saveHandler = (data: SettingsData) => {
	alert('saveHandler');
	// console.log('Save data', data);
	// if (data.updatedAvatarLocalURL !== null) {
	// 	console.log('TODO: upload updated profile picture', data.updatedAvatarLocalURL)
	// }
};

storiesOf('SettingsScreen').add('demo', () => {
	const aboutText = 'This is my very start on the SocialX network';
	const firstName = 'Marcel';
	const lastName = 'Fussinger';
	const username = 'marcelfussinger';
	const email = 'marcel@socialx.network';
	const miningEnabled = false;
	return (
		<SettingsScreen
			avatarImage={Images.user_avatar_placeholder}
			aboutText={aboutText}
			firstName={firstName}
			lastName={lastName}
			username={username}
			email={email}
			miningEnabled={miningEnabled}
			saveChanges={saveHandler}
		/>
	);
});
