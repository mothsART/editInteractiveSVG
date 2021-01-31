function history_title_legend(undo_params, redo_params) {
    "use strict";
    let index = undo_params['index'];
    return {
        'action': {
            'callback': 'title_legend',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': 'changement du titre et/ou du commentaire de la légende n°' + index
    };
}

function undo_title_legend(undo_params) {
    "use strict";
    update_title(
        false,
        undo_params['title'],
        undo_params['description']
    );
}

function redo_title_legend(redo_params) {
    "use strict";
    update_title(
        false,
        redo_params['title'],
        redo_params['description']
    );
}
