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
    "RIGHTX4": 0,
    "LEFTX4": 0,
    "UPX4": 0,
    "DOWNX4": 0,
    "RIGHTX4": 0,
    "LEFTX8": 0,
    "UPX8": 0,
    "DOWNX8": 0,
    "RIGHTX8": 0,
    "LEFTX12": 0,
    "UPX12": 0,
    "DOWNX12": 0,
    "RIGHTX12": 0
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
    if (maxCount > 0) {
        console.log(mostPrevalentInput + " was selected");
        if (mostPrevalentInput.includes("X")) {
            console.log("Multi-step ");
            var baseInput = mostPrevalentInput.split("X")[0];
            var baseAmount = mostPrevalentInput.split("X")[1];
            simulateKeyPress(baseInput, 1 + baseAmount);
        } else {
            console.log("Single-step ");
            simulateKeyPress(mostPrevalentInput, 1);
        }
    }

}

function ClearInputData() {

    for (let k in userInputData) {
        userInputData[k] = 0;
    }
    updateInputTextLog();
}
