import {text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';

import React from 'react';
import {SettingCheckbox} from '../../App/components/SettingCheckbox';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('SettingCheckbox', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const title = text('Title', 'Mining (Beta)');
		const description = text('Description', 'Get rewarded for validating transactions within SocialX network');
		return <SettingCheckbox title={title} description={description} />;
	});
