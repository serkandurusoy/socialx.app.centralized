import React from 'react';
import {Platform, SafeAreaView, View, WebView} from 'react-native';

import {OS_TYPES} from 'consts';
import {getText} from 'utilities';
import style from './style';
import TermsAndConditionsHTML from './terms_and_conditions.html';

const TermsAndConditionsScreen: React.SFC = () => {
	const webViewLocalSource =
		Platform.OS === OS_TYPES.IOS
			? TermsAndConditionsHTML
			: {uri: 'file:///android_asset/html/terms_and_conditions.html'};
	return (
		<SafeAreaView style={style.container}>
			<WebView source={webViewLocalSource} />
		</SafeAreaView>
	);
};

TermsAndConditionsScreen.navigationOptions = {
	title: getText('termsAndConditionsScreenTitle'),
	headerRight: <View />,
};

export default TermsAndConditionsScreen;
