import React, {Component} from 'react';
import {Image, ImageRequireSource, ImageURISource} from 'react-native';

import style from './style';

export interface IAvatarImageProps {
	image: ImageURISource | ImageRequireSource;
	style?: number;
}

export class AvatarImage extends Component<IAvatarImageProps> {
	public static defaultProps: Partial<IAvatarImageProps> = {
		style: style.avatarImage,
	};

	public render() {
		return <Image source={this.props.image} resizeMode={'cover'} style={this.props.style} />;
	}
}
