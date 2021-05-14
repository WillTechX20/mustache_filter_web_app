var canvas=null;
var video=null;
var poseNet=null;
var brownMustacheImg=null;
var brownMustacheXNum=null;
var brownMustacheYNum=null;

function preload(){
    brownMustacheImg=loadImage('images/brown_mustache.png');
}

function onModelLoaded(){
    console.log('PoseNet is Initialized!');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        brownMustacheXNum=results[0].pose.nose.x-50;
        brownMustacheYNum=results[0].pose.nose.y-50;
        console.log('Mustache X: '+brownMustacheXNum);
        console.log('Mustache Y: '+brownMustacheYNum);
    }
}

function setup(){
    canvas=createCanvas(300, 300);
    video=createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
    poseNet=ml5.poseNet(video, onModelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 300, 300);
    image(brownMustacheImg, brownMustacheXNum, brownMustacheYNum, 100, 100);
}

function takeSnapshot(){
    save(prompt('Please enter a name for your image: ')+'.png');
}