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

type BaseType<P> = React.ComponentType<P> | React.SFC<P>;

// TODO: in the end useRef should be false in all cases, and we should no longer need hacky refs!
export const withInlineLoader = <P extends IWithLoaderProps>(BaseComponent: BaseType<P>, useRef = true) => {
	return class extends React.Component<P> {
		private static defaultProps: Partial<IWithLoaderProps> = {
			animatedStyle: style.animatedView,
			spinnerType: SpinnerTypes.NineCubeGrid,
			spinnerSize: Sizes.smartHorizontalScale(30),
			spinnerColor: Colors.pink,
		};

		private originalRef = React.createRef();

		public render() {
			if (this.props.isLoading) {
				return <LottieLoader />;
			}

			const baseProps = {...this.props, ref: useRef ? this.originalRef : null};

			return (
				<AnimatedOriginalComp animatedStyle={this.props.animatedStyle}>
					<BaseComponent {...baseProps} />
				</AnimatedOriginalComp>
			);
		}

		public getOriginalRef = () => {
			return this.originalRef;
		};
	};
};
