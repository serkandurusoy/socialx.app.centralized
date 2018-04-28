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
