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
    $("#list-of-legend tbody tr").each(function(index, el) {
        $(el).find(".indice").attr("id", "legend-indice-" + (index + 1));
        $(el).find(".indice").text(index + 1);
    });
    $("#indices .indice").each(function(index, el) {
        $(el).text(index + 1);
        $(el).attr("id", "indice-" + (index + 1));
    });
    $("#real-legend .indice").each(function(index, el) {
        $(el).find("span").text(index + 1);
        $(el).attr("id", "real-indice-" + (index + 1));
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
    reorder_legend();
    if ($("#indices .indice").length > 99) {
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

function indice_out(element) {
    "use strict";
    $(element).removeClass("is-draggable");
}

function delete_legend() {
    "use strict";
    $("#list-of-legend tbody tr .checkbox:checked").closest("tr").remove();
    $("#delete-legend-modal").modal('hide');
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
    $("#edit-menu, #sidebar, #delete-content").addClass("hidden");
    $("#svg").removeClass("edit-mode").addClass("show");
    $("#show-menu, #real-legend").removeClass("hidden");
    resize_indices();
}

function return_to_edit() {
    "use strict";
    $("#edit-menu, #sidebar, #delete-content").removeClass("hidden");
    $("#svg").removeClass("show").addClass("edit-mode");
    $("#show-menu, #real-legend").addClass("hidden");
    resize_indices();
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
    if($(element).prop('checked')) {
        $("#indice-" + index).removeClass("hidden");
    }
    else {
        $("#indice-" + index).addClass("hidden");
    }
    if ($("#list-of-legend tbody tr .checkbox:not(:checked)").length == 1) {
        $("#show-all-legend").prop('checked', true);
    }
    else {
        $("#show-all-legend").prop('checked', false);
    }
    $("#delete-legend-button").removeClass('disabled');
    if ($("#list-of-legend tbody tr .checkbox:checked").length == 0) {
        $("#delete-legend-button").addClass('disabled');
    }
}

function show_all_legend() {
    "use strict";
    var value = $("#show-all-legend").prop('checked');
    $("#list-of-legend tbody tr .checkbox").prop('checked', value);
    $("#delete-legend-button").addClass('disabled');
    $("#indices .indice").addClass("hidden");
    if (value) {
        $("#delete-legend-button").removeClass('disabled');
        $("#indices .indice").removeClass("hidden");
    }
    $("#template-legend .checkbox").prop('checked', false);
}

function zoom(element) {
    "use strict";
    $("#svg svg").css("transform", "scale(" + $(element).val() / 100 + ")");
}

function active_zoom(element) {
    "use strict";
    if($(element).prop('checked')) {
        $("#zoom-input").attr("disabled", false);
    }
    else {
        $("#zoom-input").attr("disabled", true);
    }
}

function show_indice_editor(element) {
    "use strict";
    if (!$("#svg").hasClass("edit-mode"))
    {
        return;
    }
    $(element).addClass("is-draggable");
    $("#legend-container").addClass("edit-legend");
    $("#indice-editor").removeClass('hidden');
    var indice = $(element);
    $("#indice-editor .related-target-editor").data("indiceNb", indice.attr("id").substring(7));
    $("#color-indice-picker").spectrum({
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
            $("#legend-indice-" + indice.attr("id").substring(7)).css(
                "background-color", color.toHexString()
            );
            $("#real-indice-" + indice.attr("id").substring(7)).css(
                "background-color", color.toHexString()
            );
        }
    });
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
    var nb = $(e.relatedTarget).data("indiceNb");
    var text = $("#legend-indice-" + nb).next().text();
    $("#modal-legend-id").val(nb);
    if (text == '-- no title --') {
        $("#legend-title").attr("placeholder", "-- no title --");
    }
    else {
         $("#legend-title").text(text);
    }
});

$('#edit-legend-modal').on('hidden.bs.modal', function (e) {
    var text = $("#legend-title").val();
    var indice = $("#legend-indice-" + $("#modal-legend-id").val());
    var real_indice = $("#real-indice-" + $("#modal-legend-id").val());
    indice.next().remove();
    if (text == '' || text == '-- no title --') {
        indice.after("<em>-- no title --</em>");
        real_indice.find("em").text("");
    }
    else {
        indice.after("<span>" + text + "</span>");
        real_indice.find("em").text(text);
    }
    console.log($("#indice-description").trumbowyg('html'));
});

;(function(document, window, index)
{
    "use strict";
    // inspiration https://css-tricks.com/examples/DragAndDropFileUploading/
    // feature detection for drag&drop upload
    var isAdvancedUpload = function()
        {
            var div = document.createElement('div');
            return (
                    ('draggable' in div)
                    || ('ondragstart' in div && 'ondrop' in div)
                )
                && 'FormData' in window && 'FileReader' in window;
        }();

    // applying the effect for every form
    var forms = document.querySelectorAll('.box');
    Array.prototype.forEach.call( forms, function(form)
    {
        var input        = form.querySelector('input[type="file"]'),
            label        = form.querySelector('#upload-text'),
            errorMsg     = form.querySelector('.box__error span'),
            restart      = form.querySelectorAll('.box__restart'),
            droppedFiles = false,
            showFiles    = function(files)
            {
                $("#choose-file").addClass("hidden");
                $("#upload-text").removeClass("hidden");
                label.textContent = files.length > 1 ? (input.getAttribute('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name;
            },
            triggerFormSubmit = function()
            {
                var event = document.createEvent('HTMLEvents');
                event.initEvent('submit', true, false );
                form.dispatchEvent(event);
            };

        // automatically submit the form on file select
        input.addEventListener('change', function(e)
        {
            showFiles(e.target.files);

            triggerFormSubmit();
        });

        // drag&drop files if the feature is available
        if( isAdvancedUpload )
        {
            form.classList.add('has-advanced-upload'); // letting the CSS part to know drag&drop is supported by the browser

            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( event )
            {
                form.addEventListener(event, function(e)
                {
                    // preventing the unwanted behaviours
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
            ['dragover', 'dragenter'].forEach( function( event )
            {
                form.addEventListener( event, function()
                {
                    form.classList.add('is-dragover');
                });
            });
            ['dragleave', 'dragend', 'drop'].forEach( function( event )
            {
                form.addEventListener( event, function()
                {
                    form.classList.remove('is-dragover');
                });
            });
            form.addEventListener('drop', function(e)
            {
                droppedFiles = e.dataTransfer.files; // the files that were dropped
                showFiles( droppedFiles );

                triggerFormSubmit();
            });
        }

        // if the form was submitted
        form.addEventListener('submit', function(e)
        {
            form.classList.remove('is-error');
            if(window.FileReader)
            {
                if(droppedFiles)
                {
                    Array.prototype.forEach.call( droppedFiles, function(file)
                    {
                        var reader = new FileReader();
                        reader.readAsText(file);
                        reader.onload = function(e) {
                            "using strict";
                            $("#content").append(reader.result);
                            $("#upload-zone").addClass('hidden');
                            $("#edit-menu, #edit-zone").removeClass('hidden');
                            resize_indices();
                        }
                    });
                }
            }
        });

        // restart the form if has a state of error/success
        Array.prototype.forEach.call( restart, function(entry)
        {
            entry.addEventListener('click', function(e)
            {
                e.preventDefault();
                form.classList.remove('is-error','is-success');
                input.click();
            });
        });

        // Firefox focus bug fix for file input
        input.addEventListener('focus', function(){ input.classList.add('has-focus'); });
        input.addEventListener('blur', function(){ input.classList.remove('has-focus'); });

    });
}( document, window, 0 ));
