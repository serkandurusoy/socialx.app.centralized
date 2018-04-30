import {ContactsList, IContactListItem, MessagingFilterSection, MessagingFilterValues} from 'components';
import React, {Component} from 'react';
import {View} from 'react-native';
import style from './contacts.screen.style';

interface IContactsScreenTabProps {
	filterUpdatedHandler: (filterValue: MessagingFilterValues) => void;
	onContactSelect: (data: IContactListItem) => void;
	contactsList: IContactListItem[];
}

const ContactsScreenTab: React.SFC<IContactsScreenTabProps> = (props) => {
	return (
		<View style={style.container}>
			<MessagingFilterSection onSelectionChange={props.filterUpdatedHandler} />
			<ContactsList listData={props.contactsList} onContactSelect={props.onContactSelect} />
		</View>
	);
};

export default ContactsScreenTab;
