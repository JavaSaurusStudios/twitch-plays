var collectionInterval = 10000;
var timerResolution = 100;
var timerValue = 0;

var userInputKeys = [
    "A", "B", "SEL", "START", "R", "L", "RIGHT", "LEFT", "UP", "DOWN",
];

var userInputData = {};

function InitUserInput() {
    updateInputTextLog(userInputData);
    intervalId = setInterval(CollectInput, collectionInterval);
    intervalId2 = setInterval(setSliderWidth, timerResolution);
    ClearInputData();
}

function CollectInput() {
    if (executing) return;
    let mostPrevalentInput = '';
    let maxCount = 0;

    for (const input in userInputData) {
        if (userInputData[input] > maxCount) {
            maxCount = userInputData[input];
            mostPrevalentInput = input;
        }
    }

    if (maxCount > 0) {
        console.log(mostPrevalentInput + " was selected");
        if (mostPrevalentInput.includes("X")) {
            var baseInput = mostPrevalentInput.split("X")[0];
            var baseAmount = mostPrevalentInput.split("X")[1];
            SimulateKeyPress(baseInput, 1 + baseAmount);
        } else {
            SimulateKeyPress(mostPrevalentInput, 1);
        }
    }

    ClearInputData();

}

function ClearInputData() {
    timerValue = collectionInterval;
    userInputData = {};
    updateInputTextLog(userInputData);
}

function setSliderWidth() {
    const slider = document.getElementById('input-timer');
    if (executing) {
        slider.style.width = "260px";
    } else {
        timerValue -= timerResolution;
        slider.style.width = (260 * (timerValue / collectionInterval)) + "px";
    }
}