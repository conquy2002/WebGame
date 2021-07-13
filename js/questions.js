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
        true: 0
    },
]

class questions{
    constructor(num){
        this.num = num;
        this.questionNum = question[this.num];
        this.clicked = false;
    }
    show(){
        document.getElementById('question').innerHTML = this.questionNum.question;
        for (let i = 1; i < 5; i++) {
            document.getElementById('answers_' + i).innerHTML = this.questionNum.answer[i-1];
        }
    }
    eventClickanwer(callback){
        for (let i = 1; i < 5; i++) {
            document.getElementById('answers_' + i).addEventListener('click',() => {
                callback(i)
            });
        }  

    }
    async checkanswer(answers){
        if(!this.clicked){
            document.getElementById('answers_' + answers).style.backgroundColor = 'green';
            document.getElementById('answers_' + answers).style.color = 'white'
            this.clicked = true
        }
       
        if(answers == question[this.num].true){
            document.getElementById('answers_' + answers).classList.add('quadrat')
        }
        await new Promise(resolve => setTimeout(resolve, 5 * 1000));
        document.getElementById('answers_' + question[this.num].true).classList.add('quadrat')
    }
    
}