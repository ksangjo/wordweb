import { get_today } from './all_share.js';
import create_array from './partial_share.js';

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

function init_loader() {
    get_today(document);
    console.log("time yes");
    create_array('total_word_list', 'word_total', document);
    console.log("array yes");
}

document.addEventListener("DOMContentLoaded", () => {
    init_loader();
})