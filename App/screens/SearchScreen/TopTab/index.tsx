import React from 'react';

import {Suggested} from '../Components';
import styles from './style';

const MOCK_SUGGESTED = [
	{
		userId: '101',
		name: 'test user 1',
		username: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '102',
		name: 'test user 2',
		username: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
	{
		userId: '103',
		name: 'test user 3',
		username: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '104',
		name: 'test user 4',
		username: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: true,
	},
	{
		userId: '105',
		name: 'test user 5',
		username: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
	{
		userId: '106',
		name: 'test user 6',
		username: 'testname',
		avatarURL: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png',
		friend: false,
	},
];

interface ITopTabProps {
	items: object[];
}

export const TopTab: React.SFC<ITopTabProps> = () => <Suggested items={MOCK_SUGGESTED} />;
