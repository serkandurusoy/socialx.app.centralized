import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {ModalCreateGroup} from '../../App/components/ModalCreateGroup';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
};

storiesOf('ModalCreateGroup', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const visible = boolean('Visible', true);
		const title = text('Title', 'Important step');
		const groupPlaceholder = text('groupPlaceholder', 'Group name');
		const messagePlaceholder = text('descriptionPlaceholder', 'Description');
		return (
			<ModalCreateGroup
				visible={visible}
				title={title}
				groupPlaceholder={groupPlaceholder}
				descriptionPlaceholder={messagePlaceholder}
			/>
		);
	});
