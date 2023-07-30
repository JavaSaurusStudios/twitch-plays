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
        document.getElementById('emoteInputTextarea').style.display='none';
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
        console.log(Object.keys(extra.messageEmotes));
        //map input by emotes
        if (Object.keys(extra.messageEmotes).length > 0) {
            var check = Object.keys(extra.messageEmotes)[0];
            input = emote_mapping[check];
        }

        console.log(input);
        if (keys.hasOwnProperty(input.split("X")[0])) {
            //addToTextLog(user + " : " + input);
            //simulateKeyPress(input);
            userInputData[input]++;
            updateInputTextLog();
        }
    }

    /*ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
        if( command === "test" ) {
          ComfyJS.Say( "replying to !test" );
        }
      }
*/
}

function simulateKeyPress(x, amount) {
    Iodine.keyDown(keys[x]);
    setTimeout(() => { Iodine.keyUp(keys[x]); ClearInputData() }, 40 * amount);
}


function updateInputTextLog() {
    var textarea = document.getElementById('scrollingTextarea');
    textarea.value = "";
    // Add the new line to the end
    let lines = [];
    let i = 0;
    for (let k in sortValues(userInputData)) {
        lines.push(k + "\t" + userInputData[k]);
        i++;
        if (i == 10) break;
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


