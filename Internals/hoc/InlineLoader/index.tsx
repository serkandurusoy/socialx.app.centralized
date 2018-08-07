import React from 'react';

import {AnimatedOriginalComp, SpinKitLoader, SpinnerTypes} from './components';

export interface IWithLoaderProps {
	isLoading: boolean;
	animatedStyle?: any;
	spinnerType?: SpinnerTypes;
	spinnerSize?: number;
	spinnerColor?: string;
}

type BaseType<P> = React.ComponentType<P> | React.SFC<P>;

export const withInlineLoader = <P extends IWithLoaderProps>(BaseComponent: BaseType<P>): React.SFC<P> => (props) => {
	const {spinnerSize, spinnerColor, spinnerType, isLoading, animatedStyle} = props;
	return (
		<React.Fragment>
			{isLoading && <SpinKitLoader spinnerSize={spinnerSize} spinnerType={spinnerType} spinnerColor={spinnerColor} />}
			{!isLoading && (
				<AnimatedOriginalComp animatedStyle={animatedStyle || {flex: 1}}>
					<BaseComponent {...props} />
				</AnimatedOriginalComp>
			)}
		</React.Fragment>
	);
};
