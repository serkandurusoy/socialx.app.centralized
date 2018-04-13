export const getRandomImage = (minSize = 100, maxSize = 200, type = 'any') => {
	const randomSize = minSize + Math.round(Math.random() * (maxSize - minSize));
	return `https://placeimg.com/${randomSize}/${randomSize}/${type}`;
};
