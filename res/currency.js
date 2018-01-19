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
	date: '2018-01-17',
	rates: {
		AUD: 1.5314,
		BGN: 1.9558,
		BRL: 3.9497,
		CAD: 1.5185,
		CHF: 1.1774,
		CNY: 7.8528,
		CZK: 25.447,
		DKK: 7.4469,
		GBP: 0.88568,
		HKD: 9.5415,
		HRK: 7.4266,
		HUF: 308.77,
		IDR: 16302.0,
		ILS: 4.2171,
		INR: 78.011,
		JPY: 135.21,
		KRW: 1303.6,
		MXN: 22.939,
		MYR: 4.834,
		NOK: 9.622,
		NZD: 1.68,
		PHP: 62.017,
		PLN: 4.1713,
		RON: 4.6571,
		RUB: 69.386,
		SEK: 9.8425,
		SGD: 1.6153,
		THB: 39.001,
		TRY: 4.6654,
		USD: 1.2203,
		ZAR: 15.052
	}
});

math.import({
	updateCurrencies: loadData
});

})();