import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Rect} from 'react-native-svg';
import {Colors} from 'theme';
import {SvgAnimatedLinearGradient} from '../SvgAnimatedLinearGradient';

type StylusView = StyleProp<ViewStyle>; // TODO: review

interface ILoaderViewProps {
	isLoading: boolean;
	style: StylusView;
	duration?: number;
	primaryColor?: string;
	secondaryColor?: string;
	animated?: boolean;
}

export const LoaderView: React.SFC<ILoaderViewProps> = (props) => {
	const newProps = {...props};
	if (props.isLoading) {
		delete newProps.children;
		return (
			<View {...newProps}>
				<SvgAnimatedLinearGradient
					animated={props.animated}
					height={'100%'}
					width={'100%'}
					duration={props.duration}
					primaryColor={props.primaryColor}
					secondaryColor={props.secondaryColor}
				>
					<Rect x={0} y={0} rx={4} ry={4} width={'100%'} height={'100%'} />
				</SvgAnimatedLinearGradient>
			</View>
		);
	}
	delete newProps.style;
	return <View {...newProps}>{props.children}</View>;
};

LoaderView.defaultProps = {
	duration: 1200,
	primaryColor: Colors.dustWhite,
	secondaryColor: Colors.iron,
	animated: false, // not working good when there are lot of animated items!
};
