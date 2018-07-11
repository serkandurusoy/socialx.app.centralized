import {boolean, number, text, withKnobs} from '@storybook/addon-knobs/react';
import {storiesOf} from '@storybook/react-native';
import React from 'react';

import {MediaInfoModal} from 'components/Modals';
import {MediaTypeVideo} from 'types';

storiesOf('MediaInfoModal', module)
	.addDecorator(withKnobs)
	.add('with editable props', () => {
		const visible = boolean('Visible', true);
		const mediaHash = text('Media Hash', 'QmaEy1GQb1zs7W6CgofNa85WYoihHvW5WWFud1UFM57gJD');
		const mediaSize = number('Media Size', 149852000);
		const mediaName = text('Media Name', 'Test image here');
		const mediaURL = text('Media URL', 'https://ipfs.infura.io/ipfs/QmaEy1GQb1zs7W6CgofNa85WYoihHvW5WWFud1UFM57gJD');
		return (
			<MediaInfoModal
				visible={visible}
				mediaHash={mediaHash}
				mediaSize={mediaSize}
				mediaType={MediaTypeVideo}
				mediaName={mediaName}
				mediaURL={mediaURL}
			/>
		);
	});
