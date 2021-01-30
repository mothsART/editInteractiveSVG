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
    disabledClass('history-action');
    document.getElementById('history-action-' + history_pointer).setAttribute(
        'disabled', 'disabled'
    );
    undo_btn.classList.remove('disabled');
    if (history_pointer == history_actions.length)
        redo_btn.classList.add('disabled');
}

function undo() {
    "use strict";
    history_pointer -= 1;
    disabledClass('history-action');
    document.getElementById('history-action-' + history_pointer).setAttribute(
        'disabled', 'disabled'
    );
    if (history_pointer === 0)
        undo_btn.classList.add('disabled');
    redo_btn.classList.remove('disabled');
    var action = history_actions[history_pointer]['action'];
    window['undo_' + action['callback']](
        action['undo_params']
    );
}

function get_history(el, _id) {
    "use strict";
    if (el.getAttribute('disabled'))
        return;
    var last_history_pointer = history_pointer;
    history_pointer = _id;

    disabledClass('history-action');
    document.getElementById('history-action-' + _id).setAttribute(
        'disabled', 'disabled'
    );

    if (history_pointer < last_history_pointer) {
        for (let i = last_history_pointer - 1; i >= history_pointer; i--) {
            var action = history_actions[i]['action'];
            window['undo_' + action['callback']](
                action['undo_params']
            );
        }
        redo_btn.classList.remove('disabled');
    } else {
        for (let i = last_history_pointer; i < history_pointer; i++) {
            var action = history_actions[i]['action'];
            window['redo_' + action['callback']](
                action['redo_params']
            );
        }
        undo_btn.classList.remove('disabled');
    }
    if (history_pointer === 0)
        undo_btn.classList.add('disabled');
    if (history_pointer === history_actions.length)
        redo_btn.classList.add('disabled');
}

function open_history() {
    "use strict";
    history_list.classList.remove('hidden');
}

function create_entry(_history_pointer, text, disabled) {
    "use strict";
    var entry = document.createElement('li');
    entry.classList.add('history-action');
    if (disabled)
        entry.setAttribute('disabled', 'disabled');
    entry.id = 'history-action-' + _history_pointer;
    entry.setAttribute(
        'onclick',
        'get_history(this, ' + _history_pointer + ')'
    );
    entry.appendChild(document.createTextNode(text));
    return entry;
}

function add_history(_callback, undo_params, redo_params) {
    "use strict";
    undo_btn.classList.remove('disabled');
    history_btn.classList.remove('disabled');
    disabledClass('history-action');
    var new_entry = _callback(undo_params, redo_params);
    history_actions.length = history_pointer;
    history_actions.push(new_entry);
    history_pointer += 1;
    if (history_list.children.length === 0) {
        var entry = create_entry(history_pointer - 1, 'étape initiale');
        history_list.appendChild(entry);
    } else if (history_pointer < history_list.children.length) {
        while (history_pointer < history_list.children.length) {
            history_list.removeChild(history_list.lastChild);
        }
    }
    var entry = create_entry(history_pointer, new_entry['text'], true);
    history_list.appendChild(entry);
}
