import React from 'react';
import {Text, View} from 'react-native';

import {AvatarImage, ButtonSizes, IconButton, SXButton} from 'components';
import {Colors} from 'theme';
import {WithTranslations} from 'utilities';
import {ISuggestionCardItem} from '../index';
import styles from './style';

interface ISuggestionCardProps {
	item: ISuggestionCardItem;
	deleteCard: () => void;
}

export const SuggestionCard: React.SFC<ISuggestionCardProps> = ({item, deleteCard}) => (
	<WithTranslations>
		{({getText}) => (
			<View style={styles.container}>
				<AvatarImage image={{uri: item.avatarURL}} style={styles.avatar} />
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.reason}>Followed by placeholder</Text>
				<SXButton
					label={getText('button.add.friend')}
					size={ButtonSizes.Small}
					borderColor={Colors.pink}
					textColor={Colors.white}
					containerStyle={styles.buttonContainer}
					onPress={() => console.log('Add friend')}
				/>
				<View style={styles.iconContainer}>
					<IconButton iconSource='ios-close' iconType='io' onPress={deleteCard} iconStyle={styles.icon} />
				</View>
			</View>
		)}
	</WithTranslations>
);
