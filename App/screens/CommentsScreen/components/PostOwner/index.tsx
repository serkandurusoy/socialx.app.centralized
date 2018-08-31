import noop from 'lodash/noop';
import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from 'components';
import {Colors} from 'theme';
import {HeaderRight} from '../HeaderRight';
import styles from './style';

interface IPostOwnerProps {
	owner: any;
	timestamp: Date;
	onBackPress: () => void;
	optionsProps: any;
}

export const PostOwner: React.SFC<IPostOwnerProps> = ({owner, timestamp, onBackPress, optionsProps}) => {
	const timeStampDate = moment(timestamp).format('MMM DD');
	const timeStampHour = moment(timestamp).format('hh:mma');
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onBackPress}>
				<Icon name='ios-arrow-down' style={styles.arrow} />
			</TouchableOpacity>
			<TouchableOpacity onPress={noop}>
				<AvatarImage image={{uri: owner.avatarURL}} style={styles.avatar} />
			</TouchableOpacity>
			<View style={styles.textContainer}>
				<Text style={styles.user}>{owner.fullName}</Text>
				<Text style={styles.timestamp}>{`${timeStampDate} at ${timeStampHour}`}</Text>
			</View>
			<View style={styles.dotsContainer}>
				<HeaderRight
					sortOption={optionsProps.sortOption}
					onValueChange={optionsProps.onSelectionChange}
					icon='ios-more'
					iconColor={Colors.black}
				/>
			</View>
		</View>
	);
};

/**
 * TODO list:
 * 1. Add handler for display user profiles, when tapped on avatar!
 */
