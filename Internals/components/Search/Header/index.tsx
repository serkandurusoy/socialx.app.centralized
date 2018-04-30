import debounce from 'lodash/debounce';
import React, {Component} from 'react';
import {Keyboard, View} from 'react-native';
import {Colors} from 'theme';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../Inputs';
import style from './style';

const SEARCH_DEBOUNCE_TIME_MS = 300;

interface ISearchHeaderProps {
	searchInputUpdated: (value: string) => void;
}

export class SearchHeader extends Component<ISearchHeaderProps, any> {
	private searchTerm: string = '';

	private sendUpdatedSearchValue = debounce(() => {
		this.props.searchInputUpdated(this.searchTerm);
	}, SEARCH_DEBOUNCE_TIME_MS);

	public render() {
		return (
			<View style={style.headerContainer}>
				<SXTextInput
					autoFocus={true}
					onChangeText={this.handleTextUpdated}
					onSubmitPressed={this.closeKeyboard}
					placeholder={'Search'}
					icon={'search'}
					canCancel={true}
					size={InputSizes.Small}
					borderColor={Colors.transparent}
					iconColor={Colors.cadetBlue}
					returnKeyType={TRKeyboardKeys.done}
				/>
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
}
