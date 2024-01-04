function findGreatestDiff(prices) {
	let greatestDiff = 0;
	let buyDay = -1;
	let sellDay = -1;

	for (let i = 0; i < prices.length; i++) {
		for (let j = prices.length; j >= 0; j--) {
			if (j <= i) {
				continue;
			}

			const diff = prices[j] - prices[i];
			if (diff > greatestDiff) {
				greatestDiff = diff;
				buyDay = i;
				sellDay = j;
			}
		}
	}

	return {
		buy: buyDay,
		sell: sellDay,
		profit: greatestDiff
	};
}

function findGreatestDiffSimplified(prices) {
	let greatestDiff = 0;
	let minPrice = prices[0];
	let minDay = 0;
	let buyDay = 0;
	let sellDay = 0;

	// In reality, we only need to go through the prices array once if we keep track of the minimum values
	const numPrices = prices.length;
	for (let i = 0; i < numPrices; i++) {
		const dayPrice = prices[i];

		const potentialProfit = dayPrice - minPrice;
		if (potentialProfit > greatestDiff) {
			// If the diff between our lowest known price so far and this day's price is bigger than our last find, mark it and its metadata as the new biggest
			greatestDiff = potentialProfit;
			sellDay = i;
			buyDay = minDay;
		}

		if (dayPrice < minPrice) {
			// Keep track of whenever we encounter a new lowest price so that we can compare that against future values
			minPrice = dayPrice;
			minDay = i;
		}
	}

	return {
		buy: buyDay,
		sell: sellDay,
		profit: greatestDiff
	};
}

console.log('Initial', findGreatestDiff([100, 180, 260, 310, 40, 535, 695]));
console.log('Initial', findGreatestDiff([20, 100, 1, 10]));
console.log('Initial', findGreatestDiff([100, 50, 1, 2]));

console.log('Simplified', findGreatestDiffSimplified([100, 180, 260, 310, 40, 535, 695]));
console.log('Simplified', findGreatestDiffSimplified([20, 100, 1, 10]));
console.log('Simplified', findGreatestDiffSimplified([100, 50, 1, 2]));
