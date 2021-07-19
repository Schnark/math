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
var cachedData = {"usd":{"alphaCode":"USD","rate":1.1812707415606},"chf":{"alphaCode":"CHF","rate":1.0845308153046},"gbp":{"alphaCode":"GBP","rate":0.85448119678991},"jpy":{"alphaCode":"JPY","rate":130.01390146371},"rub":{"alphaCode":"RUB","rate":87.573429694851},"cny":{"alphaCode":"CNY","rate":7.6442336790735},"nok":{"alphaCode":"NOK","rate":10.410587891685},"sek":{"alphaCode":"SEK","rate":10.250612177252},"dkk":{"alphaCode":"DKK","rate":7.4436573044424},"czk":{"alphaCode":"CZK","rate":25.555437446663},"hrk":{"alphaCode":"HRK","rate":7.5024151952003},"huf":{"alphaCode":"HUF","rate":359.83966482329},"bgn":{"alphaCode":"BGN","rate":1.9571432423843},"ron":{"alphaCode":"RON","rate":4.9322029438337},"pln":{"alphaCode":"PLN","rate":4.5891540632324},"try":{"alphaCode":"TRY","rate":10.064768339133},"ils":{"alphaCode":"ILS","rate":3.882019303968},"aud":{"alphaCode":"AUD","rate":1.5914764542843},"nzd":{"alphaCode":"NZD","rate":1.6847940503367},"cad":{"alphaCode":"CAD","rate":1.4865795820681},"hkd":{"alphaCode":"HKD","rate":9.1764675445612},"sgd":{"alphaCode":"SGD","rate":1.6009253562026},"inr":{"alphaCode":"INR","rate":88.120307768639},"idr":{"alphaCode":"IDR","rate":17114.153343854},"thb":{"alphaCode":"THB","rate":38.471651002559},"krw":{"alphaCode":"KRW","rate":1347.5607278338},"myr":{"alphaCode":"MYR","rate":4.9480122422135},"php":{"alphaCode":"PHP","rate":59.410028538105},"mxn":{"alphaCode":"MXN","rate":23.475895357954},"brl":{"alphaCode":"BRL","rate":5.9876430520339},"zar":{"alphaCode":"ZAR","rate":17.004907592496}};
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