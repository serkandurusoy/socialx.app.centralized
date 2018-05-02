import React from 'react';
import {StyleProp, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import style from './style';

export interface IVideoOptions {
	containerStyle?: StyleProp<ViewStyle>;
	autoplay?: boolean;
	muted?: boolean;
	thumbOnly?: boolean;
	startInFullScreen?: boolean;
	resizeMode?: string;
}

interface IVideoPlayerProps extends IVideoOptions {
	videoURL: string;
}

interface IVideoPlayerState {
	paused: boolean;
	muted: boolean;
	ended: boolean;
}

export class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
	private static defaultProps: Partial<IVideoPlayerProps> = {
		containerStyle: style.container,
		autoplay: false,
		muted: false,
		thumbOnly: false,
		startInFullScreen: false,
		resizeMode: 'cover',
	};

	public state = {
		paused: !this.props.autoplay,
		muted: this.props.muted,
		ended: false,
	};

	private player: Video | null = null;

	public render() {
		return (
			<TouchableWithoutFeedback onPress={this.onVideoPlayPause} disabled={this.props.thumbOnly}>
				<View style={this.props.containerStyle}>
					<Video
						source={{uri: this.props.videoURL}}
						resizeMode={this.props.resizeMode}
						paused={this.state.paused}
						muted={this.state.muted}
						onEnd={this.onVideoEndHandler}
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

	private renderVideoControls = () => {
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
					<TouchableOpacity style={style.resizeButton} onPress={this.onVideoEnterFullScreen}>
						<Icon name={'md-resize'} style={style.smallControlIcon} />
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<View style={style.thumbOverlay}>
				<Icon name={'md-videocam'} style={style.thumbVideoIcon} />
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
		});
	}

	private onVideoPlayPause = () => {
		this.setState({
			paused: true,
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
			this.player.presentFullscreenPlayer();
		}
	}
}
