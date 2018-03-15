import React from 'react';
import {findNodeHandle, Text, View} from 'react-native';

import style from './style';

import {BlurView, VibrancyView} from 'react-native-blur';

export interface ISXBlurViewProps {
	children?: object;
	style?: object;
}

export default function SXBlurView(props: ISXBlurViewProps) {
	let parentView: any = null;
	let blurViewRef = null;

	const viewLayoutHandler = () => {
		blurViewRef = findNodeHandle(parentView);
	};

	return (
		<View style={[style.main, props.style]} ref={(view: any) => (parentView = view)} onLayout={viewLayoutHandler}>
			<BlurView style={style.blurView} viewRef={blurViewRef} blurType='light' blurAmount={2} />
			{props.children}
		</View>
	);
}
