import {SXButton, SXGradientButton, TextGradient} from 'components';
import React, {Component} from 'react';
import {AsyncStorage, Image, Text, View} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import {NavigationScreenProp} from 'react-navigation';
import {Colors, Images} from 'theme';
import style from './style';

import {resetNavigationToRoute} from 'backend/actions';
import {CurrentUser} from 'utilities';

export interface ILaunchScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class LaunchScreen extends Component<ILaunchScreenProps, any> {
	private static navigationOptions = {
		header: null,
	};

	public async componentDidMount() {
		try {
			const currentUser = await CurrentUser();
			console.log('currentUser', currentUser.username);
			if (!currentUser) {
				return;
			}
			resetNavigationToRoute('MainScreen', this.props.navigation);
		} catch (ex) {
			//
		}
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	}

	public render() {
		return (
			<View style={style.container}>
				<Image source={Images.launch_screen_bg} style={style.background} resizeMode={'cover'} />
				<View style={style.topPaddingContainer}>
					<TextGradient text={'SocialX'} colors={[Colors.fuchsiaBlue, Colors.pink]} style={style.socialxGradient} />
					<Text style={style.description}>Social interaction with cryptocurrency rewards</Text>
				</View>
				<TextGradient
					text={'Get rewarded'}
					colors={[Colors.fuchsiaBlue, Colors.pink]}
					style={style.getRewardedGradient}
				/>
				<View style={style.bottomPaddingContainer}>
					<SXGradientButton
						colorStart={Colors.fuchsiaBlue}
						colorEnd={Colors.pink}
						label={'LOGIN'}
						borderColor={Colors.transparent}
						onPress={this.navigateToLoginScreen}
					/>
					<View style={style.signUpTopPadding}>
						<SXButton label={'SIGN UP'} borderColor={Colors.transparent} onPress={this.navigateToSignUpScreen} />
					</View>
				</View>
			</View>
		);
	}

	private navigateToLoginScreen = () => {
		this.props.navigation.navigate('LoginScreen');
	}

	private navigateToSignUpScreen = () => {
		this.props.navigation.navigate('SignUpScreen');
	}
}
