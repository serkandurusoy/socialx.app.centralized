import React, {Component} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {OS_TYPES} from '../../constants';
import {withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {Colors, Sizes} from '../../theme';
import style from './style';

interface ICommentsScreenComponentProps {
	marginBottom: number;
}

class CommentsScreenComponent extends Component<ICommentsScreenComponentProps> {
	public state = {
		showSendButton: true,
	};

	public render() {
		const containerStyles = [style.container];
		if (Platform.OS === OS_TYPES.iOS) {
			containerStyles.push({marginBottom: this.props.marginBottom});
		}
		return (
			<SafeAreaView style={containerStyles}>
				<ScrollView style={style.commentsList} keyboardShouldPersistTaps={'handled'}>
					<Text style={style.sampleText}>{'14235 asdoign first'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign middle'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign asgdg'}</Text>
					<Text style={style.sampleText}>{'14235 asdoign last'}</Text>
				</ScrollView>
				<View style={style.inputContainer}>
					<TextInput
						// value={''}
						style={style.textInput}
						placeholder={'Write a comment...'}
						autoFocus={true}
						multiline={true}
					/>
					{this.renderSendButton()}
				</View>
			</SafeAreaView>
		);
	}

	private renderSendButton = () => {
		if (this.state.showSendButton) {
			return (
				<TouchableOpacity onPress={this.sendCommentHandler} style={style.sendButton}>
					<Icon name={'md-send'} size={Sizes.smartHorizontalScale(30)} color={Colors.fuchsiaBlue} />
				</TouchableOpacity>
			);
		}
		return null;
	}

	private sendCommentHandler = () => {
		// console.log('sendCommentHandler');
	}
}

export default withResizeOnKeyboardShow(CommentsScreenComponent);
