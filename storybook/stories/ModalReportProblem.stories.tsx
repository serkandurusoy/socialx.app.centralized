import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {ModalReportProblem} from '../../App/components/ModalReportProblem';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('ModalReportProblem')
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const visible = boolean('Visible', true);
		return (
			<ModalReportProblem
				visible={visible}
			/>
		);
	});
