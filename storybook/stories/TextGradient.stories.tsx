import {text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {TextGradient} from '../../App/components/Displayers';
import {Colors, Fonts} from '../../App/theme';
import Sizes from '../../App/theme/Sizes';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('TextGradient', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('editable', () => {
		const gradientText = text('Text', 'Get rewarded');
		const textStyle = {
			...Fonts.centuryGothicBold,
			fontSize: Sizes.smartHorizontalScale(22),
			lineHeight: Sizes.smartHorizontalScale(83),
		};
		const colors = ['#039DE2', '#FF0099'];
		return <TextGradient text={gradientText} style={textStyle} colors={colors} />;
	});
