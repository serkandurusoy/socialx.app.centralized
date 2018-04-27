import {number, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';

import React from 'react';
import {ProfileStatistics} from 'components/Displayers';
import {Colors} from 'theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

storiesOf('ProfileStatistics', module)
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const numberOfPhotos = number('Title', 298);
		const numberOfLikes = number('Title', 976);
		const numberOfFollowers = number('Title', 902567);
		const numberOfFollowing = number('Title', 32);
		return (
			<ProfileStatistics
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFollowers={numberOfFollowers}
				numberOfFollowing={numberOfFollowing}
			/>
		);
	});
