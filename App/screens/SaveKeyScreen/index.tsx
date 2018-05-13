import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {connect} from 'react-redux';

import {hideModalConfirmation, resetNavigationToRoute, showModalConfirmation} from 'backend/actions';
import {SXButton} from 'components/Interaction';
import {Colors, Images} from 'theme';
import {IModalConfirmationProps} from 'types';
import style from './style';

export interface ISaveKeyScreenProps {
	navigation: NavigationScreenProp<any>;
	showConfirm: (confirmationOptions: IModalConfirmationProps) => void;
	hideConfirm: () => void;
}

class SaveKeyScreen extends Component<ISaveKeyScreenProps> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		headerStyle: {
			borderBottomWidth: 0,
			elevation: 0, // remove nav bar bottom shadow for android
			backgroundColor: Colors.pink,
		},
	};

	public render() {
		return (
			<View style={style.container}>
				<Image source={Images.unlock_key} resizeMode={'cover'} style={style.unlockImage} />
				<Text style={style.uploadKeyText}>{'Welcome, save your'}</Text>
				<Text style={style.uploadKeyText}>{'Private Key'}</Text>
				<Text style={style.uploadDescriptionText}>
					{'Please keep your file in a safe place, without it you will no longer be able to authenticate. '}
					{'We removed any trace of your password.'}
				</Text>
				<View style={style.chooseKeyButton}>
					<SXButton label={'DOWNLOAD UNLOCK FILE'} onPress={this.presentModalConfirmationHandler} />
				</View>
			</View>
		);
	}

	private presentModalConfirmationHandler = () => {
		this.props.showConfirm({
			title: 'Important Notification',
			message: 'Are you sure you saved your private key at a secure location?',
			confirmHandler: this.confirmKeySaved,
			declineHandler: this.props.hideConfirm,
		});
	}

	private confirmKeySaved = () => {
		this.props.hideConfirm();
		resetNavigationToRoute('MainScreen', this.props.navigation);
	}
}

const mapDispatchToProps = (dispatch: any) => ({
	showConfirm: (confirmationOptions: IModalConfirmationProps) => dispatch(showModalConfirmation(confirmationOptions)),
	hideConfirm: () => dispatch(hideModalConfirmation()),
});

export default connect(null, mapDispatchToProps)(SaveKeyScreen as any);
