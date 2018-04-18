import React, {Component} from 'react';
import {AsyncStorage, Image, Text, View} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import {NavigationScreenProp} from 'react-navigation';
import {SXButton, SXGradientButton, TextGradient} from '../../components';
import {Colors, Images} from '../../theme';
import style from './style';

import {CurrentUser} from '../../utils/';

export interface ILaunchScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class LaunchScreen extends Component<ILaunchScreenProps, any> {
	private static navigationOptions = {
		header: null,
	};

	public async componentDidMount() {
		if (AsyncStorage.getItem('jwtToken')) {
			try {
				const currentUser = await CurrentUser();
				if (currentUser) {
					this.props.navigation.navigate('MainScreen');
				}
			} catch (ex) {
				//
			}
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
						<SXButton label={'SIGN UP'} onPress={this.navigateToSignUpScreen} />
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
