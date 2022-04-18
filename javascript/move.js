const OFFSET_MAX = 100000000;

let word_id = 0;
let return_history = [];
let show_count = 0;
let o_count = 0;
let startup_index = 0;
let offset_index = OFFSET_MAX;
let is_end_stage = false;

const ONE_TURN = 50;
const ONE_STAGE = 3;
const NO_WORD_LEFT = "NO WORD LEFT";

let wordInformationElement;
let englishElement;
let meaningElement;
let sentenceElement;

async function circulating() {
  show_count = 0;
  is_end_stage = false;
  let max_len = get_max_len();
  if (show_count !== 0 && (show_count % ONE_TURN === 0 || word_id >= max_len)) {
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
  await showNormal();
  show_count--;
}

async function next_fifty() {
  offset_index += ONE_TURN;
  is_end_stage = false;
  show_count = 1;
  o_count = 0;
  request(`/setting_date/total`).then((response) => console.log(response));

  let max_len = get_max_len();
  if (show_count !== 0 && o_count >= ONE_TURN * 3) {
    display(true, document, show_count);
  } else {
    display(false, document, show_count);
  }
  await showNormal();
  show_count--;
  startup_index = word_id;
  console.log("startup", word_id);
}

async function left_click() {
  if (show_count !== 0 && wordInformationElement.style.display !== 'none') {
    let max_len = get_max_len(); //watch max len
    if (word_id > 0 && !is_end_stage && o_count < ONE_TURN * ONE_STAGE) {
      //do plus if under 50
      const response = await request(`/plus/total/${word_id}`);
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
      if (isTurnEnded(max_len)) {
        return;
      }
    }

    showNormal();
  }
}

async function right_click() {
  if (show_count !== 0 && wordInformationElement.style.display !== 'none') {
    let max_len = get_max_len(); //watch
    if (word_id > 0 && !is_end_stage && o_count < ONE_TURN * ONE_STAGE) {
      //do minus if under 50
      const response = await request(`/reset/total/${word_id}`);
      const text = await response.text();
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
      if (isTurnEnded(max_len)) {
        return;
      }
    }

    showNormal();
  }
}

function reload_alert() {
  document.location.reload(true);
  alert("<새로고침> count는 저장되지만 1번 단어에서 재시작합니다.");
}

async function get_word(word_id, offset_index) {
  return request(`/memorization/total/${word_id}/${offset_index}`);
}

function get_max_len() {
  return Number(request(`/len/total`).text);
}

async function showNormal() {
  //normal showing
  const response = await get_word(word_id, offset_index);
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

document.addEventListener("DOMContentLoaded", () => {
  get_today(document);
  display(false, document, show_count);

  wordInformationElement = document.querySelector(".word_information");
  englishElement = document.querySelector(".english");
  meaningElement = document.querySelector(".meaning");
  sentenceElement = document.querySelector(".sentence");
});
