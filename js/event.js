
//click tắt âm nền
$('.toggle-music-effect').onclick = function(){
    $('.fa-music').classList.toggle('color-black');
    if(dataWeb.game == true){
            sound('question.mp3',()=>{
            audiotheme.play();
        })
    }else{
        sound('theme.mp3',()=>{
            audiotheme.play();
        })
    }
    !dataWeb.music ? dataWeb.music = true : dataWeb.music = false;
    !start_music_theme ? audiotheme.play() : audiotheme.pause();
    !start_music_theme ? start_music_theme = true : start_music_theme = false;
    audioclicks.play()
}

//click bật âm
$('.toggle-sound-effect').onclick = function(){
    $('.fa-volume-up').classList.toggle('color-black');
    !mute ? mute = true : mute = false;
    audioclicks.muted = mute;
    audioclicks.play()
}

//các nút bám
mainboard.onclick =  function(e){
    if(e.target.closest(".button") || e.target.closest(".tro_giup")){
        audioclicks.play()
    }
}
// chơi 1 mình
pab.onclick = function() {
    $('#welcome').style.display = 'none';
    $("#PVB-main").style.display = "grid";

    dataUser.questions = []
    for(var i = 0; i <dataWeb.alltheloai[dataUser.capdo].length; i++) {
        dataUser.questions.push(dataWeb.alltheloai[dataUser.capdo][i])
    }
    dataWeb.game = true
    render()
}
//click quay lại
back_alone.onclick = function(){
    $('#welcome').style.display = 'block';
    $("#PVB-main").style.display = "none";
    dataWeb.game = false
    clearInterval(timer)
}
//click chơi lại
$('.reset').onclick = function(){
    clicked = false
    clearInterval(timer)
    $('#time').innerHTML = `30s`
    dataUser.capdo = 1;
    dataUser.question_num = 1
    tro_giup = []
    answerother = []
    chat_message.innerHTML = ""

    for (var i = 0; i < 4 ; i++){
        if($(`.tro_giup_${i}`).src.endsWith("-off.png"))   $(`.tro_giup_${i}`).src= $(`.tro_giup_${i}`).src.replace("-off.png",".png")
    }
    dataUser.questions = dataWeb.alltheloai[dataUser.capdo];
    if(dataUser.questions.length == 0){
        dataUser.capdo++;
        dataUser.questions = dataWeb.alltheloai[dataUser.capdo];
        if(dataWeb.alltheloai[dataUser.capdo].length == 0){
            alert("Bạn đã trả lời hết câu hỏi của hệ thống")
            reset()
        }
    }
    render()
}

var answerother = []
//click trwoj giúp
for (let i = 0; i < 4; i++) {
    $(`.tro_giup_${i}`).onclick = function(){
        if(tro_giup.indexOf(i) == -1 ){
            
            $(`.tro_giup_${i}`).src= $(`.tro_giup_${i}`).src.replace(".png","-off.png")
            tro_giup.push(i);
            var anwertrue = dataWeb.allquestion[dataUser.id_question_ht].true;
            switch(i){
                case 0:
                    for(let answer of dataWeb.allquestion[dataUser.id_question_ht].answers){
                        if(answer == anwertrue) continue
                        answerother.push(answer)
                    }
                    var random = Math.floor(Math.random() * answerother.length)
                    answerother.splice(random,1)
                    answerother.forEach(a =>  $(`#answer_${a}`).innerHTML = "")
                    break;
                case 1:
                    chat_message.innerHTML += `<div class="message ">
                        <small class="message-name">Hệ Trống: </small>
                        <strong class="message-content">Người thân của bạn chọn đáp án ${dataWeb.allquestion[dataUser.id_question_ht].true} </strong>
                        <small class="message-date"><em>14:24:44, 28/7/2021</em></small></div>
                    </div>`
                    break;
                case 2:
                    var msg = "",phantram=[],ptram = 0;
                    for (let index = 0; index < 4; index++) {
                        var random = Math.floor(Math.random() * (30 - 1)) + 1
                        if(index == 3) random = 100 -  (phantram[0] + phantram[1] + phantram[2])
                        phantram.push(random)
                    }                 
                    for(var j = 0; j < 4 ; j++){
                        var dapan = dataWeb.allquestion[dataUser.id_question_ht].answers[j];
                        ptram = phantram[j];
                        if(dapan == dataWeb.allquestion[dataUser.id_question_ht].true){ptram = phantram[0]} 
                        msg += `<strong class="message-content">Khán giải bình chọn : ${dapan} (${ptram}%)</strong>` 
                        // phantram.splice(1,1)
                    } 
                    console.log(phantram)
                    chat_message.innerHTML += `<div class="message ">
                        <small class="message-name">Hệ Trống: </small>
                        ${msg}
                        <small class="message-date"><em>14:24:44, 28/7/2021</em></small></div>
                    </div>`
                    break;
                case 3:
                    chat_message.innerHTML += `<div class="message ">
                        <small class="message-name">Hệ Trống: </small>
                        <strong class="message-content">Nhà thông thái chọn đáp án ${dataWeb.allquestion[dataUser.id_question_ht].true} </strong>
                        <small class="message-date"><em>14:24:44, 28/7/2021</em></small></div>
                    </div>`
                    break;
            }
        }
        
        return;
    }
}
//click câu trả lời
var clicked = false;
answers.onclick = (e)=>{
    var target = e.target.closest('.answer')
    if(tro_giup.some(a => a == 0)){
        if(answerother.some(b => b == target.dataset.index)) return
    }
    if(target){
        if(!clicked){
            clearInterval(timer)
            target.classList.toggle('active');
            checkanswer(target.dataset.index)
            clicked = true
        }
    }
}
//chat_message
document.addEventListener('keydown',(event)=>{
    console.log(event)
    if(event.key == "Enter"){
        chat_message.innerHTML += `
        <div class="self">
            <small class="message-name ">Hệ Trống: </small>
            <strong class="message-content ">${document.getElementById("mymessage").value} </strong>
            <small class="message-date "><em>14:24:44, 28/7/2021</em></small></div>
        </div>
           
       `
        document.getElementById("mymessage").value = ""
    }
})