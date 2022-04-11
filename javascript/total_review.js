import { display } from './all_share.js';

let word_id = 0;
let return_history = [];
let show_count = 0;
let o_count = 0;
let startup_index = 0;
let is_end_stage = false;
let one_turn = 0

function circulating() {
  show_count = 0;
  is_end_stage = false;
  if (show_count !== 0 && show_count % one_turn === 0) {
    end_stage(true);
  } else {
    end_stage(false);
  }
  if (word_id > 0 && show_count % one_turn !== 0) {
    fetch(`http://127.0.0.1:8000/plus/total/${word_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/text",
      },
    }).then((response) =>
      response.text().then(function (text) {
        let previous_status = JSON.parse(text);
        return_history.push(previous_status);
      })
    );
  }
  show_count++;
  word_id = startup_index - 1;
  if (show_count % one_turn !== 0) {
    fetch(
      `http://127.0.0.1:8000/total_review_memorization/total/${word_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/text",
        },
      }
    ).then((response) =>
      response.text().then(function (text) {
        if (!response.ok) {
          display(true, document, show_count);
          return;
        }

        if (text === "NO WORD LEFT" || text === undefined) {
          display(true, document, show_count);
        } else {
          display(false, document, show_count);
          let jsondata = JSON.parse(text);
          document.getElementsByClassName("english")[0].innerHTML =
            jsondata.word;
          document.getElementsByClassName("meaning")[0].innerHTML =
            jsondata.meaning;
          document.getElementsByClassName("sentence")[0].innerHTML =
            jsondata.sentence;
          if (jsondata.id) {
            word_id = jsondata.id;
          }
        }
      })
    );
  }
}

function start_total() {
  is_end_stage = false;
  show_count = 1;
  o_count = 0;
  if (show_count !== 0 && o_count >= one_turn * 3) {
    display(true, document, show_count);
  } else {
    display(false, document, show_count);
  }
  if (show_count % one_turn !== 0) {
    fetch(
      `http://127.0.0.1:8000/total_review_memorization/total/${word_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/text",
        },
      }
    ).then((response) =>
      response.text().then(function (text) {
        if (!response.ok) {
          display(true, document, show_count);
          return;
        }

        let jsondata = JSON.parse(text);
        document.getElementsByClassName("english")[0].innerHTML = jsondata.word;
        document.getElementsByClassName("meaning")[0].innerHTML =
          jsondata.meaning;
        document.getElementsByClassName("sentence")[0].innerHTML =
          jsondata.sentence;
        if (jsondata.id) {
          word_id = jsondata.id;
        }
        startup_index = word_id;
        console.log("startup", word_id);
      })
    );
  }
}

const request = (url) => fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/text",
    },
  });

async function left_click() {
 if (word_id > 0 && !is_end_stage && o_count < one_turn * 3) {
    //do plus if under 50
    const response = await request(`http://127.0.0.1:8000/plus/total/${word_id}`)
    const text = await response.text()
    let previous_status = JSON.parse(text);
    return_history.push(previous_status);
    console.log("what22");
    o_count++;
    if (show_count === one_turn) {
        is_end_stage = true;
    }
  }
  if (show_count !== 0 && o_count >= one_turn * 3) {
    //display
    console.log("hey1");
    display(true, document, show_count);
    return;
  } else {
    display(false, document, show_count);
  }
  if (show_count !== 0 && show_count % one_turn === 0 && o_count < one_turn * 3) {
    //end stage
    console.log("hey2");
    end_stage(true);
    return;
  } else {
    end_stage(false);
  }
  if (show_count % one_turn !== 0) {
    //normal showing
    await fetch(
      `http://127.0.0.1:8000/total_review_memorization/total/${word_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/text",
        },
      }
    ).then((response) =>
      response.text().then(function (text) {
        if (!response.ok) {
          display(true, document, show_count);
          return;
        }
        let jsondata = JSON.parse(text);
        if (text === "NO WORD LEFT"){
            display(true, document, show_count);
          } else if (jsondata.word === undefined) {
              end_stage(true);
          }else {
            display(false, document, show_count);
          
          document.getElementsByClassName("english")[0].innerHTML =
            jsondata.word;
          document.getElementsByClassName("meaning")[0].innerHTML =
            jsondata.meaning;
          document.getElementsByClassName("sentence")[0].innerHTML =
            jsondata.sentence;
          if (jsondata.id) {
            word_id = jsondata.id;
          }
          show_count++;
        }
      })
    );
  }
}

async function right_click() {
  if (word_id > 0 && !is_end_stage && o_count < one_turn * 3) {
    //do minus if under 50
    const response = await request(`http://127.0.0.1:8000/reset/total/${word_id}`)
    const text = await response.text()
    let previous_status = JSON.parse(text);
    return_history.push(previous_status);
    o_count -= previous_status.count;
    if (show_count === one_turn ) {
        is_end_stage = true;
    }
  } 
  if (show_count !== 0 && o_count >= one_turn * 3) {
    //display
    display(true, document, show_count);
    return;
  } else {
    display(false, document, show_count);
  }
  if (show_count !== 0 && show_count % one_turn === 0) {
    //end stage
    end_stage(true);
    return;
  } else {
    end_stage(false);
  }
  if (show_count % one_turn !== 0) {
    //normal showing
    fetch(
      `http://127.0.0.1:8000/total_review_memorization/total/${word_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/text",
        },
      }
    ).then((response) =>
      response.text().then(function (text) {
        if (!response.ok) {
          display(true, document, show_count);
          return;
        }
        let jsondata = JSON.parse(text);
        if (text === "NO WORD LEFT"){
          display(true, document, show_count);
        } else if (jsondata.word === undefined) {
            end_stage(true);
        }else {
          display(false, document, show_count);
          
          document.getElementsByClassName("english")[0].innerHTML =
            jsondata.word;
          document.getElementsByClassName("meaning")[0].innerHTML =
            jsondata.meaning;
          document.getElementsByClassName("sentence")[0].innerHTML =
            jsondata.sentence;
          if (jsondata.id) {
            word_id = jsondata.id;
          }
          show_count++;
        }
      })
    );
  }
}

function reload_alert() {
  document.location.reload(true);
  alert("<새로고침> count는 저장되지만 1번 단어에서 재시작합니다.");
}

function end_stage(isend) {
  if (isend) {
    document.getElementsByClassName("end_of_stage")[0].style.visibility =
      "visible";
    document.getElementsByClassName("english")[0].style.visibility = "hidden";
    document.getElementsByClassName("meaning")[0].style.visibility = "hidden";
    document.getElementsByClassName("sentence")[0].style.visibility = "hidden";
    if(o_count >= 3 * one_turn) {
        document.getElementsByClassName("end_of_stage")[0].style.visibility = "hidden";
        document.getElementsByClassName("all_clear")[0].style.visibility = "visible";
    }
  } else {
    if (show_count === 0) {
      document.getElementsByClassName("display")[0].style.visibility =
        "visible";
      document.getElementsByClassName("english")[0].style.visibility = "hidden";
      document.getElementsByClassName("meaning")[0].style.visibility = "hidden";
      document.getElementsByClassName("sentence")[0].style.visibility =
        "hidden";
    } else {
      document.getElementsByClassName("end_of_stage")[0].style.visibility =
        "hidden";
      document.getElementsByClassName("english")[0].style.visibility =
        "visible";
      document.getElementsByClassName("meaning")[0].style.visibility =
        "visible";
      document.getElementsByClassName("sentence")[0].style.visibility =
        "visible";
    }
  }
}

function reset_exec() {
  display(false, document, show_count);
  let status = return_history.pop();
  fetch(
    `http://127.0.0.1:8000/real_id/total/${status.real_id}/${status.count}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/text",
      },
    }
  ).then((response) =>
    response.text().then(function (text) {
      let jsondata = JSON.parse(text);
      document.getElementsByClassName("english")[0].innerHTML = jsondata.word;
      document.getElementsByClassName("meaning")[0].innerHTML =
        jsondata.meaning;
      document.getElementsByClassName("sentence")[0].innerHTML =
        jsondata.sentence;
      if (jsondata.id) {
        word_id = jsondata.id;
      }
      show_count--;
      o_count--;
    })
  );
}

function first_load() {
    const temp = 
        fetch(`http://127.0.0.1:8000/total_review_len/total`, {
          method: "GET",
          headers: {
            "Content-Type": "application/text",
          },
        }).then(
            response => response.json()
        ).then(response => {
            one_turn = Number(response);
        });
    display(false, document, show_count);
    document.getElementsByClassName("all_clear")[0].style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", () => {
    first_load();
})