var GAME;

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
    "L": 9               //A:
};

function InitIRC() {
    const urlParams = new URL(window.location.toLocaleString()).searchParams;
    const channel = urlParams.get('channel');
    const oath = urlParams.get('oauth');
    GAME = urlParams.get('game');
    ActivateFunctions();
    ComfyJS.Init(channel, oath);

    initEmulator();
}

function ActivateFunctions() {
    ComfyJS.onChat = (user, message, flags, self, extra) => {
        var input = message.toUpperCase();
        if (keys.hasOwnProperty(input)) {
            addToTextLog(user + " : " + input);
            simulateKeyPress(input);
        }
    }
}

function simulateKeyPress(x) {
    Iodine.keyDown(keys[x]);
    setTimeout(() => Iodine.keyUp(keys[x]), 150);
}

function addToTextLog(line){
    const textarea = document.getElementById('scrollingTextarea');

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
  }



