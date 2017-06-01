function Keyboard (el, input, callback) {
	el.addEventListener('click', this.onClick.bind(this));
	el.addEventListener('change', this.onChange.bind(this));
	el.addEventListener('keypress', this.onKey.bind(this));
	this.pages = el.getElementsByClassName('keyboard-page');
	this.input = input;
	this.callback = callback;
	this.history = [];
	this.historyPointer = -1;
	this.historyMax = 10;
}

Keyboard.prototype.onClick = function (e) {
	if (e.target.nodeName.toLowerCase() === 'button') {
		this.handleInput(e.target.dataset);
	}
};

Keyboard.prototype.onChange = function (e) {
	var data = e.target.selectedIndex;
	if (data === undefined || data === -1 || data === 0) {
		return;
	}
	data = e.target.options[data].dataset;
	this.handleInput(data);
	e.target.selectedIndex = 0;
};

Keyboard.prototype.onKey = function (e) {
	if (e.charCode) {
		this.input.insert(String.fromCharCode(e.charCode));
	} else if (e.keyCode) {
		switch (e.keyCode) {
		case 8:
			this.exec('del');
			break;
		case 9:
			this.showPage(0);
			break;
		case 13:
			this.exec('enter');
			break;
		case 27:
			this.exec('clear');
			break;
		case 33:
		case 38:
			this.exec('prev');
			break;
		case 34:
		case 40:
			this.exec('next');
			break;
		case 35:
			this.input.moveCursor('end');
			break;
		case 36:
			this.input.moveCursor('start');
			break;
		case 37:
			this.input.moveCursor('left');
			break;
		case 39:
			this.input.moveCursor('right');
			break;
		case 46:
			this.exec('del-right');
			break;
		//default: console.log(e.keyCode);
		}
	}
	e.preventDefault();
};

Keyboard.prototype.handleInput = function (data) {
	var pos;
	switch (data.key) {
	case 'insert':
		pos = data.val.indexOf('\u001b');
		if (pos === -1) {
			this.input.insert(data.val);
		} else {
			this.input.insert(data.val.slice(0, pos), data.val.slice(pos + 1));
		}
		break;
	case 'cursor':
		this.input.moveCursor(data.val);
		break;
	case 'page':
		this.showPage(Number(data.val));
		break;
	case 'exec':
		this.exec(data.val);
		break;
	}
};

Keyboard.prototype.hide = function () {
	this.showPage(-1);
	this.input.bindClickOnce(this.show.bind(this));
	this.input.toggle(false);
};

Keyboard.prototype.show = function () {
	this.showPage(0);
	this.input.toggle(true);
};

Keyboard.prototype.addToHistory = function (text) {
	this.history.push(text);
	while (this.history.length > this.historyMax) {
		this.history.shift();
	}
	this.historyPointer = -1;
	this.input.setText('');
};

Keyboard.prototype.run = function (text) {
	this.addToHistory(text);
	this.callback(text);
	this.hide();
};

Keyboard.prototype.showPage = function (page) {
	var i, input;

	function blurHandler () {
		setTimeout(function () {
			this.focus();
		}.bind(this), 0);
	}

	for (i = 0; i < this.pages.length; i++) {
		this.pages[i].hidden = (page !== i);
	}

	if (this.keyboardCapture) {
		this.keyboardCapture.removeEventListener('blur', blurHandler);
		this.keyboardCapture.blur();
	}
	if (page > -1) {
		input = this.pages[page].getElementsByTagName('input');
		input = input && input[0];
	} else {
		input = null;
	}
	this.keyboardCapture = input;
	if (this.keyboardCapture) {
		this.keyboardCapture.addEventListener('blur', blurHandler);
		this.keyboardCapture.focus();
	}

	if (this.onLayoutChange) {
		this.onLayoutChange();
	}
};

Keyboard.prototype.exec = function (command) {
	switch (command) {
	case 'del':
		this.input.remove();
		break;
	case 'del-right':
		this.input.remove(true);
		break;
	case 'clear':
		this.input.setText('');
		break;
	case 'prev':
		this.historyPointer--;
		if (this.historyPointer < 0) {
			this.historyPointer = this.history.length - 1;
		}
		this.input.setText(this.history[this.historyPointer]);
		break;
	case 'next':
		this.historyPointer++;
		if (this.historyPointer >= this.history.length) {
			this.historyPointer = 0;
		}
		this.input.setText(this.history[this.historyPointer]);
		break;
	case 'enter':
		this.run(this.input.getText());
		break;
	}
};