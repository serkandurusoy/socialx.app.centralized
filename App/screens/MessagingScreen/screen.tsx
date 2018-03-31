import React, {Component} from 'react';
import {Animated, Easing, LayoutEvent, Text, View} from 'react-native';
import {IContactListItem} from '../../components/ContactsList';
import {MessagingFilterValues} from '../../components/MessagingFilterSection';
import {MessagingTabButton} from '../../components/MessagingTabButton';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../components/TextInput';
import {Colors} from '../../theme';
import ChatScreenTab from './chat.screen';
import ContactsScreenTab from './contacts.screen';
import {IChatListEntry, MessagingTabValues} from './index';
import style from './style';

export interface IMessagingScreenProps {
	chatListData: IChatListEntry[];
	selectedTab: MessagingTabValues;
	setNewTab: (value: MessagingTabValues) => void;
	refreshing: boolean;
	refreshData: () => void;
	loadMoreChatEntries: () => void;
	hasMore: boolean;
	searchTermUpdated: (term: string) => void;
	filterUpdatedHandler: (filterValue: MessagingFilterValues) => void;
	onContactSelect: (data: IContactListItem) => void;
	contactsList: IContactListItem[];
}

export default class MessagingComponent extends Component<IMessagingScreenProps> {
	public state = {
		translateX: new Animated.Value(0),
	};

	private slideWidth: number = 0;

	public componentWillReceiveProps(nextProps: Readonly<IMessagingScreenProps>): void {
		if (nextProps.selectedTab !== this.props.selectedTab) {
			const slideValue = nextProps.selectedTab === MessagingTabValues.Contacts ? -this.slideWidth : 0;
			this.runSlideTransition(slideValue);
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
							borderColor={Colors.shuttleGray}
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
						text={MessagingTabValues.Chat}
						selected={this.props.selectedTab === MessagingTabValues.Chat}
						onPress={() => this.props.setNewTab(MessagingTabValues.Chat)}
					/>
					<MessagingTabButton
						text={MessagingTabValues.Contacts}
						selected={this.props.selectedTab === MessagingTabValues.Contacts}
						onPress={() => this.props.setNewTab(MessagingTabValues.Contacts)}
					/>
				</View>
				<Animated.View style={[style.animatedView, {transform: [{translateX: this.state.translateX}]}]}>
					<View style={style.fullWidth} onLayout={this.chatScreenViewOnLayout}>
						<ChatScreenTab
							chatListData={this.props.chatListData}
							refreshing={this.props.refreshing}
							refreshData={this.props.refreshData}
							loadMoreChatEntries={this.props.loadMoreChatEntries}
							hasMore={this.props.hasMore}
						/>
					</View>
					<View style={style.fullWidth}>
						<ContactsScreenTab
							filterUpdatedHandler={this.props.filterUpdatedHandler}
							onContactSelect={this.props.onContactSelect}
							contactsList={this.props.contactsList}
						/>
					</View>
				</Animated.View>
			</View>
		);
	}

	private chatScreenViewOnLayout = (event: LayoutEvent) => {
		this.slideWidth = event.nativeEvent.layout.width;
	}

	private runSlideTransition = (endValue: number) => {
		Animated.timing(this.state.translateX, {
			toValue: endValue,
			easing: Easing.linear,
			duration: 300,
			isInteraction: false,
			useNativeDriver: true,
		}).start();
	}
}
