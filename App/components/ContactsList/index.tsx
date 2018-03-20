import AlphabetListView from '@hawkrives/react-native-alphabetlistview';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import style, {LIST_ITEM_HEIGHT, SECTION_HEADER_HEIGHT} from './style';

export interface IContactListItem {
	name: string;
	avatarURL: string;
}

interface IContactListItemProps {
	item: IContactListItem;
	onSelect: (data: IContactListItem) => void;
}

interface IContactListSectionItemRightProps {
	title: string;
}

interface IContactListSectionHeaderProps {
	title: string;
}

interface IContactsListProps {
	listData: IContactListItem[];
	onContactSelect: (data: IContactListItem) => void;
}

const ContactListItem: React.SFC<IContactListItemProps> = (props) => {
	return (
		<TouchableOpacity style={style.contactListItemCell} onPress={() => props.onSelect(props.item)}>
			<Image source={{uri: props.item.avatarURL}} style={style.avatarImg} />
			<Text style={style.fullName}>{props.item.name}</Text>
		</TouchableOpacity>
	);
};

const ContactListSectionItemRight: React.SFC<IContactListSectionItemRightProps> = (props) => {
	return <Text style={style.alphabetListItem}>{props.title}</Text>;
};

const ContactListSectionHeader: React.SFC<IContactListSectionHeaderProps> = (props) => {
	return (
		<View style={style.sectionHeaderContainer}>
			<Text style={style.sectionHeaderText}>{props.title}</Text>
		</View>
	);
};

export const ContactsList: React.SFC<IContactsListProps> = (props) => {
	const contactsListSorted = props.listData.sort((item1: IContactListItem, item2: IContactListItem) => {
		let ret = 0;
		if (item1.name < item2.name) {
			ret = -1;
		} else if (item1.name > item2.name) {
			ret = 1;
		}
		return ret;
	});

	const getFormattedData = (contactsList: IContactListItem[]) => {
		const ret: any = {};
		contactsList.forEach((contact: IContactListItem) => {
			const nameInitial = contact.name.substr(0, 1).toUpperCase();
			if (!ret.hasOwnProperty(nameInitial)) {
				ret[nameInitial] = [];
			}
			ret[nameInitial].push(contact);
		});
		return ret;
	};

	return (
		<AlphabetListView
			style={style.listElement}
			data={getFormattedData(contactsListSorted)}
			cell={ContactListItem}
			onCellSelect={props.onContactSelect}
			cellHeight={LIST_ITEM_HEIGHT}
			sectionListItem={ContactListSectionItemRight}
			sectionHeader={ContactListSectionHeader}
			sectionHeaderHeight={SECTION_HEADER_HEIGHT}
		/>
	);
};
