function version_1_1(el) {
    "use strict";
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

function converting(el, version) {
    "use strict";
    if (!version)
        el = version_1_1(el);
    return el;
}
