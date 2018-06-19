import debounce from 'lodash/debounce';
import React from 'react';
import {Keyboard, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {InputSizes, SXTextInput, TRKeyboardKeys} from 'components';
import {Colors} from 'theme';
import style from './style';

const SEARCH_DEBOUNCE_TIME_MS = 300;

interface ISearchHeaderProps {
	backVisible: boolean;
	searchInputUpdated: (value: string) => void;
	onBack: () => void;
	onFocusUpdated: (value: boolean) => void;
	searchValue: string;
}

const sendUpdatedSearchValue = debounce((term: string, props: ISearchHeaderProps) => {
	props.searchInputUpdated(term);
}, SEARCH_DEBOUNCE_TIME_MS);

const handleTextUpdated = (value: string, props: ISearchHeaderProps) => {
	sendUpdatedSearchValue(value, props);
};

const closeKeyboard = () => {
	Keyboard.dismiss();
};

export const SearchHeader: React.SFC<ISearchHeaderProps> = (props) => (
	<SafeAreaView style={style.safeView}>
		<View style={style.headerContainer}>
			{props.backVisible && (
				<TouchableOpacity onPress={props.onBack}>
					<Icon name={'ios-arrow-back'} style={style.backIcon} />
				</TouchableOpacity>
			)}
			<View style={{flex: 1}}>
				<SXTextInput
					value={props.searchValue}
					onChangeText={(value: string) => handleTextUpdated(value, props)}
					onSubmitPressed={closeKeyboard}
					placeholder={'Search'}
					icon={'search'}
					canCancel={true}
					size={InputSizes.Small}
					borderColor={Colors.transparent}
					iconColor={Colors.cadetBlue}
					returnKeyType={TRKeyboardKeys.done}
					autoCorrect={true}
					focusUpdateHandler={props.onFocusUpdated}
				/>
			</View>
		</View>
	</SafeAreaView>
);
