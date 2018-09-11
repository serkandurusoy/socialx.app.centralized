// MIGRATION: migrated to components/displayers/NoComments

import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Sizes} from 'theme';
import style from './style';

interface INoCommentsProps {
	text: string;
}

export const NoComments: React.SFC<INoCommentsProps> = ({text}) => (
	<View style={style.noCommentsContainer}>
		<Icon name={'md-list'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
		<Text style={style.noCommentsText}>{text}</Text>
	</View>
);
