const elements = {
    'description': {
        get: function(_index) {
            "use strict";
            let el = document.getElementById('description-' + _index).getElementsByClassName('description-content')[0];
            if (!el)
                return '';
            return el.innerHTML;
        },
        set: function(_index, _value) {
            "use strict";
            let el = document.getElementById('description-' + _index).getElementsByClassName('description-content')[0];
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
        let el = document.getElementById("legend-" + _index).getElementsByClassName('indice-title')[0];
        if (!el)
            return '';
        return el.innerText;
    }
}
