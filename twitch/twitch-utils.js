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
            showTempString(user + " : " + input);
            simulateKeyPress(input);
        }
    }
}

function simulateKeyPress(x) {
    Iodine.keyDown(keys[x]);
    setTimeout(() => Iodine.keyUp(keys[x]), 150);
}



