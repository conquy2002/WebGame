 const $ = document.querySelector.bind(document);
 const $$ = document.querySelectorAll.bind(document);

const player = "F8_PLAYER";

const btnStart = $('.btn_Start');
const answers = $('#answers');
const audio = $('#audio');

const question = [
 { 
     question: "Câu hỏi 1: ",
     answer: [
         "Đáp án A",
         "Đáp án B",
         "Đáơ án C",
         "Đáp án D"
     ],
     true: 1
 },
 { 
     question: "Câu hỏi 2: ",
     answer: [
         "Đáp án A",
         "Đáp án B",
         "Đáơ án C",
         "Đáp án D"
     ],
     true: 3
 },
 { 
     question: "Câu hỏi 3: ",
     answer: [
         "Đáp án A",
         "Đáp án B",
         "Đáơ án C",
         "Đáp án D"
     ],
     true: 1
 },
]
const game = {
	clicked: false,
	currentIndex: 0,
	questionIndex: 0,
	diem: 0,
	timer: "",
	data: JSON.parse(localStorage.getItem(player)) || {},
	setdata: function(key,value) {
		this.data[key] = value;
		localStorage.setItem(player,JSON.stringify(value));
	},
	screen: function(msg){
		let screens = document.querySelectorAll('.game > div')
		screens.forEach((i)=>{
			i.style.display = 'none'
		})
		let Canshow = document.getElementById(msg);
		Canshow.style.display = 'block';
	},
	event: function(){
		//click start
		btnStart.onclick = ()=>{
			this.screen('questions');
			this.render(this.questionIndex);
			this.sound('start.mp3',() => {
				this.time()
				this.sound('question.mp3',()=>{
					audio.play();
				})
			})
		}
		//click câu trả lời
		answers.onclick = (e)=>{
			var target = e.target.closest('.answer')
			if(target){
				if(!this.clicked){
					target.classList.toggle('active');
					this.check(target.dataset.index)
					this.clicked = true
				}
			}
		}
	},
	check: async function(e){
		if(e == question[this.questionIndex].true){
			this.sound('final_answer.mp3',()=>{
				this.sound('correct_answer.mp3')
			})
		}else{
			this.sound('final_answer.mp3',()=>{
				this.sound('wrong.mp3')
			})
		}
		await new Promise(resolve => setTimeout(resolve, 5000));
		document.getElementById('answer_' + question[this.questionIndex].true).classList.add('quadrat');
		if(e == question[this.questionIndex].true){
			await new Promise(resolve => setTimeout(resolve, 6000));
			this.nextquestion();
		}else{
			await new Promise(resolve => setTimeout(resolve, 6000));
			this.reset()
		}
	},
	nextquestion: function(){
		clearInterval(this.timer)
		$('#time').innerHTML = `0 : 30`
		this.sound('next.mp3',() => {
			this.time()
			this.sound('question.mp3',()=>{
				audio.play();
			})
		})
		this.clicked = false;
		this.poin(this.questionIndex)
		this.questionIndex++
		this.render(this.questionIndex)
	},
	reset(){
		clearInterval(this.timer)
		this.screen('welcome')
		this.diem = 0
		audio.pause()
		$('#time').innerHTML = `0 : 30`
	},
	sound: function(name,callback){
		audio.src = `sound/${name}`;
		audio.play();
		if(typeof callback == 'function'){
			audio.onended = callback;
		}
	},
	render: function(question_num){
		this.setdata('question_num',question_num)
		this.setdata('Điểm',0)
		var renderquestion_num = question[question_num];
		var answer = "";
		for(let i in renderquestion_num.answer){
			answer += `<div  id = "answer_${i}" class="answer" data-index = "${i}">${renderquestion_num.answer[i]}</div>`
		}
		$('#question').innerHTML = renderquestion_num.question;
		answers.innerHTML = answer;
		$('#scoresindex').innerHTML = question_num + 1 ;
		$('#diem').innerHTML = this.diem
	},
	time: function(){
		var timedd,timed = 30;
		this.timer = setInterval(()=>{
			timed--
			if(this.clicked == false && timed == 0){this.reset()}
			timed >= 10 ? timedd = timed : timedd = `0${timed}`
			$('#time').innerHTML = `0 : ${timedd}`
		},1100)
	},
	poin: function(e){
		if(e <= 10) return this.diem += 10
		if(e <= 20) return this.diem += 20
		if(e <= 30) return this.diem += 30
		if(e > 30) return this.diem += 40
	},
	start: function(){
		this.screen('welcome')

		this.event()
	}
}
game.start()