var DragTarget = null;
var DEBUG = false;
var NS="http://www.w3.org/2000/svg";

var Editor = {
    local: 'en'
}

function translate_app(local) {
    "use strict";
    Editor.local = translateElementsByClassName("i18n", local);
    if (local)
      translateExportInterface(local);
    update_name();
    $("#indice-description, #edit-copyright").trumbowyg('destroy');
    $("#indice-description, #edit-copyright").trumbowyg({
        lang: Editor.local,
        btns: [
            ['viewHTML'],
            ['formatting'],
            ['strong', 'em', 'del'],
            ['superscript', 'subscript'],
            ['link'],
            ['base64'],
            ['insertAudio'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['horizontalRule'],
            ['removeformat'],
            ['foreColor', 'backColor'],
            ['emoji']
        ]
    });
    var localization = $.spectrum.localization[local] = {
        cancelText: translate(Editor.local, 'cancel'),
        chooseText: translate(Editor.local, 'choose'),
        togglePaletteMoreText: translate(Editor.local, 'more'),
        togglePaletteLessText: translate(Editor.local, 'less'),
    };
    $.extend($.fn.spectrum.defaults, localization);
}

function load() {
    "use strict";
    translate_app();
    if (document.getElementsByTagName('body')[0].classList.contains('debug')) {
        DEBUG = true;
        document.getElementById('release-menu').classList.add('hidden');
        return;
    }
    document.getElementById('debug-menu').classList.add('hidden');
};

function createForeignObject() {
    "use strict";
    var svg = $("#svg svg")[0];
    var rootElement = document.createElementNS(NS, "g");
    rootElement.setAttribute("id", "root-svg");
    rootElement.innerHTML = svg.innerHTML;
    svg.innerHTML   = '';
    svg.append(rootElement);
    SVG.init();
    var SVG_Rect = svg.viewBox.baseVal;
    if (
        SVG_Rect != null
        && !(SVG_Rect.x == 0 && SVG_Rect.y == 0 && SVG_Rect.width == 0 && SVG_Rect.height == 0)
        && (
            percentage_change(SVG.x, SVG_Rect.x, SVG.width) > 20
            || percentage_change(SVG.y, SVG_Rect.y, SVG.height) > 20
            || percentage_change(SVG.width, SVG_Rect.width) > 20
            || percentage_change(SVG.height, SVG_Rect.height) > 20
        )
    )
        Warnings.new('warning-viewbox-detected');
    svg.setAttribute("width", 0);
    svg.setAttribute("height", 0);
    svg.setAttribute("viewBox", SVG.x + " " + SVG.y + " " + SVG.width + " " + SVG.height);
    svg.setAttribute("onmousedown", "Grab(evt);");
    svg.setAttribute("onmousemove", "Drag(evt);");
}

function createEditIndice(index) {
    "use strict";
    var indice = document.createElementNS(NS, "g");
    indice.id = "indice-" + index;
    indice.setAttribute("class", "indice");
    indice.setAttribute("data-zoom", 100);
    indice.setAttribute("onclick", "real_zoom(this);");
    var rec = document.createElementNS(NS, "rect");
    var height = 10;
    var width  = 10;
    var stroke_width = 1;
    rec.setAttribute("x", 0);
    rec.setAttribute("y", 0);
    rec.setAttribute("height", height);
    rec.setAttribute("width",  width);
    rec.setAttribute("rx",     2);
    rec.setAttribute("ry",     2);
    rec.setAttribute("class", "backgroundColor");
    rec.setAttribute("transform", "scale(" + SVG.scale + ")");
    var indice_t = document.createElementNS(NS, "text");
    indice_t.setAttribute("class", "indice-text");
    var x = 7;
    if (index > 9)
        x = 2;
    indice_t.setAttribute("x",  x);
    indice_t.setAttribute("y",  14);
    indice_t.setAttribute("transform", "scale(" + SVG.scale / 2 + ")");
    indice_t.append(document.createTextNode("1"));
    var indice_cross = document.createElementNS(NS, "text");
    indice_cross.setAttribute("x", 15);
    indice_cross.setAttribute("class", "indice-cross hidden");
    indice_cross.setAttribute("transform", "scale(" + SVG.scale / 2 + ")");
    indice_cross.append(document.createTextNode(""));
    var mask = document.createElementNS(NS, "rect");
    mask.setAttribute("x", 0);
    mask.setAttribute("y", 0);
    mask.setAttribute("height", height);
    mask.setAttribute("width",  width);
    mask.setAttribute("class",  "mask");
    mask.setAttribute("transform", "scale(" + SVG.scale + ")");
    indice.append(rec);
    indice.append(indice_t);
    indice.append(indice_cross);
    indice.append(mask);
    $("#root-svg")[0].appendChild(indice);
    translate_indice(
        indice,
        .5 * SVG.width  + SVG.x - SVG.scale * (width - stroke_width) / SVG.content_ratio,
        .5 * SVG.height + SVG.y - SVG.scale * (width - stroke_width) / SVG.content_ratio
    );
}

function open_detail(element) {
    "use strict";
    if (element.classList.contains("unfolded")) {
        element.classList.remove("unfolded");
        $(element).parent().find(".detail").addClass("hidden");
        document.getElementById("last-folded-indice").setAttribute("value", null);
    }
    else {
        element.classList.add("unfolded");
        $(element).parent().find(".detail").removeClass("hidden");
        var id = document.getElementById("last-folded-indice").getAttribute("value");
        if (id) {
            $("#" + id).parent().find(".open-detail").removeClass('unfolded');
            $("#" + id).parent().find(".detail").addClass("hidden");
            var checkbox = $("#" + id).parent().find(".zoom-enabled");
            if (checkbox[0] && checkbox[0].checked)
                checkbox.trigger("click");
        }
        document.getElementById("last-folded-indice").setAttribute(
            "value", $(element).parent().find(".indice").attr("id")
        );
        var indice = $(element).parent().find(".indice");
        $(element).parent().find(".color-indice-picker").spectrum({
            localization: Editor.local,
            showPaletteOnly: true,
            togglePaletteOnly: true,
            color: indice.css("background-color"),
            palette: palette,
            change: function(color) {
                change_indice_color(
                    indice.attr("id"),
                    color.toHexString(),
                    true
                );
                $(this).spectrum("hide");
            }
        });
    }
}

function display_result(element) {
    "use strict";
    if (element.classList.contains('disabled'))
      return;
    $("#indices .indice").attr("onclick", "real_zoom(this);");
    $("#edit-menu, #sidebar, #delete-svg, #update-svg").addClass("hidden");
    $("#svg").removeClass("edit-mode").addClass("show");
    $("#show-menu, #real-legend, #help-button").removeClass("hidden");
    if (document.getElementById('copyright-content').innerText.trim())
        document.getElementById('copyright-button').classList.remove('hidden');
    $("#svg svg").css("transform", "scale(1)");
    $("#indices .indice").each(function(index, el) {
        if ($(el).hasClass('hidden'))
            $(el).data("hidden", true);
        else
            $(el).data("hidden", false);
        if ($(el).parent().attr("id") != "template-indice")
            $(el).removeClass('hidden');
    });
    $("#root-svg")[0].style.transform = "";
}

function return_to_edit() {
    "use strict";
    var index = parseInt($("#last-folded-indice").val().substring(14));
    var indice = document.getElementById('legend-indice-' + index);
    var zoom_input = null;
    if (indice)
        zoom_input = indice.parentElement.getElementsByClassName('zoom-enabled')[0];
    document.getElementById('content').removeAttribute('data-real-zoom-indice');
    $("#indices .indice").removeAttr("onclick");
    $("#edit-menu, #sidebar, #delete-svg, #update-svg").removeClass("hidden");
    $("#svg #root-svg")[0].style.transform = "";
    var svg_element = $("#svg svg")[0];
    svg_element.classList.remove("duration");
    svg_element.style.transform =  "scale(1)";
    $("#svg").removeClass("show").addClass("edit-mode");
    $("#show-menu, #real-legend, #help-button, #copyright-button, #copyright-dialog, #help-dialog").addClass("hidden");
    $(".description").addClass("hidden");
    $("#indices .indice").each(function(index, el) {
        if ($(el).data('hidden') == true)
            $(el).addClass('hidden');
        else
            $(el).removeClass('hidden');
    });
    if (zoom_input && zoom_input.checked)
        active_zoom(zoom_input);
}

function disabledClass(class_name) {
    var els = document.getElementsByClassName(class_name);
    for (var i = 0; i < els.length; i++) {
        els[i].removeAttribute('disabled');
    }
}

function delete_pic(replace) {
    "use strict";
    checked_all();
    delete_selected_legend();
    $("#nb-indices, #count-nb-display").val(0);
    document.getElementById('source-file').setAttribute('data-title', '');
    disabledClass('example-launcher');
    document.getElementById('source-file').setAttribute('data-title', '');
    $("#svg svg").remove();
    document.getElementById('content').setAttribute('data-full', false);
    if (!replace) {
        $("#edit-zone, #upload-text").addClass("hidden");
        $("#upload-zone, #choose-file").removeClass("hidden");
        $("#delete-picture-modal").modal('hide');
    }
    Warnings.clear();
    history.clear();
}

function show_legend(element) {
    "use strict";
    var index = $(element).parent().parent().find(".indice").text();
    var nbDisplay = $("#count-nb-display");
    if($(element).hasClass('show')) {
        $("#indice-" + index).css('opacity', 0);
        $(element).removeClass('show');
        nbDisplay.val(parseInt(nbDisplay.val()) - 1);
    }
    else {
        $("#indice-" + index).css('opacity', 1);
        $(element).addClass('show');
        nbDisplay.val(parseInt(nbDisplay.val()) + 1);
    }
    th_show_legend();
}

function th_show_legend() {
    "use strict";
    var nbDisplay = $("#count-nb-display");
    $("#tr-show-all-legend").addClass('hidden');
    if ($("#nb-indices").val() > 1)
        $("#tr-show-all-legend").removeClass('hidden');
    $("#show-all-legend").removeClass('show');
    if ($("#nb-indices").val() === nbDisplay.val())
        $("#show-all-legend").addClass('show');
}

function select_legend(element) {
    "use strict";
    var nbSelected = $("#count-nb-selected");
    if($(element).is(':checked'))
        nbSelected.val(parseInt(nbSelected.val()) + 1);
    else
        nbSelected.val(parseInt(nbSelected.val()) - 1);
    $("#delete-legend-button").addClass('disabled');
    if (nbSelected.val() > 0)
        $("#delete-legend-button").removeClass('disabled');
    $("#select-all-legend").prop(
        "checked",
        $("#nb-indices").val() == nbSelected.val()
    );
}

function show_all_legend() {
    "use strict";
    var value = $("#show-all-legend").hasClass("show");
    if (value) {
        $("#show-all-legend").removeClass("show");
        $("#list-of-legend .display-indice").removeClass("show");
        $("#svg .indice").css('opacity', 0);
        document.getElementById("count-nb-display").setAttribute("value", 0);
    }
    else {
        $("#show-all-legend").addClass("show");
        $("#list-of-legend .display-indice").addClass("show");
        $("#svg .indice").css('opacity', 1);
        document.getElementById("count-nb-display").setAttribute(
            "value",
            document.getElementById("nb-indices").getAttribute("value")
        );
    }
    $("#template-indice .indice").addClass("hidden");
}

function checked_all() {
    "use strict";
    $("#delete-legend-button").removeClass('disabled');
    $("#list-of-legend tbody tr .selection > input").prop('checked', true);
    document.getElementById("count-nb-selected").setAttribute(
        "value",
        document.getElementById("nb-indices").getAttribute("value")
    );
    $("#template-legend input").prop('checked', false);
}

function select_all_legend() {
    "use strict";
    var value = $("#select-all-legend").prop('checked');
    if (value)
        checked_all();
    else {
        $("#list-of-legend tbody tr .selection > input").prop('checked', false);
        $("#delete-legend-button").addClass('disabled');
        document.getElementById("count-nb-selected").setAttribute("value", 0);
    }
    $("#template-legend input").prop('checked', false);
}

function UpdateCssTransform() {
    "use strict";
    var index = parseInt($("#last-folded-indice").val().substring(14));
    var indice = document.getElementById('legend-indice-' + index);
    var zoom_input = null;
    if (indice)
        zoom_input = indice.parentElement.getElementsByClassName('zoom-enabled')[0];
    var svg_indice = document.getElementById('indice-' + index);
    var trans_x = parseFloat(svg_indice.getAttribute("data-translate-x") - SVG.x);
    var trans_y = parseFloat(svg_indice.getAttribute("data-translate-y") - SVG.y);
    document.getElementById("root-svg").style.transform = "";
    document.getElementById("root-svg").style.transform = css_translate(trans_x, trans_y);
}

function add_blank(html) {
    "use strict";
    var doc = new DOMParser().parseFromString(html, "text/html");
    var links = doc.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].setAttribute('target', '_blank');
    }
    return doc.firstChild.innerHTML;
}
