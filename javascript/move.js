let word_id = 0;
let return_history = [];
let show_count = 0;
let o_count = 0;
let startup_index = 0;
let offset_index = 100000000;
const one_turn = 50;

function circulating() {
    show_count = 0;
    let max_len = Number(fetch(`http://127.0.0.1:8000/len/total`, {
        method:'GET',
    headers:{
        'Content-Type': 'application/text'
    }}).text);
    if (show_count !== 0 && (show_count % one_turn === 0 || word_id >= max_len)) {
        end_stage(true);
    }
    else {
        end_stage(false);
    }
    if (word_id > 0 && show_count % one_turn !== 0) {
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
    show_count++;
    word_id = startup_index-1;
    if(show_count % one_turn !== 0) {
        fetch(`http://127.0.0.1:8000/memorization/total/${word_id}/${offset_index}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/text'
            }})
        .then((response) => response.text().then(function (text) {
                if (!response.ok) {
                    display(true);
                return
                }
            
                if (text === "NO WORD LEFT" || text === undefined) {
                    display(true);
                }
                else {
                    display(false);
                    let jsondata = JSON.parse(text);
                    document.getElementsByClassName('english')[0].innerHTML = jsondata.word;
                    document.getElementsByClassName('meaning')[0].innerHTML = jsondata.meaning;
                    document.getElementsByClassName('sentence')[0].innerHTML = jsondata.sentence;
                    if (jsondata.id) {
                        word_id = jsondata.id;
                    }
                }
            }));
    }
}

function next_fifty() {
    offset_index += one_turn;
    if (show_count % one_turn !== 0) {
        return
    }
    let max_len = Number(fetch(`http://127.0.0.1:8000/len/total`, {
        method:'GET',
    headers:{
        'Content-Type': 'application/text'
    }}).text);
    show_count++;
    if (show_count !== 0 && o_count === one_turn*3) {
        display(true);
    }
    else {
        display(false);
    }
    if (word_id > 0 && show_count % one_turn !== 0) {
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
    if(show_count % one_turn !== 0) {
        fetch(`http://127.0.0.1:8000/memorization/total/${word_id}/${offset_index}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/text'
            }})
        .then((response) => response.text().then(function (text) {
            if (!response.ok) {
                display(true);
                return
            }
        
                let jsondata = JSON.parse(text);
                document.getElementsByClassName('english')[0].innerHTML = jsondata.word;
                document.getElementsByClassName('meaning')[0].innerHTML = jsondata.meaning;
                document.getElementsByClassName('sentence')[0].innerHTML = jsondata.sentence;
                if (jsondata.id) {
                    word_id = jsondata.id;
                }
                startup_index = word_id;
                console.log("startup", word_id);
            }));
    }
}

function left_click() {
    let max_len = Number(fetch(`http://127.0.0.1:8000/len/total`, {
        method:'GET',
    headers:{
        'Content-Type': 'application/text'
    }}).text);
    if (show_count !== 0 && (show_count % one_turn === 0 || word_id >= max_len)) {
        end_stage(true);
    }
    else {
        end_stage(false);
    }
    if (word_id > 0 && show_count % one_turn !== 0) {
        fetch(`http://127.0.0.1:8000/plus/total/${word_id}`, {
            method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
        .then((response) => response.text().then(function (text) {
            let previous_status = JSON.parse(text)
            return_history.push(previous_status);
            o_count++;
        }));
    }
    if(show_count % one_turn !== 0) {
        fetch(`http://127.0.0.1:8000/memorization/total/${word_id}/${offset_index}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/text'
            }})
        .then((response) => response.text().then(function (text) {
            if (!response.ok) {
                display(true);
                return
            }
        
                if (text === "NO WORD LEFT" || text === undefined) {
                    display(true);
                }
                else {
                    display(false);
                    let jsondata = JSON.parse(text);
                    document.getElementsByClassName('english')[0].innerHTML = jsondata.word;
                    document.getElementsByClassName('meaning')[0].innerHTML = jsondata.meaning;
                    document.getElementsByClassName('sentence')[0].innerHTML = jsondata.sentence;
                    if (jsondata.id) {
                        word_id = jsondata.id;
                    }
                    show_count++;
                }
            }));
    }
}

function right_click() {
    let max_len = Number(fetch(`http://127.0.0.1:8000/len/total`, {
        method:'GET',
    headers:{
        'Content-Type': 'application/text'
    }}).text);
    if (show_count !== 0 && (show_count % one_turn === 0 || word_id >= max_len)) {
        end_stage(true);
    }
    else {
        end_stage(false);
    }
    if (word_id > 0 && show_count % one_turn !== 0) {
        fetch(`http://127.0.0.1:8000/reset/total/${word_id}`, {
            method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
        .then((response) => response.text().then(function (text) {
            let previous_status = JSON.parse(text)
            return_history.push(previous_status);
            o_count -= previous_status.count;
        }));
    }
    if(show_count % one_turn !== 0) {
        fetch(`http://127.0.0.1:8000/memorization/total/${word_id}/${offset_index}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/text'
            }})
        .then((response) => response.text().then(function (text) {
            if (!response.ok) {
                display(true);
                return
            }
        
                if (text === "NO WORD LEFT" || text === undefined) {
                    display(true);
                }
                else {
                    display(false);
                    let jsondata = JSON.parse(text)
                    document.getElementsByClassName('english')[0].innerHTML = jsondata.word;
                    document.getElementsByClassName('meaning')[0].innerHTML = jsondata.meaning;
                    document.getElementsByClassName('sentence')[0].innerHTML = jsondata.sentence;
                    if (jsondata.id) {
                        word_id = jsondata.id;
                    }
                    show_count++;
                }
            }));
    }
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
    display(false);
}

function end_stage(isend){
    if(isend){
        document.getElementsByClassName("end_of_stage")[0].style.visibility = 'visible';
        document.getElementsByClassName('english')[0].style.visibility = 'hidden';
        document.getElementsByClassName('meaning')[0].style.visibility = 'hidden';
        document.getElementsByClassName('sentence')[0].style.visibility = 'hidden';
        if (offset_index >= 100000000) {
            offset_index = word_id;
        }
    }
    else {
        if (show_count === 0){
            document.getElementsByClassName("display")[0].style.visibility = 'visible';
            document.getElementsByClassName('english')[0].style.visibility = 'hidden';
            document.getElementsByClassName('meaning')[0].style.visibility = 'hidden';
            document.getElementsByClassName('sentence')[0].style.visibility = 'hidden';
        }
        else {
            document.getElementsByClassName("end_of_stage")[0].style.visibility = 'hidden';
            document.getElementsByClassName('english')[0].style.visibility = 'visible';
            document.getElementsByClassName('meaning')[0].style.visibility = 'visible';
            document.getElementsByClassName('sentence')[0].style.visibility = 'visible';
        }
    }
}

function display(end_of_word) {
    if(end_of_word) {
        document.getElementsByClassName("display")[0].style.visibility = 'visible';
        document.getElementsByClassName('english')[0].style.visibility = 'hidden';
        document.getElementsByClassName('meaning')[0].style.visibility = 'hidden';
        document.getElementsByClassName('sentence')[0].style.visibility = 'hidden';
    }else {
        if (show_count === 0){
            document.getElementsByClassName("display")[0].style.visibility = 'visible';
            document.getElementsByClassName('english')[0].style.visibility = 'hidden';
            document.getElementsByClassName('meaning')[0].style.visibility = 'hidden';
            document.getElementsByClassName('sentence')[0].style.visibility = 'hidden';
            document.getElementsByClassName("end_of_stage")[0].style.visibility = 'hidden';
        }
        else {
            document.getElementsByClassName("end_of_stage")[0].style.visibility = 'hidden';
            document.getElementsByClassName("display")[0].style.visibility = 'hidden';
            document.getElementsByClassName('english')[0].style.visibility = 'visible';
            document.getElementsByClassName('meaning')[0].style.visibility = 'visible';
            document.getElementsByClassName('sentence')[0].style.visibility = 'visible';
        }
    }
}

function reset_exec() {
    display(false);
    let status = return_history.pop();
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
            if (jsondata.id) {
                word_id = jsondata.id;
            }
            show_count--;
        }));
}