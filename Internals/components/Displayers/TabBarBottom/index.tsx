import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import ImagePicker, {Image as PickerImage} from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import {LayoutEvent, NavigationScreenProp} from 'react-navigation';
import {Icons, Sizes} from 'theme';
import style from './style';

import {updateTabBarBottomHeight} from 'backend/actions';
import RNFS from 'react-native-fs';
import {connect} from 'react-redux';
import {MediaTypes} from 'types';

interface TabMenuItem {
	screenName?: string;
	image: number;
	imageSelected?: number;
	style: {
		width: number;
		height: number;
	};
	custom: boolean;
}

const PICK_FROM_GALLERY = 'Pick from gallery';
const TAKE_A_PHOTO = 'Open camera';
const CANCEL = 'Cancel';
const ACTION_SHEET_TITLE = 'Share a photo';

const MENU_ITEMS: TabMenuItem[] = [
	{
		screenName: 'UserFeedTab',
		image: Icons.iconTabBarHome,
		imageSelected: Icons.iconTabBarHomeSelected,
		style: {
			width: Sizes.smartHorizontalScale(20),
			height: Sizes.smartHorizontalScale(16),
		},
		custom: false,
	},
	{
		screenName: 'SearchTab',
		image: Icons.iconTabBarSearch,
		imageSelected: Icons.iconTabBarSearchSelected,
		style: {
			width: Sizes.smartHorizontalScale(17),
			height: Sizes.smartHorizontalScale(17),
		},
		custom: false,
	},
	{
		image: Icons.iconTabBarPhoto,
		style: {
			width: Sizes.smartHorizontalScale(22),
			height: Sizes.smartHorizontalScale(18),
		},
		custom: true,
	},
	{
		screenName: 'NotificationsTab',
		image: Icons.iconTabBarNotifications,
		imageSelected: Icons.iconTabBarNotificationsSelected,
		style: {
			width: Sizes.smartHorizontalScale(20),
			height: Sizes.smartHorizontalScale(16),
		},
		custom: false,
	},
	{
		screenName: 'MyProfileTab',
		image: Icons.iconTabBarProfile,
		imageSelected: Icons.iconTabBarProfileSelected,
		style: {
			width: Sizes.smartHorizontalScale(16),
			height: Sizes.smartHorizontalScale(18),
		},
		custom: false,
	},
];

interface ITabBarBottomState {
	selectedTab: string;
}

interface ITabBarBottomProps {
	navigation: NavigationScreenProp<any>;
	TabBarBottomHeight: (height: number) => void;
}

class TabBarBottomComponent extends Component<ITabBarBottomProps, ITabBarBottomState> {
	public state: any = {
		selectedTab: MENU_ITEMS[0].screenName,
	};

	public render() {
		return (
			<SafeAreaView style={style.container} onLayout={this.layoutHandler}>
				{MENU_ITEMS.map((menuItem, index) => this.getMenuItemComponent(menuItem, index))}
			</SafeAreaView>
		);
	}

	private layoutHandler = (event: LayoutEvent) => {
		const viewHeight = event.nativeEvent.layout.height;
		this.props.TabBarBottomHeight(viewHeight);
	}

	private getMenuItemComponent = (menuItem: TabMenuItem, index: number) => {
		if (menuItem.custom) {
			return (
				<View style={style.menuItemContainer} key={index}>
					<TouchableOpacity onPress={this.showPhotoOptionsMenu}>
						<View style={style.imageContainer}>
							<Image source={menuItem.image} resizeMode={'contain'} style={menuItem.style} />
						</View>
					</TouchableOpacity>
				</View>
			);
		} else {
			const tabIsSelected = this.state.selectedTab === menuItem.screenName;
			return (
				<View style={style.menuItemContainer} key={index}>
					<TouchableWithoutFeedback onPress={() => this.handleTabChange(menuItem.screenName)}>
						<View style={style.imageContainer}>
							<Image
								source={menuItem.image}
								resizeMode={'contain'}
								style={[menuItem.style, {opacity: tabIsSelected ? 0 : 1}]}
							/>
							<Image
								source={menuItem.imageSelected}
								resizeMode={'contain'}
								style={[menuItem.style, style.imageSelected, {opacity: tabIsSelected ? 1 : 0}]}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
			);
		}
	}

	private handleTabChange = (screenName: string) => {
		if (this.state.selectedTab !== screenName) {
			this.props.navigation.navigate(screenName);
			this.setState({
				selectedTab: screenName,
			});
		}
	}

	private showPhotoOptionsMenu = () => {
		ActionSheet.show(
			{
				options: [PICK_FROM_GALLERY, TAKE_A_PHOTO, CANCEL],
				cancelButtonIndex: 2,
				title: ACTION_SHEET_TITLE,
			},
			(buttonIndex: number) => {
				switch (buttonIndex) {
					case 0:
						this.showGalleryPhotoPicker();
						break;
					case 1:
						this.takeCameraPhoto();
						break;
				}
			},
		);
	}

	private showGalleryPhotoPicker = async () => {
		const image: PickerImage | PickerImage[] = await ImagePicker.openPicker({
			cropping: false,
			mediaType: 'any',
		});
		this.useSelectedMediaObject(image as PickerImage);
	}

	private takeCameraPhoto = async () => {
		const image: PickerImage | PickerImage[] = await ImagePicker.openCamera({
			cropping: false,
			mediaType: 'any',
		});
		this.useSelectedMediaObject(image as PickerImage);
	}

	private useSelectedMediaObject = async (retMedia: PickerImage) => {
		try {
			let contentOptimizedpath = null;
			if (retMedia.mime.startsWith(MediaTypes.Image)) {
				const optimized = await ImageResizer.createResizedImage(
					retMedia.path,
					retMedia.width,
					retMedia.height,
					'JPEG',
					50,
				);
				contentOptimizedpath = optimized.path;
			}
			const image: any = {
				...retMedia,
				contentOptimizedpath,
				type: retMedia.mime,
				pathx: retMedia.path.replace('file://', ''),
			};
			this.props.navigation.navigate('PhotoScreen', {mediaObject: image});
		} catch (ex) {
			//
		}
	}
}

const MapDispatchToProps = (dispatch: any) => ({
	TabBarBottomHeight: (height: number) => dispatch(updateTabBarBottomHeight(height)),
});

export const TabBarBottom = connect(null, MapDispatchToProps)(TabBarBottomComponent as any);
