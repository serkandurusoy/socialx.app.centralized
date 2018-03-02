import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {SXButton} from '../../components/Button';
import {Colors, Images} from '../../theme';
import style from './style';

export interface IUploadKeyScreenProps {
	navigation: NavigationScreenProp<any, any>;
}

export default class UploadKeyScreen extends Component<IUploadKeyScreenProps, any> {
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
				<Text style={style.uploadKeyText}>{'Upload your'}</Text>
				<Text style={style.uploadKeyText}>{'Private Login Key'}</Text>
				<Text style={style.uploadDescriptionText}>{'You downloaded this key once you registered'}</Text>
				<View style={style.chooseKeyButton}>
					<SXButton label={'CHOOSE PRIVATE LOGIN KEY'} onPress={this.navigateToMainScreen} />
				</View>
			</View>
		);
	}

	private navigateToMainScreen = () => {
		this.props.navigation.navigate('MainScreen');
	}
}
