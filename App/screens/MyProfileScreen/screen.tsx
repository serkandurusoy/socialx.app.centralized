import {UserAvatar} from 'components/Avatar';
import {GridPhotos, ProfileStatistics} from 'components/Displayers';
import {IWithLoaderProps, withInlineLoader} from 'hoc/InlineLoader';
import React, {Component} from 'react';
import {Dimensions, RefreshControl, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationScreenProp} from 'react-navigation';
import {Colors, Metrics, Sizes} from 'theme';
import {IMediaProps} from 'types';
import {showToastMessage} from 'utilities';
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
	loadMorePhotosHandler: () => IMediaProps[];
	totalNumberOfPhotos: number;
	gridPageSize: number;
	getAllPhotos: IMediaProps[];
	navigation: NavigationScreenProp<any>;
	onRefresh: () => Promise<any>;
}

interface IIMyProfileScreenState {
	refreshing: boolean;
}

class MyProfileScreenComponent extends Component<IMyProfileScreenProps, IIMyProfileScreenState> {
	public state = {
		refreshing: false,
	};

	private scrollView: any;
	private isScrolled = false;

	public shouldComponentUpdate(nextProps: IMyProfileScreenProps, nextState: IIMyProfileScreenState) {
		if (this.props !== nextProps) {
			return true;
		} else if (this.state !== nextState) {
			return true;
		} else {
			return false;
		}
	}

	public render() {
		const gridPhotosStyles = [
			style.gridPhotosContainer,
			...(this.props.totalNumberOfPhotos > this.props.gridPageSize
				? [
						{
							height: SCREEN_HEIGHT - Metrics.navBarHeight,
						},
				  ]
				: []),
		];

		return (
			<View style={style.container}>
				<ScrollView
					scrollEnabled={true}
					contentContainerStyle={style.scrollContainer}
					showsVerticalScrollIndicator={false}
					ref={(ref: any) => (this.scrollView = ref)}
					refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.pageRefreshHandler} />}
				>
					<View style={style.topContainer}>
						<UserAvatar
							avatarURL={{uri: this.props.avatarURL}}
							fullName={this.props.fullName}
							username={this.props.username}
						/>
						<ProfileStatistics
							numberOfPhotos={this.props.numberOfPhotos}
							numberOfLikes={this.props.numberOfLikes}
							numberOfFollowers={this.props.numberOfFollowers}
							numberOfFollowing={this.props.numberOfFollowing}
						/>
					</View>
					{this.props.getAllPhotos.length === 0 ? (
						<View style={style.noPhotosContainer}>
							<Icon name={'th'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
							<Text style={style.noPhotosText}>{'Your photo gallery is empty.'}</Text>
						</View>
					) : (
						<View style={gridPhotosStyles}>
							<GridPhotos
								onScroll={this.scrollUpdated}
								loadMorePhotos={this.props.loadMorePhotosHandler}
								itemPressed={this.onPhotoPressHandler}
							/>
						</View>
					)}
				</ScrollView>
			</View>
		);
	}

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
			mediaObjects: this.props.getAllPhotos,
			startIndex: index,
		});
	};

	private pageRefreshHandler = async () => {
		this.setState({refreshing: true});
		try {
			await this.props.onRefresh();
		} catch (ex) {
			showToastMessage('Could not refresh your profile: ' + ex);
		}
		this.setState({refreshing: false});
	};
}

export default withInlineLoader(MyProfileScreenComponent);
