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
