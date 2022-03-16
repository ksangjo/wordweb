let word_id = 0;
let return_history = [];

function left_click() {
    console.log(word_id);
    let max_len = Number(fetch(`http://127.0.0.1:8000/len/total`, {
        method:'GET',
    headers:{
        'Content-Type': 'application/text'
    }}).text);
    if (word_id >= max_len) {
        display(true);
    }
    else {
        display(false);
    }
    if (word_id > 0) {
        fetch(`http://127.0.0.1:8000/plus/total/${word_id}`, {
            method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
        .then((response) => response.text().then(function (text) {
            let previous_status = JSON.parse(text)
            return_history.push(previous_status);
        }));
    }
    fetch(`http://127.0.0.1:8000/memorization/total/${word_id}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (text) {
            console.log(text);
            let jsondata = JSON.parse(text);
            document.getElementsByClassName('english')[0].innerHTML = jsondata.word;
            document.getElementsByClassName('meaning')[0].innerHTML = jsondata.meaning;
            document.getElementsByClassName('sentence')[0].innerHTML = jsondata.sentence;
            word_id = jsondata.id;
        }));
}

function right_click() {
    console.log(word_id);
    let max_len = Number(fetch(`http://127.0.0.1:8000/len/total`, {
        method:'GET',
    headers:{
        'Content-Type': 'application/text'
    }}).text);
    if (word_id >= max_len) {
        display(true);
    }
    else {
        display(false);
    }
    if (word_id > 0) {
        fetch(`http://127.0.0.1:8000/reset/total/${word_id}`, {
            method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
        .then((response) => response.text().then(function (text) {
            let previous_status = JSON.parse(text)
            return_history.push(previous_status);
        }));
    }
    fetch(`http://127.0.0.1:8000/memorization/total/${word_id}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (text) {
            let jsondata = JSON.parse(text)
            document.getElementsByClassName('english')[0].innerHTML = jsondata.word;
            document.getElementsByClassName('meaning')[0].innerHTML = jsondata.meaning;
            document.getElementsByClassName('sentence')[0].innerHTML = jsondata.sentence;
            word_id = jsondata.id;
        }));
}

function reload_alert() {
    document.location.reload(true);
    alert('<새로고침> count는 저장되지만 1번 단어에서 재시작합니다.')
}

function get_today() {
    var dt = new Date();
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const date = dt.getDate();
    document.getElementsByClassName('current_date')[0].innerHTML = `${year}년 ${month >= 10 ? month : '0' + (month+1)}월 ${date >= 10 ? date : '0' + date}일`;
}

function display(end_of_word) {
    if(end_of_word) {
        document.getElementsByClassName("display")[0].style.visibility = 'visible';
    }else {
        document.getElementsByClassName("display")[0].style.visibility = 'hidden';
    }
}

function reset_exec() {
    let status = return_history.pop();
    console.log(status);
    fetch(`http://127.0.0.1:8000/real_id/total/${status.real_id}/${status.count}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (text) {
            let jsondata = JSON.parse(text)
            document.getElementsByClassName('english')[0].innerHTML = jsondata.word;
            document.getElementsByClassName('meaning')[0].innerHTML = jsondata.meaning;
            document.getElementsByClassName('sentence')[0].innerHTML = jsondata.sentence;
            word_id = jsondata.id;
        }));
}