import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from 'theme';

const BUTTON_HEIGHT = Sizes.smartVerticalScale(36);
const VOTE_CONTAINER_HEIGHT = Sizes.smartHorizontalScale(30);

const style: any = {
	container: {
		width: '100%',
		paddingBottom: Sizes.smartVerticalScale(39),
	},
	mediaObjectContainer: {
		backgroundColor: Colors.iron,
		borderRadius: Sizes.smartHorizontalScale(8),
		overflow: 'hidden',
		width: '100%',
		height: Sizes.smartVerticalScale(151),
	},
	mediaObject: {
		width: '100%',
		height: '100%',
	},
	buttonContainer: {
		alignItems: 'center',
		marginTop: -BUTTON_HEIGHT / 2,
	},
	voteButton: {
		height: BUTTON_HEIGHT,
		borderRadius: BUTTON_HEIGHT / 2,
		paddingHorizontal: Sizes.smartHorizontalScale(40),
	},
	votesContainer: {
		position: 'absolute',
		paddingHorizontal: Sizes.smartHorizontalScale(5),
		bottom: Sizes.smartHorizontalScale(5),
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	voteContainer: {
		borderRadius: VOTE_CONTAINER_HEIGHT / 2,
		height: VOTE_CONTAINER_HEIGHT,
		minWidth: VOTE_CONTAINER_HEIGHT,
		paddingHorizontal: Sizes.smartHorizontalScale(5),
		alignItems: 'center',
		justifyContent: 'center',
	},
	upVoteColor: {
		backgroundColor: Colors.sushi,
	},
	downVoteColor: {
		backgroundColor: Colors.ceriseRed,
	},
	voteText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(17),
		color: Colors.white,
	},
};

export default StyleSheet.create(style);
