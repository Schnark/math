/*global math*/
(function () {
"use strict";

/*jshint quotmark: double*/
//jscs:disable
/*
var result = {}, eurjson;

eurjson = ;

['usd', 'chf', 'gbp', 'jpy', 'rub', 'cny', 'nok', 'sek', 'dkk', 'czk', 'hrk', 'huf', 'bgn', 'ron', 'pln', 'try', 'ils', 'aud', 'nzd', 'cad', 'hkd', 'sgd', 'inr', 'idr', 'thb', 'krw', 'myr', 'php', 'mxn', 'brl', 'zar'].forEach(function (code) {
	result[code] = {
		alphaCode: eurjson[code].alphaCode,
		rate: eurjson[code].rate
	};
});
console.log(JSON.stringify(result).replace(/\s+/g, ''));
*/
var cachedData = {"usd":{"alphaCode":"USD","rate":1.0633161492903},"chf":{"alphaCode":"CHF","rate":1.0307466212358},"gbp":{"alphaCode":"GBP","rate":0.84685022239526},"jpy":{"alphaCode":"JPY","rate":135.76423899755},"rub":{"alphaCode":"RUB","rate":65.841598995303},"cny":{"alphaCode":"CNY","rate":7.0787970890809},"nok":{"alphaCode":"NOK","rate":10.260065200882},"sek":{"alphaCode":"SEK","rate":10.488159104975},"dkk":{"alphaCode":"DKK","rate":7.422379529507},"czk":{"alphaCode":"CZK","rate":24.532758768893},"hrk":{"alphaCode":"HRK","rate":7.510482747323},"huf":{"alphaCode":"HUF","rate":381.05542888845},"bgn":{"alphaCode":"BGN","rate":1.9510249975852},"ron":{"alphaCode":"RON","rate":4.9356043403167},"pln":{"alphaCode":"PLN","rate":4.6096263364789},"try":{"alphaCode":"TRY","rate":16.851306050492},"ils":{"alphaCode":"ILS","rate":3.5665383240916},"aud":{"alphaCode":"AUD","rate":1.4978103246997},"nzd":{"alphaCode":"NZD","rate":1.6468836554306},"cad":{"alphaCode":"CAD","rate":1.3604492514248},"hkd":{"alphaCode":"HKD","rate":8.3456428812846},"sgd":{"alphaCode":"SGD","rate":1.4622937550283},"inr":{"alphaCode":"INR","rate":82.526096937619},"idr":{"alphaCode":"IDR","rate":15563.021481124},"thb":{"alphaCode":"THB","rate":36.359620860187},"krw":{"alphaCode":"KRW","rate":1344.4919134401},"myr":{"alphaCode":"MYR","rate":4.6580765343502},"php":{"alphaCode":"PHP","rate":55.55236076202},"mxn":{"alphaCode":"MXN","rate":21.081440500396},"brl":{"alphaCode":"BRL","rate":5.1821664378142},"zar":{"alphaCode":"ZAR","rate":16.745942384361}};
/*jshint quotmark: single*/
//jscs:enable

function initCurrencies (data) {
	var currencies = {}, c;

	for (c in data) {
		if (data[c] && data[c].alphaCode && typeof data[c].rate === 'number') {
			currencies[data[c].alphaCode] = {
				definition: (1 / data[c].rate) + ' EUR'
			};
		}
	}

	math.createUnit(currencies, {
		override: true
	});
}

function loadData () {
	var url = 'https://www.floatrates.com/daily/eur.json', xhr;
	xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.responseType = 'json';
	xhr.onload = function () {
		var response = xhr.response;
		if (typeof response === 'string') {
		//just in case the browser doesn't understand responseType = 'json'
			try {
				response = JSON.parse(response);
			} catch (e) {
				response = null;
			}
		}
		if (response) {
			initCurrencies(response);
		}
	};
	xhr.send();
}

math.createUnit({EUR: {}});

initCurrencies(cachedData);

math.import({
	updateCurrencies: loadData
});

})();