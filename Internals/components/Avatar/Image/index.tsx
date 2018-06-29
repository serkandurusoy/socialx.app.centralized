import React from 'react';
import {Image, StyleProp} from 'react-native';

import style from './style';

export interface IAvatarImageProps {
	image: any;
	style?: StyleProp<Image>;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = (props) => {
	return <Image source={props.image} resizeMode={'cover'} style={props.style} />;
};

AvatarImage.defaultProps = {
	style: style.avatarImage,
};
