import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import {ModalInvitePeople} from 'components/Modals';
import React from 'react';
import {Colors} from 'theme';
import SXBlurView from '../SXBlurView';

const containerStyle = {
	backgroundColor: Colors.white,
};

const createHandler = () => {
	alert('createHandler');
};

const cancelHandler = () => {
	alert('cancelHandler');
};

storiesOf('ModalInvitePeople', module)
	.addDecorator((getStory: any) => <SXBlurView style={containerStyle}>{getStory()}</SXBlurView>)
	.addDecorator(withKnobs)
	.add('sample', () => {
		return (
			<ModalInvitePeople
				visible={true}
				searchResults={[]}
				selectedUsers={[]}
				createHandler={createHandler}
				cancelHandler={cancelHandler}
			/>
		);
	});
