import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';

const FADE_ANIMATION_DURATION = 700;

export class AnimatedOriginalComp extends Component<{animatedStyle?: any}> {
	public state = {
		fadeAnimation: new Animated.Value(0), // Initial value for opacity: 0
	};

	public componentDidMount() {
		Animated.timing(this.state.fadeAnimation, {
			toValue: 1,
			easing: Easing.ease,
			duration: FADE_ANIMATION_DURATION,
		}).start();
	}

	public render() {
		const {fadeAnimation} = this.state;
		const {animatedStyle} = this.props;

		return <Animated.View style={[animatedStyle, {opacity: fadeAnimation}]}>{this.props.children}</Animated.View>;
	}
}
