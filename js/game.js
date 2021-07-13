class game{
    constructor(){
        this.screen = new ui();
        this.screen.show('welcome');
        this.startSound = new sound('start.mp3')
        this.sound = new sound('theme.mp3')
        this.questionSound = new sound('question.mp3')
        this.sound.start();
       
        
        this.screen.eventstartBtn(()=>{
            this.start()
        })
        this.questionnum = 0 ;
        this.question = new questions(this.questionnum)
    }
    start(){
        this.sound.stop();
        this.screen.show('questions');
        this.startSound.start(() => {
            this.questionSound.start()
        })
        this.question.show();
        this.question.eventClickanwer((event)=>{
            this.question.checkanswer(event)
        })

    }
    
}

var g = new game();

