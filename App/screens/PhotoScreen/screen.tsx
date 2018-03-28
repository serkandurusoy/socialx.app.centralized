import React, {Component} from 'react';
import {Image, ScrollView, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AvatarImage} from '../../components/AvatarImage';
import {SXTextInput} from '../../components/TextInput';
import {Colors, Icons} from '../../theme/';
import {CheckboxButtonWithIcon} from './CheckboxButtonWithIcon';
import {WallPostPhoto} from './index';
import style from './style';

interface IPhotoScreenComponentProps {
	avatarURL: string;
	localPhotoURL: string;
}

interface IPhotoScreenComponentState {
	locationEnabled: boolean;
	tagFriends: boolean;
	descriptionEnabled: boolean;
}

export default class PhotoScreenComponent extends Component<IPhotoScreenComponentProps, IPhotoScreenComponentState> {
	public state = {
		locationEnabled: false,
		tagFriends: false,
		descriptionEnabled: false,
	};

	// private locationInput: TextInput | null = null;
	// private descriptionInput: TextInput | null = null;

	public getWallPostData = () => {
		return {
			asgfag: '123',
		};
	}

	public render() {
		return (
			<KeyboardAwareScrollView
				style={style.scrollView}
				contentContainerStyle={style.contentContainer}
				alwaysBounceVertical={true}
				keyboardShouldPersistTaps={'handled'}
			>
				<View style={style.shareMessageContainer}>
					<AvatarImage image={{uri: this.props.avatarURL}} style={style.avatarImage} />
					<View style={{flex: 1}}>
						<SXTextInput autoFocus={true} placeholder={'Write a caption...'} borderColor={Colors.transparent} />
					</View>
				</View>
				<View style={style.photoContainer}>
					<Image source={{uri: this.props.localPhotoURL}} resizeMode={'cover'} style={style.photo} />
				</View>
				<View style={style.paddingContainer}>
					{this.renderLocationSection()}
					<CheckboxButtonWithIcon
						iconSource={Icons.iconInviteFriends}
						selected={this.state.tagFriends}
						text={'TAG FRIENDS'}
						onPress={this.toggleTagFriendsHandler}
					/>
					{this.renderDescriptionSection()}
				</View>
			</KeyboardAwareScrollView>
		);
	}

	private renderLocationSection = () => {
		return (
			<View>
				<CheckboxButtonWithIcon
					iconSource={Icons.iconLocationPin}
					selected={this.state.locationEnabled}
					text={'ADD LOCATION'}
					onPress={this.toggleLocationHandler}
				/>
				{this.renderAddLocation()}
			</View>
		);
	}

	private renderAddLocation = () => {
		if (this.state.locationEnabled) {
			return (
				<View style={style.withMaxHeight}>
					<Text style={style.smallText}>{'Add location'}</Text>
					<TextInput
						autoFocus={true}
						autoCorrect={false}
						underlineColorAndroid={Colors.transparent}
						autoCapitalize='none'
						numberOfLines={2}
						multiline={true}
						style={style.multilineTextInput}
						// ref={(ref) => (this.locationInput = ref)}
					/>
				</View>
			);
		}
		return null;
	}

	private renderDescriptionSection = () => {
		return (
			<View>
				<CheckboxButtonWithIcon
					iconSource={Icons.iconAddDescription}
					selected={this.state.descriptionEnabled}
					text={'ADD DESCRIPTION'}
					onPress={this.toggleDescriptionEnabledHandler}
				/>
				{this.renderAddDescription()}
			</View>
		);
	}

	private renderAddDescription = () => {
		if (this.state.descriptionEnabled) {
			return (
				<View style={style.withMaxHeight}>
					<Text style={style.smallText}>{'Add description'}</Text>
					<TextInput
						autoFocus={true}
						autoCorrect={false}
						underlineColorAndroid={Colors.transparent}
						autoCapitalize='none'
						numberOfLines={2}
						multiline={true}
						style={style.multilineTextInput}
						// ref={(ref) => (this.descriptionInput = ref)}
					/>
				</View>
			);
		}
		return null;
	}

	private toggleLocationHandler = () => {
		this.setState({
			locationEnabled: !this.state.locationEnabled,
		});
	}

	private toggleTagFriendsHandler = () => {
		this.setState({
			tagFriends: !this.state.tagFriends,
		});
	}

	private toggleDescriptionEnabledHandler = () => {
		this.setState({
			descriptionEnabled: !this.state.descriptionEnabled,
		});
	}
}
