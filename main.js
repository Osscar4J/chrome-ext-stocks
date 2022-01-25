
// query

let currIndex = -1;

// function httpRequest(callback) {

// 	var stocks = localStorage.stocks || 'sh000001';
// 	var url = 'http://hq.sinajs.cn/list=' + stocks;

//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4) {
//             callback(xhr.responseText);
//         }
//     }
//     xhr.send();
// }

function getFundInfo(callback, code) {
	if (!code)
		return false

	let url = 'http://stocks.sina.cn/aj/fund/info?code=' + code	
	var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText, code);
        }
    }
    xhr.send();
}

let dataTable = null
let tabelBody = null
let nodeList = []

function handleFund(res, code) {
	let json = JSON.parse(res)
	let hq = json.data.hqdis

	if (!hq) {
		alert(res)
		hq = {}
		// return false
	}

	if (!dataTable){
		dataTable = document.createElement('table')
		let header = document.createElement('thead')
		dataTable.appendChild(header)
		let tr = document.createElement('tr')
		header.appendChild(tr)

		let tempEle = document.createElement('td')
		tempEle.innerText = '基金'
		tr.appendChild(tempEle)
		tempEle = document.createElement('td')
		tempEle.innerText = '最新价'
		tr.appendChild(tempEle)
		tempEle = document.createElement('td')
		tempEle.innerText = '涨跌幅'
		tr.appendChild(tempEle)
		tempEle = document.createElement('td')
		tempEle.innerText = '操作'
		tr.appendChild(tempEle)

		tabelBody = document.createElement('tbody')
		dataTable.appendChild(tabelBody)

		document.getElementById('stock').appendChild(dataTable)
	}

	let trEle = null
	for (let i = 0; i < nodeList.length; i++) {
		if (nodeList[i].firstChild.innerText == hq.zhongwenming){
			trEle = nodeList[i]
			break
		}
	}
	if (!trEle) {
		trEle = document.createElement('tr')
		trEle.setAttribute('code', code)
		let tempEle = document.createElement('td')
		tempEle.innerText = hq.zhongwenming
		trEle.appendChild(tempEle)

		tempEle = document.createElement('td')
		tempEle.innerText = hq.zuixin
		trEle.appendChild(tempEle)

		tempEle = document.createElement('td')
		tempEle.innerText = hq.zhangdiefu
		trEle.appendChild(tempEle)

		tempEle = document.createElement('td')
		let delEle = document.createElement('span')
		delEle.innerText = 'del'
		delEle.className = 'text-red f-csp'
		delEle.onclick = function(e) {
			let stocks = localStorage.stocks.split(',')
			for (let i = 0; i < stocks.length; i++){
				if (stocks[i] == code) {
					stocks.splice(i, 1)
					break
				}
			}
			localStorage.stocks = stocks
			trEle.remove()
		}
		tempEle.appendChild(delEle)
		trEle.appendChild(tempEle)
		
		tabelBody.appendChild(trEle)
	}

	for (let i = 0; i < trEle.childNodes.length; i++){
		if (i == 1) {
			trEle.childNodes[i].innerText = hq.zuixin
		} else if (i == 2) {
			trEle.childNodes[i].innerText = hq.zhangdiefu
			if (hq.zhangdiefu.indexOf('-') == 0) {
				trEle.childNodes[i].className = 'text-green'
			} else {
				trEle.childNodes[i].className = 'text-red'
			}
		}
	}
}


// add 
document.getElementById('addBtn').onclick = function() {
	var add = document.getElementById('add'),
		addBtn = document.getElementById('addBtn');
		
	var input = document.createElement('input');
	input.type = 'text';
	input.id = 'newStock';

	var saveBtn = document.createElement('input');
	saveBtn.type = 'button';
	saveBtn.id = 'saveBtn';
	saveBtn.value = 'save';

	add.removeChild(addBtn);
	add.appendChild(input);
	add.appendChild(saveBtn);

	document.getElementById('saveBtn').onclick = function() {
		var newStock = document.getElementById('newStock').value; 
		var stocks = localStorage.stocks && localStorage.stocks.split(',') || ['003096'];
		stocks.push(newStock);
		localStorage.stocks = stocks;

		getFundInfo(handleFund, newStock)

		add.removeChild(input);
		add.removeChild(saveBtn);
		add.appendChild(addBtn);
	}
}


document.onclick = function(e) {
	let className = e.target.className
	if(/remove-btn/.test(className)){
		let index = e.target.getAttribute('data-index')
		let arr = localStorage.stocks.split(',')
		if (Object.prototype.toString.call(arr) !== '[object Array]'){
			arr = [arr]
		}
		arr.splice(index, 1)
		localStorage.stocks = arr
		httpRequest(showResult);
	}
}

let stocks = localStorage.stocks.split(',')
stocks.forEach(s => {
	getFundInfo(handleFund, s)
})
