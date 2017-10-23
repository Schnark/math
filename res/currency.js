/*global math*/
(function () {
"use strict";

function initCurrencies (data) {
	var currencies = {}, c;

	data = data.rates;
	for (c in data) {
		if (typeof data[c] === 'number') {
			currencies[c] = {
				definition: (1 / data[c]) + ' EUR'
			};
		}
	}

	math.createUnit(currencies, {
		override: true
	});
}

function loadData () {
	var url = 'https://api.fixer.io/latest?callback=globalApiCallback', script;
	window.globalApiCallback = initCurrencies;
	script = document.createElement('script');
	script.src = url;
	document.head.appendChild(script);
}

math.createUnit({EUR: {}});

initCurrencies({
	base: 'EUR',
	date: '2017-10-17',
	rates: {
		AUD: 1.4994,
		BGN: 1.9558,
		BRL: 3.7358,
		CAD: 1.4741,
		CHF: 1.1504,
		CNY: 7.7846,
		CZK: 25.733,
		DKK: 7.4439,
		GBP: 0.89148,
		HKD: 9.1811,
		HRK: 7.508,
		HUF: 307.35,
		IDR: 15880,
		ILS: 4.1274,
		INR: 76.47,
		JPY: 131.94,
		KRW: 1328.1,
		MXN: 22.433,
		MYR: 4.9664,
		NOK: 9.326,
		NZD: 1.6375,
		PHP: 60.368,
		PLN: 4.2298,
		RON: 4.58,
		RUB: 67.471,
		SEK: 9.5813,
		SGD: 1.5952,
		THB: 38.946,
		TRY: 4.3051,
		USD: 1.1759,
		ZAR: 15.798
	}
});

math.import({
	updateCurrencies: loadData
});

})();