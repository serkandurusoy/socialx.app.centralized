// MIGRATION: migrated to screens/primaryNav

import LottieView from 'lottie-react-native';
import React, {Component} from 'react';
import {Animated, Easing, Text, View} from 'react-native';
import styles from './styles';

import {Colors, Sizes} from 'theme';

import {dragon} from 'animation';

export default class MaintenanceScreen extends Component<{}> {
	public render() {
		return (
			<View style={styles.container}>
				<LottieView
					style={styles.Icon}
					source={dragon}
					ref={(ani: any) => {
						if (ani) {
							ani.play();
						}
					}}
					loop={true}
				/>
				<Text style={styles.text}>App currently under maintenance,</Text>
				<Text style={styles.text}> try again later!</Text>
			</View>
		);
	}
}
