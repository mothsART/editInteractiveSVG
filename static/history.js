var history_actions = [];
var history_pointer = 0;

var undo_btn = document.getElementById('undo-button');
var redo_btn = document.getElementById('redo-button');
var history_btn = document.getElementById('history-button');
var history_list = document.getElementById('history-list');

function redo() {
    "use strict";
    var action = history_actions[history_pointer]['action'];
    window['redo_' + action['callback']](
        action['redo_params']
    );
    history_pointer += 1;
    undo_btn.classList.remove('disabled');
    if (history_pointer == history_actions.length)
        redo_btn.classList.add('disabled');
}

function undo() {
    "use strict";
    history_pointer -= 1;
    if (history_pointer === 0)
        undo_btn.classList.add('disabled');
    redo_btn.classList.remove('disabled');
    var action = history_actions[history_pointer]['action'];
    window['undo_' + action['callback']](
        action['undo_params']
    );
}

function get_history(_id) {
    "use strict";
    var last_history_pointer = history_pointer - 1;
    history_pointer = _id - 1;
    for (let i = last_history_pointer; i >= history_pointer; i--) {
        var action = history_actions[i]['action'];
        window['undo_' + action['callback']](
            action['undo_params']
        );
    }
    if (history_pointer === 0)
        undo_btn.classList.add('disabled');
}

function open_history() {
    "use strict";
    history_list.classList.remove('hidden');
}

function add_history(_callback, undo_params, redo_params) {
    "use strict";
    undo_btn.classList.remove('disabled');
    history_btn.classList.remove('disabled');
    var new_entry = _callback(undo_params, redo_params);
    history_actions.push(new_entry);
    history_pointer = history_actions.length;
    var entry = document.createElement('li');
    entry.setAttribute(
        'onclick',
        'get_history(' + history_pointer + ')'
    );
    entry.appendChild(document.createTextNode(new_entry['text']));
    history_list.appendChild(entry);
}

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

function history_delete_legend(undo_params, redo_params) {
    "use strict";
    return {
        'action': {
            'callback': 'delete_legend',
            'undo_params': undo_params,
            'redo_params': redo_params
        },
        'text': "suppression d'une légende"
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

function undo_delete_legend(undo_params) {
    "use strict";
    console.log('undo delete legend');
}

function redo_delete_legend(redo_params) {
    "use strict";
    delete_legend(redo_params['index']);
}
