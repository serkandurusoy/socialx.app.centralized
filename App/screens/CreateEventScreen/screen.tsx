import moment from 'moment';
import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../theme/';
import style from './style';

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
}

interface ICreateEventScreenComponentState {
	startDate: Date;
	endDate: Date;
	startTime: Date;
	endTime: Date;
	datePickerVisible: boolean;
	datePickerMode: PICKER_MODE;
}

export default class CreateEventScreenComponent extends Component<
	ICreateEventScreenComponentProps,
	ICreateEventScreenComponentState
> {
	public state = {
		startDate: this.props.initialDate,
		endDate: this.props.initialDate,
		startTime: this.props.initialDate,
		endTime: this.props.initialDate,
		datePickerVisible: false,
		datePickerMode: PICKER_MODE.START_DATE,
	};

	public render() {
		const startDateWithFormat = moment(this.state.startDate).format(DATE_FORMAT);
		const endDateWithFormat = moment(this.state.endDate).format(DATE_FORMAT);
		const startTimeWithFormat = moment(this.state.startTime).format(TIME_FORMAT);
		const endTimeWithFormat = moment(this.state.endTime).format(TIME_FORMAT);
		return (
			<KeyboardAwareScrollView
				style={style.scrollView}
				alwaysBounceVertical={true}
				keyboardShouldPersistTaps={'handled'}
			>
				<DateTimePicker
					isVisible={this.state.datePickerVisible}
					mode={this.getPickerMode()}
					onConfirm={this.datePickedHandler}
					onCancel={this.dismissDatePicker}
				/>
				<View style={[style.paddingContainer, style.topContainer]}>
					<Sae
						label={'Add title'}
						iconClass={FontAwesomeIcon}
						iconName={'pencil'}
						iconColor={Colors.transparent} // trick to hide the icon
						style={style.titleElement}
						inputStyle={style.titleInput}
						labelStyle={style.titleLabel}
						autoCapitalize={'none'}
						autoCorrect={false}
					/>
				</View>
				<View style={style.startEndDateContainer}>
					<TouchableOpacity onPress={this.showStartDayPicker} style={style.startDateButton}>
						<Sae
							label={'Start date'}
							iconClass={FontAwesomeIcon}
							iconName={'pencil'}
							iconColor={Colors.transparent} // trick to hide the icon
							style={style.titleElement}
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
							style={style.titleElement}
							inputStyle={style.titleInput}
							labelStyle={style.titleLabel}
							editable={false}
							value={endDateWithFormat}
							pointerEvents={'none'}
						/>
					</TouchableOpacity>
				</View>
				<View style={style.startEndDateContainer}>
					<TouchableOpacity onPress={this.showStartTimePicker} style={style.startDateButton}>
						<Sae
							label={'Start time'}
							iconClass={FontAwesomeIcon}
							iconName={'pencil'}
							iconColor={Colors.transparent} // trick to hide the icon
							style={style.titleElement}
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
							style={style.titleElement}
							inputStyle={style.titleInput}
							labelStyle={style.titleLabel}
							editable={false}
							value={endTimeWithFormat}
							pointerEvents={'none'}
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
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
		});
	}

	private showEndDayPicker = () => {
		this.setState({
			datePickerMode: PICKER_MODE.END_DATE,
			datePickerVisible: true,
		});
	}

	private showStartTimePicker = () => {
		this.setState({
			datePickerMode: PICKER_MODE.START_TIME,
			datePickerVisible: true,
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
}
