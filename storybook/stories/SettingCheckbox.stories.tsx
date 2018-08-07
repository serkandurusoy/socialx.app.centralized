import {text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';

import {SettingCheckbox} from 'components/Inputs';
import React from 'react';
import {Colors} from 'theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('SettingCheckbox', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('toggle on', () => {
		const title = text('Title', 'Mining (Beta)');
		const description = text('Description', 'Get rewarded for validating transactions within SocialX network');
		return <SettingCheckbox title={title} description={description} value={true} />;
	})
	.add('toggle off', () => {
		const title = text('Title', 'Mining (Beta)');
		const description = text('Description', 'Get rewarded for validating transactions within SocialX network');
		return <SettingCheckbox title={title} description={description} value={false} />;
	});
