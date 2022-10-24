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
var cachedData = {"usd":{"alphaCode":"USD","rate":0.97692634897072},"chf":{"alphaCode":"CHF","rate":0.98476361010263},"gbp":{"alphaCode":"GBP","rate":0.87529628038392},"jpy":{"alphaCode":"JPY","rate":147.03323920694},"rub":{"alphaCode":"RUB","rate":62.654428817507},"cny":{"alphaCode":"CNY","rate":7.0775034359266},"nok":{"alphaCode":"NOK","rate":10.417145020574},"sek":{"alphaCode":"SEK","rate":11.074741609758},"dkk":{"alphaCode":"DKK","rate":7.4539872022223},"czk":{"alphaCode":"CZK","rate":24.575854108869},"hrk":{"alphaCode":"HRK","rate":7.5576781767767},"huf":{"alphaCode":"HUF","rate":413.90025265388},"bgn":{"alphaCode":"BGN","rate":1.9620919321864},"ron":{"alphaCode":"RON","rate":4.9276804124164},"pln":{"alphaCode":"PLN","rate":4.7990834536334},"try":{"alphaCode":"TRY","rate":18.165713040903},"ils":{"alphaCode":"ILS","rate":3.4882269709329},"aud":{"alphaCode":"AUD","rate":1.5602615468252},"nzd":{"alphaCode":"NZD","rate":1.7290307342331},"cad":{"alphaCode":"CAD","rate":1.3470857557702},"hkd":{"alphaCode":"HKD","rate":7.6684189013515},"sgd":{"alphaCode":"SGD","rate":1.3940191561661},"inr":{"alphaCode":"INR","rate":80.875854581896},"idr":{"alphaCode":"IDR","rate":15252.682691034},"thb":{"alphaCode":"THB","rate":37.319022193336},"krw":{"alphaCode":"KRW","rate":1406.4417295814},"myr":{"alphaCode":"MYR","rate":4.5996669738543},"php":{"alphaCode":"PHP","rate":57.512815215463},"mxn":{"alphaCode":"MXN","rate":19.583104160179},"brl":{"alphaCode":"BRL","rate":5.1487737551263},"zar":{"alphaCode":"ZAR","rate":17.959425519}};
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