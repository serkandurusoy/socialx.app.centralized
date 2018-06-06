import React from 'react';
import {StatusBar, View} from 'react-native';

import ReduxNavigation from '../../navigation/ReduxNavigation';

// Styles
import styles from './styles';

export default () => (
	<View style={styles.applicationView}>
		<StatusBar barStyle={'light-content'} />
		<ReduxNavigation />
	</View>
);
