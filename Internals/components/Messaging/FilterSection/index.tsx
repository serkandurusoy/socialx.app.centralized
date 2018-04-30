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
		return <View style={style.container}>{this.renderFilterButtons()}</View>;
	}

	private renderFilterButtons = () => {
		const ret: any = [];
		FILTER_BUTTONS_DATA.forEach((buttonData, index) => {
			const isButtonInactive = buttonData.value !== this.state.selectedOption;
			const textStyles = [style.buttonLabel, isButtonInactive ? style.buttonLabelInactive : {}];
			ret.push(
				<View style={style.buttonContainer} key={index}>
					<TouchableOpacity style={style.button} onPress={() => this.onNewFilterSelectedHandler(buttonData.value)}>
						<Image source={buttonData.icon} resizeMode={'contain'} style={style.buttonIcon} />
						<Text style={textStyles}>{buttonData.label}</Text>
					</TouchableOpacity>
				</View>,
			);
		});
		return ret;
	}

	private onNewFilterSelectedHandler = (filterValue: MessagingFilterValues) => {
		this.setState({
			selectedOption: filterValue,
		});
		this.props.onSelectionChange(filterValue);
	}
}
