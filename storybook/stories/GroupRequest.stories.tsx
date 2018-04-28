import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {GroupRequest} from 'components/Displayers';
import {Colors} from 'theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

const groupConfirmedHandler = () => {
	alert('groupConfirmedHandler');
};

storiesOf('GroupRequest', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const avatarURL = text('User avatar URL', 'https://placeimg.com/150/150/tech');
		const fullName = text('User full name', 'Claudia Kulmitzer');
		const groupName = text('Group name', 'MfMJAkkAs2jLISYyv');
		return (
			<GroupRequest
				avatarURL={avatarURL}
				fullName={fullName}
				groupName={groupName}
				onGroupConfirmed={groupConfirmedHandler}
			/>
		);
	});
