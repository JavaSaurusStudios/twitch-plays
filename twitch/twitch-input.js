var collectionInterval = 5000;
var userInputKeys = [
    "A", "B", "SEL", "START", "R", "L", "RIGHT", "LEFT", "UP", "DOWN",
];

var userInputData = {};

function InitUserInput() {
    updateInputTextLog(userInputData);
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
            var baseInput = mostPrevalentInput.split("X")[0];
            var baseAmount = mostPrevalentInput.split("X")[1];
            SimulateKeyPress(baseInput, 1 + baseAmount);
        } else {
            SimulateKeyPress(mostPrevalentInput, 1);
        }
    }

}

function ClearInputData() {
    userInputData = {};
    updateInputTextLog(userInputData);
}
