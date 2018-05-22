import {ActionSheet} from 'native-base';
import React, {Component} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import ImagePicker, {Image as PickerImage} from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import {LayoutEvent, NavigationScreenProp} from 'react-navigation';
import {Icons, Sizes} from 'theme';
import style from './style';

import {updateTabBarBottomHeight} from 'backend/actions';
import {getMyNotificationsHoc} from 'backend/graphql';
import {connect} from 'react-redux';
import {IAppUIStateProps, MediaTypeImage, WallPostPhotoOptimized} from 'types';

export enum MENU_BUTTON_TYPE {
	MENU_BUTTON_SIMPLE = 'MENU_BUTTON_SIMPLE',
	MENU_BUTTON_CAMERA = 'MENU_BUTTON_CAMERA',
	MENU_BUTTON_NOTIFICATIONS = 'MENU_BUTTON_NOTIFICATIONS',
}

interface TabMenuItem {
	screenName?: string;
	image: number;
	imageSelected?: number;
	style: {
		width: number;
		height: number;
	};
	type: MENU_BUTTON_TYPE;
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
		type: MENU_BUTTON_TYPE.MENU_BUTTON_SIMPLE,
	},
	{
		screenName: 'SearchTab',
		image: Icons.iconTabBarSearch,
		imageSelected: Icons.iconTabBarSearchSelected,
		style: {
			width: Sizes.smartHorizontalScale(17),
			height: Sizes.smartHorizontalScale(17),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_SIMPLE,
	},
	{
		image: Icons.iconTabBarPhoto,
		style: {
			width: Sizes.smartHorizontalScale(22),
			height: Sizes.smartHorizontalScale(18),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_CAMERA,
	},
	{
		screenName: 'NotificationsTab',
		image: Icons.iconTabBarNotifications,
		imageSelected: Icons.iconTabBarNotificationsSelected,
		style: {
			width: Sizes.smartHorizontalScale(20),
			height: Sizes.smartHorizontalScale(16),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_NOTIFICATIONS,
	},
	{
		screenName: 'MyProfileTab',
		image: Icons.iconTabBarProfile,
		imageSelected: Icons.iconTabBarProfileSelected,
		style: {
			width: Sizes.smartHorizontalScale(16),
			height: Sizes.smartHorizontalScale(18),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_SIMPLE,
	},
];

interface ITabBarBottomState {
	selectedTab: string;
}

interface ITabBarBottomProps extends IAppUIStateProps {
	navigation: NavigationScreenProp<any>;
	TabBarBottomHeight: (height: number) => void;
	notifications: any;
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
		if (menuItem.type === MENU_BUTTON_TYPE.MENU_BUTTON_CAMERA) {
			return (
				<View style={style.menuItemContainer} key={index}>
					<TouchableOpacity onPress={this.showPhotoOptionsMenu}>
						<View style={style.imageContainer}>
							<Image source={menuItem.image} resizeMode={'contain'} style={menuItem.style} />
						</View>
					</TouchableOpacity>
				</View>
			);
		} else if (menuItem.type === MENU_BUTTON_TYPE.MENU_BUTTON_NOTIFICATIONS) {
			return (
				<View style={style.menuItemContainer} key={index}>
					{this.renderNotificationsIconWithBadge(menuItem)}
				</View>
			);
		} else {
			return (
				<View style={style.menuItemContainer} key={index}>
					{this.renderSimpleTabButton(menuItem)}
				</View>
			);
		}
	}

	private renderSimpleTabButton = (menuItem: TabMenuItem) => {
		const tabIsSelected = this.state.selectedTab === menuItem.screenName;
		return (
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
		);
	}

	private renderNotificationsIconWithBadge = (menuItem: TabMenuItem) => {
		const {notifications} = this.props;
		const {myNotifications, loading} = notifications;

		const notificationsRender = () =>
			myNotifications.length > 0 && (
				<View style={style.badgeBackground}>
					<Text style={style.notificationBadge}>{myNotifications.length.toString()}</Text>
				</View>
			);

		return (
			<View style={style.notificationsContainer}>
				{this.renderSimpleTabButton(menuItem)}
				{!loading && notificationsRender()}
			</View>
		);
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

	// TODO: show the user that he has excceded the maximum file size
	private checkFileSize = (mediaOb: any): boolean => mediaOb.size < 50000;

	private showGalleryPhotoPicker = async () => {
		try {
			const image: PickerImage | PickerImage[] = await ImagePicker.openPicker({
				cropping: false,
				mediaType: 'any',
			});
			this.useSelectedMediaObject(image as PickerImage);
		} catch (ex) {
			console.log(ex);
		}
	}

	private takeCameraPhoto = async () => {
		try {
			const image: PickerImage | PickerImage[] = await ImagePicker.openCamera({
				cropping: false,
				mediaType: 'any',
			});
			this.useSelectedMediaObject(image as PickerImage);
		} catch (ex) {
			console.log(ex);
		}
	}

	private useSelectedMediaObject = async (retMedia: PickerImage) => {
		try {
			let contentOptimizedPath;
			if (retMedia.mime.startsWith(MediaTypeImage.key)) {
				const optimized = await ImageResizer.createResizedImage(
					retMedia.path,
					retMedia.width,
					retMedia.height,
					'JPEG',
					50,
				);
				contentOptimizedPath = optimized.path;
			}
			const mediaObject: WallPostPhotoOptimized = {
				...retMedia,
				contentOptimizedPath,
				type: retMedia.mime,
				pathx: retMedia.path.replace('file://', ''),
			};
			this.props.navigation.navigate('PhotoScreen', {mediaObject});
		} catch (ex) {
			//
		}
	}
}

const MapDispatchToProps = (dispatch: any) => ({
	TabBarBottomHeight: (height: number) => dispatch(updateTabBarBottomHeight(height)),
});

const mapStateToProps: any = (state: any): IAppUIStateProps => ({
	...state.appUI,
});

const notificationsWrapper = getMyNotificationsHoc(TabBarBottomComponent);

export const TabBarBottom = connect(mapStateToProps, MapDispatchToProps)(notificationsWrapper);
