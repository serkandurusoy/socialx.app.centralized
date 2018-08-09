import React from 'react';

import {Suggested} from '../Components';
import styles from './style';

import {MOCK_SUGGESTED} from 'utilities';

interface IPeopleTabProps {
	items: object[];
}

export const PeopleTab: React.SFC<IPeopleTabProps> = () => <Suggested items={MOCK_SUGGESTED} />;
