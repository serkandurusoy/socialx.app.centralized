import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

import {SXButton, SXGradientButton, TextGradient} from 'components';
import SplashScreen from 'react-native-smart-splash-screen';
import {NavigationScreenProp} from 'react-navigation';
import {Colors, Images} from 'theme';
import style from './style';

import {resetNavigationToRoute} from 'backend/actions';
import {getMaintenanceQuery} from 'backend/graphql';

import {CurrentUser} from 'utilities';

import {ApolloClient} from 'apollo-client';
import {withApollo, WithApolloClient} from 'react-apollo';

export interface ILaunchScreenProps {
	navigation: NavigationScreenProp<any>;
	client: ApolloClient<any>;
}

class LaunchScreen extends Component<ILaunchScreenProps, any> {
	private static navigationOptions = {
		header: null,
	};

	public async componentDidMount() {
		const {client} = this.props;
		try {
			const currentUser = await CurrentUser();
			if (currentUser) {
				const {
					data: {getMaintenanceMode},
				} = await client.query<{getMaintenanceMode: boolean}>({
					query: getMaintenanceQuery,
					fetchPolicy: 'network-only',
				});

				if (getMaintenanceMode) {
					resetNavigationToRoute('Maintenance', this.props.navigation);
				} else {
					resetNavigationToRoute('MainScreen', this.props.navigation);
				}
			}

			this.closeSplashScreen();
		} catch (ex) {
			this.closeSplashScreen();
			console.log(ex);
		}
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
	};

	private navigateToSignUpScreen = () => {
		this.props.navigation.navigate('SignUpScreen');
	};

	private closeSplashScreen = () => {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	};
}

export default withApollo(LaunchScreen);
