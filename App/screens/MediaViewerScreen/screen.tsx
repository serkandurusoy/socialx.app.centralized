import React, {Component} from 'react';
import {Dimensions, Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DeviceOrientations, OS_TYPES} from '../../constants';
import {Colors, Sizes} from '../../theme';
import {IPhotoData} from './index';
import style from './style';

interface IMediaViewerScreenComponentProps {
	photos: IPhotoData[];
	startIndex: number;
	orientation: string;
}

interface IMediaViewerScreenComponentState {
	activeSlide: number;
}

export default class MediaViewerScreenComponent extends Component<
	IMediaViewerScreenComponentProps,
	IMediaViewerScreenComponentState
> {
	public state = {
		activeSlide: this.props.startIndex,
	};

	private carouselPortrait: CarouselStatic<IPhotoData> | null = null;
	private carouselLandscape: CarouselStatic<IPhotoData> | null = null;
	private portraitWidth: number = 0;
	private landscapeWidth: number = 0;

	constructor(props: IMediaViewerScreenComponentProps, context: any) {
		super(props, context);
		this.setDimensions();
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
			<View>
				<View style={[style.carouselContainer, {zIndex: this.isPortrait ? 1 : -1}]}>
					<Carousel
						ref={(c: any) => (this.carouselPortrait = c)}
						data={this.props.photos}
						renderItem={this.renderItemPortrait}
						sliderWidth={this.portraitWidth}
						itemWidth={this.portraitWidth}
						firstItem={this.props.startIndex}
						onSnapToItem={this.handleSlideChanged}
						{...this.getIOSCarouselProps()}
					/>
				</View>
				<View style={[style.carouselLandscapeContainer, {zIndex: this.isPortrait ? -1 : 1}]}>
					<Carousel
						ref={(c: any) => (this.carouselLandscape = c)}
						data={this.props.photos}
						renderItem={this.renderItemLandscape}
						sliderWidth={this.landscapeWidth}
						itemWidth={this.landscapeWidth}
						firstItem={this.props.startIndex}
						onSnapToItem={this.handleSlideChanged}
						{...this.getIOSCarouselProps()}
					/>
				</View>
				{this.renderPagination()}
				{this.renderCloseButton()}
			</View>
		);
	}

	private getIOSCarouselProps = () => {
		const ret: any = {};
		if (Platform.OS === OS_TYPES.iOS) {
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
					{this.props.photos.length}
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
		const timeoutBeforeAllowAgainAllOrientation = Platform.OS === OS_TYPES.iOS ? 100 : 5000;
		Orientation.lockToPortrait();
		setTimeout(() => {
			Orientation.unlockAllOrientations();
		}, timeoutBeforeAllowAgainAllOrientation);
	}

	private handleSlideChanged = (index: number) => {
		this.setState({activeSlide: index});
		if (this.isPortrait) {
			if (this.carouselLandscape !== null) {
				this.carouselLandscape.snapToItem(index, false);
			}
		} else {
			if (this.carouselPortrait) {
				this.carouselPortrait.snapToItem(index, false);
			}
		}
	}

	private setDimensions = () => {
		const {width, height} = Dimensions.get('window');
		if (width > height) {
			// landscape mode
			this.portraitWidth = height;
			this.landscapeWidth = width;
		} else {
			// portrait mode
			this.portraitWidth = width;
			this.landscapeWidth = height;
		}
	}

	private renderItemPortrait = (itemData: {item: IPhotoData; index: number}) => {
		const carouselImageStyles = [style.carouselImage, {width: this.portraitWidth}];
		return (
			<FastImage
				source={{uri: itemData.item.url}}
				style={carouselImageStyles}
				resizeMode={FastImage.resizeMode.contain}
			/>
		);
	}

	private renderItemLandscape = (itemData: {item: IPhotoData; index: number}) => {
		const carouselImageStyles = [style.carouselImage, {width: this.landscapeWidth}];
		return (
			<FastImage
				source={{uri: itemData.item.url}}
				style={carouselImageStyles}
				resizeMode={FastImage.resizeMode.contain}
			/>
		);
	}
}
