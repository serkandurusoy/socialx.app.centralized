import {storiesOf} from '@storybook/react-native';

import {DotsMenuButton, DotsMenuModal} from 'components';
import React from 'react';
import CenterView from '../CenterView';

storiesOf('DotsMenu', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('Dots icon', () => {
		return (
			<DotsMenuButton
				iconColor='#fff'
				iconName='ios-more'
				onPress={() => {
					/**/
				}}
			/>
		);
	})
	.add('Dots modal with items', () => {
		let visible = true;
		const items = [
			{
				label: 'Button 1',
				icon: 'ios-basketball',
				actionHandler: () => {
					/**/
				},
			},
			{
				label: 'Button 2',
				icon: 'ios-basketball',
				actionHandler: () => {
					/**/
				},
			},
			{
				label: 'Button 3',
				icon: 'ios-basketball',
				actionHandler: () => {
					/**/
				},
			},
			{
				label: 'Button 4',
				icon: 'ios-basketball',
				actionHandler: () => {
					/**/
				},
			},
		];
		const onBackDropPress = () => {
			visible = false;
		};
		return <DotsMenuModal visible={visible} items={items} onBackdropPress={onBackDropPress} />;
	});
