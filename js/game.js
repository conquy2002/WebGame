 const $ = document.querySelector.bind(document);
 const $$ = document.querySelectorAll.bind(document);

const player = "F8_PLAYER";

const btnStart = $('.btn_Start');
const answers = $('#answers');
const audio = $('#audio');
fetch(Base_url+api_quesion) .then((response) => response.json()).then((data) => handleData(data))

function handleData(question){
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
						clearInterval(this.timer)
						target.classList.toggle('active');
						this.check(target.dataset.index)
						this.clicked = true
					}
				}
			}
		},
		check: async function(e){
			
			var dung = question[this.questionIndex].dap_an_dung == "A" ? 0 : question[this.questionIndex].dap_an_dung == "B" ? 1 : question[this.questionIndex].dap_an_dung == "C" ? 2 : 3 ;
			if(e == dung){
				this.sound('final_answer.mp3',()=>{
					this.sound('correct_answer.mp3')
				})
			}else{
				this.sound('final_answer.mp3',()=>{
					this.sound('wrong_answer.mp3')
				})
			}
			
			await new Promise(resolve => setTimeout(resolve, 5000));
			document.getElementById('answer_' + dung).classList.add('quadrat');
			if(e == dung){
				await new Promise(resolve => setTimeout(resolve, 6000));
				this.nextquestion();
			}else{
				await new Promise(resolve => setTimeout(resolve, 6000));
				this.reset()
			}
		},
		nextquestion: function(){
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
			$('#scoresindex').innerHTML = 0;
			$('#diem').innerHTML = 0;
			$('#linhvuc').innerHTML = "";
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
			for(var i=0; i < 4 ; i++){
				answer += `<div  id = "answer_${i}" class="answer" data-index = "${i}">${renderquestion_num['dap_an_'+i]}</div>`
			}
			$('#question').innerHTML = renderquestion_num.noi_dung;
			answers.innerHTML = answer;
			$('#scoresindex').innerHTML = question_num + 1 ;
			$('#diem').innerHTML = this.diem
			$('#linhvuc').innerHTML = linhvuc(renderquestion_num.linh_vuc_id)
			console.log(renderquestion_num.dap_an_dung)
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
}

function linhvuc(id){
	switch(id){
		case 1:
			return 'Thể thao'
		case 2:
			return 'Lịch sử'
		case 3:
			return 'Âm nhạc – Phim'
		case 4:
			return 'Địa lý'
		case 5:
			return 'Văn học'
		case 6:
			return 'Y học'
		case 7:
			return 'Văn hoá - Sự kiện'
		case 8:
			return 'Khoa học tự nhiên'
		case 9:
			return 'Anime - Manga'
		case 10:
			return 'Viễn Tưởng'
	}
}
