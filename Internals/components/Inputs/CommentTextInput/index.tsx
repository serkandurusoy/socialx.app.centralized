import React, {RefObject} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from 'theme';
import style from './style';

export interface ICommentTextInputProps {
	placeholder: string;
	autoFocus?: boolean;
	showSendButton: boolean;
	commentText: string;
	onCommentSend: () => void;
	onCommentTextChange: (value: string) => void;
}

const textInput: RefObject<TextInput> = React.createRef();

const sendCommentHandler = (onCommentSend: () => void) => {
	if (textInput.current) {
		textInput.current.blur();
	}
	onCommentSend();
};

export const CommentTextInput: React.SFC<ICommentTextInputProps> = ({
	placeholder,
	autoFocus,
	commentText,
	onCommentTextChange,
	showSendButton,
	onCommentSend,
}) => {
	return (
		<View style={style.inputContainer}>
			<TextInput
				ref={textInput}
				onChangeText={onCommentTextChange}
				style={style.textInput}
				placeholder={placeholder}
				autoFocus={autoFocus}
				multiline={true}
				autoCorrect={false}
				underlineColorAndroid={Colors.transparent}
				autoCapitalize='none'
				value={commentText}
			/>
			{showSendButton && (
				<View style={style.sendButtonContainer}>
					<TouchableOpacity onPress={() => sendCommentHandler(onCommentSend)} style={style.sendButton}>
						<Icon name={'md-send'} size={Sizes.smartHorizontalScale(30)} color={Colors.fuchsiaBlue} />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

CommentTextInput.defaultProps = {
	autoFocus: true,
};
