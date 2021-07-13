class ui{
    constructor(){
        
    }
    show(screen){
        let screens = document.querySelectorAll('#game > div')
        screens.forEach((i)=>{
            i.style.display = 'none'
        })
        let Canshow = document.getElementById(screen);
        Canshow.style.display = 'block';
    }
    eventstartBtn(callback){
        let startBtn = document.getElementById('btn_Start');
        startBtn.addEventListener('click',callback)
    }
    
}