function findAnagrams(dictionary) {
	const newDict = {};

	// Grab a list of each word in the dictionary along with its potential anagrams
	const anaList = Object.keys(dictionary);
	for (const word of anaList) {
		const realAnagrams = [];

		// Break up the word by letters and find the number of occurrences of each letter in the word
		const letters = word.split('');
		const occurrences = {};
		letters.forEach((l) => {
			if (!occurrences[l]) {
				// No sense in doing the regex for repeating letters if we've already calculated it
				occurrences[l] = word.match(new RegExp(l, 'gi')).length;
			}
		});

		// Go through each potential anagram and analyze whether it has the correct number of occurrences and overall length
		anagramLoop: for (const anagram of dictionary[word]) {
			if (anagram.length !== letters.length) {
				// Word lengths don't match; obviously not real anagram
				continue;
			}

			// Potential anagram match because same number of letters
			for (l of letters) {
				if ((anagram.match(new RegExp(l, 'gi')) || []).length !== occurrences[l]) {
					continue anagramLoop;
				}
			}

			// This is a real anagram!
			realAnagrams.push(anagram);
		}

		if (realAnagrams.length) {
			newDict[word] = realAnagrams;
		}
	}

	return newDict;
}

// Simpler because it doesn't have to execute additional string searches through regex (or any other tool). It just alphabetizes each string and compares their values apples to apples.
function findAnagramsSimplified(dictionary) {
	const newDict = {};

	// Grab a list of each word in the dictionary along with its potential anagrams
	const anaList = Object.keys(dictionary);
	for (const word of anaList) {
		const realAnagrams = [];

		// Rearrange all letters in the target work alphabetically
		const wordAlphabetized = word.split('').sort().join('');

		for (const anagram of dictionary[word]) {
			// If they aren't the same length, then they're definitely not true anagrams
			if (anagram.length !== wordAlphabetized.length) {
				continue;
			}

			// Rearrange all letters in the potential anagram
			const anagramAlphabetized = anagram.split('').sort().join('');
			if (anagramAlphabetized !== wordAlphabetized) {
				// If the potential anagram doesn't match the alphabetized target word, then we also know it isn't a true anagram
				continue;
			}

			// Looks like it passed the test! It's a true anagram!
			realAnagrams.push(anagram);
		}

		if (realAnagrams.length > 0) {
			newDict[word] = realAnagrams;
		}
	}

	return newDict;
}

const scrambledDict = {
	listen: ['enlist', 'client', 'tinsel', 'inlets', 'instill', 'listant'],
	earth: ['haters', 'heart', 'hater'],
	bye: ['byc', 'eye', 'byt']
};

console.log('Initial attempt', findAnagrams(scrambledDict));
console.log('Simplified', findAnagramsSimplified(scrambledDict));
