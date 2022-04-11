import get_today from './all_share.js';
import create_array from './partial_share.js';

function go_total() {
    fetch(`http://127.0.0.1:8000/today_to_total/total/`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
        .then((response) => {
            console.log(response);
            document.location.reload(true);
        })
}

function go_done() {
    fetch(`http://127.0.0.1:8000/today_to_done/total`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
        .then((response) => {
            console.log(response);
            document.location.reload(true);
        })
}

function init_loader() {
    get_today(document);
    console.log("time yes");
    create_array('today_word_list', 'word_today', document);
    console.log("array yes");
}

document.addEventListener("DOMContentLoaded", () => {
    init_loader();
})