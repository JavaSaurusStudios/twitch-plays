var keys = {
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
