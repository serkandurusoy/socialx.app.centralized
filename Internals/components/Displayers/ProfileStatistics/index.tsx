import numeral from 'numeral';
import React from 'react';
import {Text, View} from 'react-native';

import {IWithTranslationProps, withTranslationsSimple} from 'utilities';
import style, {STATS_HEIGHT} from './style';

export const PROFILE_STATS_HEIGHT = STATS_HEIGHT;

interface IProfileStatisticsProps {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	profileViews: number;
}

interface IStatisticItemProps extends IWithTranslationProps {
	name: string;
	value: number;
}

const StatisticItem: React.SFC<IStatisticItemProps> = withTranslationsSimple(({name, value, getText}) => {
	const formattedValue = numeral(value).format('0a');
	return (
		<View style={style.statItem}>
			<Text style={style.statValue}>{formattedValue}</Text>
			<Text style={style.statText}>{getText(name)}</Text>
		</View>
	);
});

export const ProfileStatistics: React.SFC<IProfileStatisticsProps> = (props) => {
	return (
		<View style={style.container}>
			<StatisticItem name={'profile.statistics.photos'} value={props.numberOfPhotos} />
			<StatisticItem name={'profile.statistics.likes'} value={props.numberOfLikes} />
			<StatisticItem name={'profile.statistics.followers'} value={props.numberOfFollowers} />
			<StatisticItem name={'profile.statistics.following'} value={props.numberOfFollowing} />
			<StatisticItem name={'profile.statistics.view.count'} value={props.profileViews} />
		</View>
	);
};
