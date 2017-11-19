var Warnings = {
    nb: 0,
    new: function(id) {
        "use strict";
        document.getElementById('warning-zone').classList.remove('hidden');
        this.nb += 1;
        document.getElementById('number-of-warnings').firstChild.nodeValue = this.nb;
        document.getElementById(id).classList.remove('hidden');
    },
    clear: function() {
        "use strict";
        document.getElementById('warning-zone').classList.add('hidden');
        var li_list = document.getElementById('warning-list').getElementsByTagName('li');
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
        document.getElementById('error-zone').classList.remove('hidden');
        this.nb += 1;
        document.getElementById('number-of-errors').firstChild.nodeValue = this.nb;
        document.getElementById(id).classList.remove('hidden');
        document.getElementById('choose-file').classList.remove('hidden');
        document.getElementById('upload-text').classList.add('hidden');
        $('#upload-zone form')[0].classList.remove('is-uploading');
    },
    clear: function() {
        "use strict";
        document.getElementById('error-zone').classList.add('hidden');
        var li_list = document.getElementById('error-list').getElementsByTagName('li');
        for (var i = 0, len = li_list.length; i < len; i++) {
            li_list[i].classList.add('hidden');
        }
        this.nb = 0;
    }
}
