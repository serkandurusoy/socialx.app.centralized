import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

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
	addFriendHandler?: () => void;
	onEntrySelect?: () => void;
	loading: boolean;
}

interface ISearchResultEntryState {
	loading: boolean;
	willGoOut: boolean;
	kind: SearchResultKind;
}

export class SearchResultEntry extends React.Component<IUserRequestSearchProps, ISearchResultEntryState> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IUserRequestSearchProps>,
		prevState: Readonly<ISearchResultEntryState>,
	) {
		if (nextProps.loading !== prevState.loading) {
			return {
				loading: nextProps.loading,
				willGoOut: prevState.loading && !nextProps.loading,
			};
		}
		return null;
	}

	public state = {
		loading: false,
		willGoOut: false,
		kind: this.props.kind,
	};

	private addButtonRef = null;

	public shouldComponentUpdate(nextProps: IUserRequestSearchProps, nextState: ISearchResultEntryState): boolean {
		if (this.state.loading && !nextState.loading) {
			this.addButtonRef.animate(OUT_ANIMATION_NAME, OUT_ANIMATION_DURATION).then(() => {
				this.setState({
					kind: SearchResultKind.Friend,
					willGoOut: false,
				});
			});
		}
		return true;
	}

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
		return (
			<Animatable.View
				animation={IN_ANIMATION_NAME}
				easing='ease-out'
				iterationCount={1}
				duration={IN_ANIMATION_DURATION}
			>
				<Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isFiendIcon} />
			</Animatable.View>
		);
	}

	private renderAddFriend = () => {
		return (
			<Animatable.View ref={(ref: any) => (this.addButtonRef = ref)}>
				<SXButton
					loading={this.state.loading || this.state.willGoOut}
					label={'Add'}
					size={ButtonSizes.Small}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={this.props.addFriendHandler}
				/>
			</Animatable.View>
		);
	}

	private conditionalRendering = () => {
		let ret = null;
		if (this.state.kind === SearchResultKind.NotFriend) {
			ret = this.renderAddFriend();
		} else if (this.state.kind === SearchResultKind.Friend) {
			ret = this.renderIsFriend();
		} else if (this.state.kind === SearchResultKind.Group) {
			ret = null;
		}
		return ret;
	}
}
