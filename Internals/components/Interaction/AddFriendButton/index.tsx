// TODO: @Serkan & @Ionut: discuss how we can make this stateless, given the animation logic!

import {ActionSheet} from 'native-base';
import React, {Component, RefObject} from 'react';
import {TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from 'theme';
import {SearchResultKind} from 'types';
import {IWithTranslationProps, showToastMessage, withTranslations} from 'utilities';
import {ButtonSizes, SXButton} from '../index';
import style from './style';

const IN_ANIMATION_NAME = 'rotate';
const IN_ANIMATION_DURATION = 300;
const OUT_ANIMATION_NAME = 'fadeOutRight';
const OUT_ANIMATION_DURATION = 300;

interface IAddFriendButtonProps extends IWithTranslationProps {
	onAddFriend: () => Promise<any>;
	onRemoveFriendship: () => void;
	kind: SearchResultKind;
	addLabel?: string;
	outAnimation?: string;
}

interface IAddFriendButtonState {
	loading: boolean;
	kind: SearchResultKind;
}

const IsFriend: React.SFC<{onShowFriendshipOptions: () => void}> = ({onShowFriendshipOptions}) => (
	<TouchableOpacity onPress={onShowFriendshipOptions}>
		<MIcon name={'account-check'} style={style.isFiendIcon} />
	</TouchableOpacity>
);

const addButtonRef: RefObject<Animatable.View> = React.createRef(); // TODO: this might not be safe here!

const AddFriend: React.SFC<{
	loading: boolean;
	addLabel: string;
	onAddFriendHandler: () => void;
}> = ({loading, addLabel, onAddFriendHandler}) => (
	<Animatable.View ref={addButtonRef}>
		<SXButton
			loading={loading}
			label={addLabel}
			size={ButtonSizes.Small}
			autoWidth={true}
			borderColor={Colors.transparent}
			onPress={onAddFriendHandler}
		/>
	</Animatable.View>
);

const RequestSent: React.SFC<{withAnimation: boolean}> = ({withAnimation}) => {
	const ViewComponent = withAnimation ? Animatable.View : View;
	return (
		<ViewComponent animation={IN_ANIMATION_NAME} easing='ease-out' iterationCount={1} duration={IN_ANIMATION_DURATION}>
			<Icon name={'ios-swap'} style={style.friendRequestSentIcon} />
		</ViewComponent>
	);
};

class AddFriendButtonInt extends Component<IAddFriendButtonProps, IAddFriendButtonState> {
	private static defaultProps: Partial<IAddFriendButtonProps> = {
		addLabel: 'Add',
		outAnimation: OUT_ANIMATION_NAME,
		onRemoveFriendship: () => alert('Remove friendship not implemented'),
	};

	public state = {
		loading: false,
		kind: this.props.kind,
	};

	private renderWithAnimation = false;

	public render() {
		const {kind, loading} = this.state;
		const {addLabel} = this.props;

		const withAnimation = this.renderWithAnimation;
		if (kind === SearchResultKind.FriendRequestSent) {
			this.renderWithAnimation = false;
		}

		return (
			<View>
				{kind === SearchResultKind.NotFriend && (
					<AddFriend loading={loading} addLabel={addLabel} onAddFriendHandler={this.onAddFriendHandler} />
				)}
				{kind === SearchResultKind.Friend && <IsFriend onShowFriendshipOptions={this.onShowFriendshipOptionsHandler} />}
				{kind === SearchResultKind.FriendRequestSent && <RequestSent withAnimation={withAnimation} />}
			</View>
		);
	}

	private onAddFriendHandler = () => {
		const {onAddFriend, outAnimation} = this.props;
		this.setState({
			loading: true,
		});
		onAddFriend().then(
			() => {
				addButtonRef.current.animate(outAnimation, OUT_ANIMATION_DURATION).then(() => {
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

	private onShowFriendshipOptionsHandler = () => {
		const {getText, onRemoveFriendship} = this.props;
		const menuOptions = [
			getText('friendship.menu.option.remove'),
			getText('button.CANCEL'), // can't have this hidden!
		];
		ActionSheet.show(
			{
				options: menuOptions,
				cancelButtonIndex: menuOptions.length - 1,
			},
			(buttonIndex: number) => {
				if (buttonIndex === 0) {
					onRemoveFriendship();
				}
			},
		);
	};
}

export const AddFriendButton = withTranslations(AddFriendButtonInt as any);
