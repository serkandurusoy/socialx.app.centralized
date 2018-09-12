// MIGRATION: migrated to components/displayers/IntroFirstSlide

import React from 'React';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors, Images} from 'theme';
import {ISlideProps} from '../index';
import style from './style';

export const WalkThroughFirst: React.SFC<ISlideProps> = ({
	width,
	height,
	topSpacer,
	bottomSpacer,
	title,
	description,
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
		colors={[Colors.pink, Colors.blueMarguerite]}
		start={{x: 0, y: 0}}
		end={{x: 0, y: 1}}
	>
		<Image source={Images.IntroWalkThrough1Logo} style={style.logoImage} />
		<Image source={Images.IntroWalkThrough1} style={style.slideImage} />
		<View style={style.textContainer}>
			<Text style={style.slideTitle}>{title}</Text>
			<Text style={style.slideDescription}>{description}</Text>
		</View>
	</LinearGradient>
);
