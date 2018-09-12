// MIGRATION: migrated MediaViewerScreen into screens/mainStack

import {ModalCloseButton} from 'components';
import {DeviceOrientations, OS_TYPES} from 'consts';
import React, {Component} from 'react';
import {Platform, View} from 'react-native';
import Orientation, {orientation} from 'react-native-orientation';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {IMediaViewerObject} from 'types';
import MediaViewerScreenComponent from './screen';

interface IMediaViewerScreenNavParams {
	params: {
		mediaObjects: IMediaViewerObject[];
		startIndex: number;
		hideHeader: boolean;
	};
}

interface IMediaViewerScreenState {
	orientation: string;
}

export interface IMediaViewerScreenProps {
	navigation: NavigationScreenProp<IMediaViewerScreenNavParams>;
}

export default class MediaViewerScreen extends Component<IMediaViewerScreenProps, IMediaViewerScreenState> {
	private static navigationOptions = (props: IMediaViewerScreenProps) => {
		const ret: Partial<NavigationStackScreenOptions> = {
			title: 'MEDIA',
			headerRight: <ModalCloseButton navigation={props.navigation} />,
			headerLeft: <View />,
		};
		const params = props.navigation.state.params || {};
		if (params.hideHeader) {
			ret.header = null;
		}
		return ret;
	};

	public state = {
		orientation: DeviceOrientations.Portrait,
	};

	public componentDidMount() {
		// due to Android problems with Carousel on orientation change enable tilt only on iOS
		if (Platform.OS === OS_TYPES.IOS) {
			Orientation.unlockAllOrientations();
			Orientation.addOrientationListener(this.orientationDidChange);
		}
	}

	public componentWillUnmount() {
		if (Platform.OS === OS_TYPES.IOS) {
			Orientation.lockToPortrait();
			Orientation.removeOrientationListener(this.orientationDidChange);
		}
	}

	public render() {
		const navParams = this.props.navigation.state.params;
		return (
			<MediaViewerScreenComponent
				mediaObjects={navParams.mediaObjects}
				startIndex={navParams.startIndex}
				orientation={this.state.orientation}
			/>
		);
	}

	private orientationDidChange = (orient: orientation) => {
		this.props.navigation.setParams({hideHeader: orient === DeviceOrientations.Landscape});
		this.setState({orientation: orient});
	};
}
