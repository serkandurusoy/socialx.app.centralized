import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-smart-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationStackScreenOptions} from 'react-navigation';
import {Colors} from 'theme';
import style from './style';

const slides = [
	{
		key: 'somethun',
		title: 'Quick setup, good defaults',
		text:
			'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies.' +
			' And it comes with good default layouts!',
		icon: 'ios-images-outline',
		colors: ['#63E2FF', '#B066FE'],
	},
	{
		key: 'somethun1',
		title: 'Super customizable',
		text: 'The component is also super customizable, so you can adapt it to cover your needs and wants.',
		icon: 'ios-options-outline',
		colors: ['#A3A1FF', '#3A3897'],
	},
	{
		key: 'somethun2',
		title: 'No need to buy me beer',
		text: 'Usage is all free',
		icon: 'ios-beer-outline',
		colors: ['#29ABE2', '#4F00BC'],
	},
];

export default class IntroScreen extends Component {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		header: null,
	};

	public componentDidMount() {
		this.closeSplashScreen();
	}

	public render() {
		return (
			<AppIntroSlider
				slides={slides}
				activeDotColor={Colors.pink}
				dotColor={Colors.alabaster}
				renderItem={this.renderSlide}
				renderNextButton={this.renderNextButton}
				renderDoneButton={this.renderDoneButton}
				onDone={this.onDoneHandler}
				// onSkip={this.onDoneHandler}
				// showSkipButton={true}
				// bottomButton={true}
			/>
		);
	}

	private renderSlide = (props: any) => {
		return (
			<LinearGradient
				style={[
					style.mainContent,
					{
						paddingTop: props.topSpacer,
						paddingBottom: props.bottomSpacer,
						width: props.width,
						height: props.height,
					},
				]}
				colors={props.colors}
				start={{x: 0, y: 0.1}}
				end={{x: 0.1, y: 1}}
			>
				<Icon style={{backgroundColor: 'transparent'}} name={props.icon} size={200} color='white' />
				<View>
					<Text style={style.title}>{props.title}</Text>
					<Text style={style.text}>{props.text}</Text>
				</View>
			</LinearGradient>
		);
	};

	private renderNextButton = () => {
		return (
			<View style={style.buttonCircle}>
				<Icon name='md-arrow-round-forward' style={style.nextIcon} />
			</View>
		);
	};

	private renderDoneButton = () => {
		return (
			<View style={style.buttonCircle}>
				<Icon name='md-checkmark' style={style.nextIcon} />
			</View>
		);
	};

	private onDoneHandler = () => {
		alert('onDoneHandler');
	};

	private closeSplashScreen = () => {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	};
}
