import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';

interface IStatisticsProps {
	text: string;
	value: number;
}

const Statistics: React.SFC<IStatisticsProps> = ({text, value}) => (
	<View style={styles.container}>
		<Text style={styles.value}>{value}</Text>
		<Text style={styles.text}>{text}</Text>
	</View>
);

export default Statistics;
