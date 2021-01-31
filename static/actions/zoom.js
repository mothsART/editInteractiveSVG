function real_zoom(element) {
    "use strict"
    let svg_container = document.getElementById('svg');
    if (DragTarget) {
        $(DragTarget.parentNode).find(".indice-cross")[0].classList.add("hidden");
        DragTarget = null;
        return;
    }
    if (document.getElementById('svg').classList.contains('edit-mode'))
        return;
    if (svg_container.classList.contains('show'))
        svg_container.classList.add('duration');
    indice_zoom(element);
}

function zoom_edit_mode(value, trans_x, trans_y, scale_enabled) {
    "use strict";
    var scale = value / 100;
    if (scale_enabled) {
        document.getElementById("svg").setAttribute("data-scale", scale);
        document.getElementById("svg").classList.add('scale');
    }
    else {
        document.getElementById("svg").removeAttribute("data-scale");
        document.getElementById("svg").classList.remove('scale');
    }
    $("#svg svg").css("transform", "scale(" + scale + ")");
    document.getElementById("root-svg").style.transform = "";
    document.getElementById("root-svg").style.transform = css_translate(trans_x, trans_y);
    setTimeout(UpdateCssTransform, 1);
}

function zoom_on(index, value, zoom_svg, scale_enabled) {
    "use strict";
    var svg_indice = document.getElementById('indice-' + index);
    var trans_x = parseFloat(svg_indice.getAttribute("data-translate-x") - SVG.x);
    var trans_y = parseFloat(svg_indice.getAttribute("data-translate-y") - SVG.y);
    svg_indice.setAttribute("data-zoom", value);
    $("#legend-" + index + " .zoom-input").val(value);
    if (zoom_svg)
        zoom_edit_mode(value, trans_x, trans_y, scale_enabled);
}

function zoom(element, record_history) {
    "use strict";
    let index = parseInt(
      $(element.parentNode.parentNode.parentNode).find(".indice").attr("id").replace("legend-indice-", "")
    );
    var value = parseInt($(element.parentNode.parentNode.parentNode).find(".zoom-input").val());
    let scale_enabled = false;
    if (element.parentNode.getElementsByClassName('zoom-enabled')[0].checked)
        scale_enabled = true;
    zoom_on(index, value, scale_enabled, scale_enabled);
    if (record_history) {
        add_history(
            history_zoom_legend,
            {
                'index': index,
                'title': elements.title(index),
                'value': element.defaultValue
            },
            {
                'index': index,
                'value': value
            }
        );
    }
    element.defaultValue = value;
}

function active_zoom(element) {
    "use strict";
    let svg_width = parseInt($("#root-svg").css("width").replace("px", ""));
    let svg_height = parseInt($("#root-svg").css("height").replace("px", ""));
    let zoom_input = $(element).parent().find(".zoom-input");
    let id = $(element.parentNode.parentNode.parentNode).find(".indice").attr("id").replace("legend-", "");
    let indice_element = $("#root-svg #" + id);
    if($(element).prop('checked')) {
        zoom(element);
    }
    else {
        var indice = $("#" + zoom_input.data("indice-id"));
        indice.data("zoom", zoom_input.val());
        document.getElementById("svg").removeAttribute("data-scale");
        document.getElementById("svg").classList.remove('scale');
        $("#svg svg").css("transform", "scale(1)");
        $("#root-svg").css("transform", "initial");
    }
}

function percentage_change(value1, value2, size) {
    "use strict";
    if (value1 == 0 && value2 == 0)
        return 0;
    value1  = Math.abs(value1);
    value2  = Math.abs(value2);
    var max = Math.max(value1, value2);
    var min = Math.min(value1, value2);
    if (!size || size == 0)
    {
        if (min == 0)
            return 100 * max
        return 100 * ((max - min) / min);
    }
    return 100 * ((max - min) / size);
}
