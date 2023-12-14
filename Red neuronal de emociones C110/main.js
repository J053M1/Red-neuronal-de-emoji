predicciones1="";
predicciones2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="foto" src="'+data_uri+'">';

    });
}
console.log("ml5 version", ml5.version);
clasificador=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NFYfZ72eH/model.json',modelloaded);
function modelloaded(){
    console.log("modelo activado");
}
function speak(){
    var convertir=window.speechSynthesis;
    dato1="la primera prediccion es"+predicciones1;
    dato2="la segunda prediccion es"+predicciones2;
    var decir=new SpeechSynthesisUtterance(dato1+dato2);
    convertir.speak(decir);                                             
}
function check(){
    img=document.getElementById("foto");
    clasificador.classify(img, gotresult);
}
function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        predicciones1=results[0].label;
        predicciones2=results[1].label;
        speak();
        if(results[0].label=="enojado"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
            
        }
        if(results[0].label=="Feliz"){
            document.getElementById("update_emoji").innerHTML="&#128522;";

        }
        if(results[0].label=="Triste"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(results[1].label=="enojado"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
        if(results[1].label=="Feliz"){
            document.getElementById("update_emoji2").innerHTML="&#128522;"; 
        }
        if(results[1].label=="Triste"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
    }


}
