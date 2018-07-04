import React from 'React';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {IGenericSlide} from '../index';
import style from './style';

export const WalkThroughGeneric: React.SFC<IGenericSlide> = ({
	width,
	height,
	topSpacer,
	bottomSpacer,
	image,
	title,
	description,
	gradient,
}) => (
	<LinearGradient
		style={[
			style.container,
			{
				paddingTop: topSpacer,
				paddingBottom: bottomSpacer,
				width,
				height,
			},
		]}
		colors={gradient}
		start={{x: 0, y: 0}}
		end={{x: 0, y: 1}}
	>
		<Image source={image} style={style.slideImage} resizeMode={'contain'} />
		<View style={style.textContainer}>
			<Text style={style.slideTitle}>{title}</Text>
			<Text style={style.slideDescription}>{description}</Text>
		</View>
	</LinearGradient>
);
