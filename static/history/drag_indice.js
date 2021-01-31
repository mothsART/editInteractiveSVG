function history_drag_indice(undo_params, redo_params) {
    "use strict";
    let index = undo_params['index'];
    return {
        'action': {
            'callback': 'drag_indice',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': "déplacement de l'indice n°" + index
    };
}

function undo_drag_indice(undo_params) {
    "use strict";
    translate_indice(
        elements.indice.get(undo_params['index']),
        undo_params['x'],
        undo_params['y']
    );
}

function redo_drag_indice(redo_params) {
    "use strict";
    translate_indice(
        elements.indice.get(redo_params['index']),
        redo_params['x'],
        redo_params['y']
    );
}
