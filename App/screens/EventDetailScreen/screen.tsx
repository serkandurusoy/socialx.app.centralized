import moment from 'moment';
import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {IEventData} from '../../components/Displayers/EventListItem';
import {Icons} from '../../theme';
import style from './style';

const DATE_FORMAT = 'D MMM, YYYY';

export interface IEventDetailScreenComponentProps {
	eventData: IEventData;
	onEventDelete: () => void;
}

export default class EventDetailScreenComponent extends Component<IEventDetailScreenComponentProps, any> {
	public render() {
		const titleStyles = [style.titleColorContainer];
		titleStyles.push({backgroundColor: this.props.eventData.color});
		const startDateTime = moment(this.props.eventData.startDate).format(DATE_FORMAT); // TODO: add startTime
		const endDateTime = moment(this.props.eventData.endDate).format(DATE_FORMAT); // TODO: add endTime
		const locationText = this.props.eventData.location ? this.props.eventData.location : '---';
		const descriptionText = this.props.eventData.description ? this.props.eventData.description : '---';
		return (
			<ScrollView style={style.container} alwaysBounceVertical={false}>
				<View style={titleStyles}>
					<View style={style.eventTitleActions}>
						<TouchableOpacity onPress={this.props.onEventDelete}>
							<Icon name={'md-close'} style={style.topButton} />
						</TouchableOpacity>
						<TouchableOpacity onPress={this.showAdvancedMenuHandler}>
							<Icon name={'md-more'} style={style.topButton} />
						</TouchableOpacity>
					</View>
					<View style={style.titleContainer}>
						<Text style={style.title}>{this.props.eventData.title}</Text>
						{this.props.eventData.location ? (
							<Text style={style.title}>{' at ' + this.props.eventData.location}</Text>
						) : null}
					</View>
				</View>
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
				<View style={style.sectionContainer}>
					<Icon name={'md-pin'} style={style.sectionIcon} />
					<View style={{flex: 1}}>
						<View style={style.sidePushContainer}>
							<Text style={style.sectionItemLabel}>{'Location'}</Text>
							<Text style={style.sectionItemText}>{locationText}</Text>
						</View>
					</View>
				</View>
				<View style={style.sectionContainer}>
					<View style={style.sectionIconAsset}>
						<Image source={Icons.iconInviteFriends} />
					</View>
					<View style={{flex: 1}}>
						<View style={style.sidePushContainer}>
							<Text style={style.sectionItemLabel}>{'Friends'}</Text>
							<Text style={style.sectionItemText}>{'Friends content goes here'}</Text>
						</View>
					</View>
				</View>
				<View style={style.descriptionContainer}>
					<View style={{flexDirection: 'row'}}>
						<View style={style.sectionIconAsset}>
							<Image source={Icons.iconAddDescription} />
						</View>
						<Text style={style.sectionItemLabel}>{'Description'}</Text>
					</View>
					<Text style={style.descriptionText}>{descriptionText}</Text>
				</View>
			</ScrollView>
		);
	}

	private showAdvancedMenuHandler = () => {
		alert('showAdvancedMenu');
	}
}
