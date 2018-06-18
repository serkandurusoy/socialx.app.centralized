import debounce from 'lodash/debounce';
import React, {Component} from 'react';
import {Keyboard, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {InputSizes, SXTextInput, TRKeyboardKeys} from 'components';
import {Colors} from 'theme';
import style from './style';

const SEARCH_DEBOUNCE_TIME_MS = 300;

interface ISearchHeaderProps {
	searchInputUpdated: (value: string) => void;
	onBack: () => void;
}

interface ISearchHeaderState {
	backVisible: boolean;
}

export class SearchHeader extends Component<ISearchHeaderProps, ISearchHeaderState> {
	public state = {
		backVisible: false,
	};

	private searchTerm: string = '';

	private sendUpdatedSearchValue = debounce(() => {
		this.props.searchInputUpdated(this.searchTerm);
	}, SEARCH_DEBOUNCE_TIME_MS);

	public render() {
		return (
			<SafeAreaView style={style.safeView}>
				<View style={style.headerContainer}>
					{this.state.backVisible && (
						<TouchableOpacity onPress={this.onBackHandler}>
							<Icon name={'ios-arrow-back'} style={style.backIcon} />
						</TouchableOpacity>
					)}
					<View style={{flex: 1}}>
						<SXTextInput
							onChangeText={this.handleTextUpdated}
							onSubmitPressed={this.closeKeyboard}
							placeholder={'Search'}
							icon={'search'}
							canCancel={true}
							size={InputSizes.Small}
							borderColor={Colors.transparent}
							iconColor={Colors.cadetBlue}
							returnKeyType={TRKeyboardKeys.done}
							autoCorrect={true}
							focusUpdateHandler={this.focusUpdateHandler}
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	private handleTextUpdated = (value: string) => {
		this.searchTerm = value;
		this.sendUpdatedSearchValue();
	};

	private closeKeyboard = () => {
		Keyboard.dismiss();
	};

	private focusUpdateHandler = (value: boolean) => {
		if (value) {
			this.setState({
				backVisible: true,
			});
		}
	};

	private onBackHandler = () => {
		this.setState({
			backVisible: false,
		});
		this.props.onBack();
	};
}
