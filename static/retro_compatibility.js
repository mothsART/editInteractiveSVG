function __version__() {
    return "1.2";
}

function smaller_then(doc_version, version) {
    "use strict";
    if (!doc_version)
        return false;
    doc_version = parseInt(doc_version.replace(/\./g, ''));
    if (doc_version.toString().length == 2)
        doc_version = doc_version * 10;
    version = parseInt(version.replace(/\./g, ''));
    if (version.toString().length == 2)
        version = version * 10;
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
