import React, {Component, RefObject} from 'react';
import {Keyboard, Platform, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp, SafeAreaView} from 'react-navigation';

import {InputSizes, SXTextInput, TRKeyboardKeys} from 'components';
import {OS_TYPES} from 'consts';
import {Colors} from 'theme';
import style from './style';

interface ISearchHeaderProps {
	navigation: NavigationScreenProp<any>;
	cancel: boolean;
}

interface ISearchHeaderState {
	searchTerm: string;
	navigatedFromTrending: boolean;
}

export class SearchHeader extends Component<ISearchHeaderProps, ISearchHeaderState> {
	public state = {
		searchTerm: '',
		navigatedFromTrending: false,
	};

	private inputRef: RefObject<SXTextInput> = React.createRef();

	public componentDidUpdate() {
		if (this.inputRef.current && this.props.cancel && !this.state.navigatedFromTrending) {
			this.inputRef.current.focusInput();
			this.setState({navigatedFromTrending: true});
		}

		if (!this.props.cancel && this.state.navigatedFromTrending) {
			this.setState({navigatedFromTrending: false});
		}
	}

	public render() {
		return (
			<SafeAreaView style={style.safeView}>
				<View style={style.headerContainer}>
					{this.props.cancel &&
						Platform.OS === OS_TYPES.Android && (
							<TouchableOpacity onPress={this.onBackHandler}>
								<Icon name='md-arrow-back' style={style.backIcon} />
							</TouchableOpacity>
						)}
					<View style={{flex: 1}}>
						<SXTextInput
							ref={this.inputRef}
							value={this.state.searchTerm}
							onChangeText={this.searchInputUpdated}
							onSubmitPressed={Keyboard.dismiss}
							placeholder='Search'
							icon='search'
							canCancel={true}
							size={InputSizes.Small}
							borderColor={Colors.transparent}
							iconColor={Colors.cadetBlue}
							returnKeyType={TRKeyboardKeys.done}
							autoCorrect={true}
							// focusUpdateHandler={this.onSearchFocusUpdatedHandler}
							persistCancel={this.props.cancel}
							onPressCancel={this.onBackHandler}
						/>
						{!this.props.cancel ? (
							<TouchableOpacity activeOpacity={1} onPress={this.onPressInput} style={style.inputOverlay} />
						) : null}
					</View>
				</View>
			</SafeAreaView>
		);
	}

	private searchInputUpdated = async (term: string) => {
		this.setState({
			searchTerm: term,
		});
	};

	private onPressInput = () => {
		const {navigation} = this.props;
		if (navigation.state.routeName === 'Trending') {
			navigation.navigate('TabbedSearchScreen');
		}
	};

	private onBackHandler = () => {
		const {navigation} = this.props;
		this.setState({searchTerm: ''}, () => {
			Keyboard.dismiss();
			navigation.goBack();
		});
	};
}
