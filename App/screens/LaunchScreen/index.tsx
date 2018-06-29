import React, {Component} from 'react';
import {AsyncStorage, Image, Text, View} from 'react-native';
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-smart-splash-screen';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';

import {SXButton, SXGradientButton, TextGradient} from 'components';
import {Colors, Images} from 'theme';
import style from './style';

import {hideModalConfirmation, resetNavigationToRoute, showModalConfirmation} from 'backend/actions';
import {getMaintenanceQuery} from 'backend/graphql';
import {ModalManager} from 'hoc';
import {IModalConfirmationProps} from 'types';
import {CurrentUser, getText, setLanguage} from 'utilities';

import {ApolloClient} from 'apollo-client';
import {withApollo, WithApolloClient} from 'react-apollo';

export interface ILaunchScreenProps {
	navigation: NavigationScreenProp<any>;
	showConfirm: (confirmationOptions: IModalConfirmationProps) => void;
	hideConfirm: () => void;
	client: ApolloClient<any>;
}

class LaunchScreen extends Component<ILaunchScreenProps, any> {
	private static navigationOptions = {
		header: null,
	};

	public async componentDidMount() {
		// bugsnag.notify(new Error('another test with sourcemaps'));
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

				if (__DEV__) {
					resetNavigationToRoute('MainScreen', this.props.navigation);
				} else {
					if (getMaintenanceMode) {
						resetNavigationToRoute('Maintenance', this.props.navigation);
					} else {
						resetNavigationToRoute('MainScreen', this.props.navigation);
					}
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
					<TextGradient
						text={getText('appName')}
						colors={[Colors.fuchsiaBlue, Colors.pink]}
						style={style.socialxGradient}
					/>
					<Text style={style.description}>{getText('launchDescription')}</Text>
				</View>
				<TextGradient
					text={getText('launchGetRewarded')}
					colors={[Colors.fuchsiaBlue, Colors.pink]}
					style={style.getRewardedGradient}
				/>
				<View style={style.bottomPaddingContainer}>
					<SXGradientButton
						colorStart={Colors.fuchsiaBlue}
						colorEnd={Colors.pink}
						label={getText('launchLogin')}
						borderColor={Colors.transparent}
						onPress={this.navigateToLoginScreen}
					/>
					<View style={style.signUpTopPadding}>
						<SXButton
							label={getText('launchSignUp')}
							borderColor={Colors.transparent}
							onPress={this.navigateToSignUpScreen}
						/>
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

	// TODO: move these methods to the screen where language change will be available
	private toggleLanguage = () => {
		this.props.showConfirm({
			title: 'Restart app?',
			message: 'To change the app language app will restart',
			confirmHandler: this.appRestartConfirmed,
			declineHandler: this.props.hideConfirm,
		});
	};

	private appRestartConfirmed = async () => {
		const savedLang = await AsyncStorage.getItem('lang');
		const newLanguage = savedLang === 'es' ? 'en' : 'es';
		await setLanguage(newLanguage);
		ModalManager.safeRunAfterModalClosed(() => {
			RNRestart.Restart();
		});
		this.props.hideConfirm();
	};
}

const mapDispatchToProps = (dispatch: any) => ({
	showConfirm: (confirmationOptions: IModalConfirmationProps) => dispatch(showModalConfirmation(confirmationOptions)),
	hideConfirm: () => dispatch(hideModalConfirmation()),
});

const reduxWrapper = connect(
	null,
	mapDispatchToProps,
)(LaunchScreen as any);

export default withApollo(reduxWrapper as any);
