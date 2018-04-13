import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

const ADD_BUTTON_SIZE = Sizes.smartHorizontalScale(50);

const style: any = {
	container: {
		backgroundColor: Colors.white,
		flex: 1,
		width: '100%',
	},
	agenda: {
		backgroundColor: Colors.white,
	},
	agendaItem: {
		width: '100%',
		backgroundColor: 'yellow',
	},
	currentMonthTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		lineHeight: Sizes.smartHorizontalScale(24),
		color: Colors.postFullName,
		width: '100%',
		textAlign: 'center',
		paddingTop: Sizes.smartVerticalScale(11),
	},
	dayContainer: {
		width: '100%',
		alignItems: 'center',
		// backgroundColor: Colors.alabaster,
		backgroundColor: 'orange',
		height: Sizes.smartHorizontalScale(20),
	},
	dayHeader: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.postFullName,
	},
	addButtonContainer: {
		width: ADD_BUTTON_SIZE,
		height: ADD_BUTTON_SIZE,
		borderRadius: ADD_BUTTON_SIZE / 2,
		backgroundColor: Colors.postHour,
		position: 'absolute',
		bottom: Sizes.smartHorizontalScale(10),
		right: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
	},
};

export default StyleSheet.create(style);
