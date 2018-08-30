import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Colors, Sizes} from 'theme';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

const NoPhotosComponent: React.SFC<IWithTranslationProps> = ({getText}) => (
	<View style={style.noPhotosContainer}>
		<Icon name={'th'} size={Sizes.smartHorizontalScale(120)} color={Colors.geyser} />
		<Text style={style.noPhotosText}>{getText('user.profile.screen.empty.gallery')}</Text>
	</View>
);

export const NoPhotos = withTranslations(NoPhotosComponent as any);
