import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Guideline sizes are based on iPhone 4.7" screen sizes
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// Here the threshold is based on iPhone 5.5" screen size
const thresholdWidth = 414;
const thresholdHeight = 736;

// @Discussion:
// Using smart scale all sizes below threshold levels are scaled proportional, same as "non-smart" scale.
// For larger devices (above threshold levels) scale will account for a ratio.
// For now a good ratio value I have found is 0.2 but we can adjust later.
// For smart scale if we set ratio to 1 it will be the same as "non-smart" scale.
// Inspired by https://blog.solutotlv.com/size-matters/

const Sizes = {
	horizontalScale: (size: number) => width / guidelineBaseWidth * size,
	verticalScale: (size: number) => height / guidelineBaseHeight * size,
	smartHorizontalScale: (size: number, ratio: number = 0.2) => {
		if (width <= thresholdWidth) {
			return Sizes.horizontalScale(size);
		}
		return size * (1 + (width / guidelineBaseWidth - 1) * ratio);
	},
	smartVerticalScale: (size: number, ratio: number = 0.2) => {
		if (height <= thresholdHeight) {
			return Sizes.verticalScale(size);
		}
		return size * (1 + (height / guidelineBaseHeight - 1) * ratio);
	},
	getThumbSize: () => {
		const baseThumbSize = guidelineBaseWidth / 3; // 3 thumbs in a row for iPhone 4.7"
		let ret;
		if (width > thresholdWidth) {
			const scaledThumbSize = Sizes.smartHorizontalScale(baseThumbSize);
			const numberOfThumbsPerRow = Math.round(width / scaledThumbSize);
			ret = width / numberOfThumbsPerRow;
		} else {
			ret = width / 3;
		}
		return ret;
	},
};

export default Sizes;
