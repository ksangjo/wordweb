let count = 0;

function left_click() {
    count++;
    console.log(count);
    document.getElementsByClassName('display')[0].innerHTML = count;
}

function right_click() {
    console.log(count);
    fetch(`http://127.0.0.1:8000/memorization/total/${count}`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (text) {
            document.getElementsByClassName('display')[0].innerHTML = text;
        }));
}

function reload() {
    document.location.reload(true);
}

var dt = new Date();
document.getElementById("currnet_date").innerHTML = dt.toLocaleString();