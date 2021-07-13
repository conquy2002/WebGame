class game{
    constructor(){
        this.screen = new ui();
        this.screen.show('welcome');
        
        this.sound = new sound('theme.mp3')
        // this.sound.start();
        this.startSound = new sound('start.mp3')
        this.questionSound = new sound('question.mp3')
        this.screen.eventstartBtn(()=>{
            this.start()

        })
    }
    start(){
        this.screen.show('questions');
        this.startSound.start(()=>{
            this.questionSound.start()
        })
    }
    
}

var g = new game();

