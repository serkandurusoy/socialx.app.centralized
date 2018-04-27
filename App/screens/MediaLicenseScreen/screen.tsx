import findIndex from 'lodash/findIndex';
import sortBy from 'lodash/sortBy';
import {CheckBox} from 'native-base';
import React, {Component, ReactText} from 'react';
import {Dimensions, Image, ImagePropertiesSourceOptions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {DataProvider} from 'recyclerlistview';
import {NewGridPhotos} from '../../components/Displayers/NewGridPhotos';
import {SXButton} from '../../components/Interaction/Button';
import {Colors, Icons} from '../../theme/';
import {IMediaLicenseData, IMediaSize, MediaResolutionSection} from './index';
import style, {THUMB_HEIGHT, THUMB_WIDTH, THUMBS_IN_A_ROW} from './style';

interface IMediaLicenseScreenComponentProps extends IMediaLicenseData {
	onMediaLike: () => void;
	onNavigateToFAQScreen: () => void;
	onDownload: () => void;
	onLoadMoreSimilarMedia: () => void;
	numberOfSimilarMedia: number;
	onSimilarMediaLike: (item: IMediaLicenseData) => void;
	onSimilarMediaSelect: (item: IMediaLicenseData) => void;
	onShowPreviewFullScreen: () => void;
	onNavigateToUserProfileScreen: () => void;
	onNavigateToPhotoIDScreen: () => void;
	similarMedia: IMediaLicenseData[];
	likeToggleCounter: number;
}

interface IMediaLicenseScreenComponentState {
	selectedItems: IMediaSize[];
	visibleSections: MediaResolutionSection[];
	similarMediaDataProvider: DataProvider;
	likeToggleCounter: number;
}

export default class MediaLicenseScreenComponent extends Component<
	IMediaLicenseScreenComponentProps,
	IMediaLicenseScreenComponentState
> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IMediaLicenseScreenComponentProps>,
		prevState: Readonly<IMediaLicenseScreenComponentState>,
	) {
		let ret: Partial<IMediaLicenseScreenComponentState> | null = null;
		if (nextProps.likeToggleCounter !== prevState.likeToggleCounter) {
			ret = {};
			ret.likeToggleCounter = nextProps.likeToggleCounter;
		}
		if (nextProps.similarMedia.length > prevState.similarMediaDataProvider.getSize()) {
			ret = ret || {};
			ret.similarMediaDataProvider = prevState.similarMediaDataProvider.cloneWithRows(nextProps.similarMedia);
		}
		return ret;
	}

	private dataProvider = new DataProvider((row1: IMediaLicenseData, row2: IMediaLicenseData) => {
		return row1.imageID !== row2.imageID || row1.likedByMe !== row2.likedByMe;
	});

	constructor(props: IMediaLicenseScreenComponentProps) {
		super(props);
		this.state = {
			selectedItems: [],
			visibleSections: [],
			similarMediaDataProvider: this.dataProvider.cloneWithRows(props.similarMedia),
			likeToggleCounter: props.likeToggleCounter,
		};
	}

	public render() {
		return (
			<ScrollView style={style.scrollView} showsVerticalScrollIndicator={false} bounces={false}>
				{this.renderMediaPreviewAndActions()}
				{this.renderMediaDescriptionSection()}
				{this.renderResolutionsSection()}
				{this.renderBottomButtonsSection()}
				{this.renderSimilarMedia()}
			</ScrollView>
		);
	}

	public getSelectedItems = () => {
		return this.state.selectedItems;
	}

	private renderMediaPreviewAndActions = () => {
		const {title, type, mediaPreviewURI, likedByMe} = this.props;
		const composedTitle = type.name + ' - ' + title;
		const likeIconSource = likedByMe ? Icons.likeIconBlueFilled : Icons.likeIconBlueOutline;

		return (
			<View style={style.paddingContainer}>
				<Text style={style.mediaTitle}>{composedTitle}</Text>
				<TouchableOpacity onPress={this.props.onShowPreviewFullScreen}>
					<Image source={{uri: mediaPreviewURI}} resizeMode={'cover'} style={style.mediaPreviewImage} />
				</TouchableOpacity>
				<View style={style.actionButtonsContainer}>
					<TouchableOpacity onPress={this.props.onMediaLike}>
						<Image source={likeIconSource} />
					</TouchableOpacity>
					{this.renderActionButton('Download Preview', Icons.mediaDownload, this.mediaDownloadPreviewHandler)}
					{this.renderActionButton('Share', Icons.mediaShare, this.mediaShareHandler)}
				</View>
			</View>
		);
	}

	private renderMediaDescriptionSection = () => {
		const {type, imageID, owner} = this.props;

		return (
			<View style={[style.paddingContainer, style.descriptionContainer]}>
				<View style={style.mediaDescription}>
					<Text style={style.mediaDescriptionText}>{type.name + ' ID: '}</Text>
					<TouchableOpacity onPress={this.props.onNavigateToPhotoIDScreen}>
						<Text style={style.mediaDescriptionValue}>{imageID}</Text>
					</TouchableOpacity>
				</View>
				<Text style={style.mediaDescriptionText}>{'Media Type: ' + type.category}</Text>
				<View style={style.mediaDescription}>
					<Text style={style.mediaDescriptionText}>{'Copyright: '}</Text>
					<TouchableOpacity onPress={this.props.onNavigateToUserProfileScreen}>
						<Text style={style.mediaDescriptionValue}>{owner.name}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	private renderResolutionsSection = () => {
		const {sizes} = this.props;

		const orderedSizes = sortBy(sizes, 'section.order');
		let currentSection: MediaResolutionSection | null = null;

		const splitSizes: IMediaSize[][] = [];
		let sectionData: IMediaSize[] = [];

		orderedSizes.forEach((size) => {
			if (currentSection !== size.section) {
				if (sectionData.length > 0) {
					splitSizes.push([...sectionData]);
				}
				currentSection = size.section;
				sectionData = [];
			}
			sectionData.push(size);
		});
		if (sectionData.length > 0) {
			splitSizes.push([...sectionData]);
		}

		return (
			<View style={style.listContainer}>
				<View style={style.listHeader}>
					<Text style={style.listHeaderText}>{'Resolution'}</Text>
					<Text style={style.listHeaderText}>{'SOCX'}</Text>
				</View>
				{splitSizes.map((sectionSizes, index) => {
					return this.renderListSection(sectionSizes, index);
				})}
			</View>
		);
	}

	private renderResolutionSectionItems = (sectionData: IMediaSize[]) => {
		if (this.resolutionSectionIsActive(sectionData[0].section) > -1) {
			return (
				<Animatable.View animation={'fadeIn'} easing='ease-out' iterationCount={1} duration={1000}>
					{sectionData.map((mediaElement, index) => {
						const isLast = index === sectionData.length - 1;
						return this.renderListItemWithSelectButton(mediaElement, index, isLast);
					})}
				</Animatable.View>
			);
		}
		return null;
	}

	private renderBottomButtonsSection = () => {
		return (
			<View style={style.bottomButtonsContainer}>
				<View style={style.downloadContainer}>
					<SXButton label={'DOWNLOAD'} onPress={this.props.onDownload} />
				</View>
				<View style={style.faqContainer}>
					<TouchableOpacity onPress={this.props.onNavigateToFAQScreen}>
						<Text style={style.faqText}>{'FAQ'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	private renderSimilarMedia = () => {
		return (
			<View>
				<Text style={style.similarText}>{'Similar images'}</Text>
				<View style={[{height: this.getNewGridPhotosHeight()}, style.gridContainer]}>
					<NewGridPhotos
						thumbWidth={THUMB_WIDTH}
						thumbHeight={THUMB_HEIGHT}
						showsVerticalScrollIndicator={false}
						// bounces={false}
						// onScroll={this.scrollUpdatedHandler}
						renderGridItem={this.renderGridItemHandler}
						onLoadMore={this.props.onLoadMoreSimilarMedia}
						dataProvider={this.state.similarMediaDataProvider}
						extendedState={{likeCounter: this.state.likeToggleCounter}}
					/>
				</View>
			</View>
		);
	}

	private renderGridItemHandler = (type: ReactText, item: IMediaLicenseData) => {
		const likeIconSource = item.likedByMe ? Icons.likeIconBlueFilled : Icons.likeIconBlueOutline;
		return (
			<View style={style.gridItemContainer}>
				<TouchableOpacity onPress={() => this.props.onSimilarMediaSelect(item)} style={style.similarImageTouch}>
					<Image source={{uri: item.mediaPreviewURI}} style={style.similarImage} resizeMode={'cover'} />
				</TouchableOpacity>
				<TouchableOpacity style={style.similarLikeIcon} onPress={() => this.props.onSimilarMediaLike(item)}>
					<Image source={likeIconSource} />
				</TouchableOpacity>
			</View>
		);
	}

	private renderActionButton = (title: string, icon: ImagePropertiesSourceOptions, onPress: () => void) => {
		return (
			<TouchableOpacity onPress={onPress} style={style.actionButton}>
				<Image source={icon} />
				<Text style={style.actionButtonText}>{title}</Text>
			</TouchableOpacity>
		);
	}

	private renderListSection = (mediaSizes: IMediaSize[], sectionIndex: number) => {
		const title = mediaSizes[0].section.title;
		return (
			<View key={sectionIndex}>
				<TouchableOpacity onPress={() => this.toggleResolutionSection(mediaSizes[0].section)}>
					<LinearGradient
						start={{x: 0, y: 0.5}}
						end={{x: 1, y: 0.5}}
						colors={[Colors.fuchsiaBlue, Colors.pink]}
						style={style.listSectionHeaderGradient}
					>
						<Text style={style.listSectionHeaderText}>{title}</Text>
					</LinearGradient>
				</TouchableOpacity>
				{this.renderResolutionSectionItems(mediaSizes)}
			</View>
		);
	}

	private renderListItemWithSelectButton = (mediaElement: IMediaSize, index: number, isLast = false) => {
		const itemContainerStyles = [
			style.listItemContainer,
			!isLast ? style.listItemBorder : null,
			index > 0 ? style.listItemTopPadding : null,
		];
		const itemSelected = this.mediaElementIsSelected(mediaElement) > -1;
		const resolutionText = mediaElement.width + ' x ' + mediaElement.height + ' px';
		return (
			<View style={itemContainerStyles} key={index}>
				<CheckBox
					checked={itemSelected}
					onPress={() => this.mediaItemSelectedHandler(mediaElement)}
					color={Colors.pink}
					style={style.listItemCheckbox}
				/>
				<View style={style.mediaSizeBackground}>
					<Text style={style.mediaSize}>{mediaElement.mediaSize}</Text>
				</View>
				<Text style={style.mediaExtension}>{mediaElement.extension.toUpperCase()}</Text>
				<Text style={style.mediaResolution}>{resolutionText}</Text>
				<Text style={style.mediaPrice}>{mediaElement.price}</Text>
			</View>
		);
	}

	private toggleResolutionSection = (mediaResSection: MediaResolutionSection) => {
		const visibleSections = [...this.state.visibleSections];
		const updatedState: Partial<IMediaLicenseScreenComponentState> = {};
		const foundIndex = this.resolutionSectionIsActive(mediaResSection);
		if (foundIndex > -1) {
			visibleSections.splice(foundIndex, 1);
			const updatedSelectedItems: IMediaSize[] = [];
			this.state.selectedItems.forEach((selectedItem: IMediaSize) => {
				if (selectedItem.section !== mediaResSection) {
					updatedSelectedItems.push(selectedItem);
				}
			});
			updatedState.selectedItems = updatedSelectedItems;
		} else {
			visibleSections.push(mediaResSection);
		}
		updatedState.visibleSections = visibleSections;
		this.setState(updatedState);
	}

	private resolutionSectionIsActive = (mediaResSection: MediaResolutionSection) => {
		return findIndex(this.state.visibleSections, mediaResSection);
	}

	private getNewGridPhotosHeight = () => {
		const screenHeight = Dimensions.get('window').height;
		const numberOfRows = Math.ceil(this.props.numberOfSimilarMedia / THUMBS_IN_A_ROW);
		const maxHeight = numberOfRows * THUMB_HEIGHT;
		return Math.min(maxHeight, screenHeight);
	}

	private mediaItemSelectedHandler = (mediaElement: IMediaSize) => {
		const foundIndex = this.mediaElementIsSelected(mediaElement);
		const selectedItems = [...this.state.selectedItems];
		if (foundIndex > -1) {
			selectedItems.splice(foundIndex, 1);
		} else {
			selectedItems.push(mediaElement);
		}
		this.setState({selectedItems});
	}

	private mediaElementIsSelected = (mediaElement: IMediaSize) => {
		return findIndex(this.state.selectedItems, (mElement: IMediaSize) => mElement.id === mediaElement.id);
	}

	private mediaDownloadPreviewHandler = () => {
		alert('mediaDownloadPreviewHandler');
	}

	private mediaShareHandler = () => {
		alert('mediaShareHandler');
	}
}
