import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import {ModalWallet} from 'components/Modals';
import React from 'react';
import {Colors} from 'theme';
import SXBlurView from '../SXBlurView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('ModalWallet', module)
	.addDecorator((getStory: any) => <SXBlurView style={containerStyle}>{getStory()}</SXBlurView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const visible = boolean('Visible', true);
		const value = text('Value', 'ceva');

		return <ModalWallet visible={visible} value={value} />;
	});
