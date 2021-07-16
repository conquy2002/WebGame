

class questions{
    constructor(num){
        this.num = num;
        this.questionNum = question[this.num];
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
    
    answer_true(){
        return question[this.num].true
    } 
}