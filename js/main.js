const audiotheme = $('#audio-theme');
const mainboard = $('.main-board');
const audioclicks = $('#audio-click');
const pab = $(".PVB");
const back_alone = $('.back');
const tro_giup_list =  $('.tro-giup-list');
const chat_message = $('.chat-message')
const divquestion = $('#question')
const divanswer = $('#answers')
var timer;
var start_music_theme = false;
var mute = false;
var tro_giup = []
var id_quesion_next;
var dem = true;
window.onload = () => {
    fetch(Base_url+api_quesion) .then((response) => response.json()).then((data) => {
        for(let cauhoi of data ){
            let info;
            //câu hỏi
            !dataWeb.allquestion[cauhoi.id] ? (()=>{
                dataWeb.allquestion[cauhoi.id] = {
                    noidung: cauhoi.noi_dung,
                    answers: [],
                    true: cauhoi.true == 1 ? cauhoi.text : "",
                    linhvuc: cauhoi.ten_linh_vuc,
                    theloai: cauhoi.ten,
                    diem: cauhoi.diem
                }
                dataWeb.allquestion[cauhoi.id].answers.push(cauhoi.text)
            })() : (()=>{
                dataWeb.allquestion[cauhoi.id].answers.push(cauhoi.text)
                cauhoi.true == 1 ? dataWeb.allquestion[cauhoi.id].true = cauhoi.text : ""
            })();
            //thể loại
            info = dataWeb.allquestion[cauhoi.id]
            !dataWeb.alltheloai[info.theloai]  ? (()=>{
                dataWeb.alltheloai[info.theloai] = [];
                dataWeb.alltheloai[info.theloai].push(cauhoi.id)
            })() : dataWeb.alltheloai[info.theloai].some(id=> id == cauhoi.id) ? ""  : dataWeb.alltheloai[info.theloai].push(cauhoi.id)
        }
        $('#welcome').style.display = 'block';
        $('.parent').style.display = "none";
    }).catch(async (error) => {
        console.log(error);
        $('.error').style.display = "block";
        $('.parent').style.display = "none";
        await new Promise(resolve => setTimeout(resolve,5000))
        location.reload()
    });
}

function render(){
    $('#time').innerHTML = `30s`
    var indexidquesion = Math.floor(Math.random() * dataUser.questions.length);
    dataUser.id_question_ht = dataUser.questions[indexidquesion]
    var quesion = dataWeb.allquestion[dataUser.id_question_ht];
    
    dataUser.questions.splice(indexidquesion,1)

    !dataUser.questioned.some(id => id ==  dataUser.id_question_ht) ? dataUser.questioned.push(dataUser.id_question_ht) : "" ;
    var answer = "";
    for(var i=0; i < 4 ; i++){
        answer += `<div  id = "answer_${quesion.answers[i]}" class="answer" data-index = "${quesion.answers[i]}">${quesion.answers[i]}</div>`
    }
    $('#question').innerHTML = quesion.noidung;
    divanswer.innerHTML = answer;
    $('#linhvuc').innerHTML = quesion.linhvuc
    $('#point').innerHTML = dataUser.diem_htai
    $('#quesion-num').innerHTML = dataUser.question_num
    time()
}

async function checkanswer(e){
    var dung = dataWeb.allquestion[dataUser.id_question_ht].true
    if(e == dung){
        sound('final_answer.mp3',()=>{
            sound('correct_answer.mp3',()=> audiotheme.pause())
        })
    }else{
        sound('final_answer.mp3',()=>{
            sound('wrong_answer.mp3',()=> audiotheme.pause())
        })
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    document.getElementById('answer_' + dung).classList.add('quadrat')
    if(e == dung){
        await new Promise(resolve => setTimeout(resolve, 6000));
        nextquestion();
    }else{
        await new Promise(resolve => setTimeout(resolve, 6000));
        reset()
    }
}

function nextquestion(){
    clicked = false;
    $('#time').innerHTML = `30s`
    sound('next.mp3',() => {
        sound('question.mp3',()=>{
            audiotheme.play();
        })
    })
    answerother = []
    dataUser.question_num++
    dataUser.diem_htai += dataWeb.allquestion[dataUser.id_question_ht].diem
    if(dataUser.question_num > so_cau_hoi_cap_do[dataUser.capdo-1] || dataUser.questions.length == 0){
        dataUser.capdo++;
        dataUser.questions = dataWeb.alltheloai[dataUser.capdo];
        if(dataWeb.alltheloai[dataUser.capdo].length == 0){
            alert("Bạn đã trả lời hết câu hỏi của hệ thống")
            reset()
        }
    }
    render()
}
function time(){
    var timedd,timed = 30;
    timer = setInterval(()=>{
        timed--
        if(clicked == false && timed == 0){reset()}
        timed >= 10 ? timedd = timed : timedd = `0${timed}`
        $('#time').innerHTML = `${timedd}s`
    },1100)
}
function reset(){
    clicked = false
    clearInterval(timer)
    $('#time').innerHTML = `30s`
    $('#welcome').style.display = 'block';
    $("#PVB-main").style.display = "none";
    tro_giup = []
    answerother = []
    chat_message.innerHTML = ""
    for (var i = 0; i < 4 ; i++){
        if($(`.tro_giup_${i}`).src.endsWith("-off.png"))   $(`.tro_giup_${i}`).src= $(`.tro_giup_${i}`).src.replace("-off.png",".png")
    }
    dataUser = {
        id: "",
        capdo: 1,
        question_num: 1,
        diem_htai: 0,
        id_question_ht: 0,
        login: false,
        questioned : dataUser.questioned,
        questions: dataWeb.alltheloai[1]
    }
}
function sound (name,callback){
    if(!dataWeb.music) return
    audiotheme.src = `sound/${name}`;
    audiotheme.play();
    if(typeof callback == 'function'){
        audiotheme.onended = callback;
    }
}
console.log(dataWeb)