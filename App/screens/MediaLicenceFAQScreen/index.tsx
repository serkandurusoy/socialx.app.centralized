import React from 'react';
import {SafeAreaView, View, WebView} from 'react-native';
import MediaLicenceFAQHTML from './media_licence_faq.html';
import style from './style';

const MediaLicenceFAQScreen: React.SFC = () => {
	return (
		<SafeAreaView style={style.container}>
			<WebView source={MediaLicenceFAQHTML} />
		</SafeAreaView>
	);
};

MediaLicenceFAQScreen.navigationOptions = {
	title: 'Media Licence - FAQ',
	headerRight: <View />,
};

export default MediaLicenceFAQScreen;
