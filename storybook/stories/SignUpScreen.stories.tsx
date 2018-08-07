import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Keyboard} from 'react-native';

import SignUpScreenComponent from '../../App/screens/SignUpScreen/screen';

// const onSmsCodeConfirmed = (code: string) => {
// 	alert('onSmsCodeConfirmed: ' + code);
// };

const onAlreadyHaveCode = () => {
	alert('onAlreadyHaveCode');
};

const onNavigateToTermsAndConditions = () => {
	alert('onNavigateToTermsAndConditions');
};
const onStartRegister = async (username: string, password: string) => {
	console.log('onStartRegister', username, password);
	Keyboard.dismiss();
	return new Promise((resolve) => setTimeout(resolve, 1500));
};

storiesOf('SignUp screen', module)
	.addDecorator(withKnobs)
	.add('demo', () => {
		// const showModalForSMSCode = boolean('Show SMS code modal', false);
		// const phoneNumber = text('Phone number', '+40721205279');
		return (
			<SignUpScreenComponent
				onAlreadyHaveCode={onAlreadyHaveCode}
				onNavigateToTermsAndConditions={onNavigateToTermsAndConditions}
			/>
		);
	});
