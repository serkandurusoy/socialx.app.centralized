import React from 'react';
import {Platform, SafeAreaView, View, WebView} from 'react-native';

import {OS_TYPES} from 'consts';
import MediaLicenceFAQHTML from './media_licence_faq.html';
import style from './style';

const MediaLicenceFAQScreen: React.SFC = () => {
	const webViewLocalSource =
		Platform.OS === OS_TYPES.IOS ? MediaLicenceFAQHTML : {uri: 'file:///android_asset/html/media_licence_faq.html'};
	return (
		<SafeAreaView style={style.container}>
			<WebView source={webViewLocalSource} />
		</SafeAreaView>
	);
};

MediaLicenceFAQScreen.navigationOptions = {
	title: 'Media Licence - FAQ',
	headerRight: <View />,
};

export default MediaLicenceFAQScreen;
