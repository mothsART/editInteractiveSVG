var history_actions = [
];

var history_pointer = 0;

var undo_btn = document.getElementById('undo-button');
var redo_btn = document.getElementById('redo-button');
var history_btn = document.getElementById('history-button');
var history_list = document.getElementById('history-list');

function redo() {
    window['redo_' + history_actions[history_pointer + 1]['action']['callback']]();
}

function undo() {
    if (history_pointer === 0)
        undo_btn.classList.add('disabled');
    window['undo_' + history_actions[history_pointer]['action']['callback']]();
}

function get_history(_id) {
    var last_id = history_actions.length - 1;
    for (let i = last_id; i >= _id; i--) {
        window['undo_' + history_actions[i]['action']['callback']]();
    }
}

function open_history() {
    history_list.classList.remove('hidden');
}

function add_history(_callback) {
    undo_btn.classList.remove('disabled');
    history_btn.classList.remove('disabled');
    var new_entry = _callback();
    history_actions.push(new_entry);
    history_pointer = history_actions.length - 1;
    var entry = document.createElement('li');
    entry.setAttribute(
        'onclick',
        'get_history(' + history_pointer + ')'
    );
    entry.appendChild(document.createTextNode(new_entry['text']));
    history_list.appendChild(entry);
}

function history_add_legend() {
    return {
        'action': {
            'callback': 'add_legend',
            'undo_params': [],
            'redo_params': []
        },
        'text': "ajout d'une légende"
    };
}

function history_delete_legend() {
    return {
        'action': {
            'callback': 'delete_legend',
            'undo_params': [],
            'redo_params': []
        },
        'text': "suppression d'une légende"
    };
}

function undo_add_legend(_id) {
    console.log('undo add legend');
    delete_legend();
}

function redo_add_legend(_id) {
    console.log('redo add legend');
}

function undo_delete_legend(_id) {
    console.log('undo delete legend');
}

function redo_delete_legend(_id) {
    console.log('redo delete legend');
}
