import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {SettingsData} from '../../App/screens/SettingsScreen';
import SettingsScreenComponent from '../../App/screens/SettingsScreen/screen';

const saveHandler = (data: SettingsData) => {
	alert('saveHandler: ' + JSON.stringify(data));
};

storiesOf('SettingsScreen', module).add('with random Github user', () => {
	const aboutText = 'This is my very start on the SocialX network';
	const firstName = 'Marcel';
	const lastName = 'Fussinger';
	const username = 'marcelfussinger';
	const email = 'marcel@socialx.network';
	const miningEnabled = false;
	const avatarImage = {uri: 'https://avatars2.githubusercontent.com/u/' + Math.round(Math.random() * 10000)};
	return (
		<SettingsScreenComponent
			aboutText={aboutText}
			firstName={firstName}
			lastName={lastName}
			email={email}
			miningEnabled={miningEnabled}
			avatarImage={avatarImage}
			username={username}
			onSaveChanges={saveHandler}
		/>
	);
});
