import {boolean, color, number, select, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';

import React from 'react';
import {ChartListDataRow} from '../../App/screens/RewardsScreen/Components/ChartListDataRow';
import CenterView from '../CenterView';

storiesOf('ChartListDataRow', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('editable', () => {
		const badge = text('Badge', 'RFLS');
		const title = text('Title', 'Referrals');
		const percentageValue = text('Percentage value', '22');
		const selected = boolean('Selected', false);

		return <ChartListDataRow badge={badge} title={title} percentValue={percentageValue} isSelected={selected} />;
	});
