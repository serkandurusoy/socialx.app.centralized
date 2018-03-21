import React, {Component} from 'react';
import {View} from 'react-native';
import {ContactsList, IContactListItem} from '../../components/ContactsList';
import {MessagingFilterSection, MessagingFilterValues} from '../../components/MessagingFilterSection';
import style from './contacts.screen.style';

interface IContactsScreenTabProps {
	screenProps: {
		filterUpdatedHandler: (filterValue: MessagingFilterValues) => void;
		onContactSelect: (data: IContactListItem) => void;
		contactsList: IContactListItem[];
	};
}

export default class ContactsScreenTab extends Component<IContactsScreenTabProps, any> {
	public render() {
		return (
			<View style={style.container}>
				<MessagingFilterSection
					onSelectionChange={this.props.screenProps.filterUpdatedHandler}
					selectedOption={MessagingFilterValues.Contacts}
				/>
				<ContactsList
					listData={this.props.screenProps.contactsList}
					onContactSelect={this.props.screenProps.onContactSelect}
				/>
			</View>
		);
	}
}
