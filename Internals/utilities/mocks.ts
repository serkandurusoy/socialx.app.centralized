import {NOTIFICATION_TYPES} from 'types';

export const getRandomImage = (minSize = 100, maxSize = 200, type = 'any') => {
	const randomSize = minSize + Math.round(Math.random() * (maxSize - minSize));
	return `https://placeimg.com/${randomSize}/${randomSize}/${type}`;
};

export const SEARCH_RESULTS_TAG_FRIENDS = [
	{
		id: '0',
		fullName: 'Ionut Movila',
		location: 'Belgium',
		avatarURL: 'https://placeimg.com/100/100/people',
	},
	{
		id: '1',
		fullName: 'Teresa Lamb',
		location: 'Poland',
		avatarURL: 'https://placeimg.com/101/101/people',
	},
	{
		id: '2',
		fullName: 'Terosa McCarthy',
		location: 'Vietnam',
		avatarURL: 'https://placeimg.com/102/102/people',
	},
	{
		id: '3',
		fullName: 'Terosa McCarthy',
		location: 'Romania',
		avatarURL: 'https://placeimg.com/103/103/people',
	},
	{
		id: '4',
		fullName: 'Gregory Bates',
		location: 'Latvia',
		avatarURL: 'https://placeimg.com/104/104/people',
	},
	{
		id: '5',
		fullName: 'Patrick Mullins',
		location: 'Singapore',
		avatarURL: 'https://placeimg.com/105/105/people',
	},
];

export const SAMPLE_ACTIVITY_CARDS = [
	{
		type: NOTIFICATION_TYPES.RECENT_COMMENT,
		avatarURL: 'https://placeimg.com/150/150/tech',
		fullName: 'Seth Saunders',
		timestamp: new Date(2018, 2, 12, 5, 51, 23),
		wallPosts: [
			{
				postThumbURL: 'https://placeimg.com/140/140/nature',
				postId: '11',
			},
			{
				postThumbURL: 'https://placeimg.com/141/141/nature',
				postId: '22',
			},
			{
				postThumbURL: 'https://placeimg.com/142/142/nature',
				postId: '33',
			},
			{
				postThumbURL: 'https://placeimg.com/143/143/nature',
				postId: '44',
			},
			{
				postThumbURL: 'https://placeimg.com/144/144/nature',
				postId: '55',
			},
		],
	},
	{
		type: NOTIFICATION_TYPES.FRIEND_REQUEST,
		avatarURL: 'https://placeimg.com/151/151/people',
		fullName: 'Teresa Lamb',
		username: 'terlamb',
		requestId: '981326537',
	},
	{
		type: NOTIFICATION_TYPES.FRIEND_REQUEST_RESPONSE,
		avatarURL: 'https://placeimg.com/160/160/people',
		fullName: 'Teresa Lamb',
		username: 'terlamb',
		requestId: '981326538',
		text: 'Friend request accepted.',
	},
	{
		type: NOTIFICATION_TYPES.SUPER_LIKED,
		avatarURL: 'https://placeimg.com/152/152/tech',
		fullName: 'Cory Maxwell',
		timestamp: new Date(2018, 1, 24, 8, 23, 12),
		wallPosts: [
			{
				postThumbURL: 'https://placeimg.com/130/130/arch',
				postId: '130',
			},
			{
				postThumbURL: 'https://placeimg.com/131/131/arch',
				postId: '131',
			},
			{
				postThumbURL: 'https://placeimg.com/132/132/arch',
				postId: '132',
			},
			{
				postThumbURL: 'https://placeimg.com/133/133/arch',
				postId: '133',
			},
			{
				postThumbURL: 'https://placeimg.com/135/135/arch',
				postId: '134',
			},
		],
	},
	{
		type: NOTIFICATION_TYPES.GROUP_REQUEST,
		avatarURL: 'https://placeimg.com/150/150/tech',
		fullName: 'Claudia Kulmitzer',
		groupName: 'MfMJAkkAs2jLISYyv',
		requestId: '990325',
	},
];

export const SAMPLE_USER = {
	userId: '585832b2-3ce5-4924-b75c-81e18bbf46de',
	name: 'test user',
	username: 'testname',
	avatar: {
		id: '2a098fd6-03b2-4b88-9bbb-8356727b480f',
		hash: 'QmcPjeRF774dU5oMrF7j3ceuKJcwp8wKFwrdu74z6MnpsY',
		type: 'image/jpeg',
		size: 123,
	},
};

export const MOCK_COMMENTS = [
	{
		id: 'comment_id_1',
		owner: SAMPLE_USER,
		createdAt: new Date().getTime() / 1000 - 2000,
		text: 'Sample mock comment',
		likes: [SAMPLE_USER],
		comments: [],
	},
];

export const MOCK_SUGGESTED = [
	{
		userId: '101',
		name: 'test user 1',
		username: 'testname',
		avatar: {
			id: '2a098fd6-03b2-4b88-9bbb-8356727b480f',
			hash: 'QmcPjeRF774dU5oMrF7j3ceuKJcwp8wKFwrdu74z6MnpsY',
			type: 'image/jpeg',
			size: 123,
		},
	},
	{
		userId: '102',
		name: 'test user 2',
		username: 'testname',
		avatar: {
			id: '2a098fd6-03b2-4b88-9bbb-8356727b480f',
			hash: 'QmcPjeRF774dU5oMrF7j3ceuKJcwp8wKFwrdu74z6MnpsY',
			type: 'image/jpeg',
			size: 123,
		},
	},
	{
		userId: '103',
		name: 'test user 3',
		username: 'testname',
		avatar: {
			id: '2a098fd6-03b2-4b88-9bbb-8356727b480f',
			hash: 'QmcPjeRF774dU5oMrF7j3ceuKJcwp8wKFwrdu74z6MnpsY',
			type: 'image/jpeg',
			size: 123,
		},
	},
];

export const MOCK_RECENT = [
	{
		userId: '104',
		name: 'test user 4',
		username: 'testname',
		avatar: {
			id: '2a098fd6-03b2-4b88-9bbb-8356727b480f',
			hash: 'QmcPjeRF774dU5oMrF7j3ceuKJcwp8wKFwrdu74z6MnpsY',
			type: 'image/jpeg',
			size: 123,
		},
	},
	{
		userId: '105',
		name: 'test user 5',
		username: 'testname',
		avatar: {
			id: '2a098fd6-03b2-4b88-9bbb-8356727b480f',
			hash: 'QmcPjeRF774dU5oMrF7j3ceuKJcwp8wKFwrdu74z6MnpsY',
			type: 'image/jpeg',
			size: 123,
		},
	},
	{
		userId: '106',
		name: 'test user 6',
		username: 'testname',
		avatar: {
			id: '2a098fd6-03b2-4b88-9bbb-8356727b480f',
			hash: 'QmcPjeRF774dU5oMrF7j3ceuKJcwp8wKFwrdu74z6MnpsY',
			type: 'image/jpeg',
			size: 123,
		},
	},
];
