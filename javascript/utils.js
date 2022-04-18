const API_HOST = "http://127.0.0.1:8000"

const request = (url) => fetch(API_HOST + url, {
  method: "GET",
  headers: {
    "Content-Type": "application/text",
  },
});

function display(end_of_word, document_here, showing_count) {
if (end_of_word) {
  document_here.getElementsByClassName("display")[0].style.visibility = "visible";
  document.querySelector(".word_information").style.display = "none";
} else {
  if (showing_count === 0) {
    console.log("this problem")
    document_here.getElementsByClassName("display")[0].style.visibility = "visible";
    document.querySelector(".word_information").style.display = "none";
    document_here.getElementsByClassName("end_of_stage")[0].style.visibility = "hidden";
  } else {
    document_here.getElementsByClassName("end_of_stage")[0].style.visibility = "hidden";
    document_here.getElementsByClassName("display")[0].style.visibility = "hidden";
    document.querySelector(".word_information").style.display = "block";
  }
}
}

function create_array(word_list, start_point, document_here) {
    request(`/${word_list}/total/`)
    .then((response) => response.text().then(function (myjsonarray) {
            let list_start_point = document_here.getElementsByClassName(start_point)[0]
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

function create_array(word_list, start_point, document_here) {
  request(`/${word_list}/total/`)
  .then((response) => response.text().then(function (myjsonarray) {
          let list_start_point = document_here.getElementsByClassName(start_point)[0]
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

function get_today(document_here) {
  var dt = new Date();
  const year = dt.getFullYear();
  const month = dt.getMonth();
  const date = dt.getDate();
  document_here.getElementsByClassName('current_date')[0].innerHTML = `${year}년 ${month >= 10 ? month : '0' + (month+1)}월 ${date >= 10 ? date : '0' + date}일`;
}

function display(end_of_word, document_here, showing_count) {
if (end_of_word) {
  document_here.getElementsByClassName("display")[0].style.visibility = "visible";
  document.querySelector(".word_information").style.display = "none";
} else {
  if (showing_count === 0) {
    console.log("this problem")
    document_here.getElementsByClassName("display")[0].style.visibility = "visible";
    document.querySelector(".word_information").style.display = "none";
    document_here.getElementsByClassName("end_of_stage")[0].style.visibility = "hidden";
  } else {
    document_here.getElementsByClassName("end_of_stage")[0].style.visibility = "hidden";
    document_here.getElementsByClassName("display")[0].style.visibility = "hidden";
    document.querySelector(".word_information").style.display = "block";
  }
}
}

function isStageEnded() {
  let isEnd = false;
  if (o_count >= ONE_TURN * ONE_STAGE) {
    isEnd = true;
  }
  display(isEnd, document, show_count);
  return isEnd;
}

function isTurnEnded(max_len) {
  let isEnd = false;
  if (
    (show_count % ONE_TURN === 0 || word_id >= max_len) &&
    o_count < ONE_TURN * ONE_STAGE
  ) {
    isEnd = true;
  }
  end_stage(isEnd);
  return isEnd;
}

function end_stage(isend) {
  if (isend) {
    document.querySelector(".end_of_stage").style.visibility = "visible";
    wordInformationElement.style.display = "none";
    if (offset_index >= OFFSET_MAX) {
      offset_index = word_id;
    }
  } else {
    if (show_count === 0) {
      document.querySelector(".display").style.visibility = "visible";
      wordInformationElement.style.display = "none";
    } else {
      document.querySelector(".end_of_stage").style.visibility = "hidden";
      wordInformationElement.style.display = "block";
    }
  }
}

function reset_exec() {
  if (return_history.length !== 0) {
    display(false, document, show_count);
    let status = return_history.pop();
    request(`/real_id/total/${status.real_id}/${status.count}`).then((response) =>
      response.text().then(function (text) {
        let jsondata = JSON.parse(text);
        englishElement.innerHTML = jsondata.word;
        meaningElement.innerHTML = jsondata.meaning;
        sentenceElement.innerHTML = jsondata.sentence;
        if (jsondata.id) {
          word_id = jsondata.id;
        }
        show_count--;
        o_count--;
      })
    );
  }
  else {
    console.log("no history");
  }
}

function show_word_info(jsondata) {
  englishElement.innerHTML = jsondata.word;
  meaningElement.innerHTML = jsondata.meaning;
  sentenceElement.innerHTML = jsondata.sentence;
}