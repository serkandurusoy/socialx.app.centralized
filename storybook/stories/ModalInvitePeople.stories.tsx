import {boolean, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {ModalInvitePeople} from '../../App/components/Modals';
import {Colors} from '../../App/theme';
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
