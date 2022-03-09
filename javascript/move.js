let count = 0;

function left_click() {
    console.log(count);
    fetch(`http://127.0.0.1:8000/memorization/total/${count}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (text) {
            document.getElementsByClassName('english')[0].innerHTML = JSON.parse(text).word;
            document.getElementsByClassName('meaning')[0].innerHTML = JSON.parse(text).meaning;
            document.getElementsByClassName('sentence')[0].innerHTML = JSON.parse(text).sentence;
            count--;
        }));
}

function right_click() {
    console.log(count);
    fetch(`http://127.0.0.1:8000/memorization/total/${count}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (text) {
            document.getElementsByClassName('english')[0].innerHTML = JSON.parse(text).word;
            document.getElementsByClassName('meaning')[0].innerHTML = JSON.parse(text).meaning;
            document.getElementsByClassName('sentence')[0].innerHTML = JSON.parse(text).sentence;
            count++;
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
    document.getElementsByClassName('current_date')[0].innerHTML = `${year}년 ${month >= 10 ? month : '0' + month}월 ${date >= 10 ? date : '0' + date}일`;
}
