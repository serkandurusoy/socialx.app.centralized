import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {MessagingFilterSection, MessagingFilterValues} from 'components/Messaging';
import {Colors} from 'theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

const filterUpdatedHandler = (filterValue: MessagingFilterValues) => {
	alert('Was selected: ' + filterValue);
};

storiesOf('Messaging filter', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('section', () => {
		return (
			<MessagingFilterSection
				onSelectionChange={filterUpdatedHandler}
				selectedOption={MessagingFilterValues.Contacts}
			/>
		);
	});
