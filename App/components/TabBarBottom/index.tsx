import React, {Component} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {NavigationScreenProp} from 'react-navigation';
import {Icons, Sizes} from '../../theme';
import style from './style';

const MENU_ITEMS = [
	{
		screenName: 'UserFeedTab',
		image: Icons.iconTabBarHome,
		imageSelected: Icons.iconTabBarHomeSelected,
		style: {
			width: Sizes.smartHorizontalScale(20),
			height: Sizes.smartHorizontalScale(16),
		},
	},
	{
		screenName: 'SearchTab',
		image: Icons.iconTabBarSearch,
		imageSelected: Icons.iconTabBarSearchSelected,
		style: {
			width: Sizes.smartHorizontalScale(17),
			height: Sizes.smartHorizontalScale(17),
		},
	},
	{
		screenName: 'PhotoTab',
		image: Icons.iconTabBarPhoto,
		imageSelected: Icons.iconTabBarPhotoSelected,
		style: {
			width: Sizes.smartHorizontalScale(22),
			height: Sizes.smartHorizontalScale(18),
		},
	},
	{
		screenName: 'NotificationsTab',
		image: Icons.iconTabBarNotifications,
		imageSelected: Icons.iconTabBarNotificationsSelected,
		style: {
			width: Sizes.smartHorizontalScale(20),
			height: Sizes.smartHorizontalScale(16),
		},
	},
	{
		screenName: 'UserProfileTab',
		image: Icons.iconTabBarProfile,
		imageSelected: Icons.iconTabBarProfileSelected,
		style: {
			width: Sizes.smartHorizontalScale(16),
			height: Sizes.smartHorizontalScale(18),
		},
	},
];

interface ITabBarBottomState {
	selectedTab: string;
}

interface ITabBarBottomProps {
	navigation: NavigationScreenProp<any, any>;
}

export class TabBarBottom extends Component<ITabBarBottomProps, ITabBarBottomState> {
	public state = {
		selectedTab: MENU_ITEMS[0].screenName,
	};

	public render() {
		return (
			<View style={style.container}>
				{MENU_ITEMS.map((menuItem, index) => this.getMenuItemComponent(menuItem, index))}
			</View>
		);
	}

	private getMenuItemComponent = (menuItem: any, index: number) => {
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

	private handleTabChange = (screenName: string) => {
		if (this.state.selectedTab !== screenName) {
			this.props.navigation.navigate(screenName);
			this.setState({
				selectedTab: screenName,
			});
		}
	}
}
