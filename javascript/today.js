// import get_today from './utils.js';
// import create_array from './partial_share.js';

function go_total() {
    request(`/today_to_total/total/`)
        .then((response) => {
            console.log(response);
            document.location.reload(true);
        })
}

function go_done() {
    request(`/today_to_done/total`)
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