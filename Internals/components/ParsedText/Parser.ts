class TextExtraction {
	/**
	 * @param {String} text - Text to be parsed
	 * @param {Object[]} patterns - Patterns to be used when parsed
	 *                              other options than pattern would be added to the parsed content
	 * @param {RegExp} patterns[].pattern - RegExp to be used for parsing
	 */
	private text: string;
	private patterns: any;

	constructor(text: string, patterns: any) {
		this.text = text;
		this.patterns = patterns || [];
	}

	/**
	 * Returns parts of the text with their own props
	 * @return {Object[]} - props for all the parts of the text
	 */
	public parse = () => {
		let parsedTexts = [{children: this.text}];
		this.patterns.forEach((pattern: any) => {
			const newParts: any = [];

			parsedTexts.forEach((parsedText: any) => {
				// Only allow for now one parsing
				if (parsedText._matched) {
					newParts.push(parsedText);

					return;
				}

				const parts = [];
				let textLeft = parsedText.children;

				while (textLeft) {
					const matches = new RegExp(pattern.pattern).exec(textLeft);

					if (!matches) {
						break;
					}

					const previousText = textLeft.substr(0, matches.index);

					parts.push({children: previousText});

					parts.push(this.getMatchedPart(pattern, matches[0], matches));

					textLeft = textLeft.substr(matches.index + matches[0].length);
				}

				parts.push({children: textLeft});

				newParts.push(...parts);
			});

			parsedTexts = newParts;
		});

		// Remove _matched key.
		parsedTexts.forEach((parsedText) => delete parsedText._matched);

		return parsedTexts.filter((t) => !!t.children);
	};

	/**
	 * @param {Object} matchedPattern - pattern configuration of the pattern used to match the text
	 * @param {RegExp} matchedPattern.pattern - pattern used to match the text
	 * @param {String} text - Text matching the pattern
	 * @param {String[]} text - Result of the RegExp.exec
	 * @return {Object} props for the matched text
	 */
	private getMatchedPart = (matchedPattern: any, text: string, matches: any) => {
		const props = {};

		Object.keys(matchedPattern).forEach((key) => {
			if (key === 'pattern' || key === 'renderText') {
				return;
			}

			if (typeof matchedPattern[key] === 'function') {
				props[key] = () => matchedPattern[key](text);
			} else {
				props[key] = matchedPattern[key];
			}
		});

		let children = text;
		if (matchedPattern.renderText && typeof matchedPattern.renderText === 'function') {
			children = matchedPattern.renderText(text, matches);
		}

		return {
			...props,
			children,
			_matched: true,
		};
	};
}

export default TextExtraction;
