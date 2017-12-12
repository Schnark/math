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
	date: '2017-12-08',
	rates: {
		AUD: 1.562,
		BGN: 1.9558,
		BRL: 3.8435,
		CAD: 1.5072,
		CHF: 1.1704,
		CNY: 7.7729,
		CZK: 25.555,
		DKK: 7.4417,
		GBP: 0.87525,
		HKD: 9.1661,
		HRK: 7.5493,
		HUF: 314.5,
		IDR: 15910.0,
		ILS: 4.1343,
		INR: 75.678,
		JPY: 133.26,
		KRW: 1285.3,
		MXN: 22.22,
		MYR: 4.8001,
		NOK: 9.7665,
		NZD: 1.7157,
		PHP: 59.336,
		PLN: 4.202,
		RON: 4.6336,
		RUB: 69.651,
		SEK: 9.977,
		SGD: 1.5889,
		THB: 38.361,
		TRY: 4.5165,
		USD: 1.1742,
		ZAR: 16.039
	}
});

math.import({
	updateCurrencies: loadData
});

})();