import {boolean, select, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import invert from 'lodash/invert';
import React from 'react';
import {SearchResultEntry} from '../../App/components/SearchResultEntry';
import {SearchResultKind} from '../../App/screens/SearchScreen';
import {Colors} from '../../App/theme';
import CenterView from '../CenterView';

const containerStyle = {
	backgroundColor: Colors.white,
	paddingHorizontal: 0,
};

storiesOf('SearchResultEntry')
	.addDecorator((getStory: any) => <CenterView style={containerStyle}>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const avatarURL = text(
			'Avatar URL',
			'https://www.exclutips.com/wp-content/uploads/2015/08/wordpress-custom-user-avatar.png',
		);
		const fullName = text('Full name', 'Teresa Lamb');
		const username = text('Username', 'terlamb');
		const entryTypes = invert(JSON.parse(JSON.stringify(SearchResultKind)));
		const kind = select('Kind', entryTypes, SearchResultKind.Friend);
		return <SearchResultEntry avatarURL={avatarURL} fullName={fullName} username={username} kind={kind} />;
	});
