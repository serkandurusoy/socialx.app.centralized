import React from 'react';
import {Image, Platform, StyleProp, Text, TouchableOpacity, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as mime from 'react-native-mime-types';

import {IVideoOptions, VideoPlayer} from 'components';
import {OS_TYPES} from 'consts';
import {MediaTypeImage, MediaTypes, MediaTypeVideo} from 'types';
import style from './style';

export interface IMediaObjectViewerProps extends IVideoOptions {
	uri: string;
	style: StyleProp<ViewStyle>;
	resizeMode?: string | FastImage.ResizeMode;
	extension?: string;
	type?: MediaTypes;
	onPress?: () => void;
}

export const MediaObjectViewer: React.SFC<IMediaObjectViewerProps> = (props) => {
	const getMimeType = () => {
		if (props.type) {
			return props.type.key;
		} else if (mime.extensions[props.extension]) {
			return props.extension;
		} else if (props.extension) {
			return mime.lookup('.' + props.extension);
		}
		return mime.lookup(props.uri);
	};

	const ImageComponent = Platform.OS === OS_TYPES.Android && props.uri.startsWith('https://') ? FastImage : Image;

	const renderForMediaType = () => {
		let ret = null;
		const mediaMimeType = getMimeType();
		if (!mediaMimeType) {
			ret = <Text>{'Unsupported media type or type detection failed'}</Text>;
		} else if (mediaMimeType.startsWith(MediaTypeImage.key)) {
			ret = (
				<TouchableOpacity onPress={props.onPress} disabled={!props.onPress} style={props.style}>
					<ImageComponent
						source={{uri: props.uri}}
						resizeMode={props.resizeMode}
						style={style.photoStyle}
						resizeMethod={'resize'}
					/>
				</TouchableOpacity>
			);
		} else if (mediaMimeType.startsWith(MediaTypeVideo.key)) {
			ret = <VideoPlayer videoURL={props.uri} containerStyle={props.style} {...props} />;
		}
		return ret;
	};

	return renderForMediaType();
};

MediaObjectViewer.defaultProps = {
	resizeMode: 'cover',
};
