function version_1_1(el) {
    "use strict";
    var descriptions = el.getElementsByClassName('description-content');
    if (descriptions.length === 0)
        return el;
    for (var i = 0; i < descriptions.length; i++) {
        var links = descriptions[i].getElementsByTagName('a');
        for (var j = 0; j < links.length; j++) {
            links[j].setAttribute('target', 'blank');
        }
    }
    return el;
}

function converting(el) {
    "use strict";
    var version = document.getElementsByTagName('body')[0].getAttribute('data-version');
    if (!version)
        el = version_1_1(el);
    return el;
}
