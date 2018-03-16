import React, {Component} from 'react';
import {FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import style from './style';
import {MessagePerson} from '../../components/MessagePerson';
import {MessagingTabButtons} from '../../components/MessagingTabButtons';
import {SearchFilterValues} from '../SearchScreen';
import {InputSizes, SXTextInput, TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {Colors} from '../../theme';

interface IMessagingScreenProps {
	messageList: any[];
	selectedFilter: SearchFilterValues;
	setNewFilter: (value: SearchFilterValues) => void;
}

export interface IMessagingScreenComponentState {
}

export default class MessagingComponent extends Component<IMessagingScreenProps, IMessagingScreenComponentState> {
	public static defaultProps: Partial<IMessagingScreenProps> = {};

	public state = {
		modeState: 'chat',
	};
	private conditionalRender = () => {
		let ret = null;
		if (this.state.modeState === 'chat') {
			ret = this.renderChatSection();
		} else {
			ret = this.renderContactsSection();
		}
		return ret;
	}
	private renderContactsSection = () => {

	}
	private keyExtractor = (item: any, index: string) => index.toString(); // TODO: use an ID here
	private renderUserWithLastMessage = (data: any) => {
		return (
			<View style={style.wallPostContainer}>
				<MessagePerson {...data.item} />
			</View>
		);
	}

	public render() {
		return (
			<View style={style.container}>
				<View style={style.searchContainer}>
					<Text style={style.friendsText}>{'Friends'}</Text>
					{/*<View style={style.inputSearch}>*/}
						<SXTextInput
							value={this.state.email}
							iconColor={Colors.iron}
							icon={'search'}
							placeholder={'Email'}
							placeholderColor={Colors.iron}
							borderColor={Colors.iron}
							// onChangeText={(value) => this.handleInputChangeText(value, 'email')}
							// keyboardType={TKeyboardKeys.emailAddress}
							// blurOnSubmit={true}
							// returnKeyType={TRKeyboardKeys.done}
							size={InputSizes.Small}
						/>
					{/*</View>*/}

				</View>
				<View style={style.tabContainer}>
					<MessagingTabButtons
						text={'Chat'}
						selected={this.props.selectedFilter === SearchFilterValues.People}
						onPress={() => this.props.setNewFilter(SearchFilterValues.People)}
					/>
					<MessagingTabButtons
						text={'Contacts'}
						selected={this.props.selectedFilter === SearchFilterValues.People}
						onPress={() => this.props.setNewFilter(SearchFilterValues.People)}
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
