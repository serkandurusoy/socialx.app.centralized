// MIGRATION: migrated to components/displayers

import LottieView from 'lottie-react-native';
import React, {Component} from 'react';
import {Animated, Easing, View} from 'react-native';

import {heart} from 'animation';
import style from './style';

export interface IHeartAnimationProps {
	ended: (status: boolean) => void;
}

export class HeartAnimation extends Component<IHeartAnimationProps> {
	private animationProgress = new Animated.Value(0);

	componentDidMount() {
		Animated.timing(this.animationProgress, {
			toValue: 1,
			duration: 1000,
			easing: Easing.linear,
		}).start(() => {
			this.animationProgress.setValue(0);
			this.props.ended(true);
		});
	}

	render() {
		return (
			<View style={style.container}>
				<View style={style.animation}>
					<LottieView source={heart} progress={this.animationProgress} style={style.animation} />
				</View>
			</View>
		);
	}
}
