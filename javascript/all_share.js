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