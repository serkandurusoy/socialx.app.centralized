import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {ModalCloseButton} from '../../components/ModalCloseButton';
import PhotoScreenComponent from './screen';
import {SendPostButton} from './SendPostButton';

interface IPhotoScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IPhotoScreenState {
	avatarURL: string;
	localPhotoURL: string;
}

export interface WallPostPhoto {
	caption?: string;
	location?: string;
	friends?: any[];
	description?: string;
}

export default class PhotoScreen extends Component<IPhotoScreenProps, IPhotoScreenState> {
	private static navigationOptions = (props: IPhotoScreenProps) => ({
		title: 'ADD PHOTO',
		headerLeft: <ModalCloseButton navigation={props.navigation} />,
		headerRight: <SendPostButton navParams={props.navigation.state.params} />,
	})

	public state = {
		avatarURL: 'https://placeimg.com/120/120/people',
		localPhotoURL: 'https://placeimg.com/2000/1500/any',
	};

	private photoScreen: PhotoScreenComponent | null = null;

	public componentWillMount() {
		this.props.navigation.setParams({onSendPress: this.sendPostHandler});
	}

	public render() {
		return (
			<PhotoScreenComponent
				avatarURL={this.state.avatarURL}
				localPhotoURL={this.state.localPhotoURL}
				ref={(ref) => (this.photoScreen = ref)}
			/>
		);
	}

	private sendPostHandler = () => {
		if (this.photoScreen) {
			alert('sendPostHandler: ' + this.photoScreen.getWallPostData());
		}
	}
}
