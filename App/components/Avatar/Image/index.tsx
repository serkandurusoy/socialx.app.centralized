import React from 'react';
import {Image} from 'react-native';

import style from './style';

export interface IAvatarImageProps {
	image: any;
	style?: typeof style.avatarImage;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = (props) => {
	return <Image source={props.image} resizeMode={'cover'} style={props.style} />;
};

AvatarImage.defaultProps = {
	style: style.avatarImage,
};
