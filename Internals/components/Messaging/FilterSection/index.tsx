import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Icons} from 'theme';
import style from './style';

export enum MessagingFilterValues {
	Contacts = 'contacts',
	Recent = 'recent',
	Group = 'group',
}

export interface IMessagingFilterSectionProps {
	onSelectionChange: (value: MessagingFilterValues) => void;
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

export const MessagingFilterSection: React.SFC<IMessagingFilterSectionProps> = (props) => {
	const renderFilterButtons = () => {
		const ret: any = [];
		FILTER_BUTTONS_DATA.forEach((buttonData, index) => {
			const isButtonInactive = buttonData.value !== props.selectedOption;
			const textStyles = [style.buttonLabel, isButtonInactive ? style.buttonLabelInactive : {}];
			ret.push(
				<View style={style.buttonContainer} key={index}>
					<TouchableOpacity style={style.button} onPress={() => props.onSelectionChange(buttonData.value)}>
						<Image source={buttonData.icon} resizeMode={'contain'} style={style.buttonIcon} />
						<Text style={textStyles}>{buttonData.label}</Text>
					</TouchableOpacity>
				</View>,
			);
		});
		return ret;
	};

	return <View style={style.container}>{renderFilterButtons()}</View>;
};

MessagingFilterSection.defaultProps = {
	selectedOption: MessagingFilterValues.Contacts,
};
