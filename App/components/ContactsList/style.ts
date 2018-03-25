import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(36);
const VERTICAL_PADDING = Sizes.smartHorizontalScale(11);
export const LIST_ITEM_HEIGHT = AVATAR_SIZE + 2 * VERTICAL_PADDING;
export const SECTION_HEADER_HEIGHT = Sizes.smartHorizontalScale(30);
export const ALPHABET_ITEM_FONT_SIZE = Sizes.smartHorizontalScale(11);

const style: any = {
	listElement: {
		width: '100%',
	},
	contactListItemCell: {
		width: '100%',
		height: LIST_ITEM_HEIGHT,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(25),
	},
	avatarImg: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		marginRight: Sizes.smartHorizontalScale(20),
		borderRadius: AVATAR_SIZE / 2,
	},
	fullName: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postFullName,
	},
	alphabetListItem: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: ALPHABET_ITEM_FONT_SIZE,
		width: Sizes.smartHorizontalScale(30),
		textAlign: 'center',
	},
	sectionHeaderContainer: {
		height: SECTION_HEADER_HEIGHT,
		width: '100%',
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(21),
		justifyContent: 'center',
	},
	sectionHeaderText: {
		...Fonts.centuryGothic,
		color: Colors.tundora,
		fontSize: Sizes.smartHorizontalScale(16),
	},
};

export default StyleSheet.create(style);
