// MIGRATION: should go into components
/* tslint:disable */
import React, {Component} from 'react';
import {Text, TextProps} from 'react-native';

import TextExtraction from './Parser';

const PATS = {
	url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i,
	phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
	email: /\S+@\S+\.\S+/,
	hashtag: /#(\w+)/,
	tags: /@(\w+)/,
};

interface IDefaultParseShape {
	type: 'url' | 'phone' | 'email' | 'hashtag' | 'tags';
}

interface ICustomeParsedShape {
	pattern: RegExp | string;
}

interface ITextParserProps extends TextProps {
	parse: any; // IDefaultParseShape[] | ICustomeParsedShape[];
	childrenProps: TextProps;
}

export class ParsedText extends Component<ITextParserProps> {
	private root: any = null;

	private setNativeProps = (nativeProps: any) => {
		this.root.setNativeProps(nativeProps);
	};

	private getPatterns = () => {
		return this.props.parse.map((option: any) => {
			const {type, ...patternOption} = option;
			if (type) {
				if (!PATS[type]) {
					throw new Error(`${option.type} is not a supported type`);
				}
				patternOption.pattern = PATS[type];
			}

			return patternOption;
		});
	};

	getParsedText() {
		if (!this.props.parse) {
			return this.props.children;
		}
		if (typeof this.props.children !== 'string') {
			return this.props.children;
		}

		const textExtraction = new TextExtraction(this.props.children, this.getPatterns());

		return textExtraction.parse().map((props, index) => {
			let onPressProps = {};
			if ('onPress' in props) {
				// just need to make sure onPress handler will receive the relevant text(hashtag, tag, url, etc)
				onPressProps.onPress = () => props.onPress(props.children);
			}
			return <Text key={`pText-${index}`} {...this.props.childrenProps} {...props} {...onPressProps} />;
		});
	}

	render() {
		return (
			<Text ref={(ref) => (this.root = ref)} {...this.props}>
				{this.getParsedText()}
			</Text>
		);
	}
}
