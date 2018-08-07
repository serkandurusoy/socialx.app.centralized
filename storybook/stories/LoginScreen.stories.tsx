import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Keyboard} from 'react-native';

import LoginScreenComponent from '../../App/screens/LoginScreen/screen';

const onSmsCodeConfirmed = (code: string) => {
	alert('onSmsCodeConfirmed: ' + code);
};

const onSmsCodeDeclined = () => {
	alert('onSmsCodeDeclined');
};

const onSmsCodeResend = () => {
	alert('onSmsCodeResend');
};

const onStartLogin = async (username: string, password: string) => {
	console.log('onStartLogin', username, password);
	Keyboard.dismiss();
	return new Promise((resolve) => setTimeout(resolve, 1500));
};

const onNavigateToPasswordForgot = () => {
	alert('onNavigateToPasswordForgot');
};

const onNavigateToRegister = () => {
	alert('onNavigateToRegister');
};

const onNavigateToUploadKey = () => {
	alert('onNavigateToUploadKey');
};

storiesOf('LoginScreen', module)
	.addDecorator(withKnobs)
	.add('demo', () => {
		const showModalForSMSCode = boolean('Show SMS code modal', false);
		const phoneNumber = text('Phone number', '+40721205279');
		return (
			<LoginScreenComponent
				showModalForSMSCode={showModalForSMSCode}
				phoneNumber={phoneNumber}
				onSmsCodeConfirmed={onSmsCodeConfirmed}
				onSmsCodeDeclined={onSmsCodeDeclined}
				onSmsCodeResend={onSmsCodeResend}
				onStartLogin={onStartLogin}
				onNavigateToPasswordForgot={onNavigateToPasswordForgot}
				onNavigateToRegister={onNavigateToRegister}
				onNavigateToUploadKey={onNavigateToUploadKey}
			/>
		);
	});
