import React from 'react';
import {Image, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Colors, Icons} from '../../theme';
import {AvatarImage} from '../AvatarImage';
import {ButtonSizes, SXButton} from '../Button';
import style from './style';

const IN_ANIMATION_NAME = 'rotate';
const IN_ANIMATION_DURATION = 300;
const OUT_ANIMATION_NAME = 'fadeOutRight';
const OUT_ANIMATION_DURATION = 300;

export interface IGroupCreateSearchResultEntryProps {
	avatarURL?: string;
	fullName: string;
	location: string;
	selected: boolean;
	addHandler: () => void;
}

export const GroupCreateSearchResultEntry: React.SFC<IGroupCreateSearchResultEntryProps> = (props) => {
	let animatedButton: any = null;

	const renderIsFriend = () => {
		return (
			<Animatable.View
				animation={IN_ANIMATION_NAME}
				easing='ease-out'
				iterationCount={1}
				duration={IN_ANIMATION_DURATION}
			>
				<Image source={Icons.peopleSearchResultIsFriend} resizeMode={'contain'} style={style.isFiendIcon} />
			</Animatable.View>
		);
	};

	const addButtonPressedHandler = () => {
		animatedButton.animate(OUT_ANIMATION_NAME, OUT_ANIMATION_DURATION).then(() => {
			props.addHandler();
		});
	};

	const renderAddFriend = () => {
		return (
			<Animatable.View ref={(ref) => (animatedButton = ref)}>
				<SXButton
					label={'Add'}
					size={ButtonSizes.Small}
					autoWidth={true}
					borderColor={Colors.transparent}
					onPress={addButtonPressedHandler}
				/>
			</Animatable.View>
		);
	};

	const conditionalRendering = () => {
		return props.selected ? renderIsFriend() : renderAddFriend();
	};

	return (
		<View style={[style.container, props.selected ? style.containerSelected : {}]}>
			<View style={style.leftContainer}>
				<AvatarImage image={{uri: props.avatarURL}} style={style.avatarImage} />
				<View style={style.avatarNameContainer}>
					<Text style={style.fullName}>{props.fullName}</Text>
					<Text style={style.location}>{props.location}</Text>
				</View>
			</View>
			{conditionalRendering()}
		</View>
	);
};
