import React from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

import {ButtonSizes, MediaObjectViewer, SXButton} from 'components';
import {Colors} from 'theme';
import {IMediaViewerObject} from 'types';
import {getTypePropsForMediaViewerObject, getURLForMediaViewerObject} from 'utilities';
import style from './style';

interface IGovernanceCardProps {
	mediaObject: IMediaViewerObject;
	upVotes: number;
	downVotes: number;
	onStartVote: () => void;
	onShowFullScreen: () => void;
}

export const GovernanceCard: React.SFC<IGovernanceCardProps> = (props: IGovernanceCardProps) => {
	const renderVotes = (votes: number, voteContainerColor: StyleProp<ViewStyle>) => {
		return (
			<View style={[style.voteContainer, voteContainerColor]}>
				<Text style={style.voteText}>{votes}</Text>
			</View>
		);
	};

	const mediaURL = getURLForMediaViewerObject(props.mediaObject);
	const mediaTypeProps = getTypePropsForMediaViewerObject(props.mediaObject);

	return (
		<View style={style.container}>
			<TouchableOpacity style={style.mediaObjectContainer} onPress={props.onShowFullScreen}>
				<MediaObjectViewer uri={mediaURL} {...mediaTypeProps} style={style.mediaObject} />
				<View style={style.votesContainer}>
					{renderVotes(props.upVotes, style.upVoteColor)}
					{renderVotes(props.downVotes, style.downVoteColor)}
				</View>
			</TouchableOpacity>
			<View style={style.buttonContainer}>
				<SXButton
					label={'vote'}
					size={ButtonSizes.Small}
					autoWidth={true}
					containerStyle={style.voteButton}
					borderColor={Colors.transparent}
					onPress={props.onStartVote}
				/>
			</View>
		</View>
	);
};
