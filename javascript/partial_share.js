export default function create_array(word_list, start_point, document_here) {
    fetch(`http://127.0.0.1:8000/${word_list}/total/`, {
        method:'GET',
        headers:{
            'Content-Type': 'application/text'
        }})
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