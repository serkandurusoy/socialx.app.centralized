import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme/';

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
		height: 50,
		backgroundColor: 'yellow',
		borderBottomWidth: 2,
		borderBottomColor: 'red',
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
};

export default StyleSheet.create(style);
