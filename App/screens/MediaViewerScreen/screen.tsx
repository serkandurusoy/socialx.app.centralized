import {MediaObjectViewer} from 'components';
import {ipfsConfig as base} from 'configuration';
import {DeviceOrientations, OS_TYPES} from 'consts';
import React, {Component} from 'react';
import {Dimensions, Image, Platform, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Orientation from 'react-native-orientation';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Sizes} from 'theme';
import {IMediaProps} from 'types';
import style from './style';

interface IMediaViewerScreenComponentProps {
	mediaObjects: IMediaProps[];
	startIndex: number;
	orientation: string;
}

interface IMediaViewerScreenComponentState {
	activeSlide: number;
	viewport: {
		width: number;
	};
}

export default class MediaViewerScreenComponent extends Component<
	IMediaViewerScreenComponentProps,
	IMediaViewerScreenComponentState
> {
	public state = {
		activeSlide: this.props.startIndex,
		viewport: {
			width: Dimensions.get('window').width,
		},
	};

	private carouselRef: CarouselStatic<IMediaProps> | null = null;

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
		return nextState.activeSlide !== this.state.activeSlide || nextProps.orientation !== this.props.orientation;
	}

	public render() {
		return (
			<SafeAreaView style={style.safeView}>
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
				{this.renderPagination()}
				{this.renderCloseButton()}
			</SafeAreaView>
		);
	}

	private carouselContainerOnLayoutHandler = (event: {nativeEvent: {layout: {width: number; height: number}}}) => {
		this.setState({
			viewport: {
				width: event.nativeEvent.layout.width,
			},
		});
	}

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
	}

	private renderPagination = () => {
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

	private renderCloseButton = () => {
		if (!this.isPortrait) {
			return (
				<TouchableOpacity onPress={this.exitFullScreenMode} style={style.closeIcon}>
					<Icon name={'times'} size={Sizes.smartHorizontalScale(30)} color={Colors.white} />
				</TouchableOpacity>
			);
		}
		return null;
	}

	private exitFullScreenMode = () => {
		const timeoutBeforeAllowAgainAllOrientation = Platform.OS === OS_TYPES.IOS ? 100 : 5000;
		Orientation.lockToPortrait();
		setTimeout(() => {
			Orientation.unlockAllOrientations();
		}, timeoutBeforeAllowAgainAllOrientation);
	}

	private handleSlideChanged = (index: number) => {
		this.setState({activeSlide: index});
	}

	private renderCarouselItem = (itemData: {item: IMediaProps; index: number}) => {
		const carouselImageStyles = [style.carouselMediaObject, {width: this.state.viewport.width}];
		let mediaURL = base.ipfs_URL;
		const mediaItem = itemData.item;
		mediaURL += mediaItem.optimizedHash ? mediaItem.optimizedHash : mediaItem.hash;
		return (
			<MediaObjectViewer
				paused={itemData.index !== this.state.activeSlide}
				uri={mediaURL}
				style={carouselImageStyles}
				extension={mediaItem.type}
				resizeMode={'contain'}
				resizeToChangeAspectRatio={true}
			/>
		);
	}
}
