import {AddFriendsList} from 'components/Displayers/AddFriendsList';
import {CheckboxButtonWithIcon} from 'components/Displayers/CheckboxButtonWithIcon';
import {IEventData} from 'components/Displayers/EventListItem';
import moment from 'moment';
import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import {Hoshi, Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Colors, Icons, Sizes} from 'theme';
import {FriendsSearchResult} from '../PhotoScreen';
import style, {COLOR_BUTTON_HEIGHT} from './style';

const DATE_FORMAT = 'DD MMM YYYY';
const TIME_FORMAT = 'hh:mm A';

enum PICKER_MODE {
	START_DATE = 0,
	END_DATE = 1,
	START_TIME = 2,
	END_TIME = 3,
}

enum PICKER_IOS_TITLE {
	START_DATE = 'Pick a start date',
	END_DATE = 'Pick an end date',
	START_TIME = 'Pick a start time',
	END_TIME = 'Pick an end time',
}

interface ICreateEventScreenComponentProps {
	initialDate: Date;
	showInviteFriendsModal: () => void;
	invitedFriends: FriendsSearchResult[];
}

interface ICreateEventScreenComponentState {
	startDate: Date;
	endDate: Date;
	startTime?: Date;
	endTime?: Date;
	datePickerVisible: boolean;
	datePickerMode: PICKER_MODE;
	selectedColor: string;
	allDayEvent: boolean;
	locationEnabled: boolean;
	inviteFriendsEnabled: boolean;
	descriptionEnabled: boolean;
	location: string;
	description: string;
	pickerInitDate: Date;
	minimumDate: Date | undefined;
	iosTitle: PICKER_IOS_TITLE;
}

const EVENT_COLORS = ['red', 'purple', 'lime', 'yellow', 'blue', 'cyan'];

export default class CreateEventScreenComponent extends Component<
	ICreateEventScreenComponentProps,
	ICreateEventScreenComponentState
> {
	public state = {
		title: '',
		startDate: this.props.initialDate,
		endDate: this.props.initialDate,
		startTime: moment(this.props.initialDate)
			.add(1, 'hour')
			.toDate(),
		endTime: undefined,
		datePickerVisible: false,
		datePickerMode: PICKER_MODE.START_DATE,
		selectedColor: EVENT_COLORS[0],
		allDayEvent: false,
		locationEnabled: false,
		inviteFriendsEnabled: false,
		descriptionEnabled: false,
		location: '',
		description: '',
		pickerInitDate: new Date(),
		minimumDate: undefined,
		iosTitle: PICKER_IOS_TITLE.START_DATE,
	};

	public render() {
		return (
			<KeyboardAwareScrollView
				style={style.scrollView}
				alwaysBounceVertical={false}
				keyboardShouldPersistTaps={'handled'}
			>
				<DateTimePicker
					isVisible={this.state.datePickerVisible}
					mode={this.getPickerMode()}
					onConfirm={this.datePickedHandler}
					onCancel={this.dismissDatePicker}
					date={this.state.pickerInitDate}
					minimumDate={this.state.minimumDate}
					titleIOS={this.state.iosTitle}
				/>
				{this.renderAddTitleAndColor()}
				{this.renderStartEndDateSection()}
				{this.renderAllDayEvent()}
				{this.renderStartEndTimeSection()}
				{this.renderInputWithCheckboxItem('Add location', 'locationEnabled', Icons.iconLocationPin, 'location')}
				{this.renderInviteFriends()}
				{this.renderInputWithCheckboxItem(
					'Add description',
					'descriptionEnabled',
					Icons.iconAddDescription,
					'description',
				)}
			</KeyboardAwareScrollView>
		);
	}

	public getEventData = (): IEventData => {
		const {startTime, endTime, startDate, endDate} = this.state;
		startDate.setHours(0, 0, 0);
		endDate.setHours(0, 0, 0);
		let ret: IEventData = {
			title: this.state.title,
			color: this.state.selectedColor,
			startDate,
			endDate,
			allDay: this.state.allDayEvent,
		};
		if (!this.state.allDayEvent) {
			if (startTime !== undefined) {
				(startTime as Date).setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
			}
			if (endTime !== undefined) {
				(endTime as Date).setFullYear(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
			}
			ret = {...ret, startTime, endTime};
		}
		if (this.state.locationEnabled && this.state.location) {
			ret = {...ret, location: this.state.location};
		}
		if (this.state.descriptionEnabled && this.state.description) {
			ret = {...ret, description: this.state.description};
		}
		if (this.state.inviteFriendsEnabled && this.props.invitedFriends.length > 0) {
			ret = {...ret, invitedFriends: this.props.invitedFriends};
		}
		return ret;
	};

	private renderAddTitleAndColor = () => {
		const selectedColorStyle = {backgroundColor: this.state.selectedColor};
		return (
			<View style={[style.paddingContainer, style.topContainer]}>
				<View style={{flex: 1}}>
					<Sae
						label={'Add title'}
						iconClass={FontAwesomeIcon}
						iconName={'pencil'}
						iconColor={Colors.transparent} // trick to hide the icon
						style={[style.saeElement, style.addsaeElement]}
						inputStyle={style.titleInput}
						labelStyle={style.titleLabel}
						onChangeText={(value: string) => this.textInputChanged(value, 'title')}
						autoCapitalize={'none'}
						autoCorrect={false}
					/>
				</View>
				<ModalDropdown
					keyboardShouldPersistTaps={'handled'}
					dropdownStyle={style.colorDropDown}
					options={EVENT_COLORS}
					defaultValue={EVENT_COLORS[0]}
					onSelect={this.newColorSelectedHandler}
					renderRow={this.renderColorItem}
					renderSeparator={() => <View />}
					scrollEnabled={false}
					adjustFrame={this.colorPickerUpdateSize}
				>
					<View style={[style.colorRoundButton, selectedColorStyle]} />
				</ModalDropdown>
			</View>
		);
	};

	private renderStartEndDateSection = () => {
		const startDateWithFormat = moment(this.state.startDate).format(DATE_FORMAT);
		const endDateWithFormat = moment(this.state.endDate).format(DATE_FORMAT);
		return (
			<View style={style.startEndDateContainer}>
				<TouchableOpacity onPress={this.showStartDayPicker} style={style.startDateButton}>
					<Sae
						label={'Start date'}
						iconClass={FontAwesomeIcon}
						iconName={'pencil'}
						iconColor={Colors.transparent} // trick to hide the icon
						style={style.saeElement}
						inputStyle={style.titleInput}
						labelStyle={style.titleLabel}
						editable={false}
						value={startDateWithFormat}
						pointerEvents={'none'}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.showEndDayPicker} style={[style.startDateButton, style.leftBorder]}>
					<Sae
						label={'End date'}
						iconClass={FontAwesomeIcon}
						iconName={'pencil'}
						iconColor={Colors.transparent} // trick to hide the icon
						style={style.saeElement}
						inputStyle={style.titleInput}
						labelStyle={style.titleLabel}
						editable={false}
						value={endDateWithFormat}
						pointerEvents={'none'}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	private renderStartEndTimeSection = () => {
		if (!this.state.allDayEvent) {
			const startTimeWithFormat = this.state.startTime ? moment(this.state.startTime).format(TIME_FORMAT) : '-';
			const endTimeWithFormat = this.state.endTime ? moment(this.state.endTime).format(TIME_FORMAT) : '-';
			return (
				<View style={style.startEndDateContainer}>
					<TouchableOpacity onPress={this.showStartTimePicker} style={style.startDateButton}>
						<Sae
							label={'Start time'}
							iconClass={FontAwesomeIcon}
							iconName={'pencil'}
							iconColor={Colors.transparent} // trick to hide the icon
							style={style.saeElement}
							inputStyle={style.titleInput}
							labelStyle={style.titleLabel}
							editable={false}
							value={startTimeWithFormat}
							pointerEvents={'none'}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.showEndTimePicker} style={[style.startDateButton, style.leftBorder]}>
						<Sae
							label={'End time'}
							iconClass={FontAwesomeIcon}
							iconName={'pencil'}
							iconColor={Colors.transparent} // trick to hide the icon
							style={style.saeElement}
							inputStyle={style.titleInput}
							labelStyle={style.titleLabel}
							editable={false}
							value={endTimeWithFormat}
							pointerEvents={'none'}
						/>
					</TouchableOpacity>
				</View>
			);
		}
		return null;
	};

	private renderAllDayEvent = () => {
		return (
			<View style={style.toggleContainer}>
				<CheckboxButtonWithIcon
					selected={this.state.allDayEvent}
					text={'ALL DAY'}
					onPress={() => this.toggleCheckbox('allDayEvent')}
				/>
			</View>
		);
	};

	private renderInviteFriends = () => {
		return (
			<View>
				<View style={style.toggleContainer}>
					<CheckboxButtonWithIcon
						iconSource={Icons.iconInviteFriends}
						selected={this.state.inviteFriendsEnabled}
						text={'INVITE FRIENDS'}
						onPress={() => this.toggleCheckbox('inviteFriendsEnabled')}
					/>
				</View>
				{this.state.inviteFriendsEnabled ? (
					<View style={style.paddingContainer}>
						<AddFriendsList
							taggedFriends={this.props.invitedFriends}
							showTagFriendsModal={this.props.showInviteFriendsModal}
						/>
					</View>
				) : null}
			</View>
		);
	};

	private renderInputWithCheckboxItem = (
		label: string,
		stateEnabledItemKey: string,
		icon: number,
		stateItemKey: string,
	) => {
		const isEnabled = this.state[stateEnabledItemKey];
		return (
			<View>
				<View style={style.toggleContainer}>
					<CheckboxButtonWithIcon
						iconSource={icon}
						selected={isEnabled}
						text={label.toUpperCase()}
						onPress={() => this.toggleCheckbox(stateEnabledItemKey)}
					/>
				</View>
				{isEnabled ? (
					<View style={style.paddingContainer}>
						<Hoshi
							label={label}
							style={style.hoshiElement}
							inputStyle={style.toggleInputStyle}
							labelStyle={style.titleLabel}
							multiline={true}
							borderColor={Colors.transparent}
							height={Sizes.smartVerticalScale(60)}
							onChangeText={(value: string) => this.textInputChanged(value, stateItemKey)}
						/>
					</View>
				) : null}
			</View>
		);
	};

	private getPickerMode = (): 'date' | 'time' => {
		if (this.state.datePickerMode === PICKER_MODE.START_DATE || this.state.datePickerMode === PICKER_MODE.END_DATE) {
			return 'date';
		}
		return 'time';
	};

	private showStartDayPicker = () => {
		this.setState({
			datePickerMode: PICKER_MODE.START_DATE,
			datePickerVisible: true,
			pickerInitDate: this.state.startDate,
			iosTitle: PICKER_IOS_TITLE.START_DATE,
			minimumDate: new Date(),
		});
	};

	private showEndDayPicker = () => {
		this.setState({
			datePickerMode: PICKER_MODE.END_DATE,
			datePickerVisible: true,
			pickerInitDate: this.state.endDate,
			iosTitle: PICKER_IOS_TITLE.END_DATE,
			minimumDate: this.state.startDate,
		});
	};

	private showStartTimePicker = () => {
		this.setState({
			datePickerMode: PICKER_MODE.START_TIME,
			datePickerVisible: true,
			pickerInitDate: this.state.startTime,
			iosTitle: PICKER_IOS_TITLE.START_TIME,
			minimumDate: undefined,
		});
	};

	private showEndTimePicker = () => {
		let initDate: Date | undefined = this.state.endTime;
		if (!initDate) {
			initDate = new Date();
			initDate.setHours(0, 0, 0);
		}
		this.setState({
			datePickerMode: PICKER_MODE.END_TIME,
			datePickerVisible: true,
			pickerInitDate: initDate as Date,
			iosTitle: PICKER_IOS_TITLE.END_TIME,
			minimumDate: undefined,
		});
	};

	private datePickedHandler = (date: Date) => {
		const updatedState: Partial<ICreateEventScreenComponentState> = {};
		if (this.state.datePickerMode === PICKER_MODE.START_DATE) {
			updatedState.startDate = date;
			let endDate = this.state.endDate;
			if (this.state.endDate < date) {
				endDate = date;
			}
			// make sure endDate is after start date
			updatedState.endDate = endDate;
			if (this.state.endTime && this.state.startTime && this.state.endTime < this.state.startTime) {
				this.syncEndTime(updatedState, date, endDate);
			}
		} else if (this.state.datePickerMode === PICKER_MODE.END_DATE) {
			if (this.state.endTime && this.state.startTime && this.state.endTime < this.state.startTime) {
				this.syncEndTime(updatedState, this.state.startDate, date);
			}
			updatedState.endDate = date;
		} else if (this.state.datePickerMode === PICKER_MODE.START_TIME) {
			if (this.state.endTime && this.state.endTime < date) {
				this.syncEndTime(updatedState);
			}
			updatedState.startTime = date;
		} else if (this.state.datePickerMode === PICKER_MODE.END_TIME) {
			if (this.state.startTime && date < this.state.startTime) {
				this.syncEndTime(updatedState);
			}
			updatedState.endTime = date;
		}
		this.setState(updatedState);
		this.dismissDatePicker();
	};

	private syncEndTime = (
		updatedState: Partial<ICreateEventScreenComponentState>,
		startDate = this.state.startDate,
		endDate = this.state.endDate,
	) => {
		// if endTime is after statTime make sure endDate is not the same as startDate
		const startDateString = moment(startDate).format(DATE_FORMAT);
		const endDateString = moment(endDate).format(DATE_FORMAT);
		if (startDateString === endDateString) {
			updatedState.endDate = moment(endDate)
				.add(1, 'day')
				.toDate();
		}
	};

	private dismissDatePicker = () => {
		this.setState({
			datePickerVisible: false,
		});
	};

	private newColorSelectedHandler = (index: number, value: string) => {
		this.setState({
			selectedColor: value,
		});
	};

	private renderColorItem = (color: string) => {
		const colorStyle = {backgroundColor: color};
		return <View style={[style.colorRoundButton, colorStyle]} />;
	};

	private colorPickerUpdateSize = (sizes: any) => {
		return {...sizes, height: EVENT_COLORS.length * COLOR_BUTTON_HEIGHT};
	};

	private toggleCheckbox = (stateItemKey: string) => {
		const updatedState = {};
		updatedState[stateItemKey] = !this.state[stateItemKey];
		this.setState(updatedState);
	};

	private textInputChanged = (value: string, stateItemKey) => {
		const updatedState = {};
		updatedState[stateItemKey] = value;
		this.setState(updatedState);
	};
}
