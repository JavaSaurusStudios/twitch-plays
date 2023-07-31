var GAME;
var saveStateManager;
let typingTimer;
//https://twitchapps.com/tmi/
const keys = {
    "A": 0,
    "B": 1,
    "SEL": 2,
    "START": 3,
    "RIGHT": 4,
    "LEFT": 5,
    "UP": 6,
    "DOWN": 7,
    "R": 8,
    "L": 9
};

const emote_mapping = {
    1: "A",
    6: "B",
    555555558: "SEL",
    555555560: "START",
    555555562: "RIGHT",
    555555580: "LEFT",
    555555587: "UP",
    555555589: "DOWN",
    555555593: "R",
    555555597: "L"
};

function InitIRC() {
    const urlParams = new URL(window.location.toLocaleString()).searchParams;
    const channel = urlParams.get('channel');
    const oath = urlParams.get('oauth');

    if (urlParams.has('collect-time')) {
        collectionInterval = urlParams.get('collect-time') * 1000;
    }

    if (!urlParams.has('emote-mode')) {
        document.getElementById('emoteInputTextarea').style.display = 'none';
    }

    GAME = urlParams.get('game');
    ActivateFunctions();
    ComfyJS.Init(channel, oath);
    initEmulator();
    saveStateManager = new SaveStateManager(Iodine);
    InitUserInput();
}

function ActivateFunctions() {
    ComfyJS.onChat = (user, message, flags, self, extra) => {
        var input = message.toUpperCase();

        //map input by emotes
        var key;
        var count = 1;
        //EMOTE INPUT
        if (extra.messageEmotes) {
            key = Object.keys(extra.messageEmotes)[0];
            if (emote_mapping.hasOwnProperty(key)) {
                count = extra.messageEmotes[key].length;
                key = emote_mapping[key];
            }
            input = (key + (count > 1 ? "X" + count : "")).trim();
            //WORD INPUT
        } else {
            if (input.includes("X")) {
                key = Object.keys(input.split("X")[0])[0];
                count = Object.keys(input.split("X")[0])[1];
            } else {
                key = input.split(" ")[0];
                count = countWordInstances(input, key);
            }
            input = (key + (count > 1 ? "X" + count : "")).trim();
        }

        if (userInputKeys.indexOf(key) > -1) {
            console.log("Detected " + key + " " + count + " times --> " + input);
            userInputData[input] = (userInputData.hasOwnProperty(key) ? userInputData[input] : 0) + 1;
            console.log(userInputData);
            updateInputTextLog(userInputData);
        }
    }

    /*ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
        if( command === "test" ) {
          ComfyJS.Say( "replying to !test" );
        }
      }
*/
}

function SimulateKeyPress(x, amount) {
    Iodine.keyDown(keys[x]);
    setTimeout(() => {
        Iodine.keyUp(keys[x]);
        amount--;
        if (amount > 0) {
            SimulateKeyPress(x, amount);
        } else {
            ClearInputData();
        }
    }, 50);
}

function simulateKeyPress2(x, amount) {
    Iodine.keyDown(keys[x]);
    setTimeout(() => { Iodine.keyUp(keys[x]); ClearInputData() }, 100 * amount);
}

function updateInputTextLog(userInputData) {
    var textarea = document.getElementById('scrollingTextarea');
    textarea.value = "";
    // Add the new line to the end
    let lines = [];

    for (let k in sortValues(userInputData)) {
        lines.push(k + "\t" + userInputData[k]);
        if (lines.length == 10) break;
    }
    // Join the lines and set the updated content to the textarea
    textarea.value = lines.join('\n');
    // Scroll to the bottom after updating the content
    textarea.scrollTop = textarea.scrollHeight;
    // Initial timer setup
    // resetTextArea();
}

function addToTextLog(line) {
    var textarea = document.getElementById('scrollingTextarea');
    // Split the textarea content into lines
    const lines = textarea.value.split('\n');
    // Add the new line to the end
    lines.push(line);
    // If the number of lines exceeds the visible rows, remove the first line
    const maxVisibleRows = Math.floor(textarea.clientHeight / 20); // Assuming each row is around 20px
    if (lines.length > maxVisibleRows) {
        lines.shift();
    }
    // Join the lines and set the updated content to the textarea
    textarea.value = lines.join('\n');
    // Scroll to the bottom after updating the content
    textarea.scrollTop = textarea.scrollHeight;
    // Initial timer setup
    resetTextArea();
}

function resetTimer() {
    if (typingTimer) {
        clearTimeout(typingTimer);
    }
    typingTimer = setTimeout(fadeOutTextArea, 2000); // 10 seconds
}

function fadeOutTextArea() {
    var textArea = document.getElementById('scrollingTextarea');
    textArea.classList.add('fade-out');
    textArea.value = "";
}

function resetTextArea() {
    document.getElementById('scrollingTextarea').classList.remove('fade-out');
    resetTimer();
}

function sortValues(toSort) {

    // Step 1: Convert the object to an array of key-value pairs
    const keyValueArray = Object.entries(toSort);

    // Step 2: Sort the array by the values (in ascending order)
    keyValueArray.sort((a, b) => b[1] - a[1]);

    // Step 3: Convert the sorted array back to an object (if needed)
    return Object.fromEntries(keyValueArray);

}

function countWordInstances(str, word) {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    const matches = str.match(regex);
    return matches ? matches.length : 0;
}

