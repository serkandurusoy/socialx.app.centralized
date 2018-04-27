import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import style from './style';

export interface IMediaLicenseFAQScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class MediaLicenseFAQScreen extends Component<IMediaLicenseFAQScreenProps, any> {
	private static navigationOptions: Partial<NavigationStackScreenOptions> = {
		title: 'Media Licence - FAQ',
		headerRight: <View />,
	};

	public render() {
		return (
			<View style={style.container}>
				<Text>{'MediaLicenseFAQScreen'}</Text>
			</View>
		);
	}
}
