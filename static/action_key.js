var lastValue = null;

document.addEventListener("keydown", function(evt) {
    "use strict";
    if (!document.getElementById('svg').classList.contains('show'))
        return;

    // ? key : show help dialog
    if (evt.which === 188) {
        show_help();
    }

    var nb_indices = document.getElementById('real-legend')
                             .getElementsByClassName('indice').length;
    if (nb_indices <= 1)
        return;
    var select_indice = parseInt(
        document.getElementById('content')
                .getAttribute('data-real-zoom-indice')
    );

    // Echap key : zoom out
    if (evt.which === 27) {
        if (
            !document.getElementById('help-dialog')
                    .classList.contains('hidden')
        ) {
            closeDialog(document.getElementById('close-help-dialog'));
            return;
        }
        fit_page_to_drawing();
        return;
    }
    if (
        !document.getElementById('help-dialog')
                .classList.contains('hidden')
    ) {
        return;
    }
    // Home key or top key : go to the first indice
    if (evt.which === 36 || evt.which === 38) {
        if (select_indice === 1)
            return; 
        real_zoom(document.getElementById('real-indice-1'));
        return;
    }
    // End Key or bottom key : got to the last indice
    if (evt.which === 35 || evt.which === 40) {
        if (select_indice === (nb_indices - 1))
            return; 
        real_zoom(document.getElementById(
            'real-indice-' + (nb_indices -  1)
        ));
        return;
    }
    // Space key or next key : go to the next indice
    if (evt.which === 32 || evt.which === 39) {
        if (!select_indice)
            select_indice = 0;
        if (select_indice === nb_indices - 1) {
            real_zoom(document.getElementById('real-indice-1'));
            return;
        }
        real_zoom(document.getElementById(
            'real-indice-' + (select_indice + 1)
        ));
        return;
    }
    // Previous key : go to the previous indice
    if (evt.which === 37) {
        if (!select_indice)
            select_indice = nb_indices;
        if (select_indice === 1) {
            real_zoom(document.getElementById(
                'real-indice-' + (nb_indices - 1)
            ));
            return;
        }
        real_zoom(document.getElementById(
            'real-indice-' + (select_indice - 1)
        ));
        return;
    }
    // Num Pad : 1 to 9
    if (evt.which < 96 || evt.which > 105)
        return;
    var numPadValue = evt.which - 96;
    if (lastValue) {
        var newValue = lastValue + String(numPadValue);
        lastValue += String(numPadValue);
        if (newValue.length > 2)
            lastValue = newValue.substr(1)
    }
    else
        lastValue = String(numPadValue);
    setTimeout(function(){
        if (!lastValue)
            return;
        if (parseInt(lastValue) > nb_indices - 1)
            lastValue = lastValue.charAt(1);
        real_zoom(document.getElementById(
            'real-indice-' + lastValue
        ));
        lastValue = null;
    }, 300);
});
