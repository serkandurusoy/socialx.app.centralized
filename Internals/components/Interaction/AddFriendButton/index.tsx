import React, {Component} from 'react';
import {Image, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Icons} from 'theme';
import {SearchResultKind} from 'types';
import {showToastMessage} from 'utilities';
import {ButtonSizes, SXButton} from '../index';
import style from './style';

const IN_ANIMATION_NAME = 'rotate';
const IN_ANIMATION_DURATION = 300;
const OUT_ANIMATION_NAME = 'fadeOutRight';
const OUT_ANIMATION_DURATION = 300;

interface IAddFriendButtonProps {
	onAddFriend: () => Promise<any>;
	kind: SearchResultKind;
	addLabel?: string;
	outAnimation?: string;
}

interface IAddFriendButtonState {
	loading: boolean;
	kind: SearchResultKind;
}

export class AddFriendButton extends Component<IAddFriendButtonProps, IAddFriendButtonState> {
	private static defaultProps: Partial<IAddFriendButtonProps> = {
		addLabel: 'Add',
		outAnimation: OUT_ANIMATION_NAME,
	};

	public state = {
		loading: false,
		kind: this.props.kind,
	};

	private addButtonRef = null;
	private renderWithAnimation = false;

	public render() {
		let ret = null;
		if (this.state.kind === SearchResultKind.NotFriend) {
			ret = this.renderAddFriend();
		} else if (this.state.kind === SearchResultKind.Friend) {
			ret = this.renderIsFriend();
		} else if (this.state.kind === SearchResultKind.FriendRequestSent) {
			ret = this.renderRequestSent();
		} else if (this.state.kind === SearchResultKind.Group) {
			ret = null;
		}
		return ret;
	}

	private renderIsFriend = () => {
		return <Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isFiendIcon} />;
	};

	private renderAddFriend = () => {
		return (
			<Animatable.View ref={(ref: any) => (this.addButtonRef = ref)}>
				<SXButton
					loading={this.state.loading}
					label={this.props.addLabel}
					size={ButtonSizes.Small}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.onAddFriendHandler}
				/>
			</Animatable.View>
		);
	};

	private renderRequestSent = () => {
		const ViewComponent = this.renderWithAnimation ? Animatable.View : View;
		this.renderWithAnimation = false;
		return (
			<ViewComponent
				animation={IN_ANIMATION_NAME}
				easing='ease-out'
				iterationCount={1}
				duration={IN_ANIMATION_DURATION}
			>
				<Icon name={'ios-swap'} style={style.friendRequestSentIcon} />
			</ViewComponent>
		);
	};

	private onAddFriendHandler = () => {
		this.setState({
			loading: true,
		});
		this.props.onAddFriend().then(
			() => {
				this.addButtonRef.animate(this.props.outAnimation, OUT_ANIMATION_DURATION).then(() => {
					this.renderWithAnimation = true;
					this.setState({
						loading: false,
						kind: SearchResultKind.FriendRequestSent,
					});
				});
			},
			(ex) => {
				console.log(`ex: ${ex}`);
				this.setState({
					loading: false,
				});
				showToastMessage('Friend request could not be processed at this time. Try again later..');
			},
		);
	};
}
