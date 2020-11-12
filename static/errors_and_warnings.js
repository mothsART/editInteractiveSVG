var warning_zone_el = document.getElementById('warning-zone');
var error_zone_el = document.getElementById('error-zone');

var Warnings = {
    nb: 0,
    new: function(id) {
        "use strict";
        warning_zone_el.classList.remove('hidden');
        this.nb += 1;
        document.getElementById('number-of-warnings').firstChild.nodeValue = this.nb;
        document.getElementById(id).classList.remove('hidden');
    },
    clear: function() {
        "use strict";
        warning_zone_el.classList.add('hidden');
        var warning_list_el = document.getElementById('warning-list');
        var li_list = warning_list_el.getElementsByTagName('li');
        for (var i = 0, len = li_list.length; i < len; i++) {
            li_list[i].classList.add('hidden');
        }
        this.nb = 0;
    }
}

var Errors = {
    nb: 0,
    new: function(id) {
        "use strict";
        error_zone_el.classList.remove('hidden');
        this.nb += 1;
        document.getElementById('number-of-errors').firstChild.nodeValue = this.nb;
        document.getElementById(id).classList.remove('hidden');
        document.getElementById('choose-file').classList.remove('hidden');
        document.getElementById('upload-text').classList.add('hidden');
        $('#upload-zone form')[0].classList.remove('is-uploading');
    },
    clear: function() {
        "use strict";
        error_zone_el.classList.add('hidden');
        var error_list_el = document.getElementById('error-list');
        if (!error_list_el)
            return;
        var li_list = error_list_el.getElementsByTagName('li');
        for (var i = 0, len = li_list.length; i < len; i++) {
            li_list[i].classList.add('hidden');
        }
        this.nb = 0;
    }
}
