function align_indice(old_index, new_index) {
    "use strict";
    var old_x = 7;
    if (old_index > 9)
        old_x = 2;
    var new_x = 7;
    if (new_index > 9)
        new_x = 2;
    $($('svg .indice')[old_index - 1]).find('.indice-text')[0].setAttribute("x",  old_x);
    $($('svg .indice')[new_index - 1]).find('.indice-text')[0].setAttribute("x",  new_x);
}

var dragAndDrop = {
    init: function () {
        this.dragula();
        this.eventListeners();
    },
    eventListeners: function () {
        this.dragula.on('drop', this.dropped.bind(this));
    },
    dragula: function () {
        this.dragula = dragula([document.querySelector('#list-of-legend tbody')]);
    },
    dropped: function (el) {
        var nodes = Array.prototype.slice.call(this.dragula.containers[0].childNodes);
        var old_index = parseInt(el.getAttribute('id').replace('legend-', ''));
        var new_index = nodes.indexOf(el) - 2;
        if (old_index > new_index) {
            $($('svg .indice')[old_index - 1]).insertBefore($($('svg .indice')[new_index - 1]));
            $($('#descriptions article')[old_index]).insertBefore($($('#descriptions article')[new_index]));
            $($('#real-legend .indice')[old_index]).insertBefore($($('#real-legend .indice')[new_index]));
        }
        else {
            $($('svg .indice')[old_index - 1]).insertAfter($($('svg .indice')[new_index - 1]));
            $($('#descriptions article')[old_index]).insertAfter($($('#descriptions article')[new_index]));
            $($('#real-legend .indice')[old_index]).insertAfter($($('#real-legend .indice')[new_index]));
        }
        reorder_legend();
        align_indice(old_index, new_index);
    }
};

dragAndDrop.init();

function Grab(e)
{
    "use strict";
    e.preventDefault();
    // exclude drag when zoom is in
    var scale = parseFloat(document.getElementById("svg").getAttribute("data-scale"));
    if (scale)
        return;
    // find out which element we moused down on
    var targetElement = e.target;
    if (
        targetElement == null
        || !targetElement.classList.contains('mask')
        || document.getElementById("svg").classList.contains("show")
    )
        return;
    DragTarget = targetElement;
    $(DragTarget.parentNode).find(".indice-cross")[0].classList.remove("hidden");
};

function Drag(e) {
    "use strict";
    if (!DragTarget)
        return;
    if (!$("#svg").hasClass("edit-mode") || (e.clientX == 0 && e.clientY == 0))
        return;
    var sidebar_width     = document.getElementById("sidebar").offsetWidth;
    var edit_menu_height  = document.getElementById("edit-menu").offsetHeight;
    var container_width   = document.getElementById("svg").offsetWidth;
    var container_height  = document.getElementById("svg").offsetHeight;
    var container_ratio   = container_width / container_height;
    // margin on left
    var margin_left = (container_width - container_height * SVG.ratio) / 2;
    var x = SVG.width * (e.clientX - sidebar_width - margin_left) / container_height / SVG.ratio;
    var y = SVG.height * (e.clientY - edit_menu_height) / container_height;
    if (SVG.ratio > container_ratio) {
        // margin on top
        var margin_top = (container_height - container_width / SVG.ratio) / 2;
        x = SVG.width * (e.clientX - sidebar_width) / container_width;
        y = SVG.height * (e.clientY - edit_menu_height - margin_top) / container_width * SVG.ratio;
    }
    var indice_width = DragTarget.parentNode.getBBox().width / 2;
    x = x + SVG.x - indice_width;
    y = y + SVG.y - indice_width;
    translate_indice(DragTarget.parentNode, x, y);
};
