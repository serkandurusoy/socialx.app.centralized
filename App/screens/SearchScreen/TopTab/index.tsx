import React from 'react';

import {Suggested} from '../Components';
import styles from './style';

import {MOCK_SUGGESTED} from 'utilities';

interface ITopTabProps {
	items: object[];
}

export const TopTab: React.SFC<ITopTabProps> = () => <Suggested items={MOCK_SUGGESTED} />;
