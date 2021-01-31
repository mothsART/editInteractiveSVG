function history_zoom_legend(undo_params, redo_params) {
    "use strict";
    let title = undo_params['title'];
    return {
        'action': {
            'callback': 'zoom_legend',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': 'changement du zoom de "' + title + '" de ' + undo_params['value'] + " à " + redo_params['value'] + "&nbsp;%"
    };
}

function undo_zoom_legend(undo_params) {
    "use strict";
    let index = undo_params['index'];
    let el = document.getElementById('legend-' + index).getElementsByClassName('zoom-input')[0];
    el.value = undo_params['value'];
    zoom(el);
}

function redo_zoom_legend(redo_params) {
    "use strict";
    let index = redo_params['index'];
    let el = document.getElementById('legend-' + index).getElementsByClassName('zoom-input')[0];
    el.value = redo_params['value'];
    zoom(el);
}
