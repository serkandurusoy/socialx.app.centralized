import {boolean, color, number, select, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';

import React from 'react';
import {UnderPieLineComponentProps} from '../../App/screens/RewardsScreen/Components/UnderPieLineComponent';
import CenterView from '../CenterView';

storiesOf('PieChart')
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('UnderPieLine', () => {
		const left = text('Value', 'RFLS');
		const center = text('Value', 'Referrals');
		const right = text('Value', '22');

		return <UnderPieLineComponentProps left={left} center={center} right={right} />;
	});
