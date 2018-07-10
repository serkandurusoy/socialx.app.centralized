import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {FriendsSearchResult} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
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

interface IEventListItemProps extends IEventData, IWithTranslationProps {
	navigateToEventDetailPage: () => void;
}

interface IEventTextProps extends IWithTranslationProps {
	title: string;
	startDate: Date;
	endDate: Date;
	allDay: boolean;
	startTime?: Date;
	endTime?: Date;
}

const EventSpanningTextComp: React.SFC<IEventTextProps> = ({
	startDate,
	endDate,
	allDay,
	startTime,
	endTime,
	title,
	getText,
}) => {
	const isMultiDay = startDate.getTime() !== endDate.getTime();
	let spanText = '';
	if (allDay) {
		spanText = getText('events.list.item.all.day');
	} else if (startTime && !endTime) {
		const startTimeWithFormat = moment(startTime).format('HH:mmA');
		spanText = `${getText('events.list.item.start.at')} ${startTimeWithFormat}`;
	} else if (startTime && endTime) {
		let dateFormat = 'HH:mmA';
		if (isMultiDay) {
			dateFormat = 'MMM D, YYYY, ' + dateFormat; // maybe better format here?
		}
		const startTimeWithFormat = moment(startTime).format(dateFormat);
		const endTimeWithFormat = moment(endTime).format(dateFormat);
		spanText = `${startTimeWithFormat} - ${endTimeWithFormat}`;
	} else {
		spanText = title;
		// TODO: handle other possible combinations
	}

	return <Text style={style.spanning}>{spanText}</Text>;
};

const EventSpanningText = withTranslations(EventSpanningTextComp);

const EventListItemComp: React.SFC<IEventListItemProps> = ({
	title,
	color,
	startDate,
	endDate,
	allDay,
	startTime,
	endTime,
	location,
	invitedFriends,
	description,
	navigateToEventDetailPage,
	getText,
}) => (
	<View style={style.container}>
		<View style={[style.eventDotColor, {backgroundColor: color}]} />
		<View style={style.rightContainer}>
			<TouchableOpacity onPress={navigateToEventDetailPage}>
				<Text style={style.title}>{title + (location ? ` ${getText('text.at')} ${location}` : '')}</Text>
			</TouchableOpacity>
			<EventSpanningText
				allDay={allDay}
				title={title}
				startDate={startDate}
				startTime={startTime}
				endDate={endDate}
				endTime={endTime}
			/>
		</View>
	</View>
);

export const EventListItem = withTranslations(EventListItemComp);
