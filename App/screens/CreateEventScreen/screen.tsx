import moment from 'moment';
import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import {Hoshi, Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {AddFriendsList} from '../../components/Displayers/AddFriendsList';
import {CheckboxButtonWithIcon} from '../../components/Displayers/CheckboxButtonWithIcon';
import {IEventData} from '../../components/Displayers/EventListItem';
import {Colors, Icons, Sizes} from '../../theme';
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
		startTime: undefined,
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
		return {
			title: this.state.title,
			color: this.state.selectedColor,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			allDay: this.state.allDayEvent,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			location: this.state.location,
			description: this.state.description,
			invitedFriends: this.props.invitedFriends,
		};
	}

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
	}

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
	}

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
	}

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
	}

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
	}

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
	}

	private getPickerMode = (): 'date' | 'time' => {
		if (this.state.datePickerMode === PICKER_MODE.START_DATE || this.state.datePickerMode === PICKER_MODE.END_DATE) {
			return 'date';
		}
		return 'time';
	}

	private showStartDayPicker = () => {
		this.setState({
			datePickerMode: PICKER_MODE.START_DATE,
			datePickerVisible: true,
			pickerInitDate: this.state.startDate,
		});
	}

	private showEndDayPicker = () => {
		this.setState({
			datePickerMode: PICKER_MODE.END_DATE,
			datePickerVisible: true,
			pickerInitDate: this.state.endDate,
		});
	}

	private showStartTimePicker = () => {
		const {startDate} = this.state;
		const initDate = moment(this.state.startTime)
			.year(startDate.getFullYear())
			.month(startDate.getMonth())
			.date(startDate.getDate())
			.toDate();
		this.setState({
			datePickerMode: PICKER_MODE.START_TIME,
			datePickerVisible: true,
			pickerInitDate: initDate,
		});
	}

	private showEndTimePicker = () => {
		this.setState({
			datePickerMode: PICKER_MODE.END_TIME,
			datePickerVisible: true,
		});
	}

	private datePickedHandler = (date: Date) => {
		const updatedState: Partial<ICreateEventScreenComponentState> = {};
		if (this.state.datePickerMode === PICKER_MODE.START_DATE) {
			updatedState.startDate = date;
		} else if (this.state.datePickerMode === PICKER_MODE.END_DATE) {
			updatedState.endDate = date;
		} else if (this.state.datePickerMode === PICKER_MODE.START_TIME) {
			updatedState.startTime = date;
		} else if (this.state.datePickerMode === PICKER_MODE.END_TIME) {
			updatedState.endTime = date;
		}
		this.setState(updatedState);
		this.dismissDatePicker();
	}

	private dismissDatePicker = () => {
		this.setState({
			datePickerVisible: false,
		});
	}

	private newColorSelectedHandler = (index: number, value: string) => {
		this.setState({
			selectedColor: value,
		});
	}

	private renderColorItem = (color: string) => {
		const colorStyle = {backgroundColor: color};
		return <View style={[style.colorRoundButton, colorStyle]} />;
	}

	private colorPickerUpdateSize = (sizes: any) => {
		return {...sizes, height: EVENT_COLORS.length * COLOR_BUTTON_HEIGHT};
	}

	private toggleCheckbox = (stateItemKey: string) => {
		const updatedState = {};
		updatedState[stateItemKey] = !this.state[stateItemKey];
		this.setState(updatedState);
	}

	private textInputChanged = (value: string, stateItemKey) => {
		const updatedState = {};
		updatedState[stateItemKey] = value;
		this.setState(updatedState);
	}
}
