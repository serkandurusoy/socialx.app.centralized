import findIndex from 'lodash/findIndex';
import {CheckBox} from 'native-base';
import React, {Component} from 'react';
import {Image, ImagePropertiesSourceOptions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SXButton} from '../../components/Interaction/Button';
import {Colors, Icons} from '../../theme/';
import {IMediaLicenseData, IMediaSize} from './index';
import style from './style';

interface IMediaLicenseScreenComponentProps extends IMediaLicenseData {
	onMediaLike: () => void;
	onNavigateToFAQScreen: () => void;
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

	public render() {
		const {title, type, mediaPreviewURI, likedByMe, imageID, owner, webSizes, printSizes} = this.props;
		const composedTitle = type.name + ' - ' + title;
		// TODO: get better icons here, same size!
		const likeIconSource = likedByMe ? Icons.iconTabBarNotificationsSelected : Icons.iconPostLike;
		return (
			<ScrollView style={style.scrollView}>
				<View style={style.paddingContainer}>
					<Text style={style.mediaTitle}>{composedTitle}</Text>
					<Image source={{uri: mediaPreviewURI}} resizeMode={'cover'} style={style.mediaPreviewImage} />
					<View style={style.actionButtonsContainer}>
						<TouchableOpacity onPress={this.props.onMediaLike}>
							<Image source={likeIconSource} />
						</TouchableOpacity>
						{this.renderActionButton('Download Preview', Icons.mediaDownload, this.mediaDownloadHandler)}
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
						<SXButton label={'DOWNLOAD'} />
					</View>
					<View style={style.faqContainer}>
						<TouchableOpacity onPress={this.props.onNavigateToFAQScreen}>
							<Text style={style.faqText}>{'FAQ'}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
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

	private mediaDownloadHandler = () => {
		alert('mediaDownloadHandler');
	}

	private mediaShareHandler = () => {
		alert('mediaShareHandler');
	}
}
