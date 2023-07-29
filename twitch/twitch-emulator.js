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
    el = document.getElementById("emulator_target");
    //Set key to corresponding code. This one is set to the left arrow key.
    if (document.createEvent) {
        var eventObj = document.createEvent("Events");
        eventObj.initEvent("keydown", true, true);
        eventObj.which = key;
        el.dispatchEvent(eventObj);
    }
} 
