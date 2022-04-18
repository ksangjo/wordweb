// import { display } from './utils.js';

const OFFSET_MAX = 100000000;

let word_id = 0;
let return_history = [];
let show_count = 0;
let o_count = 0;
let startup_index = 0;
let offset_index = OFFSET_MAX;
let is_end_stage = false;

let ONE_TURN

request(`/total_review_len/total`).then( (raw_data) => {
  return raw_data.json().then( (data) => {
    ONE_TURN = data
  }).catch( (err) => {
    console.log(err);
  })
});
const ONE_STAGE = 3;
const NO_WORD_LEFT = "NO WORD LEFT";

let wordInformationElement;
let englishElement;
let meaningElement;
let sentenceElement;

async function get_total_review_word(word_id) {
  return request(`/total_review_memorization/total/${word_id}`);
}

async function showNormal() {
  //normal showing
  const response = await get_total_review_word(word_id);
  if (!response.ok) {
    console.log("no response")
    display(true, document, show_count);
    return;
  }
  const text = await response.text();
  let jsondata = JSON.parse(text);
  if (text === NO_WORD_LEFT) {
    console.log("display true")
    display(true, document, show_count);
  } else if (jsondata.word === undefined) {
    console.log("undefined jsondata.word")
    end_stage(true);
  } else {
    // console.log("text is good state")
    display(false, document, show_count);
    show_word_info(jsondata);
    if (jsondata.id) {
      word_id = jsondata.id;
    }
    show_count++;
  }
}

async function circulating() {
  show_count = 0;
  is_end_stage = false;
  if (show_count !== 0 && show_count % ONE_TURN === 0) {
    end_stage(true);
  } else {
    end_stage(false);
  }
  if (word_id > 0 && show_count % ONE_TURN !== 0) {
    request(`/plus/total/${word_id}`).then((response) =>
      response.text().then(function (text) {
        let previous_status = JSON.parse(text);
        return_history.push(previous_status);
      })
    );
  }
  word_id = startup_index - 1;
  show_count++;
  await showNormal(get_total_review_word);
  show_count--;
}

async function start_total() {
  is_end_stage = false;
  show_count = 1;
  o_count = 0;
  if (show_count !== 0 && o_count >= ONE_TURN * 3) {
    display(true, document, show_count);
  } else {
    display(false, document, show_count);
  }
  await showNormal(get_total_review_word);
  show_count--;
  startup_index = word_id;
  console.log("startup", word_id);
  
}

async function left_click() {
  if (show_count !== 0 && wordInformationElement.style.display !== 'none') {
    if (word_id > 0 && !is_end_stage && o_count < ONE_TURN * 3) {
      //do plus if under 50
      const response = await request(`/plus/total/${word_id}`);
      console.log(`add ${word_id}`);
      const text = await response.text();
      let previous_status = JSON.parse(text);
      return_history.push(previous_status);
      console.log("what22");
      o_count += 1;
      if (show_count === ONE_TURN) {
        is_end_stage = true;
      }
    }
      if (show_count !== 0) {
        if (isStageEnded()) {
          return;
        }
        if (isTurnEnded(ONE_TURN)) {
          return;
        }
      }
      await showNormal(get_total_review_word);
  }
}

async function right_click() {
  if (show_count !== 0 && wordInformationElement.style.display !== 'none') {
    if (word_id > 0 && !is_end_stage && o_count < ONE_TURN * ONE_STAGE) {
      //do minus if under 50
      const response = await request(`/reset/total/${word_id}`)
      const text = await response.text()
      let previous_status = JSON.parse(text);
      return_history.push(previous_status);
      o_count -= previous_status.count;
      if (show_count === ONE_TURN) {
        is_end_stage = true;
      }
    } 
    if (show_count !== 0) {
      if (isStageEnded()) {
        return;
      }
      if (isTurnEnded(ONE_TURN)) {
        return;
      }
    }
    await showNormal(get_total_review_word);
  }
}

function reload_alert() {
  document.location.reload(true);
  alert("<새로고침> count는 저장되지만 1번 단어에서 재시작합니다.");
}

function first_load() {
    display(false, document, show_count);
    document.getElementsByClassName("all_clear")[0].style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", () => {

  wordInformationElement = document.querySelector(".word_information");
  englishElement = document.querySelector(".english");
  meaningElement = document.querySelector(".meaning");
  sentenceElement = document.querySelector(".sentence");
})