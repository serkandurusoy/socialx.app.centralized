import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';

import Amplify from 'aws-amplify';

import {awsconfig} from 'configurations';
import ReduxNavigation from '../../navigation/ReduxNavigation';

// Styles
import styles from './styles';

export interface Props {
	startup: () => void;
}

Amplify.configure(awsconfig);

export class RootContainer extends Component<Props> {
	public componentDidMount() {
		this.props.startup();
	}

	public render() {
		return (
			<View style={styles.applicationView}>
				<StatusBar barStyle="light-content" />
				<ReduxNavigation />
			</View>
		);
	}
}
