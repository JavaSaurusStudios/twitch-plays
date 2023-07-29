function InitIRC() {
    const urlParams = new URL(window.location.toLocaleString()).searchParams;
    const channel = urlParams.get('channel');
    const oath = urlParams.get('oauth');
    ActivateFunctions();
    ComfyJS.Init(channel, oath);
}

function ActivateFunctions() {
    ComfyJS.onCommand += (user, command, message, flags, extra) => {
        if (command === 'move') {
            var input = message.toUpper();
            if (keys.hasOwnProperty(input)) {
                fireKey(keys[input]);
            }
        }
    }
}
