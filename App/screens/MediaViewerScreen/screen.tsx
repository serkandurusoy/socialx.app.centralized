import get from 'lodash/get';
import React, {Component} from 'react';
import {Dimensions, Platform, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Orientation from 'react-native-orientation';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import {MediaObjectViewer} from 'components';
import {DeviceOrientations, OS_TYPES} from 'consts';
import {Colors, Sizes} from 'theme';
import {IMediaViewerObject} from 'types';
import {getTypePropsForMediaViewerObject, getURLForMediaViewerObject} from 'utilities';
import style from './style';

interface IMediaViewerScreenComponentProps {
	mediaObjects: IMediaViewerObject[];
	startIndex: number;
	orientation: string;
}

interface IMediaViewerScreenComponentState {
	activeSlide: number;
	viewport: {
		width: number;
	};
	showInfoButton: boolean;
	showInfoOverlay: boolean;
}

export const MediaInfoOverlay: React.SFC<{
	onShowInfo: () => void;
	onHideInfoButton: () => void;
}> = ({onShowInfo, onHideInfoButton}) => (
	<TouchableWithoutFeedback onPress={onHideInfoButton}>
		<View style={style.fullScreen}>
			<TouchableOpacity style={style.infoButton} onPress={onShowInfo}>
				<Icon name={'ios-information-circle-outline'} style={style.infoIcon} />
			</TouchableOpacity>
		</View>
	</TouchableWithoutFeedback>
);

export default class MediaViewerScreenComponent extends Component<
	IMediaViewerScreenComponentProps,
	IMediaViewerScreenComponentState
> {
	public state = {
		activeSlide: this.props.startIndex,
		viewport: {
			width: Dimensions.get('window').width,
		},
		showInfoButton: false,
		showInfoOverlay: false,
	};

	private carouselRef: CarouselStatic<IMediaViewerObject> | null = null;

	constructor(props: IMediaViewerScreenComponentProps, context: any) {
		super(props, context);
	}

	get isPortrait() {
		return this.props.orientation === DeviceOrientations.Portrait;
	}

	public shouldComponentUpdate(
		nextProps: Readonly<IMediaViewerScreenComponentProps>,
		nextState: Readonly<IMediaViewerScreenComponentState>,
		nextContext: any,
	): boolean {
		return (
			nextState.activeSlide !== this.state.activeSlide ||
			nextProps.orientation !== this.props.orientation ||
			nextState.showInfoButton !== this.state.showInfoButton
		);
	}

	public render() {
		const {showInfoButton} = this.state;
		return (
			<SafeAreaView style={style.safeView}>
				<TouchableWithoutFeedback onPress={this.toggleInfoButtonHandler}>
					<View style={style.carouselContainer} onLayout={this.carouselContainerOnLayoutHandler}>
						<Carousel
							ref={(c: any) => (this.carouselRef = c)}
							// hack so that renderItem will use updated state value for activeSlide
							activeSlide={this.state.activeSlide}
							data={this.props.mediaObjects}
							renderItem={this.renderCarouselItem}
							sliderWidth={this.state.viewport.width}
							itemWidth={this.state.viewport.width}
							firstItem={this.props.startIndex}
							onSnapToItem={this.handleSlideChanged}
							{...this.getIOSCarouselProps()}
						/>
					</View>
				</TouchableWithoutFeedback>
				{this.renderCloseButton()}
				<View style={style.screenFooter}>
					{this.renderMediaInfoSection()}
					{this.renderPagination()}
				</View>
				{showInfoButton && (
					<MediaInfoOverlay onShowInfo={this.showMediaInfoHandler} onHideInfoButton={this.toggleInfoButtonHandler} />
				)}
			</SafeAreaView>
		);
	}

	private carouselContainerOnLayoutHandler = (event: {nativeEvent: {layout: {width: number; height: number}}}) => {
		this.setState({
			viewport: {
				width: event.nativeEvent.layout.width,
			},
		});
	};

	private getIOSCarouselProps = () => {
		const ret: any = {};
		if (Platform.OS === OS_TYPES.IOS) {
			ret.windowSize = 1;
			ret.initialNumToRender = 1;
		} else {
			ret.windowSize = 5;
			ret.initialNumToRender = 5;
			// ret.initialNumToRender = this.props.startIndex;
			// ret.layout = 'stack';
			// ret.useScrollView = true;
			// TODO: explore other options for Android issues:
			// https://github.com/archriss/react-native-snap-carousel/blob/master/doc/
		}
		return ret;
	};

	private renderPagination = () => {
		if (this.props.mediaObjects.length > 1) {
			return (
				<View style={style.paginationContainer}>
					<Text style={style.paginationText}>
						{this.state.activeSlide + 1}
						{' / '}
						{this.props.mediaObjects.length}
					</Text>
				</View>
			);
		}
		return null;
	};

	private renderCloseButton = () => {
		if (!this.isPortrait) {
			return (
				<TouchableOpacity onPress={this.exitFullScreenMode} style={style.closeIcon}>
					<Icon name={'times'} size={Sizes.smartHorizontalScale(30)} color={Colors.white} />
				</TouchableOpacity>
			);
		}
		return null;
	};

	private renderMediaInfoSection = () => {
		const currentMedia = this.props.mediaObjects[this.state.activeSlide];
		const numberOfLikes = get(currentMedia, 'numberOfLikes', 0);
		const numberOfComments = get(currentMedia, 'numberOfComments', 0);
		if (numberOfComments > 0 || numberOfLikes > 0) {
			return (
				<View style={style.mediaInfoSection}>
					{numberOfLikes > 0 && <Text style={style.infoText}>{'Likes ' + numberOfLikes}</Text>}
					<View style={{flex: 1}} />
					{numberOfComments > 0 && <Text style={style.infoText}>{'Comments ' + numberOfComments}</Text>}
				</View>
			);
		}
		return null;
	};

	private exitFullScreenMode = () => {
		const timeoutBeforeAllowAgainAllOrientation = Platform.OS === OS_TYPES.IOS ? 100 : 5000;
		Orientation.lockToPortrait();
		setTimeout(() => {
			Orientation.unlockAllOrientations();
		}, timeoutBeforeAllowAgainAllOrientation);
	};

	private handleSlideChanged = (index: number) => {
		this.setState({activeSlide: index});
	};

	private renderCarouselItem = (itemData: {item: IMediaViewerObject; index: number}) => {
		const carouselImageStyles = [style.carouselMediaObject, {width: this.state.viewport.width}];
		const dataItem = itemData.item;
		const mediaURL = getURLForMediaViewerObject(dataItem, true);
		const mediaTypeProps = getTypePropsForMediaViewerObject(dataItem);
		return (
			<MediaObjectViewer
				{...mediaTypeProps}
				paused={itemData.index !== this.state.activeSlide}
				uri={mediaURL}
				style={carouselImageStyles}
				resizeMode={'contain'}
				resizeToChangeAspectRatio={true}
			/>
		);
	};

	private showMediaInfoHandler = () => {
		this.setState({
			showInfoOverlay: true,
			showInfoButton: false,
		});
	};

	private toggleInfoButtonHandler = () => {
		console.log('toggleInfoButtonHandler', !this.state.showInfoButton);
		this.setState({
			showInfoButton: !this.state.showInfoButton,
		});
	};
}
