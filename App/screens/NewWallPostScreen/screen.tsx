import {ButtonSizes, MediaObjectViewer, SharePostInput, SXButton} from 'components';
import React from 'react';
import {
	ActivityIndicator,
	Image,
	ImageSourcePropType,
	Platform,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {compose} from 'recompose';

import {OS_TYPES} from 'consts';
import {IWithResizeOnKeyboardShowProps, withResizeOnKeyboardShow} from 'hoc';
import {Colors, Icons, Sizes} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import {MediaObject} from './index';
import style from './style';

interface INewWallPostScreenComponentProps extends IWithResizeOnKeyboardShowProps, IWithTranslationProps {
	avatarImage: ImageSourcePropType;
	shareText: string;
	isUploading: boolean;
	mediaObjects: MediaObject[];
	uploadProgress: number;
	onShareTextUpdate: (value: string) => void;
	onAddMedia: () => void;
	onPostSend: () => void;
}

const NewWallPostScreenComponentInt: React.SFC<INewWallPostScreenComponentProps> = ({
	avatarImage,
	shareText,
	onShareTextUpdate,
	isUploading,
	onAddMedia,
	onPostSend,
	mediaObjects,
	uploadProgress,
	marginBottom,
	getText,
}) => (
	<SafeAreaView style={[style.safeView, Platform.OS === OS_TYPES.IOS ? {paddingBottom: marginBottom} : {}]}>
		<ScrollView contentContainerStyle={style.container} keyboardShouldPersistTaps={'handled'}>
			<SharePostInput
				avatarSource={avatarImage}
				placeholder={getText('new.wall.post.screen.input.placeholder')}
				text={shareText}
				onTextUpdate={onShareTextUpdate}
			/>
			<TouchableOpacity style={style.addMediaButton} onPress={onAddMedia} disabled={isUploading}>
				<Image source={Icons.iconNewPostAddMedia} style={style.photoIcon} resizeMode={'contain'} />
				<Text style={style.addMediaText}>{getText('new.wall.post.screen.attach.media.button')}</Text>
			</TouchableOpacity>
			<ScrollView style={style.photosContainer} horizontal={true}>
				{[
					...mediaObjects.map((mediaObject: MediaObject, index) => (
						<MediaObjectViewer key={index} uri={mediaObject.path} style={style.mediaObject} thumbOnly={true} />
					)),
					...(isUploading
						? [
								<View key={mediaObjects.length} style={[style.mediaObject, style.mediaUploadingPlaceholder]}>
									<ActivityIndicator size={'large'} color={Colors.pink} />
									<Text style={style.progressText}>{uploadProgress + ' %'}</Text>
								</View>,
						  ]
						: []),
				]}
			</ScrollView>
			<SXButton
				label={getText('new.wall.post.screen.send.button')}
				size={ButtonSizes.Small}
				width={Sizes.smartHorizontalScale(100)}
				onPress={onPostSend}
				disabled={isUploading}
				borderColor={Colors.transparent}
			/>
		</ScrollView>
	</SafeAreaView>
);

export const NewWallPostScreenComponent = compose(
	withResizeOnKeyboardShow,
	withTranslations,
)(NewWallPostScreenComponentInt);
