var controller = {
    left: false,
    right: false,
    up: false,
    down: false,
    enter: false,
    ctrl: false,
    KeyListener: function(evt) {
        var keyState = (evt.type == "keydown") ? true : false;
        switch (evt.keyCode) {
            case 37:
                controller.left = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
            case 40:
                controller.down = keyState;
                break;
            case 39:
                controller.right = keyState;
                break;
            case 13:
                controller.enter = keyState;
                break;
            case 17:
                controller.ctrl = keyState;
                break;
        }
    }
};

window.addEventListener("keydown", controller.KeyListener);
window.addEventListener("keyup", controller.KeyListener);