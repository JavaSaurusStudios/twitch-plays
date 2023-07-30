var collectionInterval = 5000;
var userInputData = {
    "A": 0,
    "B": 0,
    "SEL": 0,
    "START": 0,
    "R": 0,
    "L": 0,
    "RIGHT": 0,
    "LEFT": 0,
    "UP": 0,
    "DOWN": 0,
    "RIGHTX2": 0,
    "LEFTX2": 0,
    "UPX2": 0,
    "DOWNX2": 0,
    "RIGHTX3": 0,
    "LEFTX3": 0,
    "UPX3": 0,
    "DOWNX3": 0,
};

function InitUserInput() {
    updateInputTextLog();
    intervalId = setInterval(CollectInput, collectionInterval);
}

function CollectInput() {
    let mostPrevalentInput = '';
    let maxCount = 0;

    for (const input in userInputData) {
        if (userInputData[input] > maxCount) {
            maxCount = userInputData[input];
            mostPrevalentInput = input;
        }
    }

    console.log(mostPrevalentInput + " was selected");
    if (input.includes("X")) {
        var baseInput = input.split("X")[0];
        var baseAmount = input.split("X")[1];
        simulateKeyPresses(baseInput, baseAmount);
    } else {
        simulateKeyPress(mostPrevalentInput);
    }
    ClearInputData();
}

function ClearInputData() {

    for (let k in userInputData) {
        userInputData[k] = 0;
    }
    updateInputTextLog();
}
