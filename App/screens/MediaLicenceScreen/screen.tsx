import findIndex from 'lodash/findIndex';
import sortBy from 'lodash/sortBy';
import {CheckBox} from 'native-base';
import React, {Component, ReactText} from 'react';
import {
	Dimensions,
	findNodeHandle,
	Image,
	ImagePropertiesSourceOptions,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {DataProvider} from 'recyclerlistview';

import {hideActivityIndicator, showActivityIndicator} from 'backend/actions';
import {
	IShareOption,
	MediaObjectViewer,
	ModalExternalShareOptions,
	ModalWallet,
	NewGridPhotos,
	SXButton,
} from 'components';
import {ModalManager} from 'hoc/ManagedModal/manager';
import {Colors, Icons} from 'theme';
import {ISimpleMediaObject, IUserQuery} from 'types';
import {
	IMediaLicenceData,
	IMediaLicenceWithDataHooksProps,
	IMediaSize,
	mediaLicenceWithDataHooks,
	MediaResolutionSection,
} from './data.hoc';
import style, {THUMB_HEIGHT, THUMB_WIDTH, THUMBS_IN_A_ROW} from './style';

interface IMediaLicenceScreenComponentProps extends IMediaLicenceWithDataHooksProps {
	onNavigateToFAQScreen: () => void;
	onSimilarMediaSelect: (item: IMediaLicenceData) => void;
	onShowPreviewFullScreen: (mediaObject: ISimpleMediaObject) => void;
	onNavigateToUserProfileScreen: (mediaOwner: Partial<IUserQuery>) => void;
	onNavigateToPhotoIDScreen: () => void;
	videoPaused: boolean;
}

interface IMediaLicenceScreenComponentState {
	selectedItems: IMediaSize[];
	visibleSections: MediaResolutionSection[];
	similarMediaDataProvider: DataProvider;
	likeToggleCounter: number;
	modalVisible: boolean;
	blurViewRef: any;
	amountToSend: number;
	shareModalVisible: boolean;
	scrollEnabled: boolean;
}

class MediaLicenceScreenComponent extends Component<
	IMediaLicenceScreenComponentProps,
	IMediaLicenceScreenComponentState
> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IMediaLicenceScreenComponentProps>,
		prevState: Readonly<IMediaLicenceScreenComponentState>,
	) {
		let ret: Partial<IMediaLicenceScreenComponentState> | null = null;
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

	private scrollView: ScrollView;

	private dataProvider = new DataProvider((row1: IMediaLicenceData, row2: IMediaLicenceData) => {
		return row1.imageID !== row2.imageID || row1.likedByMe !== row2.likedByMe;
	});

	constructor(props: IMediaLicenceScreenComponentProps) {
		super(props);
		this.state = {
			selectedItems: [],
			visibleSections: [],
			similarMediaDataProvider: this.dataProvider.cloneWithRows(props.similarMedia),
			likeToggleCounter: props.likeToggleCounter,
			modalVisible: false,
			blurViewRef: null,
			amountToSend: 0,
			shareModalVisible: false,
			scrollEnabled: true,
		};
	}

	public componentDidMount() {
		const blurViewHandle = findNodeHandle(this.scrollView);
		this.setState({blurViewRef: blurViewHandle});
	}

	public render() {
		return (
			<View style={{flex: 1}}>
				{this.renderModals()}
				{this.renderScreenWithScroll()}
			</View>
		);
	}

	private renderModals = () => {
		const {owner} = this.props.mediaData;
		return (
			<View>
				<ModalWallet
					visible={this.state.modalVisible}
					blurViewRef={this.state.blurViewRef}
					onCloseButton={this.toggleModalHandler}
					socXInWallet={53680} // TODO update with real value here
					sendSocXAmount={this.state.amountToSend}
					destinationUser={owner}
					tokensSent={this.props.transactionCompleted}
					onSend={this.onSendTokensHandler}
					onStartDownload={this.onStartDownloadHandler}
				/>
				<ModalExternalShareOptions
					visible={this.state.shareModalVisible}
					closeHandler={this.toggleShareOptionsModal}
					enabledShareOptions={this.props.shareOptions}
					hideLabel={true}
					onOptionSelected={this.onShareOptionSelectedHandler}
				/>
			</View>
		);
	};

	private renderScreenWithScroll = () => {
		return (
			<ScrollView
				ref={(ref) => (this.scrollView = ref)}
				style={style.scrollView}
				showsVerticalScrollIndicator={false}
				bounces={false}
				onScroll={this.scrollUpdatedHandler}
				scrollEventThrottle={100} // once at 100ms
				scrollEnabled={this.state.scrollEnabled}
			>
				{this.renderMediaPreviewAndActions()}
				{this.renderMediaDescriptionSection()}
				{this.renderResolutionsSection()}
				{this.renderBottomButtonsSection()}
				{this.renderSimilarMedia()}
			</ScrollView>
		);
	};

	private renderMediaPreviewAndActions = () => {
		const {title, type, mediaPreviewURI, likedByMe} = this.props.mediaData;
		const composedTitle = type.name + ' - ' + title;
		const likeIconSource = likedByMe ? Icons.likeIconBlueFilled : Icons.likeIconBlueOutline;

		return (
			<View style={style.paddingContainer}>
				<Text style={style.mediaTitle}>{composedTitle}</Text>
				<TouchableOpacity onPress={this.prepareMediaFullScreenPreview}>
					<MediaObjectViewer
						uri={mediaPreviewURI}
						style={style.mediaPreviewImage}
						type={type}
						paused={this.props.videoPaused}
					/>
				</TouchableOpacity>
				<View style={style.actionButtonsContainer}>
					<TouchableOpacity onPress={this.props.onMediaLike}>
						<Image source={likeIconSource} />
					</TouchableOpacity>
					{this.renderActionButton('Download Preview', Icons.mediaDownload, this.props.onMediaDownloadPreview)}
					{this.renderActionButton('Share', Icons.mediaShare, this.toggleShareOptionsModal)}
				</View>
			</View>
		);
	};

	private renderMediaDescriptionSection = () => {
		const {type, imageID, owner} = this.props.mediaData;

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
					<TouchableOpacity onPress={this.prepareShowOwnerScreen}>
						<Text style={style.mediaDescriptionValue}>{owner.name}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	private renderResolutionsSection = () => {
		const {sizes} = this.props.mediaData;

		const orderedSizes = sortBy(sizes, 'section.order');
		let currentSection: MediaResolutionSection | null = null;

		const splitSizes: IMediaSize[][] = [];
		let sectionData: IMediaSize[] = [];

		// TODO: @Serkan ask @Jake what???
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
	};

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
	};

	private renderBottomButtonsSection = () => {
		return (
			<View style={style.bottomButtonsContainer}>
				<View style={style.downloadContainer}>
					<SXButton label={'DOWNLOAD'} onPress={this.showDownloadModal} />
				</View>
				<View style={style.faqContainer}>
					<TouchableOpacity onPress={this.props.onNavigateToFAQScreen}>
						<Text style={style.faqText}>{'FAQ'}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	private renderSimilarMedia = () => {
		return (
			<View>
				<Text style={style.similarText}>{'Similar images'}</Text>
				<View style={[{height: this.getNewGridPhotosHeight()}, style.gridContainer]}>
					<NewGridPhotos
						thumbWidth={THUMB_WIDTH}
						thumbHeight={THUMB_HEIGHT}
						showsVerticalScrollIndicator={false}
						renderGridItem={this.renderGridItemHandler}
						onLoadMore={this.props.onLoadMoreSimilarMedia}
						dataProvider={this.state.similarMediaDataProvider}
						onScroll={this.gridScrollUpdatedHandler}
						extendedState={{likeCounter: this.state.likeToggleCounter}}
						scrollViewProps={{scrollEnabled: !this.state.scrollEnabled}}
					/>
				</View>
			</View>
		);
	};

	private gridScrollUpdatedHandler = (rawEvent: any, offsetX: number, offsetY: number) => {
		if (offsetY <= 0 && !this.state.scrollEnabled) {
			this.setState({
				scrollEnabled: true,
			});
		}
	};

	private scrollUpdatedHandler = (event?: NativeSyntheticEvent<NativeScrollEvent>) => {
		// TODO: scroll enable/disable logic can be improved later...
		if (event) {
			const {nativeEvent} = event;
			if (nativeEvent.contentOffset.y > nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height) {
				this.setState({
					scrollEnabled: false,
				});
			} else if (!this.state.scrollEnabled) {
				this.setState({
					scrollEnabled: true,
				});
			}
		}
	};

	private renderGridItemHandler = (type: ReactText, item: IMediaLicenceData) => {
		const likeIconSource = item.likedByMe ? Icons.likeIconBlueFilled : Icons.likeIconBlueOutline;
		return (
			<View style={style.gridItemContainer}>
				<TouchableOpacity onPress={() => this.props.onSimilarMediaSelect(item)} style={style.similarImageTouch}>
					<MediaObjectViewer uri={item.mediaPreviewURI} style={style.similarImage} type={item.type} thumbOnly={true} />
				</TouchableOpacity>
				<TouchableOpacity style={style.similarLikeIcon} onPress={() => this.props.onSimilarMediaLike(item)}>
					<Image source={likeIconSource} />
				</TouchableOpacity>
			</View>
		);
	};

	private renderActionButton = (title: string, icon: ImagePropertiesSourceOptions, onPress: () => void) => {
		return (
			<TouchableOpacity onPress={onPress} style={style.actionButton}>
				<Image source={icon} />
				<Text style={style.actionButtonText}>{title}</Text>
			</TouchableOpacity>
		);
	};

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
	};

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
	};

	private toggleResolutionSection = (mediaResSection: MediaResolutionSection) => {
		const visibleSections = [...this.state.visibleSections];
		const updatedState: Partial<IMediaLicenceScreenComponentState> = {};
		const foundIndex = this.resolutionSectionIsActive(mediaResSection);
		// TODO: @Serkan ask @Jake what??? and don't use splice in a react project! it directly mutates the original array!
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
	};

	private resolutionSectionIsActive = (mediaResSection: MediaResolutionSection) => {
		return findIndex(this.state.visibleSections, mediaResSection);
	};

	private getNewGridPhotosHeight = () => {
		const screenHeight = Dimensions.get('window').height;
		const numberOfRows = Math.ceil(this.props.numberOfSimilarMedia / THUMBS_IN_A_ROW);
		const maxHeight = numberOfRows * THUMB_HEIGHT;
		return Math.min(maxHeight, screenHeight);
		// const gridHeight = Math.min(maxHeight, screenHeight);
		// console.log('Gird photos height', gridHeight);
		// return gridHeight;
	};

	private mediaItemSelectedHandler = (mediaElement: IMediaSize) => {
		const foundIndex = this.mediaElementIsSelected(mediaElement);
		const selectedItems = [...this.state.selectedItems];
		if (foundIndex > -1) {
			// TODO: @Serkan ask @Jake what??? and don't use splice in a react project! it directly mutates the original array!
			selectedItems.splice(foundIndex, 1);
		} else {
			selectedItems.push(mediaElement);
		}
		this.setState({selectedItems});
	};

	private mediaElementIsSelected = (mediaElement: IMediaSize) => {
		return findIndex(this.state.selectedItems, (mElement: IMediaSize) => mElement.id === mediaElement.id);
	};

	private showDownloadModal = () => {
		const {selectedItems} = this.state;
		if (selectedItems.length > 0) {
			const totalPrice = selectedItems.reduce((total, item) => total + item.price, 0);
			this.setState({
				modalVisible: true,
				amountToSend: totalPrice,
			});
		} else {
			alert('No media selected');
		}
	};

	private toggleShareOptionsModal = () => {
		this.setState({
			shareModalVisible: !this.state.shareModalVisible,
		});
	};

	private toggleModalHandler = () => {
		this.setState({
			modalVisible: !this.state.modalVisible,
		});
	};

	private onShareOptionSelectedHandler = (option: IShareOption) => {
		this.toggleShareOptionsModal();
		this.props.onMediaShare(option);
	};

	private onSendTokensHandler = (gas: number) => {
		this.props.onSendTokens(gas, this.state.amountToSend);
	};

	private onStartDownloadHandler = () => {
		this.toggleModalHandler();
		ModalManager.safeRunAfterModalClosed(() => {
			this.props.onStartDownload(this.state.selectedItems);
		});
	};

	private prepareMediaFullScreenPreview = () => {
		const newMediaObject = this.props.getMediaPreviewObject();
		this.props.onShowPreviewFullScreen(newMediaObject);
	};

	private prepareShowOwnerScreen = () => {
		const mediaOwner = this.props.getMediaOwner();
		this.props.onNavigateToUserProfileScreen(mediaOwner);
	};
}

const mapDispatchToProps = (dispatch: any) => ({
	mediaPreviewDownloading: () => dispatch(showActivityIndicator('Downloading media preview..')),
	mediaResourcesDownloading: (title: string) =>
		dispatch(showActivityIndicator(`Downloading ${title}.\n Please wait..`)),
	hideProgressIndicator: () => dispatch(hideActivityIndicator()),
});

const withDataHooks = mediaLicenceWithDataHooks(MediaLicenceScreenComponent as any);

export default connect(
	null,
	mapDispatchToProps,
)(withDataHooks);
