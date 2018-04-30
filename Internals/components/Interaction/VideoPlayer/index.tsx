import React from 'react';
import {StyleProp, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import style from './style';

interface IVideoPlayerProps {
	videoURL: string;
	containerStyle?: StyleProp<ViewStyle>;
}

interface IVideoPlayerState {
	paused: boolean;
	muted: boolean;
	ended: boolean;
}

export class VideoPlayer extends React.Component<IVideoPlayerProps, IVideoPlayerState> {
	private static defaultProps: Partial<IVideoPlayerProps> = {
		containerStyle: style.container,
	};

	public state = {
		paused: true,
		muted: false,
		ended: false,
	};

	private player: Video | null = null;

	public render() {
		const muteIcon = this.state.muted ? 'md-volume-off' : 'md-volume-up';
		const showPlayButton = this.state.paused || this.state.ended;
		return (
			<TouchableWithoutFeedback onPress={this.onVideoPlayPause}>
				<View style={this.props.containerStyle}>
					<Video
						source={{uri: this.props.videoURL}}
						resizeMode={'cover'}
						paused={this.state.paused}
						muted={this.state.muted}
						onEnd={this.onVideoEndHandler}
						style={style.videoObject}
						ref={(ref) => (this.player = ref)}
					/>
					<View style={style.controlsView}>
						{showPlayButton && (
							<TouchableOpacity onPress={this.onVideoPlayStart}>
								<Icon name={'md-play'} style={style.playIcon} />
							</TouchableOpacity>
						)}
						<TouchableOpacity style={style.muteButton} onPress={this.onVideoMuteToggle}>
							<Icon name={muteIcon} style={style.muteIcon} />
						</TouchableOpacity>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	private onVideoPlayStart = () => {
		if (this.state.ended && this.player) {
			this.player.seek(0);
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
}
