import {IContactListItem} from 'components/Displayers';
import {InputSizes, SXTextInput, TRKeyboardKeys} from 'components/Inputs';
import {MessagingTabButton} from 'components/Messaging';
import React, {Component} from 'react';
import {Animated, Easing, LayoutEvent, Text, Value, View} from 'react-native';
import {Colors} from 'theme';
import ChatScreenTab from './chat.screen';
import ContactsScreenTab from './contacts.screen';
import {IMessagingWithDataHooksProps, messagingWithDataHooks} from './data.hoc';
import {IChatListEntry} from './index';
import style from './style';

export enum MessagingTabValues {
	Chat = 'Chat',
	Contacts = 'Contacts',
}

interface IMessagingComponentProps extends IMessagingWithDataHooksProps {
	onContactSelect: (data: IContactListItem) => void;
	onChatItemPress: (item: IChatListEntry) => void;
}

interface IMessagingComponentState {
	selectedTab: MessagingTabValues;
	translateX: Value;
}

class MessagingComponent extends Component<IMessagingComponentProps, IMessagingComponentState> {
	public state = {
		selectedTab: MessagingTabValues.Chat,
		translateX: new Animated.Value(0),
	};

	private slideWidth = 0;

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
							onChangeText={this.props.onSearchTermUpdated}
							blurOnSubmit={true}
							returnKeyType={TRKeyboardKeys.done}
							size={InputSizes.Small}
							borderWidth={1}
							autoCorrect={true}
						/>
					</View>
				</View>
				<View style={style.tabButtonsContainer}>
					<MessagingTabButton
						text={MessagingTabValues.Chat}
						selected={this.state.selectedTab === MessagingTabValues.Chat}
						onPress={() => this.updatedSelectedTab(MessagingTabValues.Chat)}
					/>
					<MessagingTabButton
						text={MessagingTabValues.Contacts}
						selected={this.state.selectedTab === MessagingTabValues.Contacts}
						onPress={() => this.updatedSelectedTab(MessagingTabValues.Contacts)}
					/>
				</View>
				<Animated.View style={[style.animatedView, {transform: [{translateX: this.state.translateX}]}]}>
					<View style={style.fullWidth} onLayout={this.chatScreenViewOnLayout}>
						<ChatScreenTab
							chatListData={this.props.chatListData}
							refreshing={this.props.refreshingChatListData}
							refreshData={this.props.onRefreshChatListData}
							loadMoreChatEntries={this.props.loadMoreChatEntries}
							hasMore={this.props.hasMoreChatListEntries}
							onChatItemPress={this.props.onChatItemPress}
						/>
					</View>
					<View style={style.fullWidth}>
						<ContactsScreenTab
							filterUpdatedHandler={this.props.onContactsFilterUpdated}
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
	};

	private updatedSelectedTab = (nextTab: MessagingTabValues) => {
		this.setState({
			selectedTab: nextTab,
		});
		const slideValue = nextTab === MessagingTabValues.Contacts ? -this.slideWidth : 0;
		this.runSlideTransition(slideValue);
	};

	private runSlideTransition = (endValue: number) => {
		Animated.timing(this.state.translateX, {
			toValue: endValue,
			easing: Easing.linear,
			duration: 300,
			isInteraction: false,
			useNativeDriver: true,
		}).start();
	};
}

export default messagingWithDataHooks(MessagingComponent as any);
