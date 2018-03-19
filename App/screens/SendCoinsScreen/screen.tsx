import React, {Component} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {SXButton} from '../../components/Button';
import {SendCoinsHeader} from '../../components/SendCoinsHeader';
import {TKeyboardKeys, TRKeyboardKeys} from '../../components/TextInput';
import {CoinSymbol} from '../../constants';
import {withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {Colors} from '../../theme';
import style from './style';

interface ISendCoinsScreenComponentProps {
	marginBottom: number;
	onContinue: (userId: string, amount: number, currency: CoinSymbol) => void;
	myCoins: number;
}

class SendCoinsScreenComponent extends Component<ISendCoinsScreenComponentProps, any> {
	private secondInput: TextInput;

	public render() {
		const containerStyles = [style.container, {marginBottom: this.props.marginBottom}];
		return (
			<ScrollView
				contentContainerStyle={containerStyles}
				keyboardShouldPersistTaps={'handled'}
				alwaysBounceVertical={false}
			>
				<View>
					<SendCoinsHeader myCoins={this.props.myCoins} />
					<View style={style.middleContainer}>
						<View style={style.firstInputContainer}>
							<TextInput
								style={style.textInputFirst}
								autoFocus={true}
								// onChangeText={this.textChangedHandler}
								onSubmitEditing={this.userOnInputSubmit}
								returnKeyType={TRKeyboardKeys.next}
								autoCorrect={false}
								underlineColorAndroid={Colors.transparent}
								autoCapitalize='none'
								blurOnSubmit={false}
							/>
							<Text style={style.inputLabel}>{'User'}</Text>
						</View>
						<View style={style.borderLine} />
						<View style={style.secondInputContainer}>
							<TextInput
								ref={(ref: TextInput) => (this.secondInput = ref)}
								style={style.textInputSecond}
								// onChangeText={this.textChangedHandler}
								// returnKeyType={TRKeyboardKeys.done}
								keyboardType={TKeyboardKeys.numeric}
								autoCorrect={false}
								underlineColorAndroid={Colors.transparent}
								autoCapitalize='none'
								blurOnSubmit={true}
							/>
							<Text style={style.inputLabel}>{'SOCX'}</Text>
						</View>
					</View>
				</View>
				<View style={style.continueButtonContainer}>
					<SXButton label={'CONTINUE'} onPress={this.continueHandler} />
				</View>
			</ScrollView>
		);
	}

	private continueHandler = () => {
		this.props.onContinue('ae351f3gjk58', 56712, CoinSymbol.SOCX);
	}

	private userOnInputSubmit = () => {
		this.secondInput.focus();
	}
}

export default withResizeOnKeyboardShow(SendCoinsScreenComponent);
