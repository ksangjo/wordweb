let word_id = 0;

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
        fetch(`http://127.0.0.1:8000/plus/total/${word_id-1}`, {
            method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }});
    }
    fetch(`http://127.0.0.1:8000/memorization/total/${word_id}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (text) {
            document.getElementsByClassName('english')[0].innerHTML = JSON.parse(text).word;
            document.getElementsByClassName('meaning')[0].innerHTML = JSON.parse(text).meaning;
            document.getElementsByClassName('sentence')[0].innerHTML = JSON.parse(text).sentence;
            word_id++;
        }));
}

function right_click() {
    console.log(word_id);
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
        fetch(`http://127.0.0.1:8000/reset/total/${word_id-1}`, {
            method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    }
    fetch(`http://127.0.0.1:8000/memorization/total/${word_id}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (text) {
            document.getElementsByClassName('english')[0].innerHTML = JSON.parse(text).word;
            document.getElementsByClassName('meaning')[0].innerHTML = JSON.parse(text).meaning;
            document.getElementsByClassName('sentence')[0].innerHTML = JSON.parse(text).sentence;
            word_id++;
        }));
}

function reload() {
    document.location.reload(true);
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