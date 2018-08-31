import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {ISXButtonProps, SXButton} from 'components';
import style from './style';

interface ISXButtonGProps extends ISXButtonProps {
	colorStart: string;
	colorEnd: string;
}

export const SXGradientButton: React.SFC<ISXButtonGProps> = (props) => {
	const {colorStart, colorEnd, disabled, loading, size, ...buttonProps} = props;

	const buttonDisabled = disabled || loading;

	return (
		<LinearGradient
			start={{x: 0, y: 0.5}}
			end={{x: 1, y: 0.5}}
			colors={[colorStart, colorEnd]}
			style={[style.container, buttonDisabled ? style.disabledButton : {}]}
		>
			<SXButton {...buttonProps} containerStyle={style.innerButtonContainer} />
		</LinearGradient>
	);
};
