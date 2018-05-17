import {storiesOf} from '@storybook/react-native';
import React from 'react';

import {GovernanceCard} from 'components';
import {Colors} from 'theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('GovernanceCard', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.add('default', () => {
		return <GovernanceCard />;
	});
