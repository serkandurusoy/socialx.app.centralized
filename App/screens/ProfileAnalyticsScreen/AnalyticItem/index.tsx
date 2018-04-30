import React from 'react';
import {Image, ImagePropertiesSourceOptions, Text, TouchableOpacity, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import style from './style';

export interface IProfileAnalyticsItem {
	title: string;
	icon: ImagePropertiesSourceOptions;
	value: number;
	unit?: string;
	moreDetails?: {
		label: string;
		destinationScreen: string;
	};
}

interface IAnalyticItemProps extends IProfileAnalyticsItem {
	navigation: NavigationScreenProp<any>;
}

export const AnalyticItem: React.SFC<IAnalyticItemProps> = (props) => {
	let valueWithUnit: string = props.value.toString();
	if (props.unit) {
		valueWithUnit += ' ' + props.unit;
	}

	const containerStyles = [style.container, props.moreDetails ? {} : style.containerPaddingBottom];

	const goToMoreDetailsPage = () => {
		props.navigation.navigate(props.moreDetails.destinationScreen);
	};

	const renderMoreDetailsRow = () => {
		if (props.moreDetails) {
			return (
				<View style={style.moreDetailsContainer}>
					<TouchableOpacity onPress={goToMoreDetailsPage}>
						<Text style={style.moreDetailsLabel}>{props.moreDetails.label}</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return null;
	};

	return (
		<View style={containerStyles}>
			<Image source={props.icon} />
			<View style={style.dataRow}>
				<Text style={style.title}>{props.title.toUpperCase()}</Text>
				<Text style={style.valueAndUnit}>{valueWithUnit}</Text>
			</View>
			{renderMoreDetailsRow()}
		</View>
	);
};
