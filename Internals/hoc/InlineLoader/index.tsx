import LottieView from 'lottie-react-native';
import React from 'react';
import {Animated, Easing} from 'react-native';

import {globe2} from 'animation';
import {Colors, Sizes} from 'theme';
import style from './style';

const FADE_ANIMATION_DURATION = 700;

export enum SpinnerTypes {
	NineCubeGrid = '9CubeGrid',
	ChasingDots = 'ChasingDots',
	CircleFlip = 'CircleFlip',
	Bounce = 'Bounce',
	Wave = 'Wave',
	WanderingCubes = 'WanderingCubes',
	ThreeBounce = 'ThreeBounce',
	Circle = 'Circle',
	FadingCircle = 'FadingCircle',
	FadingCircleAlt = 'FadingCircleAlt',
}

interface IInlineLoaderProps {
	isLoading: boolean;
	animatedStyle?: any;
	spinnerType?: SpinnerTypes;
	spinnerSize?: number;
	spinnerColor?: string;
}

export interface IWithLoaderProps extends IInlineLoaderProps {
	isLoading: boolean;
}

export const withInlineLoader = (BaseComponent: React.ComponentType<IWithLoaderProps>, useRef = false) => {
	return class extends React.Component<IInlineLoaderProps> {
		private static defaultProps: Partial<IInlineLoaderProps> = {
			animatedStyle: style.animatedView,
			spinnerType: SpinnerTypes.NineCubeGrid,
			spinnerSize: Sizes.smartHorizontalScale(30),
			spinnerColor: Colors.pink,
		};

		public state = {
			fadeAnimation: new Animated.Value(0), // Initial value for opacity: 0
		};

		// TODO: @Serkan -> there is another problem here: when using this HOC, I the ref usage is lost.
		// so I implemented this workaround with originalRef + useRef (to avoid error in case of using with SFC)
		private originalRef: any = null;

		public render() {
			if (this.props.isLoading) {
				return <LottieView source={globe2} loop={true} style={style.lottieAnimation} ref={this.startAnimation} />;
			}

			const {fadeAnimation} = this.state;
			const updatedProps: any = {...this.props};
			if (useRef) {
				updatedProps.ref = (ref) => (this.originalRef = ref);
			}

			return (
				<Animated.View
					style={[this.props.animatedStyle, {opacity: fadeAnimation}]}
					onLayout={this.animatedViewOnLayoutHandler}
				>
					<BaseComponent {...updatedProps} />
				</Animated.View>
			);
		}

		public getOriginalRef = () => {
			return this.originalRef;
		};

		private animatedViewOnLayoutHandler = () => {
			// TODO: not sure how safe is to start the animation with onLayout? best would be with componentDidMount
			Animated.timing(this.state.fadeAnimation, {
				toValue: 1,
				easing: Easing.ease,
				duration: FADE_ANIMATION_DURATION,
			}).start();
		};

		private startAnimation = (anim: any) => {
			if (anim) {
				anim.play();
			}
		};
	};
};
