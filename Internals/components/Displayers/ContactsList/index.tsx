import AlphabetListView from '@hawkrives/react-native-alphabetlistview';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import style, {LIST_ITEM_HEIGHT, SECTION_HEADER_HEIGHT} from './style';

// other versions that I tried here were not working on android, when dev. mode disconnected :(
const ALPHABET_LETTERS = String.fromCharCode(...Array.from({length: 26}, (v, k) => k + 65)).split('');

export interface IContactListItem {
	name: string;
	avatarURL: string;
}

interface IContactListItemProps {
	item: IContactListItem;
	onSelect: (data: IContactListItem) => void;
}

interface ISectionWithData {
	hasData: boolean;
}

interface IContactListSectionItemRightProps extends ISectionWithData {
	title: string;
}

interface IContactListSectionHeaderProps extends ISectionWithData {
	title: string;
}

interface IContactsListProps {
	listData: IContactListItem[];
	onContactSelect: (data: IContactListItem) => void;
}

const ContactListItem: React.SFC<IContactListItemProps> = ({item, onSelect}) => (
	<TouchableOpacity style={style.contactListItemCell} onPress={() => onSelect(item)}>
		<Image source={{uri: item.avatarURL}} style={style.avatarImg} />
		<Text style={style.fullName}>{item.name}</Text>
	</TouchableOpacity>
);

const ContactListSectionItemRight: React.SFC<IContactListSectionItemRightProps> = ({title, hasData}) => (
	<View style={style.alphabetView}>
		<Text style={[style.alphabetListItem, !hasData ? style.alphabetListItemDisabled : {}]}>{title}</Text>
	</View>
);

const ContactListSectionHeader: React.SFC<IContactListSectionHeaderProps> = ({title, hasData}) => (
	// Here is !hasData we should return null, to have an section header hidden,
	// but that will affect side scrolling logic.
	// Other option is to set enableEmptySections to false on AlphabetListView,
	// but that is deprecated and will trigger warnings!
	<View style={style.sectionHeaderContainer}>
		<Text style={style.sectionHeaderText}>{title}</Text>
	</View>
);

// TODO: we can skip this if list comes sorted by name from server side!
const sortContactsList = (listData: IContactListItem[]) =>
	listData.sort((item1: IContactListItem, item2: IContactListItem) => {
		let ret = 0;
		if (item1.name < item2.name) {
			ret = -1;
		} else if (item1.name > item2.name) {
			ret = 1;
		}
		return ret;
	});

const partitionByInitial = (listData: IContactListItem[]) => {
	const ret: any = {};
	ALPHABET_LETTERS.forEach((value: string) => {
		ret[value] = [];
	});
	ret['#'] = [];
	sortContactsList(listData).forEach((contact: IContactListItem) => {
		const nameInitial = contact.name.substr(0, 1).toUpperCase();
		ret[ALPHABET_LETTERS.indexOf(nameInitial) >= 0 ? nameInitial : '#'].push(contact);
	});
	return ret;
};

export const ContactsList: React.SFC<IContactsListProps> = ({listData, onContactSelect}) => {
	const partitionedNames = partitionByInitial(listData);
	return (
		<AlphabetListView
			style={style.listElement}
			data={partitionedNames}
			cell={ContactListItem}
			onCellSelect={onContactSelect}
			cellHeight={LIST_ITEM_HEIGHT}
			sectionListStyle={style.sectionListStyle}
			sectionListItem={(props: IContactListSectionItemRightProps) => (
				<ContactListSectionItemRight {...props} hasData={partitionedNames[props.title].length > 0} />
			)}
			sectionHeader={(props: IContactListSectionHeaderProps) => (
				<ContactListSectionHeader {...props} hasData={partitionedNames[props.title].length > 0} />
			)}
			sectionHeaderHeight={SECTION_HEADER_HEIGHT}
			enableEmptySections={true}
		/>
	);
};
