import numeral from 'numeral';
import React from 'react';
import {Image, Text, View} from 'react-native';

import style from './style';

export interface IProfileStatisticsProps {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
}

export const ProfileStatistics: React.SFC<IProfileStatisticsProps> = (props) => {
	const renderStatistic = (name: string, value: number) => {
		const formattedValue = numeral(value).format('0a');
		return (
			<View style={style.statItem}>
				<Text style={style.statValue}>{formattedValue}</Text>
				<Text style={style.statText}>{name}</Text>
			</View>
		);
	};

	return (
		<View style={style.container}>
			{renderStatistic('photos', props.numberOfPhotos)}
			{renderStatistic('likes', props.numberOfLikes)}
			{renderStatistic('followers', props.numberOfFollowers)}
			{renderStatistic('following', props.numberOfFollowing)}
		</View>
	);
};
