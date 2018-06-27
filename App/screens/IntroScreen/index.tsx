import React from 'react';
import {ImageRequireSource, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';

import {Colors, Images} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import {resetNavigationToRoute} from '../../../Internals/backend/actions';
import style from './style';
import {WalkThroughFirst} from './WalkThroughFirst';
import {WalkThroughGeneric} from './WalkThroughGeneric';

const CustomSlide1 = 'CustomSlide1';
const GenericSlide = 'GenericSlide';

export interface ISlideProps {
	width: number;
	height: number;
	topSpacer: number;
	bottomSpacer: number;
	key: string;
	type: string;
	title: string;
	description: string;
}

export interface IGenericSlide extends ISlideProps {
	image: ImageRequireSource;
	gradient: string[];
}

const SkipButton: React.SFC<IWithTranslationProps> = ({getText}) => (
	<Text style={style.skipButton}>{getText('intro.skip.label')}</Text>
);
const SkipButtonTranslated = withTranslations(SkipButton);

const NextButton: React.SFC = () => (
	<View style={[style.buttonCircle, style.buttonNext]}>
		<Icon name='md-arrow-round-forward' style={style.whiteIcon} />
	</View>
);

const DoneButton: React.SFC = () => (
	<View style={[style.buttonCircle, style.buttonDone]}>
		<Icon name='md-checkmark' style={style.whiteIcon} />
	</View>
);

const renderSlide = (props: ISlideProps | IGenericSlide) => {
	if (props.type === CustomSlide1) {
		return <WalkThroughFirst {...props} />;
	} else if (props.type === GenericSlide) {
		return <WalkThroughGeneric {...props as IGenericSlide} />;
	}
};

const onDoneHandler = (navigation: NavigationScreenProp<any>) => {
	resetNavigationToRoute('MainScreen', navigation);
};

interface IIntroScreenProps extends IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
}

const IntroScreen: React.SFC<IIntroScreenProps> = ({navigation, getText}) => {
	const SLIDES = [
		{
			type: CustomSlide1,
			key: 'Slide1',
			title: getText('intro.first.slide.title'),
			description: getText('intro.first.slide.description'),
		},
		{
			type: GenericSlide,
			key: 'Slide2',
			title: getText('intro.second.slide.title'),
			description: getText('intro.second.slide.description'),
			image: Images.IntroWalkThrough2,
			gradient: [Colors.blueMarguerite, Colors.postHour],
		},
		{
			type: GenericSlide,
			key: 'Slide3',
			title: getText('intro.third.slide.title'),
			description: getText('intro.third.slide.description'),
			image: Images.IntroWalkThrough3,
			gradient: [Colors.blueMarguerite, Colors.blueMarguerite, Colors.shuttleGray],
		},
	];

	return (
		<AppIntroSlider
			slides={SLIDES}
			activeDotColor={Colors.pink}
			dotColor={Colors.alabaster}
			renderItem={renderSlide}
			renderNextButton={NextButton}
			renderDoneButton={DoneButton}
			onDone={() => onDoneHandler(navigation)}
			onSkip={() => onDoneHandler(navigation)}
			showSkipButton={true}
			renderSkipButton={SkipButtonTranslated}
		/>
	);
};

IntroScreen.navigationOptions = {
	header: null,
};

export default withTranslations(IntroScreen);
