import AlphabetListView from '@hawkrives/react-native-alphabetlistview';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import style, {LIST_ITEM_HEIGHT, SECTION_HEADER_HEIGHT} from './style';

const INITIALS = String.fromCharCode(...Array(91).keys()).slice(65).split('');

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

const ContactListItem: React.SFC<IContactListItemProps> = ({item, onSelect}) => {
	return (
		<TouchableOpacity style={style.contactListItemCell} onPress={() => onSelect(item)}>
			<Image source={{uri: item.avatarURL}} style={style.avatarImg}/>
			<Text style={style.fullName}>{item.name}</Text>
		</TouchableOpacity>
	);
};

const ContactListSectionItemRight: React.SFC<IContactListSectionItemRightProps> = ({title}) => {
	return <Text style={style.alphabetListItem}>{title}</Text>;
};

const ContactListSectionHeader: React.SFC<IContactListSectionHeaderProps> = (props) => {
	const sectionTitle = props.title;
	return (
		<View style={style.sectionHeaderContainer}>
			<Text style={style.sectionHeaderText}>{sectionTitle}</Text>
		</View>
	);
};

const sortContactsList = (listData: IContactListItem[]) => {
	// TODO: we can skip this if list comes sorted by name from server side!
	return listData.sort((item1: IContactListItem, item2: IContactListItem) => {
		let ret = 0;
		if (item1.name < item2.name) {
			ret = -1;
		} else if (item1.name > item2.name) {
			ret = 1;
		}
		return ret;
	});
};

const partitionByInitial = (listData: IContactListItem[]) => {
	const ret: any = {};
	INITIALS.forEach((value: string) => {
		ret[value] = [];
	});
	ret['#'] = [];
	sortContactsList(listData).forEach((contact: IContactListItem) => {
		const nameInitial = contact.name.substr(0, 1).toUpperCase();
		ret[INITIALS.includes(nameInitial) ? nameInitial : '#'].push(contact);
	});
	return ret;
};

export const ContactsList: React.SFC<IContactsListProps> = ({listData, onContactSelect}) => (
	<AlphabetListView
		style={style.listElement}
		data={partitionByInitial(listData)}
		cell={ContactListItem}
		onCellSelect={onContactSelect}
		cellHeight={LIST_ITEM_HEIGHT}
		/* TODO: any custom style will affect list go to section */
		// sectionListStyle={{justifyContent: 'space-around', paddingVertical: 10}}
		sectionListItem={(props: IContactListSectionItemRightProps) => (
			<ContactListSectionItemRight {...props}/>
		)}
		sectionHeader={ContactListSectionHeader}
		sectionHeaderHeight={SECTION_HEADER_HEIGHT}
	/>
);
