import {boolean, color, number, select, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';

import React from 'react';
import {ButtonSizes, SXButton} from '../../App/components/Button';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

storiesOf('Button', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('rounded, full width, pink bg', () => {
		const buttonLabel = text('Label', 'SocialX button');
		const width = number('Width', 0);
		const buttonDisabled = boolean('Disabled', false);
		return (
			<SXButton onPress={() => alert('click handler')} label={buttonLabel} disabled={buttonDisabled} width={width} />
		);
	})
	.add('with editable props', () => {
		const buttonLabel = text('Label', 'Disabled button');
		const width = number('Width', 200);
		const buttonDisabled = boolean('Disabled', true);
		const inputTypesOptions = JSON.parse(JSON.stringify(ButtonSizes));
		const buttonSize = select('Button size', inputTypesOptions, ButtonSizes.Normal);
		const autoWidth = boolean('Auto width', false);
		const borderColor = color('Border color', Colors.white);
		return (
			<SXButton
				onPress={() => alert('Click handler won\'t execute when disabled!')}
				label={buttonLabel}
				disabled={buttonDisabled}
				width={width}
				size={buttonSize}
				autoWidth={autoWidth}
				borderColor={borderColor}
			/>
		);
	});
