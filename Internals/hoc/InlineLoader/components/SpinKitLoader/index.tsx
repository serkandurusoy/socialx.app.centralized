import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';

import {Colors, Sizes} from 'theme';
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

interface ISpinKitLoaderProps {
	spinnerType?: SpinnerTypes;
	spinnerSize?: number;
	spinnerColor?: string;
}

export const SpinKitLoader: React.SFC<ISpinKitLoaderProps> = ({spinnerSize, spinnerColor, spinnerType}) => (
	<View style={style.spinnerContainer}>
		<Spinner isVisible={true} size={spinnerSize} type={spinnerType} color={spinnerColor} />
	</View>
);

SpinKitLoader.defaultProps = {
	spinnerType: SpinnerTypes.NineCubeGrid,
	spinnerSize: Sizes.smartHorizontalScale(30),
	spinnerColor: Colors.pink,
};
