let img;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 360);
  img = loadImage("images/dancers.jpg", onImageReady);
}

function onImageReady() {
  poseNet = ml5.poseNet(onModelReady);
}

// when poseNet is ready, do the detection
function onModelReady() {
  console.log(img);

  // This sets up an event that listens to 'pose' events
  poseNet.on("pose", function(results) {
    console.log(results);
    poses = results;
    poseDetected();
  });
  poseNet.singlePose(img);
}

function poseDetected() {
  if (poses.length > 0) {
    console.log(poses);

    image(img, 0, 0, width, height);
    // drawSkeleton();
     drawKeypoints();
  }
}

// draw() will not show anything until poses are found

function draw() {}

// The following comes from https://ml5js.org/docs/posenet-webcam
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    console.log(poses);
    if (pose.keypoints) {
      for (let j = 0; j < pose.keypoints.length; j++) {
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        let keypoint = pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2) {
          fill(255);
          stroke(20);
          strokeWeight(4);
          ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
        }
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    
    let skeleton = poses[i].skeleton;
    console.log(poses[i]);
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      // stroke(255);
      strokeWeight(1);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}
