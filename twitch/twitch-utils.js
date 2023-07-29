var GAME;

const keys = {
    "A": 88,
    "B": 90,
    "SEL": 16,
    "START": 13,
    "RIGHT": 39,
    "LEFT": 37,
    "UP": 38,
    "DOWN": 40,
    "R": 83,
    "L": 65               //A:
};

function InitIRC() {
    const urlParams = new URL(window.location.toLocaleString()).searchParams;
    const channel = urlParams.get('channel');
    const oath = urlParams.get('oauth');
    GAME = urlParams.get('game');
    ActivateFunctions();
    ComfyJS.Init(channel, oath);

    //Check if this is required :
    initEmulator();
}

function ActivateFunctions() {
    ComfyJS.onChat = (user, message, flags, self, extra) => {
        var input = message.toUpperCase();
        if (keys.hasOwnProperty(input)) {
            fireKey(keys[input]);
        }
    }
}

function fireKey(key) {
    SimulateKeyDown(key);
    const myTimeout = setTimeout(SimulateKeyUp(key), 125);
} 

function SimulateKeyDown(key){
    var evt_down = new KeyboardEvent('keydown', {'keyCode':key, 'which':key}; 
    document.dispatchEvent (evt_down); 
}

function SimulateKeyUp(key){
    var evt_up = new KeyboardEvent('keyup', {'keyCode':key, 'which':key}; 
    document.dispatchEvent (evt_up); 
}


