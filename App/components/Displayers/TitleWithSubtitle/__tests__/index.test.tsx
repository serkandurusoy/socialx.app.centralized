import * as React from 'react';
import {TitleWithSubtitle} from '../index';

import * as renderer from 'react-test-renderer';

it('renderes correctly..', () => {
	const tree = renderer.create(<TitleWithSubtitle title='title' subtitle='subtitle' />).toJSON();
	expect(tree).toMatchSnapshot();
});
