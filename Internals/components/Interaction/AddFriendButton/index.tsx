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
	onAddFriend: () => void;
	onRemoveFriendship: () => void;
	kind: SearchResultKind;
	addLabel?: string;
	outAnimation?: string;
}

interface IAddFriendButtonState {
	rsWithAnimation: boolean;
	optimisticKind: SearchResultKind;
}

const IsFriend: React.SFC<{ onShowFriendshipOptions: () => void }> = ({onShowFriendshipOptions}) => (
	<TouchableOpacity onPress={onShowFriendshipOptions}>
		<MIcon name={'account-check'} style={style.isFiendIcon}/>
	</TouchableOpacity>
);

const addButtonRef: RefObject<Animatable.View> = React.createRef(); // TODO: this might not be safe here!

const AddFriend: React.SFC<{
	addLabel: string;
	onAddFriendHandler: () => void;
}> = ({addLabel, onAddFriendHandler}) => (
	<Animatable.View ref={addButtonRef}>
		<SXButton
			label={addLabel}
			size={ButtonSizes.Small}
			autoWidth={true}
			borderColor={Colors.transparent}
			onPress={onAddFriendHandler}
		/>
	</Animatable.View>
);

const RequestSent: React.SFC<{ withAnimation: boolean }> = ({withAnimation}) => {
	const ViewComponent = withAnimation ? Animatable.View : View;
	return (
		<ViewComponent
			animation={IN_ANIMATION_NAME} easing='ease-out' iterationCount={1} duration={IN_ANIMATION_DURATION}
		>
			<Icon name={'ios-swap'} style={style.friendRequestSentIcon}/>
		</ViewComponent>
	);
};

class AddFriendButtonInt extends Component<IAddFriendButtonProps, IAddFriendButtonState> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IAddFriendButtonProps>,
		prevState: Readonly<IAddFriendButtonState>,
	) {
		// TODO: enable this when API call will work!
		// if (nextProps.kind !== prevState.optimisticKind) {
		// 	showToastMessage('Friend request could not be processed at this time. Try again later..');
		// 	return {
		// 		optimisticKind: nextProps.kind,
		// 	}
		// }
		return null;
	}

	private static defaultProps: Partial<IAddFriendButtonProps> = {
		addLabel: 'Add',
		outAnimation: OUT_ANIMATION_NAME,
		onRemoveFriendship: () => alert('Remove friendship not implemented'),
	};

	public state = {
		rsWithAnimation: false,
		optimisticKind: this.props.kind,
	};

	public render() {
		const {addLabel} = this.props;
		const {rsWithAnimation, optimisticKind} = this.state;

		return (
			<View>
				{optimisticKind === SearchResultKind.NotFriend && (
					<AddFriend addLabel={addLabel} onAddFriendHandler={this.onAddFriendHandler}/>
				)}
				{optimisticKind === SearchResultKind.FriendRequestSent &&
                <RequestSent withAnimation={rsWithAnimation}/>}
				{optimisticKind === SearchResultKind.Friend &&
                <IsFriend onShowFriendshipOptions={this.onShowFriendshipOptionsHandler}/>}
			</View>
		);
	}

	private onAddFriendHandler = async () => {
		this.props.onAddFriend();
		await addButtonRef.current.animate(this.props.outAnimation, OUT_ANIMATION_DURATION);
		this.setState({
			rsWithAnimation: true, // this might need to be reset, check later!
			optimisticKind: SearchResultKind.FriendRequestSent,
		});
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
