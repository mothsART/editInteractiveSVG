var action_history = [
];

var undo_btn = document.getElementById('undo-button');
var redo_btn = document.getElementById('redo-button');
var history_btn = document.getElementById('history-button');
var history_list = document.getElementById('history-list');

function redo() {
    
}

function undo() {
    
}

function get_history(_id) {
    window['restore_' + action_history[_id]['action']]();
}

function open_history() {
    history_list.classList.remove('hidden');
}

function add_history(_callback) {
    undo_btn.classList.remove('disabled');
    history_btn.classList.remove('disabled');
    var new_entry = _callback();
    action_history.push(new_entry);

    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode("ok"));
    history_list.appendChild(entry);
}

function history_add_legend() {
    return {
        'action': 'add_legend',
        'text': "ajout d'une légende"
    };
}

function history_delete_legend() {
    return {
        'action': 'delete_legend',
        'text': "suppression d'une légende"
    };
}

function restore_history_add_legend(_id) {
    console.log('add legend');
}

function restore_history_delete_legend(_id) {
    console.log('delete legend');
}
