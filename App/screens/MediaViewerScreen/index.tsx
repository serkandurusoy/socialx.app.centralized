import React, {Component} from 'react';
import {View} from 'react-native';
import Orientation, {orientation} from 'react-native-orientation';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {ModalCloseButton} from '../../components';
import {DeviceOrientations} from '../../constants';
import MediaViewerScreenComponent from './screen';

export interface IPhotoData {
	url: string;
}

interface IMediaViewerScreenState {
	orientation: string;
}

export interface IMediaViewerScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class MediaViewerScreen extends Component<IMediaViewerScreenProps, IMediaViewerScreenState> {
	private static navigationOptions = (props: IMediaViewerScreenProps) => {
		const ret: Partial<NavigationStackScreenOptions> = {
			title: 'PHOTO',
			headerRight: <ModalCloseButton navigation={props.navigation} />,
			headerLeft: <View />,
		};
		const params = props.navigation.state.params || {};
		if (params.hideHeader) {
			ret.header = null;
		}
		return ret;
	}

	public state = {
		orientation: DeviceOrientations.Portrait,
	};

	public componentDidMount() {
		Orientation.unlockAllOrientations();
		Orientation.addOrientationListener(this.orientationDidChange);
	}

	public componentWillUnmount() {
		Orientation.lockToPortrait();
		Orientation.removeOrientationListener(this.orientationDidChange);
	}

	public render() {
		const navParams = this.props.navigation.state.params;
		return (
			<MediaViewerScreenComponent
				photos={navParams.photos}
				startIndex={navParams.startIndex}
				orientation={this.state.orientation}
			/>
		);
	}

	private orientationDidChange = (orient: orientation) => {
		this.props.navigation.setParams({hideHeader: orient === DeviceOrientations.Landscape});
		this.setState({orientation: orient});
	}
}
