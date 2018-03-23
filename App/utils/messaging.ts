import emojiRegexCreator from 'emoji-regex';

const emojiRegex = emojiRegexCreator();

export const isStringPureEmoji = (text: string): boolean => {
	if (!text || !text.trim()) {
		return false;
	}
	return text.replace(emojiRegex, '').trim() === '';
};
