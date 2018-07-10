import AlphabetListView from '@hawkrives/react-native-alphabetlistview';
import React from 'react';
import {Image, LayoutChangeEvent, Text, TouchableOpacity, View} from 'react-native';

import style, {ALPHABET_ITEM_FONT_SIZE, LIST_ITEM_HEIGHT, SECTION_HEADER_HEIGHT} from './style';

const LAYOUT_UPDATE_THRESHOLD = 10;

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
	lineHeight: number;
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
			<Image source={{uri: item.avatarURL}} style={style.avatarImg} />
			<Text style={style.fullName}>{item.name}</Text>
		</TouchableOpacity>
	);
};

const ContactListSectionItemRight: React.SFC<IContactListSectionItemRightProps> = ({title, lineHeight}) => {
	return <Text style={[style.alphabetListItem, {lineHeight}]}>{title}</Text>;
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

const getFormattedData = (listData: IContactListItem[]) => {
	const ret: any = {};
	// todo: @serkan @jake what???
	sortContactsList(listData).forEach((contact: IContactListItem) => {
		const nameInitial = contact.name.substr(0, 1).toUpperCase();
		if (!ret.hasOwnProperty(nameInitial)) {
			ret[nameInitial] = [];
		}
		ret[nameInitial].push(contact);
	});
	return ret;
};

export class ContactsList extends React.Component<IContactsListProps> {
	private sideLetterHeight = ALPHABET_ITEM_FONT_SIZE;
	private layoutHeight = 0;

	public render() {
		const {listData, onContactSelect} = this.props;
		return (
			<AlphabetListView
				onLayout={this.layoutHandler}
				style={style.listElement}
				data={getFormattedData(listData)}
				cell={ContactListItem}
				onCellSelect={onContactSelect}
				cellHeight={LIST_ITEM_HEIGHT}
				sectionListItem={(props) => <ContactListSectionItemRight {...props} lineHeight={this.sideLetterHeight} />}
				sectionHeader={ContactListSectionHeader}
				sectionHeaderHeight={SECTION_HEADER_HEIGHT}
			/>
		);
	}

	private layoutHandler = (event: LayoutChangeEvent) => {
		const newLayoutHeight = event.nativeEvent.layout.height;
		if (Math.abs(this.layoutHeight - newLayoutHeight) > LAYOUT_UPDATE_THRESHOLD) {
			const {listData} = this.props;
			const numberOfUniqueLetters = Object.keys(getFormattedData(listData)).length;
			this.sideLetterHeight = Math.floor(event.nativeEvent.layout.height / numberOfUniqueLetters);
			this.forceUpdate(); // can't make SFC because of this call!
		}
		this.layoutHeight = newLayoutHeight;
	};
}
