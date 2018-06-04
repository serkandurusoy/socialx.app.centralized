import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Icons} from 'theme';
import style from './style';

export enum MessagingFilterValues {
	Contacts = 'contacts',
	Recent = 'recent',
	Group = 'group',
}

interface IMessagingFilterSectionProps {
	onSelectionChange: (value: MessagingFilterValues) => void;
}

interface IMessagingFilterSectionState {
	selectedOption: MessagingFilterValues;
}

const FILTER_BUTTONS_DATA = [
	{
		label: 'Contacts',
		icon: Icons.messagingContactsFilterIcon,
		value: MessagingFilterValues.Contacts,
	},
	{
		label: 'Recent',
		icon: Icons.messagingRecentFilterIcon,
		value: MessagingFilterValues.Recent,
	},
	{
		label: 'Group',
		icon: Icons.messagingGroupFilterIcon,
		value: MessagingFilterValues.Group,
	},
];

export class MessagingFilterSection extends React.Component<
	IMessagingFilterSectionProps,
	IMessagingFilterSectionState
> {
	public state = {
		selectedOption: MessagingFilterValues.Contacts,
	};

	public render() {
		return (
			<View style={style.container}>
				{FILTER_BUTTONS_DATA.map((buttonData, index) => (
					<View style={style.buttonContainer} key={index}>
						<TouchableOpacity style={style.button} onPress={() => this.onNewFilterSelectedHandler(buttonData.value)}>
							<Image source={buttonData.icon} resizeMode={'contain'} style={style.buttonIcon} />
							<Text
								style={[
									style.buttonLabel,
									buttonData.value !== this.state.selectedOption ? style.buttonLabelInactive : {},
								]}
							>
								{buttonData.label}
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</View>
		);
	}

	private onNewFilterSelectedHandler = (filterValue: MessagingFilterValues) => {
		this.setState({
			selectedOption: filterValue,
		});
		this.props.onSelectionChange(filterValue);
	};
}
