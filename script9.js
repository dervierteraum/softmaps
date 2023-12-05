let linePoints = []; // Array to store points of the line
let angle = 0; // Angle for the sine wave
let frequency = 0.0001; // Controls the frequency of the wave
let amplitude = 700; // Controls the amplitude of the wave
let segmentWidth = 5; // Width of each line segment
let direction = 1; // 1 for moving right, -1 for moving left
var song;
var button;
var amp;
var volHistory = [];
var bassHistory = [];
var midHistory = [];
var trebleHistory = [];
let vid;
let playing = false;

function toggleSong(){
  if (song.isPlaying()){
    song.pause();
    button.html('start sound mapping');
  } else {
    song.play();
    button.html('stop sound mapping');

  }
}



// function windowResized() { 
//     if(windowWidth < 550) {
//         size = 10;
//     } else {
//         size = 100;
//     }
// }

function preload(){
  song = loadSound("assets/new-sound3.mp3");
  // vid = createVideo(['testunderwater3.mov', 'testunderwater3.webm']);
  // vid = createVideo(['pool13.mp4']);
  gif_loadImg = loadImage("assets/feet-pool.gif");
  // gif_loadImg2 = loadImage("underwater2.gif");
  // vid.size(width, height);
  // vid.hide();
  // vid.loop();

  // gif_loadImg.resize(windowWidth, 0);
  // gif_createImg = createImg("test-dither2.gif");
}
function toggleVid() {
  if (playing) {
    vid.pause();
    button3.html('play video');
  } else {
    vid.loop();
    button3.html('pause video');
  }
  playing = !playing;
}

function setup() {
  // createCanvas(1280,720);
  createCanvas(windowWidth,windowHeight);
  button=createButton('start or stop mapping');
  button.mousePressed(toggleSong);
  button.position(windowWidth/20,windowHeight/20)
  //button3 = createButton('play');
  //button3.position(windowWidth/15, windowHeight/8 )
  //button3.mousePressed(toggleVid); // attach button listener
  song.play();
  amp = new p5.Amplitude();
  freq = new p5.FFT();

  background(0);

  initializeLine();
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);



  var vol = amp.getLevel();
  volHistory.push(vol);

   freq.analyze();
      let bassFreq = freq.getEnergy("bass");
      // console.log("bass"+bassFreq);

      let bassMap = map(bassFreq, 0, 50, 0, 5);
      console.log("bassmap:" + bassMap);
      let midFreq = freq.getEnergy("lowMid");
      
      let midMap = map(midFreq, 0, 50, 0, 5);
      console.log("midmap:"+ midMap);
      let trebleFreq = freq.getEnergy("highMid");
      let trebMap = map(trebleFreq, 0, 50, 0, 5);
      // console.log("treble"+trebleFreq);
      console.log("trebmap:" + trebMap);
  //  // console.log(volHistory);


  for (var i = 0; i < volHistory.length; i++){
    var y = map(volHistory[i]*5, 0,1,height/1.1,0.5);
    // console.log(y);
    var y2 = map(100, 0,1,height/1.5,0.5);
    // console.log(y);
    fill(0, 0, 255);
    stroke(0,0,255);
    // stroke(255, 192, 203);
    ellipse(i, y, 5, 5);
    // point (i, y);
  }

 if (volHistory.length > width){
    volHistory.splice(0,1);
  }

 // if (bassFreq > 60){
 //    angle = bassFreq/2;
 //    amplitude=50;
 //    stroke(0, 255, 255);
 //    ellipse(100, 200, 100, 100);
 //  } else if (trebleFreq <10 ){
 //    amplitude=200;
 //    stroke(0, 0, 255);
 //    ellipse(400, 600, 100, 100);
 //  } else if (midFreq <5){
 //    stroke(255, 192, 203);
 //    amplitude=100;
 //    rect(300, 600, 100, 100);
 //  }


if (bassMap > 15.7){
    // angle = bassFreq/2;
    // amplitude=50;
    // stroke(0, 255, 255);
    ellipse(100, 200, 100, 100);
  } else if (trebMap >7.2 ){
    amplitude=300;

    stroke(0, 0, 255);
    fill(255, 146, 146);
    ellipse(400, 600, 100, 100);


  } else if (midMap <14){
    angle = midMap/2;
    stroke(255, 146, 146);
    amplitude=100;
    fill(255, 146, 146);
    rect(100, 300, 100, 100);
    fill(255, 146, 146);
  }
 // if (bassMap > 15.7){
 //    // angle = bassFreq/2;
 //    // amplitude=50;
 //    amplitude=100;
 //    // stroke(0, 255, 255);
 //    ellipse(100, 200, 100, 100);
 //  } else if (trebMap >7.5 ){
 //    amplitude=300;
 //     angle = trebleFreq/2;
 //    stroke(0, 0, 255);
 //    fill(255, 146, 146);
 //    ellipse(400, 600, 100, 100);


 //  } else if (midMap <14){
 //    angle = midMap/2;
 //    stroke(255, 146, 146);
 //    amplitude=100;
 //    fill(255, 146, 146);
 //    rect(100, 300, 100, 100);
 //    fill(255, 146, 146);
 //  }


  // if (bassMap > 70){

  //   // angle = bassFreq/2;
  //   // amplitude=50;
  //   // stroke(0, 255, 255);
  //   ellipse(100, 200, 100, 100);
  //   // console.log(bassFreq)
  // } else if (trebMap <45 ){
  //   amplitude=100;

  //   stroke(0, 0, 255);
  //   ellipse(400, 600, 100, 100);
 

  // } else if (midMap <30){
  //   angle = midMap/2;
  //   // frequency=0.0005
  //   stroke(255, 146, 146);
  //   amplitude=100;
  //   fill(255, 146, 146);
  //   rect(100, 300, 100, 100);
  //   fill(255, 146, 146);
  // }

  // Update the last point of the line based on a sine wave
  let endX = linePoints[linePoints.length - 1].x + segmentWidth * direction; // Move to the right or left
  let endY = height / 2 + sin(angle) * amplitude+(vol*100);

  // Add the new point to the array
  linePoints.push(createVector(endX, endY));

  
  // Draw multiple segments of the line
  for (let i = 0; i < linePoints.length - 1; i++) {
    line(linePoints[i].x, linePoints[i].y, linePoints[i + 1].x, linePoints[i + 1].y);
  }

  // Increment the angle for the sine wave
  angle += frequency*(vol*500);

  // Check if the line has reached the right or left side of the canvas
  if (endX > width || endX < 0) {
    // Reverse the direction
    direction *= -1;

    // Remove the last point to avoid overlapping when changing direction
    linePoints.pop();
  }
  // if (linePoints.length > width){
  //   linePoints.splice(0,1);
  // }
   // gif_createImg.position(50, 350);
  // background(clear);
}

function initializeLine() {
  // Initialize the array with the starting point of the line
  linePoints.push(createVector(0, height / 2));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // vid.size(width, height);
  // pixelSize = 8; // Reset the pixel size when the window is resized
}