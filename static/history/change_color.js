function history_color_legend(undo_params, redo_params) {
    "use strict";
    let title = undo_params['title'];
    return {
        'action': {
            'callback': 'color_legend',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': 'changement de la couleur de "' + title + '"'
    };
}

function undo_color_legend(undo_params) {
    "use strict";
    let color = undo_params['color'];
    change_indice_color(
        undo_params['indice_id'],
        color,
    );
    $("#legend-" + undo_params['id'] + " .color-indice-picker").spectrum("set", color);
}

function redo_color_legend(redo_params) {
    "use strict";
    let color = redo_params['color'];
    change_indice_color(
        redo_params['indice_id'],
        color
    );
    $("#legend-" + redo_params['id'] + " .color-indice-picker").spectrum("set", color);
}
