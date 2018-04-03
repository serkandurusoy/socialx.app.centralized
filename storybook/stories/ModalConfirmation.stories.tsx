import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {ModalConfirmation} from '../../App/components/ModalConfirmation';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('ModalConfirmation', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const visible = boolean('Visible', true);
		const title = text('Title', 'Important step');
		/* tslint:disable-next-line */
		const message = text(
			'Message',
			'Please save in a safe place ypur private key. In case it is lost we will not be able to recover your account!',
		);
		const confirmButton = text('Confirm button', 'Oky');
		const cancelButton = text('Cancel button', 'Reject');
		return (
			<ModalConfirmation
				visible={visible}
				title={title}
				message={message}
				confirmButton={confirmButton}
				cancelButton={cancelButton}
			/>
		);
	});
