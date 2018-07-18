import React from 'react';
import {Image, StyleProp} from 'react-native';

import style from './style';

export interface IAvatarImageProps {
	image: any;
	style?: StyleProp<Image>;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = ({image, style: customStyle}) => {
	return <Image source={image} resizeMode={'cover'} style={customStyle}/>;
};

AvatarImage.defaultProps = {
	style: style.avatarImage,
};
