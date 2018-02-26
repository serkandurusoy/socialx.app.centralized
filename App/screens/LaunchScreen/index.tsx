import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {SXButton} from '../../components/Button';
import {SXGradientButton} from '../../components/GradientButton';
import {Colors, Images} from '../../theme';
import style from './style';

export default class LaunchScreen extends Component {
	public render() {
		return (
			<View style={style.container}>
				<Image source={Images.launch_screen_bg} style={style.background} resizeMode={'cover'} />
				<View style={style.topPaddingContainer}>
					<Image source={Images.socialx_gradient} style={style.socialxGradient} resizeMode={'contain'} />
					<Text style={style.description}>Social interaction with cryptocurrency rewards</Text>
					<Image source={Images.get_rewarded_gradient} style={style.getRewardedGradient} resizeMode={'contain'} />
				</View>
				<View style={style.bottomPaddingContainer}>
					<SXGradientButton
						colorStart={Colors.gradientButtonLeft}
						colorEnd={Colors.pink}
						label={'LOGIN'}
						borderColor={Colors.transparent}
					/>
					<View style={style.signUpTopPadding}>
						<SXButton label={'SIGN UP'} />
					</View>
				</View>
			</View>
		);
	}
}
