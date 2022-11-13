music1 = "";
music2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

leftWristScore = 0;
rightWristScore = 0;

song1Status = "";
song2Status = "";

function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("leftWristScore = " + leftWristScore);
        console.log("rightWristScore = " + rightWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1Status = music1.isPlaying();
    song2Status = music2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if (song1Status == false) {
            music1.play();
            document.getElementById("songName").innerHTML = "Song Name = Song1";
        }
    }

    if (rightWristScore > 0.2) {
        circle(rightWristX, rightWristY, 20);
        music1.stop();
        if (song2Status == false) {
            music2.play();
            document.getElementById("songName").innerHTML = "Song Name = Song2";
        }
    }
}