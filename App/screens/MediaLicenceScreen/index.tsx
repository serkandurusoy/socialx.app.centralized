import {ModalCloseButton} from 'components';
import * as _ from 'lodash';
import React, {Component} from 'react';
import {findNodeHandle, Image, InteractionManager, Text, View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import {IMediaLicenceData} from './data.hoc';
import MediaLicenceScreenComponent from './screen';

interface IMediaLicenceScreenNavParams {
	params: {
		mediaLicence: IMediaLicenceData;
	};
}

export interface IMediaLicenceScreenProps {
	navigation: NavigationScreenProp<IMediaLicenceScreenNavParams>;
}

export default class MediaLicenceScreen extends Component<IMediaLicenceScreenProps> {
	private static navigationOptions = (props: IMediaLicenceScreenProps) => {
		const isSimilarMediaScreen = _.get(props, 'navigation.state.params.mediaLicence', undefined) !== undefined;
		const ret: Partial<NavigationStackScreenOptions> = {
			title: 'MEDIA LICENCE',
			headerRight: (
				<ModalCloseButton onClose={_.get(props, 'navigation.state.params.closeAllMediaScreens', undefined)} />
			),
		};
		if (!isSimilarMediaScreen) {
			ret.headerLeft = <View />;
		}
		return ret;
	}

	private baseScreen: any = null;

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({closeAllMediaScreens: this.onCloseAllMediaScreensHandler});
		});
	}

	public render() {
		const navMediaData = _.get(this.props, 'navigation.state.params.mediaLicence', undefined);
		return (
			<MediaLicenceScreenComponent
				ref={(ref) => (this.baseScreen = ref)}
				onShowPreviewFullScreen={this.onShowPreviewFullScreenHandler}
				onNavigateToUserProfileScreen={this.onNavigateToUserProfileScreenHandler}
				onNavigateToPhotoIDScreen={this.onNavigateToMediaIDScreenHandler}
				onSimilarMediaSelect={this.onSimilarMediaSelectHandler}
				onNavigateToFAQScreen={this.onNavigateToFAQScreenHandler}
				mediaData={navMediaData}
			/>
		);
	}

	private onShowPreviewFullScreenHandler = () => {
		const newMediaObject = this.baseScreen.getMediaPreviewObject();
		this.props.navigation.navigate('MediaViewerScreen', {
			mediaObjects: [newMediaObject],
			startIndex: 0,
		});
	}

	private onNavigateToUserProfileScreenHandler = () => {
		const mediaOwner = this.baseScreen.getMediaOwner();
		this.props.navigation.navigate('UserProfileScreen', {user: mediaOwner});
	}

	private onNavigateToMediaIDScreenHandler = () => {
		alert('Decide later what screen will this link');
	}

	private onCloseAllMediaScreensHandler = () => {
		this.props.navigation.popToTop();
		this.props.navigation.goBack(null);
	}

	private onSimilarMediaSelectHandler = (similarMedia: IMediaLicenceData) => {
		this.props.navigation.navigate('MediaLicenceScreen', {mediaLicence: similarMedia});
	}

	private onNavigateToFAQScreenHandler = () => {
		this.props.navigation.navigate('MediaLicenceFAQScreen');
	}
}
