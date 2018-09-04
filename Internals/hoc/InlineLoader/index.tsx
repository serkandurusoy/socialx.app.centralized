// MIGRATION: migrated enhancers/InlineLoader

import React from 'react';

import {AnimatedOriginalComp, SpinKitLoader, SpinnerTypes} from './components';

export interface IWithLoaderProps {
	isLoading: boolean;
	animatedStyle?: any;
	spinnerType?: SpinnerTypes;
	spinnerSize?: number;
	spinnerColor?: string;
}

export const WithInlineLoader: React.SFC<IWithLoaderProps> = ({
	spinnerSize,
	spinnerColor,
	spinnerType,
	isLoading,
	animatedStyle,
	children,
}) => (
	<React.Fragment>
		{isLoading && <SpinKitLoader spinnerSize={spinnerSize} spinnerType={spinnerType} spinnerColor={spinnerColor} />}
		{!isLoading && <AnimatedOriginalComp animatedStyle={animatedStyle || {flex: 1}}>{children}</AnimatedOriginalComp>}
	</React.Fragment>
);
