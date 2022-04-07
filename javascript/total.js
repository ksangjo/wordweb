function create_array() {
    fetch(`http://127.0.0.1:8000/total_word_list/total/`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
    .then((response) => response.text().then(function (myjsonarray) {
            list_start_point = document.getElementsByClassName('word_total')[0]
            let jsondatas = JSON.parse(myjsonarray)
            for (let i = 0; i < jsondatas.length; i++){
                let row = `<span class="e${i+1}" style = "width: 420px;
                color: rgba(0, 0, 0, 1);
                position: absolute;
                top: ${5 + (i*34)}px;
                left: 10px;
                font-family: Roboto;
                font-weight: Thin;
                font-size: 20px;
                opacity: 1;
                text-align: left;">${jsondatas[i].word}</span>`
                list_start_point.innerHTML += row;
            }
            for (let i = 0; i < jsondatas.length; i++){
                let row = `<span class="m${i+1}" style = "width: 420px;
                color: rgba(0, 0, 0, 1);
                position: absolute;
                top: ${5 + (i*34)}px;
                left: 480px;
                font-family: Roboto;
                font-weight: Thin;
                font-size: 20px;
                opacity: 1;
                text-align: left;">${jsondatas[i].meaning}</span>`
                list_start_point.innerHTML += row;
            }
            for (let i = 0; i < jsondatas.length; i++){
                let row = `<span class="sen${i+1}" style="width: 622px;
                color: rgba(0, 0, 0, 1);
                position: absolute;
                top: ${5 + (i*34)}px;
                left: 950px;
                font-family: Roboto;
                font-weight: Thin;
                font-size: 20px;
                opacity: 1;
                text-align: left;">${jsondatas[i].sentence}</span>`
                list_start_point.innerHTML += row;
            }
        }));
}

function go_done() {
    fetch(`http://127.0.0.1:8000/total_to_done/total`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
        .then((response) => {
            console.log(response);
            document.location.reload(true);
        })
}

function go_study_total() {
    fetch(`http://127.0.0.1:8000/total_to_study/total`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
        .then((response) => {
            console.log(response);
            document.location.reload(true);
            location.href='http://127.0.0.1:8000/total_review';
        })
}

function get_today() {
    var dt = new Date();
    const year = dt.getFullYear();
    const month = dt.getMonth();
    const date = dt.getDate();
    document.getElementsByClassName('current_date')[0].innerHTML = `${year}년 ${month >= 10 ? month : '0' + (month+1)}월 ${date >= 10 ? date : '0' + date}일`;
}

function init_loader() {
    get_today();
    console.log("time yes");
    create_array();
    console.log("array yes");
}