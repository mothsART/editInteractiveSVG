var SVG = {
    width:         0,
    height:        0,
    ratio:         0,
    content_ratio: 0,
    indice_left:   0,
    indice_top:    0,
    indice_height: 0,
    indice_width:  0,
    init: function() {
        this.width = parseInt($("#svg svg").attr("width").replace(/[^0-9]+/, ''));
        this.height = parseInt($("#svg svg").attr("height").replace(/[^0-9]+/, ''));
        this.ratio = this.width / this.height;
        this.content_ratio = $("#svg").width() / $("#svg").height();
        if (this.ratio > this.content_ratio) {
            this.indice_left = 0;
            this.indice_top = parseInt(($("#svg").height() - $("#svg").width() / this.ratio) / 2);
            this.indice_height = 5 + parseInt($("#svg").width() / this.ratio);
            this.indice_width = $("#svg").width();
        }
        else {
            this.indice_left = parseInt(($("#svg").width() - $("#svg").height() * this.ratio) / 2);
            this.indice_top = 0;
            this.indice_width = 5 + parseInt($("#svg").height() * this.ratio);
            this.indice_height = $("#svg").height();
        }
    }
};

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
        reorder_legend();
    }
};

dragAndDrop.init();

function reorder_legend() {
    "use strict";
    var tr_list = document.getElementById("list-of-legend").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (var i = 0, len = tr_list.length; i < len; i++) {
        tr_list[i].getElementsByClassName("indice")[0].setAttribute("id", "legend-indice-" + (i + 1));
        tr_list[i].getElementsByClassName("indice")[0].childNodes[0].nodeValue = i + 1;
        if($("#legend-indice-" + (i + 1)).parent().find(".open-detail").hasClass('unfolded')) {
             document.getElementById("last-folded-indice").setAttribute(
                "value", "legend-indice-" + (i + 1)
            );
        }
    };
    $("#indices .indice").each(function(index, el) {
        $(el).text(index + 1);
        $(el).attr("id", "indice-" + (index + 1));
    });
    $("#descriptions .description").each(function(index, el) {
        if ($(el).attr("id") != "template-description") {
            $(el).find("indice").text(index + 1);
            $(el).attr("id", "description-" + (index + 1));
        }
    });
    $("#real-legend .indice").each(function(index, el) {
        if ($(el).attr("id") != "real-template-indice") {
            $(el).find("span").text(index + 1);
            $(el).attr("id", "real-indice-" + (index + 1));
        }
    });
}

function add_legend(element) {
    "use strict";
    $("#show-all-legend").prop('checked', false);
    $("#template-legend").clone().removeAttr("id").removeClass("hidden").prependTo("#list-of-legend tbody");
    $("#show-all-legend").removeClass('hidden');
    $("#list-of-legend").removeClass('hidden');
    $("#template-indice").clone().removeAttr("id").removeClass("hidden").prependTo('#indices');
    $("#real-template-indice").clone().removeAttr("id").removeClass("hidden").prependTo('#real-legend');
    $("#template-description").clone().removeAttr("id").prependTo('#descriptions');
    var index = parseInt(document.getElementById("nb-indices").getAttribute("value")) + 1;
    document.getElementById("nb-indices").setAttribute("value", index);
    reorder_legend();
    if (index > 99) {
        $(element).attr("disabled", "disabled").attr("title", "Too lot indices.");
    }
    $("#svg.edit-mode #indices article .indice").mousedown(function() {
        if (!$("#svg").hasClass("edit-mode"))
        {
            return;
        }
        var self = this;
        $(self).addClass("is-draggable");
        document.onmousemove = function(e) {
            if (!$("#svg").hasClass("edit-mode"))
            {
                return;
            }
            SVG.init();
            $("#mask-on-drag").removeClass("hidden");
            $(self).addClass("is-draggable");
            var left = e.pageX - $("#sidebar #legend-container").width()
                - ((5 + $("#svg").width() - SVG.indice_width) / 2)
                - $(self).width()
            ;
            var top = e.pageY - $("#edit-menu").height()
                - ((5 + $("#svg").height() - SVG.indice_height) / 2)
                - $(self).height()
            ;
            var margin_left = 100 * left / SVG.indice_width;
            var margin_top = 100 * top / SVG.indice_height;
            if (margin_left < (50 * $(self).outerWidth() / SVG.indice_width))
            {
                margin_left = (50 * $(self).outerWidth() / SVG.indice_width);
            }
            if (margin_left > 100 - (25 * ($(self).outerWidth() * 2 - $(self).width()) / SVG.indice_width))
            {
                margin_left = 100 - (25 * ($(self).outerWidth() * 2 - $(self).width()) / SVG.indice_width);
            }
            if (margin_top < (50 * $(self).height() / SVG.indice_height))
            {
                margin_top = 50 * $(self).height() / SVG.indice_height;
            }
            if (margin_top > 100 - (50 * $(self).outerHeight() / SVG.indice_height))
            {
                margin_top = 100 - (50 * $(self).outerHeight() / SVG.indice_height);
            }
            $(self).closest('article').css(
                "left", margin_left + "%"
            );
            $(self).closest('article').css(
                "top", margin_top + "%"
            );
        }
        this.onmouseup = function() {
            document.onmousemove = null;
            $("#mask-on-drag").addClass("hidden");
            $(self).removeClass("is-draggable");
        }
    });
}

function open_detail(element) {
    "use strict";
    if ($(element).hasClass("unfolded")) {
        $(element).removeClass("unfolded");
        $(element).parent().find(".detail").addClass("hidden");
        document.getElementById("last-folded-indice").setAttribute("value", null);
    }
    else {
        $(element).addClass("unfolded");
        $(element).parent().find(".detail").removeClass("hidden");
        var id = document.getElementById("last-folded-indice").getAttribute("value");
        if (id) {
            $("#" + id).parent().find(".open-detail").removeClass('unfolded');
            $("#" + id).parent().find(".detail").addClass("hidden");
        }
        document.getElementById("last-folded-indice").setAttribute(
            "value", $(element).parent().find(".indice").attr("id")
        );
        var indice = $(element).parent().find(".indice");
        $(element).parent().find(".color-indice-picker").spectrum({
            showPaletteOnly: true,
            togglePaletteOnly: true,
            togglePaletteMoreText: 'more',
            togglePaletteLessText: 'less',
            color: indice.css("background-color"),
            palette: [
                ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
            ],
            change: function(color) {
                indice.css("background-color", color.toHexString());
                $("#" + indice.attr("id").substring(7)).css(
                    "background-color", color.toHexString()
                );
                $("#description-" + indice.attr("id").substring(14)).find(".indice").css(
                    "background-color", color.toHexString()
                );
                $("#real-" + indice.attr("id").substring(7)).find("span").css(
                    "background-color", color.toHexString()
                );
            }
        });
    }
}

function indice_out(element) {
    "use strict";
    $(element).removeClass("is-draggable");
}

function delete_legend() {
    "use strict";
    $("#list-of-legend tbody tr .checkbox:checked").closest("tr").remove();
    $("#delete-legend-modal").modal('hide');
    /*document.getElementById("count-nb-display").setAttribute(
        "value",
        document.getElementById("nb-indices").getAttribute("value") -
    );*/
    if ($("#list-of-legend tbody tr").length == 1) {
        $("#list-of-legend").addClass('hidden');
        $("#show-all-legend").addClass('hidden').prop('checked', false);
    }
    else {
        reorder_legend();
    }
    $("#add-legend-button").removeAttr('disabled').removeAttr("title");
}

function display_result() {
    "use strict";
    $("#indices .indice").attr("onclick", "real_zoom(this);");
    $("#edit-menu, #sidebar, #delete-content").addClass("hidden");
    $("#svg").removeClass("edit-mode").addClass("show");
    $("#show-menu, #real-legend").removeClass("hidden");
    $("#svg svg").css("transform", "scale(1)");
    resize_indices();
    $("#indices .indice").each(function(index, el) {
        if ($(el).hasClass('hidden')) {
            $(el).data("hidden", true);
        }
        else {
            $(el).data("hidden", false);
        }
        if ($(el).parent().attr("id") != "template-indice") {
            $(el).removeClass('hidden');
        }
    });
}

function return_to_edit() {
    "use strict";
    $("#indices .indice").removeAttr("onclick");
    $("#edit-menu, #sidebar, #delete-content").removeClass("hidden");
    $("#svg").removeClass("show").addClass("edit-mode");
    $("#show-menu, #real-legend").addClass("hidden");
    $(".description").addClass("hidden");
    $("#svg svg").css("transform", "scale(1)").removeClass("duration");
    resize_indices();
    $("#indices .indice").each(function(index, el) {
        if ($(el).data('hidden') == true) {
            $(el).addClass('hidden');
        }
        else {
            $(el).removeClass('hidden');
        }
    });
    if ($("#zoom-enabled").prop('checked')) {
        $("#svg svg").css("transform", "scale(" + $("#zoom-input").val() / 100 + ")");
    }
}

function delete_pic() {
    "use strict";
    $("#svg svg").remove();
    $("#edit-menu, #edit-zone, #upload-text").addClass("hidden");
    $("#upload-zone, #choose-file").removeClass("hidden");
    $("#delete-picture-modal").modal('hide');
}

function show_legend(element) {
    "use strict";
    var index = $(element).parent().parent().find(".indice").text();
    if($(element).hasClass('show')) {
        $("#indice-" + index).addClass("hidden");
        $(element).removeClass('show');
    }
    else {
        $("#indice-" + index).removeClass("hidden");
        $(element).addClass('show');
    }
    if ($("#list-of-legend tbody tr .checkbox:not(:checked)").length == 1) {
        $("#show-all-legend").prop('checked', true);
    }
    else {
        $("#show-all-legend").prop('checked', false);
    }
}

function select_legend(element) {
    "use strict";
    $("#delete-legend-button").removeClass('disabled');
    if ($("#list-of-legend tbody tr .checkbox:checked").length == 0) {
        $("#delete-legend-button").addClass('disabled');
    }
}

function show_all_legend() {
    "use strict";
    var value = $("#show-all-legend").hasClass("show");
    if (value) {
        $("#show-all-legend").removeClass("show");
        $("#list-of-legend .display-indice").removeClass("show");
        $("#indices .indice").addClass("hidden");
        document.getElementById("count-nb-display").setAttribute(
            "value",
            document.getElementById("nb-indices").getAttribute("value")
        );
    }
    else {
        $("#show-all-legend").addClass("show");
        $("#list-of-legend .display-indice").addClass("show");
        $("#indices .indice").removeClass("hidden");
        document.getElementById("count-nb-display").setAttribute("value", 0);
    }
    $("#template-indice .indice").addClass("hidden");
}

function select_all_legend() {
    "use strict";
    var value = $("#select-all-legend").prop('checked');
    if (value) {
        $("#delete-legend-button").removeClass('disabled');
        $("#list-of-legend tbody tr .selection > input").prop('checked', value);
        document.getElementById("count-nb-display").setAttribute(
            "value",
            document.getElementById("nb-indices").getAttribute("value")
        );
    }
    else {
        $("#list-of-legend tbody tr .selection > input").prop('checked', value);
        $("#delete-legend-button").addClass('disabled');
        document.getElementById("count-nb-display").setAttribute("value", 0);
    }
    $("#template-legend input").prop('checked', false);
}

function zoom(element) {
    "use strict";
    $("#svg svg").css("transform", "scale(" + $(element).val() / 100 + ")");
}

function active_zoom(element) {
    "use strict";
    if($(element).prop('checked')) {
        $("#zoom-input").attr("disabled", false);
        $("#svg svg").css("transform", "scale(" + $("#zoom-input").val() / 100 + ")");
    }
    else {
        $("#zoom-input").attr("disabled", true);
        var indice = $("#" + $("#indice-editor").data("indice-id"));
        indice.data("zoom", $("#zoom-input").val());
        $("#svg svg").css("transform", "scale(1)");
    }
}

function real_zoom(element) {
    "use strict";
    $("#svg.show").addClass("duration");
    var index = $(element).text().trim();
    var indice = $("#indice-" + index);
    var description = $("#description-" + index);
    if (indice.data("zoom-active") == true)
    {
        $("#svg.show svg").css("transform", "scale(1)");
        indice.data("zoom-active", false);
        description.addClass("hidden");
    }
    else {
        $("#svg.show svg").css("transform", "scale(" + indice.data("zoom") / 100 + ")");
        indice.data("zoom-active", true);
        if (description.find(".description-content").html().trim() != "") {
            description.removeClass("hidden");
        }
    }
}

$(window).resize(function() {
    resize_indices();
});

function resize_indices() {
    "use strict";
    SVG.init();
    $("#indices").css("margin-left", SVG.indice_left);
    $("#indices").css("margin-top", SVG.indice_top);
    $("#indices").css("height", SVG.indice_height);
    $("#indices").css("width", SVG.indice_width);
}

$('#edit-legend-modal').on('show.bs.modal', function (e) {
    var nb = parseInt($("#last-folded-indice").val().substring(14));
    var text = $("#" + $("#last-folded-indice").val()).next().text();
    $("#modal-legend-id").val(nb);
    if (text == '-- no title --') {
        $("#legend-title").attr("placeholder", "-- no title --");
    }
    else {
         $("#legend-title").text(text);
    }
});

// Save title and description
$('#edit-legend-modal').on('hidden.bs.modal', function (e) {
    var text = $("#legend-title").val();
    var inc = $("#modal-legend-id").val();
    var indice = $("#legend-indice-" + inc);
    var real_indice = $("#real-indice-" + inc);
    indice.next().remove();
    if (text == '' || text == '-- no title --') {
        indice.after("<em>-- no title --</em>");
        real_indice.find("em").text("");
    }
    else {
        indice.after("<span>" + text + "</span>");
        real_indice.find("em").text(text);
        $("#description-" + inc + " .title").text(text);
    }
    $("#description-" + inc + " .description-content").html(
        $("#indice-description").trumbowyg('html')
    );
});