const edit_menu_el = document.getElementById('edit-menu');
const add_and_delete_legend_el = document.getElementById('add-and-delete-legend');
const source_file_zone_el = document.getElementById('source-file-zone');
const edit_zone_el = document.getElementById('svg');
const delete_svg_el = document.getElementById('delete-svg');
const update_svg_el = document.getElementById('update-svg');

const elements = {
    'description': {
        get: function(_index) {
            "use strict";
            let el = document.getElementById('description-' + _index);
            if (!el)
                return;
            el = el.getElementsByClassName('description-content')[0];
            if (!el)
                return '';
            return el.innerHTML;
        },
        set: function(_index, _value) {
            "use strict";
            let el = document.getElementById('description-' + _index);
            if (!el)
                return;
            el = el.getElementsByClassName('description-content')[0];
            if (!el)
                return;
            el.innerHTML = _value;
        }
    },
    buf_description : function() {
        return document.getElementById('indice-description').innerHTML;
    },
    title: function(_index) {
        "use strict";
        let el = document.getElementById("legend-" + _index);
        if (!el)
            return;
        el = el.getElementsByClassName('indice-title')[0];
        if (!el)
            return '';
        return el.innerText;
    },
    'indice': {
        get: function(_index) {
            return document.getElementById('indice-' + _index);
        },
        'x': {
            get: function(_el) {
                return parseFloat(_el.getAttribute("data-translate-x"));
            },
            set: function(_el, _value) {
                _el.setAttribute("data-translate-x", _value);
            }
        },
        'y': {
            get: function(_el) {
                return parseFloat(_el.getAttribute("data-translate-y"));
            },
            set: function(_el, _value) {
                _el.setAttribute("data-translate-y", _value);
            }
        },
    }
}
