import React from 'react';
import {Image, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as mime from 'react-native-mime-types';
import {MediaTypes} from 'types';
import {IVideoOptions, VideoPlayer} from '../../Interaction/VideoPlayer';

export interface IMediaObjectViewerProps extends IVideoOptions {
	uri: string;
	style: number;
	resizeMode?: string | FastImage.ResizeMode;
	extension?: string;
}

export const MediaObjectViewer: React.SFC<IMediaObjectViewerProps> = (props) => {
	const getMimeType = () => {
		return props.extension ? mime.lookup('.' + props.extension) : mime.lookup(props.uri);
	};

	const renderForMediaType = () => {
		let ret = null;
		const mediaMimeType = getMimeType();
		if (!mediaMimeType) {
			ret = <Text>{'Unsupported media type or type detection failed'}</Text>;
		} else if (mediaMimeType.startsWith(MediaTypes.Image)) {
			ret = <FastImage {...props} source={{uri: props.uri}} resizeMode={props.resizeMode as FastImage.ResizeMode} />;
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
