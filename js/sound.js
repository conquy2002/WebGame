const audio = document.querySelector('#audio');
const mute = document.querySelector('#mute');
var muteSound = false
const sound = {
    start: function(name,callback){
        audio.src = `sound/${name}`;
        audio.play();
        if(typeof callback == 'function'){
            audio.onended = callback;
        }; 
    },
    doc: function(text,callback){
        audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi&client=tw-ob`;
        audio.play();
        if(typeof callback == 'function'){
            audio.onended = callback;
        }; 
    },
    stop: function(){
        audio.pause();
    }
}
mute.onclick = function(){
    var x =  document.getElementById('line').classList.toggle('line1')
    if(muteSound){
        muteSound = false;
        audio.muted = false;
    }else{
        muteSound = true;
        audio.muted = true;
    }
}