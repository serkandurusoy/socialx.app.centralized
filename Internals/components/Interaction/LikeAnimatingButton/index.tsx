// MIGRATION: migrated to components/interaction

import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {AnimatedFaIcon} from 'configuration/animations';
import {Colors} from 'theme';
import {showToastMessage} from 'utilities';
import style from './style';

const PULSATE_PERIOD = 700;

interface ILikeAnimatingButtonProps {
	likedByMe: boolean;
	label?: string;
	onPress?: () => Promise<any>;
}

interface ILikeAnimatingButtonState {
	touchDisabled: boolean;
	likedByMe: boolean;
}

export class LikeAnimatingButton extends Component<ILikeAnimatingButtonProps, ILikeAnimatingButtonState> {
	public static defaultProps: Partial<ILikeAnimatingButtonProps> = {
		label: undefined,
	};

	public state = {
		likedByMe: this.props.likedByMe,
		touchDisabled: false,
	};

	private animatedIcon: any | null = null;
	private nextLikeValue: boolean = this.props.likedByMe;
	private animating: boolean = false;

	public render() {
		const iconSource = this.state.likedByMe ? 'heart' : 'heart-o';
		const likeColor = this.state.likedByMe ? Colors.pink : Colors.black;
		const likeStyles = [style.likeButton, {color: likeColor}];
		return (
			<TouchableOpacity
				style={style.container}
				disabled={!this.props.onPress || this.state.touchDisabled}
				onPress={this.buttonPressedHandler}
			>
				<AnimatedFaIcon ref={(ref: any) => (this.animatedIcon = ref)} name={iconSource} style={likeStyles} />
				{this.props.label && <Text style={style.label}>{this.props.label}</Text>}
			</TouchableOpacity>
		);
	}

	private buttonPressedHandler = async () => {
		this.animatedIcon.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		this.toggleAnimationFlags(true);
		if (this.props.onPress) {
			try {
				this.nextLikeValue = await this.props.onPress();
				console.log('nextLikeValue', this.nextLikeValue);
				this.toggleAnimationFlags(false);
			} catch (ex) {
				showToastMessage('Like failed with exception:' + ex);
				this.toggleAnimationFlags(false);
			}
		}
	};

	private onAnimationEndHandler = () => {
		if (this.animating) {
			this.animatedIcon.animate('pulsate', PULSATE_PERIOD).then(this.onAnimationEndHandler);
		} else {
			this.setState({
				likedByMe: this.nextLikeValue,
				touchDisabled: false,
			});
		}
	};

	private toggleAnimationFlags = (active: boolean) => {
		this.setState({
			touchDisabled: active,
		});
		this.animating = active;
	};
}
