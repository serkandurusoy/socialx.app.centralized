import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import {NavigationActions, NavigationContainer, TabNavigator} from 'react-navigation';
import {IContactListItem} from '../../components/ContactsList';
import {MessagingTabButton} from '../../components/MessagingTabButton';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../components/TextInput';
import {Colors} from '../../theme';
import ChatScreenTab from './chat.screen';
import ContactsScreenTab from './contacts.screen';
import {IChatListEntry, MessagingFilterValues} from './index';
import style from './style';

interface IMessagingScreenProps {
	chatListData: IChatListEntry[];
	selectedFilter: MessagingFilterValues;
	setNewFilter: (value: MessagingFilterValues) => void;
	refreshing: boolean;
	refreshData: () => void;
	loadMoreChatEntries: () => void;
	hasMore: boolean;
	searchTermUpdated: (term: string) => void;
	filterUpdatedHandler: (filterValue: MessagingFilterValues) => void;
	onContactSelect: (data: IContactListItem) => void;
	contactsList: IContactListItem[];
}

const MessagingTabs = TabNavigator(
	{
		Contacts: {screen: ContactsScreenTab},
		Chat: {screen: ChatScreenTab}, // TODO: any options to use as keys values from enum MessagingFilterValues?
	}, {
		// TODO: this will cause contacts list right side scroll list with letter not to work correct on iOS
		animationEnabled: true,
		swipeEnabled: false,
		lazy: false,
		navigationOptions: {
			tabBarVisible: false,
		},
	},
);

export default class MessagingComponent extends Component<IMessagingScreenProps> {

	private tabsInstance: NavigationContainer | null = null;

	public componentWillReceiveProps(nextProps: Readonly<IMessagingScreenProps>): void {
		if (nextProps.selectedFilter !== this.props.selectedFilter && this.tabsInstance) {
			this.tabsInstance.dispatch(
				NavigationActions.navigate({routeName: nextProps.selectedFilter}),
			);
		}
	}

	public render() {
		return (
			<View style={style.container}>
				<View style={style.searchContainer}>
					<Text style={style.friendsText}>{'Friends'}</Text>
					<View style={style.inputContainer}>
						<SXTextInput
							iconColor={Colors.cadetBlue}
							icon={'search'}
							placeholder={'Search'}
							placeholderColor={Colors.cadetBlue}
							borderColor={Colors.darkGray}
							onChangeText={this.props.searchTermUpdated}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
							size={InputSizes.Small}
							borderWidth={1}
						/>
					</View>
				</View>
				<View style={style.tabButtonsContainer}>
					<MessagingTabButton
						text={MessagingFilterValues.Chat}
						selected={this.props.selectedFilter === MessagingFilterValues.Chat}
						onPress={() => this.props.setNewFilter(MessagingFilterValues.Chat)}
					/>
					<MessagingTabButton
						text={MessagingFilterValues.Contacts}
						selected={this.props.selectedFilter === MessagingFilterValues.Contacts}
						onPress={() => this.props.setNewFilter(MessagingFilterValues.Contacts)}
					/>
				</View>
				<View style={style.tabsContainer}>
					<MessagingTabs
						screenProps={this.props}
						ref={(ref: any) => (this.tabsInstance = ref)}
					/>
				</View>
			</View>
		);
	}
}
