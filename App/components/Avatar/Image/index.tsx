import React from 'react';
import {Image} from 'react-native';

import FastImage from 'react-native-fast-image';

import style from './style';

export interface IAvatarImageProps {
	image: any;
	style?: typeof style.avatarImage;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = (props) => {
	return <FastImage source={props.image} resizeMode={FastImage.resizeMode.cover} style={props.style} />;
};

AvatarImage.defaultProps = {
	style: style.avatarImage,
};
