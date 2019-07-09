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
var cachedData = {"usd":{"alphaCode":"USD","rate":1.1264094707352},"chf":{"alphaCode":"CHF","rate":1.1124002743366},"gbp":{"alphaCode":"GBP","rate":0.89680316870317},"jpy":{"alphaCode":"JPY","rate":121.7557487138},"rub":{"alphaCode":"RUB","rate":71.620701971094},"cny":{"alphaCode":"CNY","rate":7.7493963728887},"nok":{"alphaCode":"NOK","rate":9.6533841245804},"sek":{"alphaCode":"SEK","rate":10.564838511968},"dkk":{"alphaCode":"DKK","rate":7.4591186235766},"czk":{"alphaCode":"CZK","rate":25.444457343906},"hrk":{"alphaCode":"HRK","rate":7.4002290728222},"huf":{"alphaCode":"HUF","rate":323.50758522893},"bgn":{"alphaCode":"BGN","rate":1.9564178556684},"ron":{"alphaCode":"RON","rate":4.7258332089847},"pln":{"alphaCode":"PLN","rate":4.2417963682714},"try":{"alphaCode":"TRY","rate":6.3263481914615},"ils":{"alphaCode":"ILS","rate":4.0137423148084},"aud":{"alphaCode":"AUD","rate":1.6071929545281},"nzd":{"alphaCode":"NZD","rate":1.6914007571318},"cad":{"alphaCode":"CAD","rate":1.4778605494094},"hkd":{"alphaCode":"HKD","rate":8.7785239950833},"sgd":{"alphaCode":"SGD","rate":1.529119491166},"inr":{"alphaCode":"INR","rate":77.27378120711},"idr":{"alphaCode":"IDR","rate":15900.701377878},"thb":{"alphaCode":"THB","rate":34.552347904306},"krw":{"alphaCode":"KRW","rate":1318.3664887711},"myr":{"alphaCode":"MYR","rate":4.6578817436746},"php":{"alphaCode":"PHP","rate":57.679549949862},"mxn":{"alphaCode":"MXN","rate":21.414452098586},"brl":{"alphaCode":"BRL","rate":4.2945757126931},"zar":{"alphaCode":"ZAR","rate":15.913000776536}};
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