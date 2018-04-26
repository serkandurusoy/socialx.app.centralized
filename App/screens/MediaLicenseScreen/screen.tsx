import findIndex from 'lodash/findIndex';
import {CheckBox} from 'native-base';
import React, {Component} from 'react';
import {Dimensions, Image, ImagePropertiesSourceOptions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GridPhotos} from '../../components/Displayers/GridPhotos';
import {SXButton} from '../../components/Interaction/Button';
import {Colors, Icons} from '../../theme/';
import {IMediaLicenseData, IMediaSize} from './index';
import style, {THUMB_HEIGHT, THUMB_WIDTH, THUMBS_IN_A_ROW} from './style';

interface IMediaLicenseScreenComponentProps extends IMediaLicenseData {
	onMediaLike: () => void;
	onNavigateToFAQScreen: () => void;
	onDownload: () => void;
	loadMoreSimilarMedia: () => IMediaLicenseData[];
	numberOfSimilarMedia: number;
	onSimilarMediaLike: (item: IMediaLicenseData) => void;
	onSimilarMediaSelect: (item: IMediaLicenseData) => void;
}

interface IMediaLicenseScreenComponentState {
	selectedItems: IMediaSize[];
}

export default class MediaLicenseScreenComponent extends Component<
	IMediaLicenseScreenComponentProps,
	IMediaLicenseScreenComponentState
> {
	public state = {
		selectedItems: [],
	};

	// private scrollView: ScrollView = undefined;

	public render() {
		const {title, type, mediaPreviewURI, likedByMe, imageID, owner, webSizes, printSizes} = this.props;
		const composedTitle = type.name + ' - ' + title;
		const likeIconSource = likedByMe ? Icons.likeIconBlueFilled : Icons.likeIconBlueOutline;
		return (
			<ScrollView
				style={style.scrollView}
				showsVerticalScrollIndicator={false}
				bounces={false}
				// ref={(ref) => (this.scrollView = ref)}
			>
				<View style={style.paddingContainer}>
					<Text style={style.mediaTitle}>{composedTitle}</Text>
					<Image source={{uri: mediaPreviewURI}} resizeMode={'cover'} style={style.mediaPreviewImage} />
					<View style={style.actionButtonsContainer}>
						<TouchableOpacity onPress={this.props.onMediaLike}>
							<Image source={likeIconSource} />
						</TouchableOpacity>
						{this.renderActionButton('Download Preview', Icons.mediaDownload, this.mediaDownloadPreviewHandler)}
						{this.renderActionButton('Share', Icons.mediaShare, this.mediaShareHandler)}
					</View>
				</View>
				<View style={[style.paddingContainer, style.descriptionContainer]}>
					<Text style={style.mediaDescriptionText}>
						{type.name + ' ID: '}
						<Text style={style.mediaDescriptionValue}>{imageID}</Text>
					</Text>
					<Text style={style.mediaDescriptionText}>{'Media Type: ' + type.category}</Text>
					<Text style={style.mediaDescriptionText}>
						{'Copyright: '}
						<Text style={style.mediaDescriptionValue}>{owner.name}</Text>
					</Text>
				</View>
				<View style={style.listContainer}>
					<View style={style.listHeader}>
						<Text style={style.listHeaderText}>{'Resolution'}</Text>
						<Text style={style.listHeaderText}>{'SOCX'}</Text>
					</View>
					{this.renderListSectionHeader('Web Use (72dpi)')}
					{webSizes.map((mediaElement, index) => {
						const isLast = index === webSizes.length - 1;
						return this.renderListItemWithSelectButton(mediaElement, index, !isLast);
					})}
					{this.renderListSectionHeader('Web or Print Use (300dpi)')}
					{printSizes.map((mediaElement, index) => this.renderListItemWithSelectButton(mediaElement, index))}
					<View style={style.downloadContainer}>
						<SXButton label={'DOWNLOAD'} onPress={this.props.onDownload} />
					</View>
					<View style={style.faqContainer}>
						<TouchableOpacity onPress={this.props.onNavigateToFAQScreen}>
							<Text style={style.faqText}>{'FAQ'}</Text>
						</TouchableOpacity>
					</View>
				</View>
				{this.renderSimilarMedia()}
			</ScrollView>
		);
	}

	public getSelectedItems = () => {
		return this.state.selectedItems;
	}

	private getGridPhotosHeight = () => {
		const screenHeight = Dimensions.get('window').height;
		const numberOfRows = Math.ceil(this.props.numberOfSimilarMedia / THUMBS_IN_A_ROW);
		const maxHeight = numberOfRows * THUMB_HEIGHT;
		return Math.min(maxHeight, screenHeight);
	}

	private renderSimilarMedia = () => {
		return (
			<View>
				<Text style={style.similarText}>{'Similar images'}</Text>
				<View style={[{height: this.getGridPhotosHeight()}, style.gridContainer]}>
					<GridPhotos
						thumbWidth={THUMB_WIDTH}
						thumbHeight={THUMB_HEIGHT}
						showsVerticalScrollIndicator={false}
						bounces={false}
						// onScroll={this.scrollUpdatedHandler}
						loadMorePhotos={this.props.loadMoreSimilarMedia}
						renderGridItem={this.renderGridItemHandler}
					/>
				</View>
			</View>
		);
	}

	private renderGridItemHandler = (item: IMediaLicenseData) => {
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

	private renderListSectionHeader = (title: string) => {
		return (
			<LinearGradient
				start={{x: 0, y: 0.5}}
				end={{x: 1, y: 0.5}}
				colors={[Colors.fuchsiaBlue, Colors.pink]}
				style={style.listSectionHeaderGradient}
			>
				<Text style={style.listSectionHeaderText}>{title}</Text>
			</LinearGradient>
		);
	}

	private renderListItemWithSelectButton = (mediaElement: IMediaSize, index: number, bottomBorder = true) => {
		const itemContainerStyles = [style.listItemContainer, bottomBorder ? style.listItemBorder : null];
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
