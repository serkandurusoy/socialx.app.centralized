import moment from 'moment';
import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {FriendsSearchResult} from '../../../screens/PhotoScreen';
import style from './style';

export interface IEventData {
	title: string;
	color: string;
	startDate: Date;
	endDate: Date;
	allDay: boolean;
	startTime?: Date;
	endTime?: Date;
	location?: string;
	invitedFriends?: FriendsSearchResult[];
	description?: string;
}

export const EventListItem: React.SFC<IEventData> = (props) => {
	const getTitleWithLocation = () => {
		let ret = props.title;
		if (props.location) {
			ret += ' at ' + props.location;
		}
		return ret;
	};

	const getEventSpanningText = () => {
		let ret = '';
		const isMultiDay = props.startDate.getTime() !== props.endDate.getTime();
		if (props.allDay) {
			ret = 'All Day';
		} else if (props.startTime && !props.endTime) {
			const startTimeWithFormat = moment(props.startTime).format('HH:mmA');
			ret = `Start at ${startTimeWithFormat}`;
		} else if (props.startTime && props.endTime) {
			let dateFormat = 'HH:mmA';
			if (isMultiDay) {
				dateFormat = 'MMM D, YYYY, ' + dateFormat; // maybe better format here?
			}
			const startTimeWithFormat = moment(props.startTime).format(dateFormat);
			const endTimeWithFormat = moment(props.endTime).format(dateFormat);
			ret = `${startTimeWithFormat} - ${endTimeWithFormat}`;
		} else {
			ret = props.title;
			// TODO: handle other possible combinations
		}
		return ret;
	};

	return (
		<View style={style.container}>
			<View style={[style.eventDotColor, {backgroundColor: props.color}]} />
			<View style={style.rightContainer}>
				<Text style={style.title}>{getTitleWithLocation()}</Text>
				<Text style={style.spanning}>{getEventSpanningText()}</Text>
			</View>
		</View>
	);
};
