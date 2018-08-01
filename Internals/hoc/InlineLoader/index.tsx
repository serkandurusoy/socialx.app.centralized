import React from 'react';

import {AnimatedOriginalComp, SpinKitLoader, SpinnerTypes} from './components';
import style from './style';

export interface IWithLoaderProps {
	isLoading: boolean;
	animatedStyle?: any;
	spinnerType?: SpinnerTypes;
	spinnerSize?: number;
	spinnerColor?: string;
}

type BaseType<P> = React.ComponentType<P> | React.SFC<P>;

// TODO: in the end useRef should be false in all cases, and we should no longer need hacky refs!
export const withInlineLoader = <P extends IWithLoaderProps>(BaseComponent: BaseType<P>, useRef = false) => {
	return class extends React.Component<P> {
		private static defaultProps: Partial<IWithLoaderProps> = {
			animatedStyle: style.animatedView,
		};

		private originalRef = React.createRef();

		public render() {
			const {spinnerSize, spinnerColor, spinnerType} = this.props;

			if (this.props.isLoading) {
				return <SpinKitLoader spinnerSize={spinnerSize} spinnerType={spinnerType} spinnerColor={spinnerColor} />;
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
