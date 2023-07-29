var collectionInterval =5000;

var userInputData = {
    "A": 0,
    "B": 0,
    "SEL": 0,
    "START": 0,
    "RIGHT": 0,
    "LEFT": 0,
    "UP": 0,
    "DOWN": 0,
    "R": 0,
    "L": 0
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

    if (mostPrevalentInput === undefined) {
        var randoms = ["RIGHT", "LEFT", "UP", "DOWN", "A", "B"];
        mostPrevalentInput = randoms[Math.floor(Math.random() * randoms.length)];
    }

    console.log(mostPrevalentInput + " was selected");
    simulateKeyPress(mostPrevalentInput);
    ClearInputData();
}

function ClearInputData() {

    for (let k in userInputData) {
        userInputData[k] = 0;
    }
    updateInputTextLog();
}
