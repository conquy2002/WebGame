const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const Base_url = 'http://127.0.0.1:8000/api'
const api_quesion = "/question"

const dataWeb = {
    alltheloai: new Object(),
    allquestion: new Object()
}
var dataUser = {
    id: "",
    capdo: 1,
    question_num: 1,
    diem_htai: 0,
    id_question_ht: 0,
    login: false,
    questioned : new Array(),
    questions: new Array()
}

const so_cau_hoi_cap_do = [5,10,10] // <=> cấp độ 1,2,3,.........


