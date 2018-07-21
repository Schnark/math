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
var cachedData = {"usd":{"alphaCode":"USD","rate":1.1603625999715},"chf":{"alphaCode":"CHF","rate":1.1621320306776},"gbp":{"alphaCode":"GBP","rate":0.89257189741132},"jpy":{"alphaCode":"JPY","rate":130.85446623683},"rub":{"alphaCode":"RUB","rate":73.578139322919},"cny":{"alphaCode":"CNY","rate":7.8544197140153},"nok":{"alphaCode":"NOK","rate":9.577975494498},"sek":{"alphaCode":"SEK","rate":10.344397738753},"dkk":{"alphaCode":"DKK","rate":7.4632998059231},"czk":{"alphaCode":"CZK","rate":25.953452053088},"hrk":{"alphaCode":"HRK","rate":7.4031102242818},"huf":{"alphaCode":"HUF","rate":325.12462219092},"bgn":{"alphaCode":"BGN","rate":1.9581489576245},"ron":{"alphaCode":"RON","rate":4.6628523905885},"pln":{"alphaCode":"PLN","rate":4.3161723663325},"try":{"alphaCode":"TRY","rate":5.5934811722557},"ils":{"alphaCode":"ILS","rate":4.2443448820371},"aud":{"alphaCode":"AUD","rate":1.5736944214427},"nzd":{"alphaCode":"NZD","rate":1.7160997910895},"cad":{"alphaCode":"CAD","rate":1.5318012668014},"hkd":{"alphaCode":"HKD","rate":9.1068070151043},"sgd":{"alphaCode":"SGD","rate":1.5892645756467},"inr":{"alphaCode":"INR","rate":79.999586504583},"idr":{"alphaCode":"IDR","rate":16731.667935873},"thb":{"alphaCode":"THB","rate":38.795063183809},"krw":{"alphaCode":"KRW","rate":1315.7795523782},"myr":{"alphaCode":"MYR","rate":4.7128304380448},"php":{"alphaCode":"PHP","rate":62.257701501603},"mxn":{"alphaCode":"MXN","rate":22.128203267448},"brl":{"alphaCode":"BRL","rate":4.4939504733436},"zar":{"alphaCode":"ZAR","rate":15.648936403774}};
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