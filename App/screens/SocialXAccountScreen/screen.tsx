import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {SXButton} from '../../components/Button';
import {SocialXAccountTitleCard} from '../../components/SocialXAccountTitleCard';
import {Colors} from '../../theme/';
import style from './style';

export interface ISocialXAccountScreenComponentProps {
	myCoins: string;
	myContribution: string;
	returnPercentage: string;
}

export default class SocialXAccountScreenComponent extends Component<ISocialXAccountScreenComponentProps, any> {
	public render() {
		return (
			<View style={style.container}>
				<SocialXAccountTitleCard
					myCoins={this.props.myCoins}
					myContribution={this.props.myContribution}
					returnPercentage={this.props.returnPercentage}
				/>
				<Text style={style.accountTitle}>{'Account'}</Text>
				<View style={style.buttonContainer}>
					<SXButton label={'SEND'} borderColor={Colors.transparent} />
				</View>
				<View style={style.buttonContainer}>
					<SXButton label={'RECEIVE'} borderColor={Colors.transparent} />
				</View>
			</View>
		);
	}
}
