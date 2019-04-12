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
var cachedData = {"usd":{"alphaCode":"USD","rate":1.127460859742},"chf":{"alphaCode":"CHF","rate":1.1285862413671},"gbp":{"alphaCode":"GBP","rate":0.8613388350525},"jpy":{"alphaCode":"JPY","rate":125.26342995338},"rub":{"alphaCode":"RUB","rate":72.854115709065},"cny":{"alphaCode":"CNY","rate":7.5724083524871},"nok":{"alphaCode":"NOK","rate":9.5867331197632},"sek":{"alphaCode":"SEK","rate":10.435636543346},"dkk":{"alphaCode":"DKK","rate":7.4624647869473},"czk":{"alphaCode":"CZK","rate":25.605066660908},"hrk":{"alphaCode":"HRK","rate":7.4226532787087},"huf":{"alphaCode":"HUF","rate":321.73968608761},"bgn":{"alphaCode":"BGN","rate":1.955177967959},"ron":{"alphaCode":"RON","rate":4.7590327713297},"pln":{"alphaCode":"PLN","rate":4.2861613702353},"try":{"alphaCode":"TRY","rate":6.4143451557475},"ils":{"alphaCode":"ILS","rate":4.033475416209},"aud":{"alphaCode":"AUD","rate":1.5772326804901},"nzd":{"alphaCode":"NZD","rate":1.6705060925813},"cad":{"alphaCode":"CAD","rate":1.502477787076},"hkd":{"alphaCode":"HKD","rate":8.8373269981077},"sgd":{"alphaCode":"SGD","rate":1.5256801506226},"inr":{"alphaCode":"INR","rate":77.966230892624},"idr":{"alphaCode":"IDR","rate":15975.71122873},"thb":{"alphaCode":"THB","rate":35.853033706218},"krw":{"alphaCode":"KRW","rate":1286.0217629109},"myr":{"alphaCode":"MYR","rate":4.6244912805213},"php":{"alphaCode":"PHP","rate":58.522533245828},"mxn":{"alphaCode":"MXN","rate":21.246449790602},"brl":{"alphaCode":"BRL","rate":4.3190135320925},"zar":{"alphaCode":"ZAR","rate":15.727840120437}};
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