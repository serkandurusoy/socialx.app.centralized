// MIGRATION: migrated to screens/preAuth/LaunchScreen

import {ApolloClient} from 'apollo-client';
import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {AsyncStorage, Image, Text, View} from 'react-native';
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-smart-splash-screen';
import {NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {SXButton, SXGradientButton, TextGradient} from 'components';
import {Colors, Images} from 'theme';
import style from './style';

import {hideModalConfirmation, resetNavigationToRoute, showModalConfirmation} from 'backend/actions';
import {getMaintenanceQuery} from 'backend/graphql';
import {ModalManager} from 'hoc';
import {IModalConfirmationProps} from 'types';
import {CurrentUser, IWithTranslationProps, setLanguage, withTranslations} from 'utilities';

export interface ILaunchScreenProps extends IWithTranslationProps {
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
		const {client} = this.props;
		try {
			const currentUser = await CurrentUser();
			if (currentUser) {
				const {
					data: {getMaintenanceMode},
				} = await client.query<{ getMaintenanceMode: boolean }>({
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
		const {getText} = this.props;
		return (
			<View style={style.container}>
				<Image source={Images.launch_screen_bg} style={style.background} resizeMode={'cover'}/>
				<View style={style.topPaddingContainer}>
					<TextGradient
						text={getText('app.name')}
						colors={[Colors.fuchsiaBlue, Colors.pink]}
						style={style.socialxGradient}
					/>
					<Text style={style.description}>{getText('launch.description')}</Text>
				</View>
				<TextGradient
					text={getText('launch.get.rewarded')}
					colors={[Colors.fuchsiaBlue, Colors.pink]}
					style={style.getRewardedGradient}
				/>
				<View style={style.bottomPaddingContainer}>
					<SXGradientButton
						colorStart={Colors.fuchsiaBlue}
						colorEnd={Colors.pink}
						label={getText('launch.login')}
						borderColor={Colors.transparent}
						onPress={this.navigateToLoginScreen}
					/>
					<View style={style.signUpTopPadding}>
						<SXButton
							label={getText('launch.signUp')}
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
}

const mapDispatchToProps = (dispatch: any) => ({
	showConfirm: (confirmationOptions: IModalConfirmationProps) => dispatch(showModalConfirmation(confirmationOptions)),
	hideConfirm: () => dispatch(hideModalConfirmation()),
});

export default compose(
	withTranslations,
	connect(
		null,
		mapDispatchToProps,
	),
	withApollo,
)(LaunchScreen);
