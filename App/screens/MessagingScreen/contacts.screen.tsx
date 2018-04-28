import {ContactsList, IContactListItem, MessagingFilterSection, MessagingFilterValues} from 'components';
import React, {Component} from 'react';
import {View} from 'react-native';
import style from './contacts.screen.style';

interface IContactsScreenTabProps {
	filterUpdatedHandler: (filterValue: MessagingFilterValues) => void;
	onContactSelect: (data: IContactListItem) => void;
	contactsList: IContactListItem[];
}

export default class ContactsScreenTab extends Component<IContactsScreenTabProps, any> {
	public render() {
		return (
			<View style={style.container}>
				<MessagingFilterSection
					onSelectionChange={this.props.filterUpdatedHandler}
					selectedOption={MessagingFilterValues.Contacts}
				/>
				<ContactsList listData={this.props.contactsList} onContactSelect={this.props.onContactSelect} />
			</View>
		);
	}
}
