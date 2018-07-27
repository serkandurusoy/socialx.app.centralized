import React from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-navigation';

import {InputSizes, SXTextInput, TRKeyboardKeys} from 'components';
import {Colors} from 'theme';
import style from './style';

interface ISearchHeaderProps {
	backVisible: boolean;
	searchInputUpdated: (value: string) => void;
	onBack: () => void;
	onFocusUpdated: (value: boolean) => void;
	searchValue: string;
}

export const SearchHeader: React.SFC<ISearchHeaderProps> = ({
	backVisible,
	onBack,
	searchValue,
	searchInputUpdated,
	onFocusUpdated,
}) => (
	<SafeAreaView style={style.safeView}>
		<View style={style.headerContainer}>
			{backVisible && (
				<TouchableOpacity onPress={onBack}>
					<Icon name={'ios-arrow-back'} style={style.backIcon} />
				</TouchableOpacity>
			)}
			<View style={{flex: 1}}>
				<SXTextInput
					value={searchValue}
					onChangeText={searchInputUpdated}
					onSubmitPressed={Keyboard.dismiss}
					placeholder={'Search'}
					icon={'search'}
					canCancel={false}
					size={InputSizes.Small}
					borderColor={Colors.transparent}
					iconColor={Colors.cadetBlue}
					returnKeyType={TRKeyboardKeys.done}
					autoCorrect={true}
					focusUpdateHandler={onFocusUpdated}
				/>
			</View>
		</View>
	</SafeAreaView>
);
