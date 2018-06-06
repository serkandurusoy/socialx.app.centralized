import {SharePostInput} from 'components';
import {AddFriendsList} from 'components/Displayers/AddFriendsList';
import {CheckboxButtonWithIcon} from 'components/Displayers/CheckboxButtonWithIcon';
import {MediaObjectViewer} from 'components/Displayers/MediaObject';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import React, {Component} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {Image as PickerImage} from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Icons} from 'theme/';
import {FriendsSearchResult, WallPostPhoto} from './index';
import style from './style';

interface IPhotoScreenComponentProps extends IWithLoaderProps {
	avatarURL: string;
	mediaObject: PickerImage;
	showTagFriendsModal: () => void;
	taggedFriends: FriendsSearchResult[];
}

interface IPhotoScreenComponentState {
	locationEnabled: boolean;
	tagFriends: boolean;
	location: string;
}

class PhotoScreenComponent extends Component<IPhotoScreenComponentProps, IPhotoScreenComponentState> {
	public state = {
		locationEnabled: false,
		tagFriends: false,
		location: '',
	};

	private sharePostInputRef: SharePostInput | null = null;

	public getWallPostData = (): Partial<WallPostPhoto> => {
		const ret: Partial<WallPostPhoto> = {
			includeTaggedFriends: this.state.tagFriends,
		};
		if (this.sharePostInputRef) {
			const title = this.sharePostInputRef.getTitle();
			if (title) {
				ret.title = title;
			}
		}
		if (this.state.locationEnabled && this.state.location !== '') {
			ret.location = this.state.location;
		}
		return ret;
	};

	public render() {
		return this.props.renderWithLoader(
			<KeyboardAwareScrollView
				style={style.scrollView}
				alwaysBounceVertical={true}
				keyboardShouldPersistTaps={'handled'}
			>
				<SharePostInput ref={(ref) => (this.sharePostInputRef = ref)} avatarSource={{uri: this.props.avatarURL}} />
				<View style={style.photoContainer}>
					<MediaObjectViewer uri={this.props.mediaObject.path} style={style.photo} />
				</View>
				<View style={style.paddingContainer}>
					{this.renderLocationSection()}
					{/*{this.renderTagFriendsSection()}*/}
					{this.renderDescriptionSection()}
				</View>
			</KeyboardAwareScrollView>,
		);
	}

	private renderLocationSection = () => {
		return (
			<View style={style.checkboxButtonContainer}>
				<CheckboxButtonWithIcon
					iconSource={Icons.iconLocationPin}
					selected={this.state.locationEnabled}
					text={'ADD LOCATION'}
					onPress={this.toggleLocationHandler}
				/>
				{this.renderAddLocation()}
			</View>
		);
	};

	private renderAddLocation = () => {
		if (this.state.locationEnabled) {
			return (
				<View>
					<Text style={style.smallText}>{'Add location'}</Text>
					<View style={style.withMaxHeight}>
						<TextInput
							autoFocus={true}
							autoCorrect={true}
							underlineColorAndroid={Colors.transparent}
							numberOfLines={2}
							multiline={true}
							style={style.multilineTextInput}
							value={this.state.location}
							onChangeText={(value: string) => this.textChangedHandler('location', value)}
						/>
					</View>
				</View>
			);
		}
		return null;
	};

	private renderTagFriendsSection = () => {
		return (
			<View style={style.checkboxButtonContainer}>
				<CheckboxButtonWithIcon
					iconSource={Icons.iconInviteFriends}
					selected={this.state.tagFriends}
					text={'TAG FRIENDS'}
					onPress={this.toggleTagFriendsHandler}
				/>
				{this.renderAddTagFriends()}
			</View>
		);
	};

	private renderAddTagFriends = () => {
		if (this.state.tagFriends) {
			// todo @serkan @jake this is unused???
			const taggedFriendsForRender = [];
			for (const taggedFriend of this.props.taggedFriends) {
				taggedFriendsForRender.push(
					<Image
						key={taggedFriend.id}
						source={{uri: taggedFriend.avatarURL}}
						resizeMode={'cover'}
						style={style.taggedFriendIcon}
					/>,
				);
			}
			return (
				<AddFriendsList taggedFriends={this.props.taggedFriends} showTagFriendsModal={this.props.showTagFriendsModal} />
			);
		}
		return null;
	};

	private toggleLocationHandler = () => {
		this.setState({
			locationEnabled: !this.state.locationEnabled,
		});
	};

	private toggleTagFriendsHandler = () => {
		this.setState({
			tagFriends: !this.state.tagFriends,
		});
	};

	private textChangedHandler = (inputStateVar: string, value: string) => {
		const newState: any = {};
		newState[inputStateVar] = value;
		this.setState(newState);
	};
}

export default withInlineLoader(PhotoScreenComponent, true);
