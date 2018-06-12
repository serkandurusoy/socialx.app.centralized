import {Image, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

export const AnimatedImage = Animatable.createAnimatableComponent(Image);
export const AnimatedText = Animatable.createAnimatableComponent(Text);
export const AnimatedIonicon = Animatable.createAnimatableComponent(Icon);

export const Animations = {
	pulsate: {
		0: {
			scale: 1,
		},
		0.5: {
			scale: 1.5,
		},
		1: {
			scale: 1,
		},
	},
};
