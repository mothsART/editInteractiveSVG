function history_drag_legend(undo_params, redo_params) {
    "use strict";
    let title = undo_params['title'];
    let old_index = undo_params['old_index'];
    let new_index = undo_params['new_index'];
    return {
        'action': {
            'callback': 'drag_legend',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': 'inversion ordre légende "' + title + '" passe de ' + old_index + " à " + new_index
    };
}

function undo_drag_legend(undo_params) {
    "use strict";
    insert_legend(
        undo_params['new_index'],
        undo_params['old_index'],
        true
    );
    reorder_legend();
}

function redo_drag_legend(redo_params) {
    "use strict";
    insert_legend(
        redo_params['old_index'],
        redo_params['new_index'],
        true
    );
    reorder_legend();
}
