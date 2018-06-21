import React from 'react';
import {Text, View} from 'react-native';

import {getText} from 'utilities';
import style from './style';

const MIN_PASSWORD_LENGTH = 8;
const DIGIT_REGEX = new RegExp('[0-9]');
const LOWERCASE_REGEX = new RegExp('[a-z]');
const UPPERCASE_REGEX = new RegExp('[A-Z]');
const SYMBOLS_REGEX = new RegExp('[^\\w\\s]+');

interface IValidatedPasswordProps {
	value: string;
}

interface IValidationErrors {
	minLength: React.ReactElement<any> | null;
	pattern: React.ReactElement<any> | null;
}

const getErrors = (value: string) => {
	const errors: IValidationErrors = {
		minLength: null,
		pattern: null,
	};
	if (value) {
		if (value.length < MIN_PASSWORD_LENGTH) {
			errors.minLength = (
				<Text style={style.errorText}>
					<Text style={style.boldText}>{getText('signupPasswordMinLength') + ' '}</Text>
					{MIN_PASSWORD_LENGTH}
				</Text>
			);
		}
		const patternMessages: string[] = [];
		if (!DIGIT_REGEX.test(value)) {
			patternMessages.push(getText('signupPasswordInvalidNumbers'));
		}
		if (!LOWERCASE_REGEX.test(value)) {
			patternMessages.push(getText('signupPasswordInvalidLowercase'));
		}
		if (!UPPERCASE_REGEX.test(value)) {
			patternMessages.push(getText('signupPasswordInvalidUppercase'));
		}
		if (!SYMBOLS_REGEX.test(value)) {
			patternMessages.push(getText('signupPasswordInvalidSymbols'));
		}
		if (patternMessages.length > 0) {
			errors.pattern = (
				<Text style={style.errorText}>
					<Text style={style.boldText}>{getText('signupPasswordInvalidPolicy') + ' '}</Text>
					{patternMessages.join(', ')}
				</Text>
			);
		}
	}
	return errors;
};

export const ValidatedPassword: React.SFC<IValidatedPasswordProps> = ({value}) => {
	const validationErrors = getErrors(value);
	if (validationErrors.minLength || validationErrors.pattern) {
		return (
			<View style={style.errorContainer}>
				{validationErrors.minLength && validationErrors.minLength}
				{validationErrors.pattern && <Text style={style.errorText}>{validationErrors.pattern}</Text>}
			</View>
		);
	}
	return null;
};
