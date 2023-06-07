// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/TCh3zPme1/";
var seconds = 00;
var tens = 00;
appendTens = document.getElementById("tens");
appendSeconds = document.getElementById("seconds");
var Interval;
let flage = 0;
let mycount= 0;
let flage1 = 0;
let mycount1=0;
let flage2 = 0;
let mycount2=0;

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
const init = async()=>{
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 250, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
    Starttime()
    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

const loop = async() => {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
  const predict = async()=> {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(0)*100 + " %";
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
        let a1 =prediction[0].probability;
        let a2 =prediction[1].probability;
        let a3 =prediction[2].probability;
        if (a1>0.9){
            if (flage==0){
                mycount++;
                document.getElementById("mycount").innerHTML=mycount;
                flage = 1;
                return mycount;
            }
        }else{
            flage=0;
        }
        if (a2>0.9){
            if (flage1==0){
                mycount1++;
                document.getElementById("mycount1").innerHTML=mycount1;
                flage1 = 1;
                return mycount1;
            }
        }else{
            flage1=0;
        }
        if (a3>0.99){
            if (flage2==0){
                mycount2++;
                document.getElementById("mycount2").innerHTML=mycount2;
                flage2 = 1;
                return mycount2;
            }
            
        }else{
            flage2=0;
        }
        let myfunction = (a,b,c) => a+b+c;
        document.getElementById("max").innerHTML= myfunction(mycount,mycount1,mycount2);
    }
    const Starttime = async()=>{
        clearInterval(Interval);
        Interval = setInterval(startTimer,150);
    }

    const Reset = async() => {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    }

    const startTimer = async()=> {
        tens++;

        if (tens < 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;
        }

        if (tens > 60) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds ==3 ) {
            appendSeconds.innerHTML = seconds;
            clearInterval(Interval);
            webcam.stop();
        }
    }
