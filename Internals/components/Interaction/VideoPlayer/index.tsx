import React from 'react';
import {
	ActivityIndicator,
	Platform,
	StyleProp,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

import {OS_TYPES} from 'consts';
import {Colors} from 'theme';
import style from './style';

export interface IVideoOptions {
	containerStyle?: StyleProp<ViewStyle>;
	muted?: boolean;
	thumbOnly?: boolean;
	resizeMode?: string;
	resizeToChangeAspectRatio?: boolean;
	paused?: boolean;
}

interface IVideoPlayerProps extends IVideoOptions {
	videoURL: string;
	onPress?: () => void;
}

interface IVideoPlayerState {
	paused: boolean;
	userPaused: boolean;
	muted: boolean;
	ended: boolean;
	resizeMode?: string;
	playReady: boolean;
	fullscreen: boolean;
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
		resizeMode: 'cover',
		resizeToChangeAspectRatio: false,
	};

	private player: Video | null = null;

	constructor(props: IVideoPlayerProps) {
		super(props);
		const pausedInitValue = ('paused' in props ? props.paused : true) as boolean;
		this.state = {
			paused: pausedInitValue,
			userPaused: false,
			muted: this.props.muted || false,
			ended: false,
			resizeMode: this.props.resizeMode,
			playReady: false,
			fullscreen: false,
		};
	}

	public render() {
		const pressHandler = this.props.thumbOnly ? this.props.onPress : this.onVideoPlayPause;
		const touchDisabled = !pressHandler;
		return (
			<TouchableWithoutFeedback onPress={pressHandler} disabled={touchDisabled}>
				<View style={this.props.containerStyle}>
					<Video
						onReadyForDisplay={this.videoReadyHandler}
						// poster='https://baconmockup.com/300/200/'
						source={{uri: this.props.videoURL}}
						resizeMode={this.state.resizeMode}
						paused={this.state.paused}
						muted={this.state.muted}
						onEnd={this.onVideoEndHandler}
						playInBackground={false}
						playWhenInactive={false}
						style={style.videoObject}
						fullscreen={this.state.fullscreen}
						ref={(ref) => (this.player = ref)}
					/>
					{this.renderVideoControls()}
				</View>
			</TouchableWithoutFeedback>
		);
	}

	private videoReadyHandler = () => {
		// TODO: issue with local video files, see bug report:
		// https://github.com/react-native-community/react-native-video/issues/1195
		if (!this.state.playReady) {
			this.setState({
				playReady: true,
			});
		}
	};

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
	};

	private onVideoPlayStart = () => {
		if (this.state.ended && this.player) {
			this.player.seek(0);
		}
		this.setState({
			paused: false,
			ended: false,
			userPaused: false,
		});
	};

	private onVideoPlayPause = () => {
		this.setState({
			paused: true,
			userPaused: true,
		});
	};

	private onVideoMuteToggle = () => {
		this.setState({
			muted: !this.state.muted,
		});
	};

	private onVideoEndHandler = () => {
		this.setState({
			ended: true,
		});
	};

	private onVideoEnterFullScreen = () => {
		if (this.props.resizeToChangeAspectRatio) {
			const resizeMode = this.state.resizeMode === 'cover' ? 'contain' : 'cover';
			this.setState({resizeMode});
		} else {
			this.setState({
				fullscreen: true,
			});
		}
	};
}
