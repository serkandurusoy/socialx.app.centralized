import {IEventData} from 'components/Displayers/EventListItem';
import moment from 'moment';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Icons} from 'theme';
import {FriendsSearchResult} from '../PhotoScreen';
import style from './style';

const DATE_FORMAT = 'D MMM, YYYY';
const TIME_FORMAT = 'hh:mm A';

export interface IEventDetailScreenComponentProps {
	eventData: IEventData;
	onEventDelete: () => void;
}

export const EventDetailScreenComponent: React.SFC<IEventDetailScreenComponentProps> = (props) => {
	const {eventData} = props;

	const showAdvancedMenuHandler = () => {
		alert('TODO: what content goes here?');
	};

	const renderTitleSection = () => {
		const titleStyles = [style.titleColorContainer, {backgroundColor: eventData.color}];

		return (
			<View style={titleStyles}>
				<View style={style.eventTitleActions}>
					<TouchableOpacity onPress={props.onEventDelete}>
						<Icon name={'md-close'} style={style.topButton} />
					</TouchableOpacity>
					<TouchableOpacity onPress={showAdvancedMenuHandler}>
						<Icon name={'md-more'} style={style.topButton} />
					</TouchableOpacity>
				</View>
				<View style={style.titleContainer}>
					<Text style={style.title}>{eventData.title}</Text>
					{eventData.location ? <Text style={style.title}>{' at ' + eventData.location}</Text> : null}
				</View>
			</View>
		);
	};

	const renderCalendarSection = () => {
		let startDateTime = moment(eventData.startDate).format(DATE_FORMAT);
		if (eventData.startTime) {
			startDateTime += ' at ' + moment(eventData.startTime).format(TIME_FORMAT);
		}

		let endDateTime = moment(eventData.endDate).format(DATE_FORMAT);
		if (eventData.endTime) {
			endDateTime += ' at ' + moment(eventData.endTime).format(TIME_FORMAT);
		}

		return (
			<View style={style.sectionContainer}>
				<Icon name={'md-calendar'} style={style.sectionIcon} />
				<View style={{flex: 1}}>
					<View style={style.sidePushContainer}>
						<Text style={style.sectionItemLabel}>{'From'}</Text>
						<Text style={style.sectionItemText}>{startDateTime}</Text>
					</View>
					<View style={style.sidePushContainer}>
						<Text style={style.sectionItemLabel}>{'To'}</Text>
						<Text style={style.sectionItemText}>{endDateTime}</Text>
					</View>
				</View>
			</View>
		);
	};

	const renderLocationSection = () => {
		const locationText = eventData.location ? eventData.location : 'Not set';

		return (
			<View style={style.sectionContainer}>
				<Icon name={'md-pin'} style={style.sectionIcon} />
				<View style={{flex: 1}}>
					<View style={style.sidePushContainer}>
						<Text style={style.sectionItemLabel}>{'Location'}</Text>
						<Text style={style.sectionItemText}>{locationText}</Text>
					</View>
				</View>
			</View>
		);
	};

	const renderInvitedFriends = () => {
		if (eventData.invitedFriends && eventData.invitedFriends.length > 0) {
			return (
				<View style={{flex: 1}}>
					<ScrollView
						alwaysBounceHorizontal={false}
						showsHorizontalScrollIndicator={false}
						horizontal={true}
						contentContainerStyle={style.invitedFriendsScrollContainer}
						style={style.invitedFriendsScroll}
					>
						{eventData.invitedFriends.map((invitedFriend: FriendsSearchResult) => (
							<Image
								key={invitedFriend.id}
								source={{uri: invitedFriend.avatarURL}}
								resizeMode={'cover'}
								style={style.invitedFriendIcon}
							/>
						))}
					</ScrollView>
				</View>
			);
		}
		return <Text style={style.sectionItemText}>{'No friends invited'}</Text>;
	};

	const renderInvitedFriendsSection = () => {
		return (
			<View style={style.sectionContainer}>
				<View style={style.sectionIconAsset}>
					<Image source={Icons.iconInviteFriends} />
				</View>
				<View style={{flex: 1}}>
					<View style={style.sidePushContainer}>
						<Text style={style.sectionItemLabel}>{'Friends'}</Text>
						{renderInvitedFriends()}
					</View>
				</View>
			</View>
		);
	};

	const renderDescriptionSection = () => {
		const descriptionText = eventData.description ? eventData.description : 'Event has no description';

		return (
			<View style={style.descriptionContainer}>
				<View style={{flexDirection: 'row'}}>
					<View style={style.sectionIconAsset}>
						<Image source={Icons.iconAddDescription} />
					</View>
					<Text style={style.sectionItemLabel}>{'Description'}</Text>
				</View>
				<Text style={style.descriptionText}>{descriptionText}</Text>
			</View>
		);
	};

	return (
		<ScrollView style={style.container} alwaysBounceVertical={false}>
			{renderTitleSection()}
			{renderCalendarSection()}
			{renderLocationSection()}
			{renderInvitedFriendsSection()}
			{renderDescriptionSection()}
		</ScrollView>
	);
};
