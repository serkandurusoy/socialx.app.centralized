import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import style from './style';

export interface IMediaLicenceFAQScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class MediaLicenceFAQScreen extends Component<IMediaLicenceFAQScreenProps, any> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'Media Licence - FAQ',
		headerRight: <View />,
	};

	public render() {
		return (
			<View style={style.container}>
				<Text>{'MediaLicenceFAQScreen'}</Text>
			</View>
		);
	}
}
