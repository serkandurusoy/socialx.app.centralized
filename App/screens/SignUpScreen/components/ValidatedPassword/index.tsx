import PasswordValidator from 'password-validator';
import React from 'react';
import {Text, View} from 'react-native';

import {getText} from 'utilities';
import style from './style';

const MIN_PASSWORD_LENGTH = 8;
const VALIDATOR_SCHEMA = new PasswordValidator()
	.is()
	.min(MIN_PASSWORD_LENGTH)
	.has()
	.lowercase()
	.has()
	.uppercase()
	.has()
	.digits()
	.has()
	.symbols();

const ERROR_MESSAGES: {[key: string]: string} = {
	min: getText('signup.password.min.length') + ' ' + MIN_PASSWORD_LENGTH,
	uppercase: getText('signup.password.invalid.uppercase'),
	lowercase: getText('signup.password.invalid.lowercase'),
	digits: getText('signup.password.invalid.numbers'),
	symbols: getText('signup.password.invalid.symbols'),
};

interface IValidatedPasswordProps {
	validationErrors: string[];
}

interface IWithValidationProps {
	value: string;
}

const getErrors = (value: string) => {
	if (value) {
		const errors = VALIDATOR_SCHEMA.validate(value, {list: true});
		return errors.map((error: string) => ERROR_MESSAGES[error]);
	}
	return [];
};

const withValidationLogic = <P extends IValidatedPasswordProps>(
	Component: React.ComponentType<P>,
): React.SFC<IWithValidationProps> => ({value}: IWithValidationProps) => {
	return <Component validationErrors={getErrors(value)} />;
};

export const ValidatedPassword: React.SFC<IValidatedPasswordProps> = ({validationErrors}) => {
	if (validationErrors.length > 0) {
		return (
			<View style={style.errorContainer}>
				<Text style={style.errorText}>
					<Text style={style.boldText}>{`${getText('signup.password.invalid.policy')}: `}</Text>
					{validationErrors.join(', ')}
				</Text>
			</View>
		);
	}
	return null;
};

export default withValidationLogic(ValidatedPassword);
