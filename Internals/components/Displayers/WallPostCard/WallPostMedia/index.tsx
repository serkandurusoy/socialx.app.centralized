import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {MediaObjectViewer} from 'components';
import {IMediaProps} from 'types';
import {getURLForMediaViewerObject} from 'utilities';
import style from './style';

interface IWallPostMediaProps {
	mediaObjects: IMediaProps[];
	onMediaObjectView?: (index: number) => void;
	noInteraction?: boolean;
}

export const WallPostMedia: React.SFC<IWallPostMediaProps> = (props) => {
	const {mediaObjects} = props;

	const getViewMediaProp = (index: number) => {
		return props.noInteraction ? {} : {onPress: () => viewMediaObjectAtIndex(index)};
	};

	const viewMediaObjectAtIndex = (index: number) => {
		if (props.onMediaObjectView) {
			props.onMediaObjectView(index);
		}
	};

	const renderSingleMediaPost = () => {
		const mediaProps = mediaObjects[0];
		const mediaURL = getURLForMediaViewerObject(mediaProps);
		return (
			<MediaObjectViewer
				{...getViewMediaProp(0)}
				thumbOnly={props.noInteraction}
				uri={mediaURL}
				style={style.postMediaContainerFullWidth}
				extension={mediaProps.type}
			/>
		);
	};

	const renderDualMediaPost = () => {
		const firstMediaURL = getURLForMediaViewerObject(mediaObjects[0]);
		const secondMediaURL = getURLForMediaViewerObject(mediaObjects[1]);
		return (
			<View style={style.postMediaContainerFullWidth}>
				<View style={style.fullHeightHalfWidth}>
					<MediaObjectViewer
						{...getViewMediaProp(0)}
						thumbOnly={true}
						uri={firstMediaURL}
						style={style.fullWidthHeight}
						extension={mediaObjects[0].type}
					/>
				</View>
				<View style={style.fullHeightHalfWidth}>
					<MediaObjectViewer
						{...getViewMediaProp(1)}
						thumbOnly={true}
						uri={secondMediaURL}
						style={style.fullWidthHeight}
						extension={mediaObjects[1].type}
					/>
				</View>
			</View>
		);
	};

	const renderMultiMediaPost = () => {
		const mediaURLs: string[] = [];
		mediaObjects.forEach((mediaObject) => {
			mediaURLs.push(getURLForMediaViewerObject(mediaObject));
		});
		const numberOfMoreMediaObjects = mediaObjects.length - 3;
		return (
			<View style={style.postMediaContainerFullWidth}>
				<View style={style.fullHeightHalfWidth}>
					<MediaObjectViewer
						{...getViewMediaProp(0)}
						thumbOnly={true}
						uri={mediaURLs[0]}
						style={style.fullWidthHeight}
						extension={mediaObjects[0].type}
					/>
				</View>
				<View style={style.fullHeightHalfWidth}>
					<MediaObjectViewer
						{...getViewMediaProp(1)}
						thumbOnly={true}
						uri={mediaURLs[1]}
						style={style.fullWidthHalfHeight}
						extension={mediaObjects[1].type}
					/>
					<TouchableOpacity style={style.fullWidthHalfHeight} {...getViewMediaProp(2)}>
						<MediaObjectViewer
							thumbOnly={true}
							uri={mediaURLs[2]}
							style={style.fullWidthHeight}
							extension={mediaObjects[2].type}
						/>
						{numberOfMoreMediaObjects > 0 && (
							<View style={style.moreOverlay}>
								<Text style={style.moreText}>{`+${numberOfMoreMediaObjects} more`}</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	if (mediaObjects.length > 2) {
		return renderMultiMediaPost();
	} else if (mediaObjects.length > 1) {
		return renderDualMediaPost();
	} else if (mediaObjects.length > 0) {
		return renderSingleMediaPost();
	}
	return null;
};
