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
var cachedData = {"usd":{"alphaCode":"USD","rate":1.1432710464998},"chf":{"alphaCode":"CHF","rate":1.1402564287395},"gbp":{"alphaCode":"GBP","rate":0.87383217141055},"jpy":{"alphaCode":"JPY","rate":125.11849420532},"rub":{"alphaCode":"RUB","rate":75.409468734119},"cny":{"alphaCode":"CNY","rate":7.6777758164641},"nok":{"alphaCode":"NOK","rate":9.687085731572},"sek":{"alphaCode":"SEK","rate":10.379314837276},"dkk":{"alphaCode":"DKK","rate":7.4666366218172},"czk":{"alphaCode":"CZK","rate":25.811521507233},"hrk":{"alphaCode":"HRK","rate":7.4259046351812},"huf":{"alphaCode":"HUF","rate":318.75034675995},"bgn":{"alphaCode":"BGN","rate":1.9563655480244},"ron":{"alphaCode":"RON","rate":4.7564760144491},"pln":{"alphaCode":"PLN","rate":4.2946611605241},"try":{"alphaCode":"TRY","rate":6.0189018638437},"ils":{"alphaCode":"ILS","rate":4.1936994387268},"aud":{"alphaCode":"AUD","rate":1.5875413775784},"nzd":{"alphaCode":"NZD","rate":1.6712292172564},"cad":{"alphaCode":"CAD","rate":1.5107935997779},"hkd":{"alphaCode":"HKD","rate":8.9670835616352},"sgd":{"alphaCode":"SGD","rate":1.5443563378726},"inr":{"alphaCode":"INR","rate":81.458777394157},"idr":{"alphaCode":"IDR","rate":16205.294855736},"thb":{"alphaCode":"THB","rate":35.877242124511},"krw":{"alphaCode":"KRW","rate":1277.498467722},"myr":{"alphaCode":"MYR","rate":4.6959892574793},"php":{"alphaCode":"PHP","rate":59.794923350185},"mxn":{"alphaCode":"MXN","rate":21.870589894663},"brl":{"alphaCode":"BRL","rate":4.2422799597831},"zar":{"alphaCode":"ZAR","rate":15.510387604077}};
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