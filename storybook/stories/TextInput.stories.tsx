import {boolean, color, number, select, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {SXTextInput} from '../../App/components/TextInput';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

storiesOf('SXTextInput')
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('default, no icon', () => {
		return <SXTextInput placeholder={'Enter some text here'} />;
	})
	.add('default, user icon', () => {
		return <SXTextInput iconColor={Colors.darkGray} icon={'user'} placeholder={'Enter some text here'} />;
	})
	.add('password, lock icon', () => {
		return (
			<SXTextInput isPassword={true} iconColor={Colors.darkGray} icon={'lock'} placeholder={'Enter your password'} />
		);
	})
	.add('with editable props', () => {
		const isPassword = boolean('Password input', false);
		const iconName = text('Icon name', 'apple');
		const disabled = boolean('Input disabled', false);
		const placeholder = text('Placeholder text', 'Enter text');
		// prettier-ignore
		const inputTypesOptions = {
			'default': 'Default',
			'numeric': 'Numeric',
			'email-address': 'Email',
		};
		const keyboardType = select('Input type', inputTypesOptions, 'default');
		const iconColor = color('Icon color', Colors.darkGray);
		const width = number('Width', 0);
		const returnKeyOptions = {
			done: 'Done',
			search: 'Search',
			next: 'Next',
			send: 'Send',
			go: 'Go',
		};
		const returnKeyType = select('Return key', returnKeyOptions, 'done');
		const cancelButtonTextColor = color('Cancel button color', Colors.white);
		const canCancel = boolean('Show cancel button', false);
		return (
			<SXTextInput
				keyboardType={keyboardType}
				returnKeyType={returnKeyType}
				iconColor={iconColor}
				isPassword={isPassword}
				disabled={disabled}
				icon={iconName}
				placeholder={placeholder}
				width={width}
				cancelButtonTextColor={cancelButtonTextColor}
				canCancel={canCancel}
			/>
		);
	});
