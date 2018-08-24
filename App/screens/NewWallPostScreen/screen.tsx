import React from 'react';
import {
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

import {ButtonSizes, MediaHorizontalScroller, SharePostInput, SXButton} from 'components';
import {OS_TYPES} from 'consts';
import {IWithResizeOnKeyboardShowProps, withResizeOnKeyboardShow} from 'hoc';
import {Colors, Icons, Sizes} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

interface INewWallPostScreenComponentProps extends IWithResizeOnKeyboardShowProps, IWithTranslationProps {
	avatarImage: ImageSourcePropType;
	shareText: string;
	mediaObjects: string[];
	uploadProgress: number;
	onShareTextUpdate: (value: string) => void;
	onAddMedia: () => void;
	onPostSend: () => void;
}

const NewWallPostScreenComponentInt: React.SFC<INewWallPostScreenComponentProps> = ({
	avatarImage,
	shareText,
	onShareTextUpdate,
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
			<TouchableOpacity style={style.addMediaButton} onPress={onAddMedia}>
				<Image source={Icons.iconNewPostAddMedia} style={style.photoIcon} resizeMode={'contain'} />
				<Text style={style.addMediaText}>{getText('new.wall.post.screen.attach.media.button')}</Text>
			</TouchableOpacity>
			{mediaObjects.length > 0 && (
				<View style={style.mediaContainer}>
					<MediaHorizontalScroller mediaURIs={mediaObjects} />
				</View>
			)}
			<SXButton
				label={getText('new.wall.post.screen.send.button')}
				size={ButtonSizes.Small}
				width={Sizes.smartHorizontalScale(100)}
				onPress={onPostSend}
				borderColor={Colors.transparent}
			/>
		</ScrollView>
	</SafeAreaView>
);

export const NewWallPostScreenComponent = compose(
	withResizeOnKeyboardShow,
	withTranslations,
)(NewWallPostScreenComponentInt as any);
