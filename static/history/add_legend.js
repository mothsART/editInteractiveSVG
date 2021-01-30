function history_add_legend(undo_params, redo_params) {
    "use strict";
    return {
        'action': {
            'callback': 'add_legend',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': "ajout d'une légende"
    };
}

function undo_add_legend(undo_params) {
    "use strict";
    delete_legend(undo_params['index']);
}

function redo_add_legend(redo_params) {
    "use strict";
    add_legend(redo_params['hex_color'], true);
}
