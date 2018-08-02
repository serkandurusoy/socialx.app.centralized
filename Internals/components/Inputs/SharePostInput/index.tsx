import React from 'react';
import {ImageSourcePropType, Text, TextInput, View} from 'react-native';

import {AvatarImage} from 'components';
import {Colors} from 'theme';
import style from './style';

const MAX_POST_LENGTH = 500;

interface ISharePostInputProps {
	avatarSource: ImageSourcePropType;
	placeholder: string;
	text: string;
	onTextUpdate: (value: string) => void;
}

export const SharePostInput: React.SFC<ISharePostInputProps> = ({avatarSource, placeholder, text, onTextUpdate}) => (
	<View style={style.shareMessageContainer}>
		<AvatarImage image={avatarSource} style={style.avatarImage} />
		<View style={style.captionContainer}>
			<TextInput
				style={style.textInput}
				autoFocus={true}
				autoCorrect={true}
				autoCapitalize={'sentences'}
				underlineColorAndroid={Colors.transparent}
				numberOfLines={1}
				multiline={true}
				placeholder={placeholder}
				onChangeText={onTextUpdate}
				maxLength={MAX_POST_LENGTH}
			>
				<Text style={style.captionTextInput}>{text}</Text>
			</TextInput>
		</View>
	</View>
);
