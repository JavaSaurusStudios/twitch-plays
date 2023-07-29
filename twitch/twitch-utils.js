var GAME;

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
        var input = message.toUpper();
        if (keys.hasOwnProperty(input)) {
            fireKey(keys[input]);
        }
    }
}
