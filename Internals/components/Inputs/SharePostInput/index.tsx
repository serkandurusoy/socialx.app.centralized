import React, {Component} from 'react';
import {ImageSourcePropType, Text, TextInput, View} from 'react-native';

import {AvatarImage} from 'components';
import {Colors} from 'theme';
import style from './style';

const MAX_POST_LENGTH = 500;

interface ISharePostInputProps {
	avatarSource: ImageSourcePropType;
	placeholder?: string;
}

interface ISharePostInputState {
	title: string;
}

export class SharePostInput extends Component<ISharePostInputProps, ISharePostInputState> {
	private static defaultProps: Partial<ISharePostInputProps> = {
		placeholder: 'Write a caption...',
	};

	public state = {
		title: '',
	};

	public getTitle = () => {
		// TODO: get rid of this after we sort out SOC-148
		return this.state.title.replace(/\n/g, '\\n');
	};

	public render() {
		return (
			<View style={style.shareMessageContainer}>
				<AvatarImage image={this.props.avatarSource} style={style.avatarImage} />
				<View style={style.captionContainer}>
					<TextInput
						style={style.textInput}
						autoFocus={true}
						autoCorrect={true}
						autoCapitalize={'sentences'}
						underlineColorAndroid={Colors.transparent}
						numberOfLines={1}
						multiline={true}
						placeholder={this.props.placeholder}
						onChangeText={this.updateTitleHandler}
						maxLength={MAX_POST_LENGTH}
					>
						<Text style={style.captionTextInput}>{this.state.title}</Text>
					</TextInput>
				</View>
			</View>
		);
	}

	private updateTitleHandler = (value: string) => {
		this.setState({
			title: value,
		});
	};
}
