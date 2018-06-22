import PasswordValidator from 'password-validator';
import React from 'react';
import {Text, View} from 'react-native';

import {getText} from 'utilities';
import style from './style';

const MIN_PASSWORD_LENGTH = 8;
const MIN_LENGTH_VALIDATOR = new PasswordValidator().is().min(MIN_PASSWORD_LENGTH);
const LOWERCASE_VALIDATOR = new PasswordValidator().has().lowercase();
const UPPERCASE_VALIDATOR = new PasswordValidator().has().uppercase();
const DIGIT_VALIDATOR = new PasswordValidator().has().digits();
const SYMBOL_VALIDATOR = new PasswordValidator().has().symbols();

interface IValidationErrors {
	minLength: React.ReactElement<any> | null;
	pattern: React.ReactElement<any> | null;
}

interface IValidatedPasswordProps {
	validationErrors: IValidationErrors;
}

interface IWithValidationProps {
	value: string;
}

const getErrors = (value: string) => {
	const errors: IValidationErrors = {
		minLength: null,
		pattern: null,
	};
	if (value) {
		if (!MIN_LENGTH_VALIDATOR.validate(value)) {
			errors.minLength = (
				<Text style={style.errorText}>
					<Text style={style.boldText}>{getText('signupPasswordMinLength') + ' '}</Text>
					{MIN_PASSWORD_LENGTH}
				</Text>
			);
		}
		const patternMessages: string[] = [];
		if (!DIGIT_VALIDATOR.validate(value)) {
			patternMessages.push(getText('signupPasswordInvalidNumbers'));
		}
		if (!LOWERCASE_VALIDATOR.validate(value)) {
			patternMessages.push(getText('signupPasswordInvalidLowercase'));
		}
		if (!UPPERCASE_VALIDATOR.validate(value)) {
			patternMessages.push(getText('signupPasswordInvalidUppercase'));
		}
		if (!SYMBOL_VALIDATOR.validate(value)) {
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

const withValidationLogic = <P extends IValidatedPasswordProps>(
	Component: React.ComponentType<P>,
): React.SFC<IWithValidationProps> => ({value}: IWithValidationProps) => {
	return <Component validationErrors={getErrors(value)} />;
};

export const ValidatedPassword: React.SFC<IValidatedPasswordProps> = ({validationErrors}) => {
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

export default withValidationLogic(ValidatedPassword);
