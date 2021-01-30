function history_delete_legend(undo_params, redo_params) {
    "use strict";
    let nb_iteration = undo_params['list'].length;
    let text = "suppression d'une légende";
    if (nb_iteration > 1)
        text = "suppression de " + nb_iteration + " légendes";
    return {
        'action': {
            'callback': 'delete_legend',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': text
    };
}

function undo_delete_legend(undo_params) {
    "use strict";
    for (const [key, value] of Object.entries(undo_params['list'])) {
        add_legend(
            cssRgbToHex(value['hex_color']),
            true,
            value['title'],
            value['description'],
            value['zoom'],
            value['x'],
            value['y']
        );
        insert_legend(
            document.getElementsByClassName('indice-line').length - 1,
            parseInt(value['index'])
        );
    }
    reorder_legend();
}

function redo_delete_legend(redo_params) {
    "use strict";
    for (const [key, value] of Object.entries(redo_params['list'])) {
        delete_legend(value['index']);
    }
    reorder_legend();
}
