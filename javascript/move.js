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
    document.getElementsByClassName("currnet_date").innerHTML = dt.toLocaleString();
}