import React from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';

import style, {AVATAR_SIZE} from './style';

export const DEFAULT_AVATAR_SIZE = AVATAR_SIZE;

interface IAvatarImageProps {
	image: any;
	style?: StyleProp<ImageStyle>;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = ({image, style: customStyle}) => {
	return <Image source={image} resizeMode={'cover'} style={customStyle} />;
};

AvatarImage.defaultProps = {
	style: style.avatarImage,
};
