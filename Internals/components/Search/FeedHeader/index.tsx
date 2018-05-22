import debounce from 'lodash/debounce';
import React, {Component} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors} from 'theme';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../Inputs';
import style from './style';

const SEARCH_DEBOUNCE_TIME_MS = 300;

interface ISearchFeedHeaderProps {
	searchInputUpdated: (value: string) => void;
}

interface ISearchFeedHeaderState {
	hasFocus: boolean;
}

export class SearchFeedHeader extends Component<ISearchFeedHeaderProps, ISearchFeedHeaderState> {
	public state = {
		hasFocus: false,
	};

	private searchTerm: string = '';

	private sendUpdatedSearchValue = debounce(() => {
		this.props.searchInputUpdated(this.searchTerm);
	}, SEARCH_DEBOUNCE_TIME_MS);

	public render() {
		return (
			<View style={style.headerContainer}>
				{this.state.hasFocus && (
					<SXTextInput
						autoFocus={true}
						onChangeText={this.handleTextUpdated}
						onSubmitPressed={this.closeKeyboard}
						placeholder={'Search'}
						icon={'search'}
						canCancel={false}
						size={InputSizes.Small}
						borderColor={Colors.transparent}
						iconColor={Colors.cadetBlue}
						returnKeyType={TRKeyboardKeys.done}
						focusUpdateHandler={this.inputFocusUpdatedHandler}
					/>
				)}
				{!this.state.hasFocus && (
					<TouchableOpacity onPress={this.focusInputHandler}>
						<Icon name={'md-search'} style={style.searchIcon} />
					</TouchableOpacity>
				)}
			</View>
		);
	}

	private handleTextUpdated = (value: string) => {
		this.searchTerm = value;
		this.sendUpdatedSearchValue();
	}

	private closeKeyboard = () => {
		Keyboard.dismiss();
	}

	private focusInputHandler = () => {
		this.setState({
			hasFocus: true,
		});
	}

	private inputFocusUpdatedHandler = (hasFocus: boolean) => {
		if (this.state.hasFocus !== hasFocus) {
			this.setState({
				hasFocus,
			});
		}
	}
}
