// import { get_today, create_array } from './utils';

function go_study_total() {
    request(`/total_to_study/total`)
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