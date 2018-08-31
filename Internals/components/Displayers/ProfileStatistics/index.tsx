import numeral from 'numeral';
import React from 'react';
import {Text, View} from 'react-native';

import {WithTranslations} from 'utilities';
import style, {STATS_HEIGHT} from './style';

export const PROFILE_STATS_HEIGHT = STATS_HEIGHT;

interface IProfileStatisticsProps {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	profileViews: number;
}

interface IStatisticItemProps {
	name: string;
	value: number;
}

const StatisticItem: React.SFC<IStatisticItemProps> = ({name, value}) => {
	const formattedValue = numeral(value).format('0a');
	return (
		<WithTranslations>
			{({getText}) => (
				<View style={style.statItem}>
					<Text style={style.statValue}>{formattedValue}</Text>
					<Text style={style.statText}>{getText(name)}</Text>
				</View>
			)}
		</WithTranslations>
	);
};

export const ProfileStatistics: React.SFC<IProfileStatisticsProps> = ({
	numberOfPhotos,
	numberOfLikes,
	numberOfFollowers,
	numberOfFollowing,
	profileViews,
}) => (
	<View style={style.container}>
		<StatisticItem name={'profile.statistics.photos'} value={numberOfPhotos} />
		<StatisticItem name={'profile.statistics.likes'} value={numberOfLikes} />
		<StatisticItem name={'profile.statistics.followers'} value={numberOfFollowers} />
		<StatisticItem name={'profile.statistics.following'} value={numberOfFollowing} />
		<StatisticItem name={'profile.statistics.view.count'} value={profileViews} />
	</View>
);
