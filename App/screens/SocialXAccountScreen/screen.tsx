import {AccountCurrencyData, SocialXAccountCurrencyItem, SocialXAccountTitleCard} from 'components/Displayers';
import {SXButton} from 'components/Interaction';
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Colors} from 'theme/';
import style from './style';

export interface ISocialXAccountScreenComponentProps {
	myCoins: number;
	myContribution: number;
	returnPercentage: number;
	myDigitalCoins: AccountCurrencyData[];
	sendHandler: () => void;
	receiveHandler: () => void;
}

export default class SocialXAccountScreenComponent extends Component<ISocialXAccountScreenComponentProps, any> {
	public render() {
		return (
			<ScrollView style={style.container} alwaysBounceVertical={false}>
				<SocialXAccountTitleCard
					myCoins={this.props.myCoins}
					myContribution={this.props.myContribution}
					returnPercentage={this.props.returnPercentage}
				/>
				<Text style={style.accountTitle}>{'Account'}</Text>
				{this.renderMyCurrencyItems()}
				<View style={style.bottomContainer}>
					<View style={style.buttonContainer}>
						<SXButton label={'SEND'} borderColor={Colors.transparent} onPress={this.props.sendHandler} />
					</View>
					<View style={style.buttonContainer}>
						<SXButton label={'RECEIVE'} borderColor={Colors.transparent} onPress={this.props.receiveHandler} />
					</View>
				</View>
			</ScrollView>
		);
	}

	private renderMyCurrencyItems = () =>
		this.props.myDigitalCoins.map((coin, i) => <SocialXAccountCurrencyItem key={i} {...coin} />);
}
