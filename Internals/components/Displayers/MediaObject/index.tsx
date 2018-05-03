import React from 'react';
import {Image, StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as mime from 'react-native-mime-types';
import {MediaTypes} from 'types';
import {IVideoOptions, VideoPlayer} from '../../Interaction/VideoPlayer';

export interface IMediaObjectViewerProps extends IVideoOptions {
	uri: string;
	style: StyleProp<ViewStyle>;
	resizeMode?: string | FastImage.ResizeMode;
	extension?: string;
	onPress?: () => void;
}

export const MediaObjectViewer: React.SFC<IMediaObjectViewerProps> = (props) => {
	const getMimeType = () => {
		if (mime.extensions[props.extension]) {
			return props.extension;
		} else if (props.extension) {
			return mime.lookup('.' + props.extension);
		}
		return mime.lookup(props.uri);
	};

	const renderForMediaType = () => {
		let ret = null;
		const mediaMimeType = getMimeType();
		if (!mediaMimeType) {
			ret = <Text>{'Unsupported media type or type detection failed'}</Text>;
		} else if (mediaMimeType.startsWith(MediaTypes.Image)) {
			ret = (
				<TouchableOpacity onPress={props.onPress} disabled={!props.onPress}>
					<FastImage {...props} source={{uri: props.uri}} resizeMode={props.resizeMode as FastImage.ResizeMode} />
				</TouchableOpacity>
			);
		} else if (mediaMimeType.startsWith(MediaTypes.Video)) {
			ret = <VideoPlayer videoURL={props.uri} containerStyle={props.style} {...props} />;
		}
		return ret;
	};

	return renderForMediaType();
};

MediaObjectViewer.defaultProps = {
	resizeMode: 'cover',
};
