import {Toast} from 'native-base';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

import {AvatarImage} from 'components';
import {Colors, Icons} from 'theme';
import {SearchResultKind} from 'types';
import {ButtonSizes, SXButton} from '../../Interaction';
import style from './style';

const IN_ANIMATION_NAME = 'rotate';
const IN_ANIMATION_DURATION = 300;
const OUT_ANIMATION_NAME = 'fadeOutRight';
const OUT_ANIMATION_DURATION = 300;

export interface IUserRequestSearchProps {
	avatarURL?: string;
	fullName: string;
	username: string;
	kind: SearchResultKind;
	addFriendHandler: () => Promise<any>;
	onEntrySelect?: () => void;
}

interface ISearchResultEntryState {
	loading: boolean;
	kind: SearchResultKind;
}

export class SearchResultEntry extends React.Component<IUserRequestSearchProps, ISearchResultEntryState> {
	public state = {
		loading: false,
		kind: this.props.kind,
	};

	private addButtonRef = null;
	private renderWithAnimation = false;

	public render() {
		return (
			<View style={style.container}>
				<TouchableOpacity style={style.leftContainer} onPress={this.props.onEntrySelect}>
					<AvatarImage image={{uri: this.props.avatarURL}} style={style.avatarImage} />
					<View style={style.avatarNameContainer}>
						<Text style={style.fullName}>{this.props.fullName}</Text>
						{this.renderUsername()}
					</View>
				</TouchableOpacity>
				{this.conditionalRendering()}
			</View>
		);
	}

	private renderUsername = () => {
		if (this.props.username !== '') {
			return <Text style={style.username}>{'@' + this.props.username}</Text>;
		}
		return null;
	}

	private renderIsFriend = () => {
		return <Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isFiendIcon} />;
	}

	private renderAddFriend = () => {
		return (
			<Animatable.View ref={(ref: any) => (this.addButtonRef = ref)}>
				<SXButton
					loading={this.state.loading}
					label={'Add'}
					size={ButtonSizes.Small}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.onAddFriend}
				/>
			</Animatable.View>
		);
	}

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
	}

	private conditionalRendering = () => {
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

	private onAddFriend = () => {
		this.setState({
			loading: true,
		});
		this.props.addFriendHandler().then(
			() => {
				this.addButtonRef.animate(OUT_ANIMATION_NAME, OUT_ANIMATION_DURATION).then(() => {
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
				Toast.show({
					text: 'Friend request could not be processed at this time. Try again later..',
					duration: 3000,
					position: 'top',
				});
			},
		);
	}
}
