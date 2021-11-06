quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear"]
var random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1)
sketch=quick_draw_data_set[random_number]
document.getElementById("draw").innerHTML="sketchtobedrawn"+sketch
console.log(sketch)

var timer=0
var score=0

function setup(){
    canvas=createCanvas(300,300)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas)
    synth=window.speechSynthesis
}
 function preload(){
     classifier=ml5.imageClassifier('DoodleNet')
 }
   
 function clearCanvas(){
     background("white")
 }

 function draw(){
     strokeWeight(13)
     stroke(0)
     if (mouseIsPressed) {
         line(pmouseX,pmouseY,mouseX,mouseY)
     }
 }

 function classifyCanvas(){
     classifier.classify(canvas,gotresult)
 }
 
 function gotresult(error,results){
if (error) {
    console.log(error)
} else {
    console.log(results);
    document.getElementById("label").innerHTML='label;'+results[0].label
    document.getElementById("confidence").innerHTML='confidence;'+Math.round(results[0].confidence*100)+"%"
    utterthis=new SpeechSynthesisUtterance(results[0].label)
    synth.speak(utterthis)
}

if (sketch==results[0].label) {
    score=score+10
    document.getElementById("score").innerHTML="score "+score
}
timer++
document.getElementById("timer").innerHTML='timer'+timer
console.log(timer)
if (timer>300) {
    timer=0
}
 }
 

