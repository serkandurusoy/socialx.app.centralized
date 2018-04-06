import AlphabetListView from '@hawkrives/react-native-alphabetlistview';
import React from 'react';
import {Image, LayoutEvent, Text, TouchableOpacity, View} from 'react-native';
import style, {ALPHABET_ITEM_FONT_SIZE, LIST_ITEM_HEIGHT, SECTION_HEADER_HEIGHT} from './style';

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
	const values = props.title.split('.');
	return <Text style={[style.alphabetListItem, {lineHeight: parseInt(values[1], 0)}]}>{values[0]}</Text>;
};

const ContactListSectionHeader: React.SFC<IContactListSectionHeaderProps> = (props) => {
	const sectionTitle = props.title.split('.')[0];
	return (
		<View style={style.sectionHeaderContainer}>
			<Text style={style.sectionHeaderText}>{sectionTitle}</Text>
		</View>
	);
};

export class ContactsList extends React.Component<IContactsListProps> {
	public state = {
		sideLetterLineHeight: ALPHABET_ITEM_FONT_SIZE,
	};

	private contactsListSorted = this.props.listData.sort((item1: IContactListItem, item2: IContactListItem) => {
		let ret = 0;
		if (item1.name < item2.name) {
			ret = -1;
		} else if (item1.name > item2.name) {
			ret = 1;
		}
		return ret;
	});

	public render() {
		return (
			<AlphabetListView
				onLayout={this.layoutHandler}
				style={style.listElement}
				data={this.getFormattedData()}
				cell={ContactListItem}
				onCellSelect={this.props.onContactSelect}
				cellHeight={LIST_ITEM_HEIGHT}
				sectionListItem={ContactListSectionItemRight}
				sectionHeader={ContactListSectionHeader}
				sectionHeaderHeight={SECTION_HEADER_HEIGHT}
			/>
		);
	}

	private getFormattedData = () => {
		const ret: any = {};
		this.contactsListSorted.forEach((contact: IContactListItem) => {
			const nameInitial = contact.name.substr(0, 1).toUpperCase() + '.' + this.state.sideLetterLineHeight;
			if (!ret.hasOwnProperty(nameInitial)) {
				ret[nameInitial] = [];
			}
			ret[nameInitial].push(contact);
		});
		return ret;
	}

	private getNumberOfUniqueLetters = () => {
		const letterSet = new Set();
		this.contactsListSorted.forEach((contact: IContactListItem) => {
			const nameInitial = contact.name.substr(0, 1).toUpperCase();
			letterSet.add(nameInitial);
		});
		return letterSet.size;
	}

	private layoutHandler = (event: LayoutEvent) => {
		const newLineHeight = Math.floor(event.nativeEvent.layout.height / this.getNumberOfUniqueLetters());
		this.setState({
			sideLetterLineHeight: newLineHeight,
		});
	}
}
