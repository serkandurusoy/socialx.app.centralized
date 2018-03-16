import * as _ from 'lodash';
import React, {Component} from 'react';
import {FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import {MessagePerson} from '../../components/MessagePerson';
import {MessagingTabButtons} from '../../components/MessagingTabButtons';
import {InputSizes, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {Colors} from '../../theme';
import {SearchFilterValues} from '../SearchScreen';
import style from './style';

interface IMessagingScreenProps {
	messageList: any[];
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
}

export interface IMessagingScreenComponentState {}

export default class MessagingComponent extends Component<IMessagingScreenProps, IMessagingScreenComponentState> {
	public static defaultProps: Partial<IMessagingScreenProps> = {};

	public state = {
		modeState: 'chat',
	};

	private searchInList = (value: string) => {
		const originalList = this.props.messageList;

		return _.filter(originalList, (entity) => {
			return _.includes(value, entity.userName);
		});
	}
	private conditionalRender = () => {
		let ret = null;
		if (this.state.modeState === 'chat') {
			ret = this.renderChatSection();
		} else {
			ret = this.renderContactsSection();
		}
		return ret;
	}
	private keyExtractor = (item: any, index: string) => index.toString(); // TODO: use an ID here
	private renderUserWithLastMessage = (data: any) => {
		return (
			<View style={style.wallPostContainer}>
				<MessagePerson {...data.item} />
			</View>
		);
	}
	private renderContactsSection = () => {};

	public render() {
		return (
			<View style={style.container}>
				<View style={style.searchContainer}>
					<Text style={style.friendsText}>{'Friends'}</Text>
					<View style={style.inputSearch}>
						<SXTextInput
							value={this.state.email}
							iconColor={Colors.iron}
							icon={'search'}
							placeholder={'Search'}
							placeholderColor={Colors.iron}
							borderColor={Colors.iron}
							onChangeText={(value) => this.searchInList(value)}
							size={InputSizes.Small}
						/>
					</View>
				</View>
				<View style={style.tabContainer}>
					<MessagingTabButtons
						text={'Chat'}
						selected={this.props.selectedFilter === SearchFilterValues.People}
						onPress={() => {
							this.props.modeState = 'chat';
							this.conditionalRender();
						}}
					/>
					<MessagingTabButtons
						text={'Contacts'}
						selected={this.props.selectedFilter === SearchFilterValues.People}
						onPress={() => {
							this.props.modeState = 'contact';
							this.conditionalRender();
						}}
					/>
				</View>
				{this.conditionalRender()}
			</View>
		);
	}

	private renderChatSection() {
		return (
			<FlatList
				data={this.props.messageList}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderUserWithLastMessage}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			/>
		);
	}
}
