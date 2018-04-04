import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {SXButton} from '../../components/Button';
import {ModalConfirmation} from '../../components/ModalConfirmation';
import {Colors, Images} from '../../theme';
import style from './style';

export interface ISaveKeyScreenProps {
	navigation: NavigationScreenProp<any>;
}

export interface ISaveKeyScreenState {
	modalVisible: boolean;
}

export default class SaveKeyScreen extends Component<ISaveKeyScreenProps, ISaveKeyScreenState> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		headerStyle: {
			borderBottomWidth: 0,
			elevation: 0, // remove nav bar bottom shadow for android
			backgroundColor: Colors.pink,
		},
	};

	public state = {
		modalVisible: false,
	};

	public render() {
		return (
			<View style={style.container}>
				<ModalConfirmation
					title={'Important Notification'}
					message={'Are you sure you saved your private key at a secure location?'}
					confirmHandler={this.confirmKeySaved}
					declineHandler={this.toggleModalShow}
					visible={this.state.modalVisible}
				/>
				<Image source={Images.unlock_key} resizeMode={'cover'} style={style.unlockImage} />
				<Text style={style.uploadKeyText}>{'Welcome, save your'}</Text>
				<Text style={style.uploadKeyText}>{'Private Key'}</Text>
				<Text style={style.uploadDescriptionText}>
					{'Please keep your file in a safe place, without it you will no longer be able to authenticate. '}
					{'We removed any trace of your password.'}
				</Text>
				<View style={style.chooseKeyButton}>
					<SXButton label={'DOWNLOAD UNLOCK FILE'} onPress={this.toggleModalShow} />
				</View>
			</View>
		);
	}

	private toggleModalShow = () => {
		this.setState({
			modalVisible: !this.state.modalVisible,
		});
	}

	private confirmKeySaved = () => {
		this.props.navigation.navigate('MainScreen');
	}
}
