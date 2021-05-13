function align_indice(old_index, new_index) {
    "use strict";
    let old_x = 7;
    if (old_index > 9)
        old_x = 2;
    let new_x = 7;
    if (new_index > 9)
        new_x = 2;
    $($('svg .indice')[old_index - 1]).find('.indice-text')[0].setAttribute("x",  old_x);
    $($('svg .indice')[new_index - 1]).find('.indice-text')[0].setAttribute("x",  new_x);
}

function insert_legend(old_index, new_index, history) {
    "use strict";
    let inc = 0;
    if (old_index > new_index) {
        $($('svg .indice')[old_index - 1]).insertBefore($($('svg .indice')[new_index - 1]));
        $($('#descriptions article')[old_index]).insertBefore($($('#descriptions article')[new_index]));
        $($('#real-legend .indice')[old_index]).insertBefore($($('#real-legend .indice')[new_index]));
    }
    else {
        inc = 1;
        $($('svg .indice')[old_index - 1]).insertAfter($($('svg .indice')[new_index - 1]));
        $($('#descriptions article')[old_index]).insertAfter($($('#descriptions article')[new_index]));
        $($('#real-legend .indice')[old_index]).insertAfter($($('#real-legend .indice')[new_index]));
    }
    if (history)
        $('#legend-' + old_index).insertBefore($('#legend-' + (new_index + inc)));
    align_indice(old_index, new_index);
}

var dragAndDrop = {
    init: function () {
        "use strict";
        this.dragula();
        this.eventListeners();
    },
    eventListeners: function () {
        "use strict";
        this.dragula.on('drag', this.drag.bind(this));
        this.dragula.on('drop', this.dropped.bind(this));
        this.dragula.on('dragend', this.dragend.bind(this));
    },
    dragula: function () {
        "use strict";
        this.dragula = dragula([document.querySelector('#list-of-legend tbody')]);
    },
    drag: function (el) {
        "use strict";
        disable_interface();
    },
    dropped: function (el) {
        "use strict";
        let nodes = Array.prototype.slice.call(this.dragula.containers[0].childNodes);
        let old_index = parseInt(el.getAttribute('id').replace('legend-', ''));
        let new_index = nodes.indexOf(el) - 2;
        insert_legend(old_index, new_index);
        reorder_legend();
        add_history(
            history_drag_legend,
            { 
                'title': document.getElementById("legend-" + new_index).getElementsByClassName('indice-title')[0].innerText,
                'new_index': new_index,
                'old_index': old_index
            },
            { 'old_index': old_index, 'new_index': new_index }
        );
    },
    dragend: function (el) {
        "use strict";
        enable_interface();
    }
};

dragAndDrop.init();


let is_moving = false;
let old_x = 0;
let old_y = 0;

function disable_interface() {
    edit_menu_el.classList.add('disabled');
    add_and_delete_legend_el.classList.add('disabled');
    source_file_zone_el.classList.add('disabled');
    edit_zone_el.classList.add('disabled');
    delete_svg_el.classList.add('disabled');
    update_svg_el.classList.add('disabled');
}

function enable_interface() {
    edit_menu_el.classList.remove('disabled');
    add_and_delete_legend_el.classList.remove('disabled');
    source_file_zone_el.classList.remove('disabled');
    edit_zone_el.classList.remove('disabled');
    delete_svg_el.classList.remove('disabled');
    update_svg_el.classList.remove('disabled');
}

function Grab(e) {
    "use strict";
    e.preventDefault();
    // exclude drag when zoom is in
    let scale = parseFloat(document.getElementById("svg").getAttribute("data-scale"));
    if (scale)
        return;
    // find out which element we moused down on
    let targetElement = e.target;
    if (
        targetElement == null
        || !targetElement.classList.contains('mask')
        || document.getElementById("svg").classList.contains("show")
    )
        return;
    DragTarget = targetElement;
    let el = DragTarget.parentNode;
    $(el).find(".indice-cross")[0].classList.remove("hidden");
    let index = parseInt(el.id.substring(7));
    if (is_moving) {
        add_history(
            history_drag_indice,
            {
                'index': index,
                'x': old_x,
                'y': old_y
            },
            {
                'index': index,
                'x': elements.indice.x.get(el),
                'y': elements.indice.y.get(el)
            }
        );
        is_moving = false;
    }
};

function Drag(e) {
    "use strict";
    if (!DragTarget)
        return;
    if (!$("#svg").hasClass("edit-mode") || (e.clientX == 0 && e.clientY == 0))
        return;
    let sidebar_width = document.getElementById("sidebar").offsetWidth;
    let edit_menu_height = document.getElementById("edit-menu").offsetHeight;
    let container_width = document.getElementById("svg").offsetWidth;
    let container_height = document.getElementById("svg").offsetHeight;
    let container_ratio = container_width / container_height;
    // margin on left
    let margin_left = (container_width - container_height * SVG.ratio) / 2;
    let x = SVG.width * (e.clientX - sidebar_width - margin_left) / container_height / SVG.ratio;
    let y = SVG.height * (e.clientY - edit_menu_height) / container_height;
    if (SVG.ratio > container_ratio) {
        // margin on top
        let margin_top = (container_height - container_width / SVG.ratio) / 2;
        x = SVG.width * (e.clientX - sidebar_width) / container_width;
        y = SVG.height * (e.clientY - edit_menu_height - margin_top) / container_width * SVG.ratio;
    }
    let indice_width = DragTarget.parentNode.getBBox().width / 2;
    x = x + SVG.x - indice_width;
    y = y + SVG.y - indice_width;
    if (!is_moving) {
        old_x = x;
        old_y = y;
    }
    is_moving = true;
    translate_indice(DragTarget.parentNode, x, y);
};
