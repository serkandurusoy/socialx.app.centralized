import React from 'react';

import {Colors, Sizes} from 'theme';
import {AnimatedOriginalComp} from './components/AnimatedOriginalComp';
import {LottieLoader} from './components/LottieLoader';
import style from './style';

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

export interface IWithLoaderProps {
	isLoading: boolean;
	animatedStyle?: any;
	spinnerType?: SpinnerTypes;
	spinnerSize?: number;
	spinnerColor?: string;
}

export const withInlineLoader = <P extends IWithLoaderProps>(BaseComponent: React.ComponentType<P>) => {
	return class extends React.Component<P> {
		private static defaultProps: Partial<IWithLoaderProps> = {
			animatedStyle: style.animatedView,
			spinnerType: SpinnerTypes.NineCubeGrid,
			spinnerSize: Sizes.smartHorizontalScale(30),
			spinnerColor: Colors.pink,
		};

		// TODO: @Serkan: maybe you can teach me how can we get rid of this 'extra' step with originalRef
		private originalRef = React.createRef();

		public render() {
			if (this.props.isLoading) {
				return <LottieLoader />;
			}

			const BaseWithRef = React.forwardRef((props, ref) => (
				<AnimatedOriginalComp animatedStyle={this.props.animatedStyle}>
					<BaseComponent {...this.props} ref={ref} />
				</AnimatedOriginalComp>
			));

			return <BaseWithRef ref={this.originalRef} />;
		}

		public getOriginalRef = () => {
			return this.originalRef;
		};
	};
};
