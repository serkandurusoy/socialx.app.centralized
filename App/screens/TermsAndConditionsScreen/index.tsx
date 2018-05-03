import React from 'react';
import {SafeAreaView, View, WebView} from 'react-native';
import style from './style';
import TermsAndConditionsHTML from './terms_and_conditions.html';

const TermsAndConditionsScreen: React.SFC = () => {
	return (
		<SafeAreaView style={style.container}>
			<WebView source={TermsAndConditionsHTML}/>
		</SafeAreaView>
	);
};

TermsAndConditionsScreen.navigationOptions = {
	title: 'Terms and Conditions',
	headerRight: <View/>,
};

export default TermsAndConditionsScreen;
