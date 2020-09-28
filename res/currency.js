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
var cachedData = {"usd":{"alphaCode":"USD","rate":1.1642075598005},"chf":{"alphaCode":"CHF","rate":1.080060988551},"gbp":{"alphaCode":"GBP","rate":0.91411510996512},"jpy":{"alphaCode":"JPY","rate":122.79836624586},"rub":{"alphaCode":"RUB","rate":90.342570094522},"cny":{"alphaCode":"CNY","rate":7.9442896670813},"nok":{"alphaCode":"NOK","rate":11.154190207736},"sek":{"alphaCode":"SEK","rate":10.623545812338},"dkk":{"alphaCode":"DKK","rate":7.4506162060293},"czk":{"alphaCode":"CZK","rate":27.11828259389},"hrk":{"alphaCode":"HRK","rate":7.5538705455422},"huf":{"alphaCode":"HUF","rate":363.42798736766},"bgn":{"alphaCode":"BGN","rate":1.9566807145364},"ron":{"alphaCode":"RON","rate":4.8787424698107},"pln":{"alphaCode":"PLN","rate":4.5536261844213},"try":{"alphaCode":"TRY","rate":8.8938997004158},"ils":{"alphaCode":"ILS","rate":4.0548231480587},"aud":{"alphaCode":"AUD","rate":1.6531830863956},"nzd":{"alphaCode":"NZD","rate":1.7768359147244},"cad":{"alphaCode":"CAD","rate":1.557590185378},"hkd":{"alphaCode":"HKD","rate":9.0234002108197},"sgd":{"alphaCode":"SGD","rate":1.6028923886718},"inr":{"alphaCode":"INR","rate":85.772774949379},"idr":{"alphaCode":"IDR","rate":17326.080110437},"thb":{"alphaCode":"THB","rate":36.838859478613},"krw":{"alphaCode":"KRW","rate":1366.1161601842},"myr":{"alphaCode":"MYR","rate":4.880022056658},"php":{"alphaCode":"PHP","rate":56.465333664734},"mxn":{"alphaCode":"MXN","rate":26.02015254775},"brl":{"alphaCode":"BRL","rate":6.4660478059137},"zar":{"alphaCode":"ZAR","rate":19.895294398053}};
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