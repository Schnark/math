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
var cachedData = {"usd":{"alphaCode":"USD","rate":1.150915966658},"chf":{"alphaCode":"CHF","rate":1.1414918431962},"gbp":{"alphaCode":"GBP","rate":0.87369868927799},"jpy":{"alphaCode":"JPY","rate":130.01454244776},"rub":{"alphaCode":"RUB","rate":76.347011097285},"cny":{"alphaCode":"CNY","rate":7.9669486476009},"nok":{"alphaCode":"NOK","rate":9.4513538390337},"sek":{"alphaCode":"SEK","rate":10.475202493783},"dkk":{"alphaCode":"DKK","rate":7.4663257276756},"czk":{"alphaCode":"CZK","rate":25.828135391477},"hrk":{"alphaCode":"HRK","rate":7.4164134310551},"huf":{"alphaCode":"HUF","rate":325.406184656},"bgn":{"alphaCode":"BGN","rate":1.9575426918045},"ron":{"alphaCode":"RON","rate":4.6680872615238},"pln":{"alphaCode":"PLN","rate":4.3158895789831},"try":{"alphaCode":"TRY","rate":6.9702519035293},"ils":{"alphaCode":"ILS","rate":4.1746028973946},"aud":{"alphaCode":"AUD","rate":1.6197873819284},"nzd":{"alphaCode":"NZD","rate":1.7767149842828},"cad":{"alphaCode":"CAD","rate":1.4910118374935},"hkd":{"alphaCode":"HKD","rate":9.0188530945626},"sgd":{"alphaCode":"SGD","rate":1.5899956174499},"inr":{"alphaCode":"INR","rate":85.390822806059},"idr":{"alphaCode":"IDR","rate":17543.303621507},"thb":{"alphaCode":"THB","rate":37.879245401684},"krw":{"alphaCode":"KRW","rate":1306.702928507},"myr":{"alphaCode":"MYR","rate":4.7799821833354},"php":{"alphaCode":"PHP","rate":62.358306067431},"mxn":{"alphaCode":"MXN","rate":21.973404171617},"brl":{"alphaCode":"BRL","rate":4.3116091016304},"zar":{"alphaCode":"ZAR","rate":16.862948684894}};
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