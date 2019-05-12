function __version__() {
    return "1.2";
}

function smaller_then(doc_version, version) {
    "use strict";
    doc_version = parseInt(doc_version.replace('.', ''));
    version = parseInt(version.replace('.', ''));
    return doc_version < version;
}

function version_1_1(el, doc_version) {
    "use strict";
    if (!smaller_then(doc_version, "1.1"))
        return el;
    var descriptions = el.getElementsByClassName('description-content');
    if (descriptions.length === 0)
        return el;
    for (var i = 0; i < descriptions.length; i++) {
        var links = descriptions[i].getElementsByTagName('a');
        for (var j = 0; j < links.length; j++) {
            links[j].setAttribute('target', '_blank');
        }
    }
    return el;
}

function converting(el, doc_version) {
    "use strict";
    el = version_1_1(el, doc_version);
    return el;
}
