import {OS_TYPES} from 'consts';
import React from 'react';
import {
	ActivityIndicator,
	Platform,
	StyleProp,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {Colors} from 'theme';
import style from './style';

export interface IVideoOptions {
	containerStyle?: StyleProp<ViewStyle>;
	muted?: boolean;
	thumbOnly?: boolean;
	startInFullScreen?: boolean;
	resizeMode?: string;
	resizeToChangeAspectRatio?: boolean;
	paused?: boolean;
}

interface IVideoPlayerProps extends IVideoOptions {
	videoURL: string;
}

interface IVideoPlayerState {
	paused: boolean;
	userPaused: boolean;
	muted: boolean;
	ended: boolean;
	resizeMode?: string;
	playReady: boolean;
}

export class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
	public static getDerivedStateFromProps(
		nextProps: Readonly<IVideoPlayerProps>,
		prevState: Readonly<IVideoPlayerState>,
	) {
		if ('paused' in nextProps && nextProps.paused !== prevState.paused && !prevState.userPaused) {
			return {
				paused: nextProps.paused,
			};
		}
		return null;
	}

	private static defaultProps: Partial<IVideoPlayerProps> = {
		containerStyle: style.container,
		muted: false,
		thumbOnly: false,
		startInFullScreen: false,
		resizeMode: 'cover',
		resizeToChangeAspectRatio: false,
	};

	private player: Video | null = null;
	private androidOneTimeHackDone = false;

	constructor(props: IVideoPlayerProps) {
		super(props);
		let pausedInitValue = 'paused' in props ? props.paused : true;
		if (Platform.OS === OS_TYPES.Android) {
			pausedInitValue = false;
		}
		this.state = {
			paused: pausedInitValue,
			userPaused: false,
			muted: this.props.muted,
			ended: false,
			resizeMode: this.props.resizeMode,
			playReady: false,
		};
	}

	public render() {
		return (
			<TouchableWithoutFeedback onPress={this.onVideoPlayPause} disabled={this.props.thumbOnly}>
				<View style={this.props.containerStyle}>
					<Video
						onReadyForDisplay={this.videoReadyHandler}
						// poster='https://baconmockup.com/300/200/'
						source={{uri: this.props.videoURL}}
						resizeMode={this.state.resizeMode}
						paused={this.state.paused}
						muted={this.state.muted}
						onEnd={this.onVideoEndHandler}
						onProgress={this.onVideoProgressHandler}
						playInBackground={false}
						playWhenInactive={false}
						style={style.videoObject}
						ref={(ref) => (this.player = ref)}
					/>
					{this.renderVideoControls()}
				</View>
			</TouchableWithoutFeedback>
		);
	}

	private onVideoProgressHandler = (data: {currentTime: number; playableDuration: number}) => {
		if (Platform.OS === OS_TYPES.Android && !this.androidOneTimeHackDone) {
			this.androidOneTimeHackDone = true;
			const updatedState: Partial<IVideoPlayerState> = {
				playReady: true,
			};
			if (!('paused' in this.props) || this.props.paused) {
				updatedState.paused = true;
			}
			this.setState(updatedState);
		}
	}

	private videoReadyHandler = () => {
		this.setState({
			playReady: true,
		});
	}

	private renderVideoControls = () => {
		if (this.state.playReady) {
			if (!this.props.thumbOnly) {
				const muteIcon = this.state.muted ? 'md-volume-off' : 'md-volume-up';
				const showPlayButton = this.state.paused || this.state.ended;
				return (
					<View style={style.controlsView}>
						{showPlayButton && (
							<TouchableOpacity onPress={this.onVideoPlayStart}>
								<Icon name={'md-play'} style={style.playIcon} />
							</TouchableOpacity>
						)}
						<TouchableOpacity style={style.muteButton} onPress={this.onVideoMuteToggle}>
							<Icon name={muteIcon} style={style.smallControlIcon} />
						</TouchableOpacity>
						{(this.props.resizeToChangeAspectRatio || Platform.OS === OS_TYPES.IOS) && (
							<TouchableOpacity style={style.resizeButton} onPress={this.onVideoEnterFullScreen}>
								<Icon name={'md-resize'} style={style.smallControlIcon} />
							</TouchableOpacity>
						)}
					</View>
				);
			}
			return (
				<View style={style.thumbOverlay}>
					<Icon name={'md-videocam'} style={style.thumbVideoIcon} />
				</View>
			);
		}
		return (
			<View style={style.controlsView}>
				<ActivityIndicator size='large' color={Colors.pink} />
			</View>
		);
	}

	private onVideoPlayStart = () => {
		if (this.state.ended && this.player) {
			this.player.seek(0);
		}
		if (this.props.startInFullScreen) {
			if (this.player) {
				this.player.presentFullscreenPlayer();
			}
		}
		this.setState({
			paused: false,
			ended: false,
			userPaused: false,
		});
	}

	private onVideoPlayPause = () => {
		this.setState({
			paused: true,
			userPaused: true,
		});
	}

	private onVideoMuteToggle = () => {
		this.setState({
			muted: !this.state.muted,
		});
	}

	private onVideoEndHandler = () => {
		this.setState({
			ended: true,
		});
	}

	private onVideoEnterFullScreen = () => {
		if (this.player) {
			if (this.props.resizeToChangeAspectRatio) {
				const resizeMode = this.state.resizeMode === 'cover' ? 'contain' : 'cover';
				this.setState({resizeMode});
			} else {
				this.player.presentFullscreenPlayer();
			}
		}
	}
}
