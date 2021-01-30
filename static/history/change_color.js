function history_color_legend(undo_params, redo_params) {
    "use strict";
    return {
        'action': {
            'callback': 'color_legend',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': 'changement de la couleur de "'
    };
}

function undo_color_legend(undo_params) {
    "use strict";
    debugger;
}

function redo_color_legend(redo_params) {
    "use strict";
    debugger;
}
