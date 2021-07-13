class sound{
    constructor(namefile){
        this.fileName = namefile;
        this.audio = new Audio('sound/'+ this.fileName);
        this.loaded = false;
        this.audio.addEventListener('canplaythrough',() => {
            this.loaded = true;
        })
        
    }
    start(oncallback){
        // if(this.loaded){
            this.audio.play();
            if(typeof callback == 'function'){
                this.audio.onended = oncallback;
            };
            
        // }
    }
    stop(){
        this.audio.pause();
    }
}