function setup() {
    c1=createCanvas(500,500)
    c1.center()
    v1=createCapture(VIDEO)
    v1.hide()
    mymodel=ml5.poseNet(v1,modelLoaded)
    mymodel.on('pose',gotPoses)

}
function modelLoaded(){
    console.log("My model is loaded :)")
}

lwx=0
lwy=0
rwx=0
rwy=0
kprw=0
kplw=0
function gotPoses(results){
    if(results.length>0){
        console.log(results)
        lwx=results[0].pose.leftWrist.x
        lwy=results[0].pose.leftWrist.y 
        rwx=results[0].pose.rightWrist.x
        rwy=results[0].pose.rightWrist.y
        kprw=results[0].pose.keypoints[10].score
        kplw=results[0].pose.keypoints[9].score
        console.log("x position of my left wrist is",lwx)
        console.log("y position of my left wrist is",lwy)
        console.log("x position of my right wrist is",rwx)
        console.log("y position of my right wrist is",rwy)
        
    }}


song1=""
song2=""
song1status=""
song2status=""

function preload(){
    song1=loadSound("Wellerman(PagalWorld).mp3")
    song2=loadSound("Believer(PagalWorld).mp3")
}

function draw() {
    image (v1,0,0,500,500)
    song1status=song1.isPlaying()
    song2status=song2.isPlaying()
    fill("red")
    if(kprw>0.2){
        circle(rwx,rwy,30)
        song1.stop()
        if(song2status==false){
            song2.play()
            document.getElementById("Song").innerHTML="Believer"
        }
    }

    if(kplw>0.2){
        circle(lwx,lwy,30)
        song2.stop()
        if(song1status==false){
            song1.play()
            document.getElementById("Song").innerHTML="Wellerman"
        }
    }

}