// MIGRATION: we are going to use a schema library for all validations. this will be unused. consult serkan!
import PasswordValidator from 'password-validator';

const MIN_PASSWORD_LENGTH = 8;

export const PASSWORD_VALIDATOR_SCHEMA = new PasswordValidator()
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

export const PASSWORD_ERROR_MESSAGES: {[key: string]: string} = {
	min: 'register.password.min.length',
	uppercase: 'register.password.invalid.uppercase',
	lowercase: 'register.password.invalid.lowercase',
	digits: 'register.password.invalid.numbers',
	symbols: 'register.password.invalid.symbols',
};
