import {SendCoinsHeader} from 'components/Displayers';
import {TKeyboardKeys, TRKeyboardKeys} from 'components/Inputs';
import {SXButton} from 'components/Interaction';
import {CoinSymbol} from 'consts';
import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Colors} from 'theme';
import style from './style';

interface ISendCoinsScreenComponentProps {
	onContinue: (userId: string, amount: number, currency: CoinSymbol) => void;
	myCoins: number;
}

const SendCoinsScreenComponent: React.SFC<ISendCoinsScreenComponentProps> = (props) => {
	let secondInput: TextInput;

	let userId: string = '';
	let transferAmount: number = 0;

	const continueHandler = () => {
		props.onContinue(userId, transferAmount, CoinSymbol.SOCX);
	};

	const userOnInputSubmit = () => {
		secondInput.focus();
	};

	const userIdUpdated = (value: string) => {
		userId = value;
	};

	const transferAmountUpdated = (value: string) => {
		transferAmount = parseFloat(value);
	};

	return (
		<View style={style.container}>
			<ScrollView
				style={style.scrollView}
				contentContainerStyle={style.contentContainer}
				keyboardShouldPersistTaps={'handled'}
				alwaysBounceVertical={false}
			>
				<View>
					<SendCoinsHeader myCoins={props.myCoins} />
					<View style={style.middleContainer}>
						<View style={style.firstInputContainer}>
							<TextInput
								style={style.textInputFirst}
								autoFocus={true}
								onChangeText={userIdUpdated}
								onSubmitEditing={userOnInputSubmit}
								returnKeyType={TRKeyboardKeys.next}
								autoCorrect={false}
								autoComplete={false}
								underlineColorAndroid={Colors.transparent}
								autoCapitalize="none"
								blurOnSubmit={false}
							/>
							<Text style={style.inputLabel}>{'User'}</Text>
						</View>
						<View style={style.borderLine} />
						<View style={style.secondInputContainer}>
							<TextInput
								ref={(ref: TextInput) => (secondInput = ref)}
								style={style.textInputSecond}
								onChangeText={transferAmountUpdated}
								keyboardType={TKeyboardKeys.numeric}
								autoCorrect={false}
								autoComplete={false}
								underlineColorAndroid={Colors.transparent}
								autoCapitalize="none"
								blurOnSubmit={true}
							/>
							<Text style={style.inputLabel}>{'SOCX'}</Text>
						</View>
					</View>
				</View>
				<View style={style.continueButtonContainer}>
					<SXButton label={'CONTINUE'} onPress={continueHandler} />
				</View>
			</ScrollView>
			<KeyboardSpacer />
		</View>
	);
};

export default SendCoinsScreenComponent;
