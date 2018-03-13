import React, {Component} from 'react';
import Orientation, {orientation} from 'react-native-orientation';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import MediaViewerScreenComponent from './screen';

const START_INDEX = 562;
const TOTAL_NUMBER_OF_PHOTOS = 1000;

export interface IPhotoData {
	url: string;
}

interface IMediaViewerScreenState {
	photos: any[];
	startIndex: number;
	orientation: string;
}

export interface IMediaViewerScreenProps {
	navigation: NavigationScreenProp<any>;
}

export default class MediaViewerScreen extends Component<IMediaViewerScreenProps, IMediaViewerScreenState> {
	private static navigationOptions = (props: IMediaViewerScreenProps) => {
		const ret: Partial<NavigationStackScreenOptions> = {
			title: 'PHOTO',
		};
		const params = props.navigation.state.params || {};
		if (params.hideHeader) {
			ret.header = null;
		}
		return ret;
	}

	constructor(props: any) {
		super(props);
		this.state = {
			photos: this.getPhotos(),
			startIndex: START_INDEX,
			orientation: 'PORTRAIT',
		};
	}

	public componentDidMount() {
		Orientation.unlockAllOrientations();
		Orientation.addOrientationListener(this.orientationDidChange);
	}

	public componentWillUnmount() {
		Orientation.lockToPortrait();
		Orientation.removeOrientationListener(this.orientationDidChange);
	}

	public render() {
		return (
			<MediaViewerScreenComponent
				photos={this.state.photos}
				startIndex={this.state.startIndex}
				orientation={this.state.orientation}
			/>
		);
	}

	private orientationDidChange = (orient: orientation) => {
		this.props.navigation.setParams({hideHeader: orient === 'LANDSCAPE'});
		this.setState({orientation: orient});
	}

	private getPhotos = () => {
		const ret: IPhotoData[] = [];
		for (let i = 1; i <= TOTAL_NUMBER_OF_PHOTOS; i++) {
			ret.push({url: 'https://avatars2.githubusercontent.com/u/' + i});
		}
		return ret;
	}
}
