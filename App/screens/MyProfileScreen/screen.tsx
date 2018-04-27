import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import React, {Component} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationScreenProp} from 'react-navigation';
import {Colors, Metrics, Sizes} from 'theme';
import {Icons} from 'theme/Icons';
import {UserAvatar} from 'components/Avatar';
import {GridPhotos, ProfileStatistics} from 'components/Displayers';
import {TooltipDots} from 'components/Displayers/DotsWithTooltips';
import MediaViewerScreen from '../MediaViewerScreen';
import style from './style';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const GRID_PHOTOS_SCROLL_THRESHOLD = 150;

interface IMyProfileScreenProps extends IWithLoaderProps {
	numberOfPhotos: number;
	numberOfLikes: number;
	numberOfFollowers: number;
	numberOfFollowing: number;
	avatarURL: any;
	fullName: string;
	username?: string;
	loadMorePhotosHandler: () => void;
	totalNumberOfPhotos: number;
	gridPageSize: number;
	getAllPhotos: any[];
	navigation: NavigationScreenProp<any>;
}

class MyProfileScreenComponent extends Component<IMyProfileScreenProps, any> {
	private scrollView: any;
	private isScrolled = false;

	public render() {
		return <View style={style.container}>{this.renderWithLoading()}</View>;
	}

	private renderWithLoading = () => {
		return this.props.renderWithLoader(
			<ScrollView
				scrollEnabled={true}
				contentContainerStyle={style.scrollContainer}
				showsVerticalScrollIndicator={false}
				ref={(ref: any) => (this.scrollView = ref)}
			>
				<View style={style.topContainer}>
					<UserAvatar
						avatarURL={{uri: this.props.avatarURL}}
						fullName={this.props.fullName}
						username={this.props.username}
					/>
					<View style={style.dotsContainer}>
						<TooltipDots items={this.getTooltipItems()} />
					</View>
					<ProfileStatistics
						numberOfPhotos={this.props.numberOfPhotos}
						numberOfLikes={this.props.numberOfLikes}
						numberOfFollowers={this.props.numberOfFollowers}
						numberOfFollowing={this.props.numberOfFollowing}
					/>
				</View>
				{this.renderUserPhotoGallery()}
			</ScrollView>,
		);
	};

	private renderUserPhotoGallery = () => {
		if (this.props.getAllPhotos.length === 0) {
			return (
				<View style={style.noPhotosContainer}>
					<Icon name={'th'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
					<Text style={style.noPhotosText}>{'Your photo gallery is empty.'}</Text>
				</View>
			);
		}
		const gridPhotosStyles = [style.gridPhotosContainer];
		if (this.props.totalNumberOfPhotos > this.props.gridPageSize) {
			const recyclerHeight = SCREEN_HEIGHT - Metrics.navBarHeight;
			gridPhotosStyles.push({
				height: recyclerHeight,
			});
		}
		return (
			<View style={gridPhotosStyles}>
				<GridPhotos
					onScroll={this.scrollUpdated}
					loadMorePhotos={this.props.loadMorePhotosHandler}
					itemPressed={this.onPhotoPressHandler}
				/>
			</View>
		);
	};

	private scrollUpdated = (rawEvent: any, offsetX: number, offsetY: number) => {
		if (offsetY > GRID_PHOTOS_SCROLL_THRESHOLD && !this.isScrolled) {
			this.scrollView.scrollToEnd({animated: true});
			this.isScrolled = true;
		}
		if (offsetY <= 0 && this.isScrolled) {
			this.scrollView.scrollTo({x: 0, y: 0, animated: true});
			this.isScrolled = false;
		}
	};

	private onPhotoPressHandler = (index: number) => {
		this.props.navigation.navigate('MediaViewerScreen', {
			photos: this.props.getAllPhotos,
			startIndex: index,
		});
	};

	private getTooltipItems = () => {
		return [
			{
				label: 'Profile Analytics',
				icon: Icons.iconProfileAnalytics,
				actionHandler: this.goToProfileAnalyticsPage,
			},
			// {
			// 	label: 'Wallet',
			// 	icon: Icons.iconWallet2,
			// 	actionHandler: this.goToWalletActivityPage,
			// },
			{
				label: 'Settings',
				icon: Icons.iconSettingsGear,
				actionHandler: this.goToSettingsPage,
			},
		];
	};

	private goToProfileAnalyticsPage = () => {
		this.props.navigation.navigate('ProfileAnalyticsScreen');
	};

	private goToWalletActivityPage = () => {
		this.props.navigation.navigate('WalletActivityScreen');
	};

	private goToSettingsPage = () => {
		this.props.navigation.navigate('SettingsScreen');
	};
}

export default withInlineLoader(MyProfileScreenComponent);
