import React, {Component, RefObject} from 'react';
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

const IsFriend: React.SFC = () => (
	<Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isFiendIcon} />
);

const addButtonRef: RefObject<Animatable.View> = React.createRef();

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

export class AddFriendButton extends Component<IAddFriendButtonProps, IAddFriendButtonState> {
	private static defaultProps: Partial<IAddFriendButtonProps> = {
		addLabel: 'Add',
		outAnimation: OUT_ANIMATION_NAME,
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
				{kind === SearchResultKind.Friend && <IsFriend />}
				{kind === SearchResultKind.FriendRequestSent && <RequestSent withAnimation={withAnimation} />}
			</View>
		);
	}

	private onAddFriendHandler = () => {
		this.setState({
			loading: true,
		});
		this.props.onAddFriend().then(
			() => {
				addButtonRef.current.animate(this.props.outAnimation, OUT_ANIMATION_DURATION).then(() => {
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
