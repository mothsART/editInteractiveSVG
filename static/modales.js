function open_dialog() {
    "use strict";
    let index = parseInt($("#last-folded-indice").val().substring(14));
    let text = $("#" + $("#last-folded-indice").val()).next().text();
    let description =  $("#description-" + index + " .description-content")[0].innerHTML;
    if (!description.trim()) {
        description = '';
    }
    document.getElementById('indice-description').innerHTML = description;
    $("#modal-legend-id").val(index);
    if (text == translate(Editor.local, 'no_title')) {
        $("#legend-title").attr("placeholder", "-- no title --");
        $("#legend-title").val('');
    }
    else
        $("#legend-title").val(text);
}

function hide_copyright_dialog() {
    "use strict";
    let html = $("#edit-copyright").trumbowyg('html');
    if (html != "")
       document.getElementById('copyright-content')
               .innerHTML = add_blank(html);
}

$('#update-picture-modal').on('show.bs.modal', function (e) {
    "use strict";
    document.getElementsByTagName('body')[0].classList.add('update-svg');
});

$('#update-picture-modal').on('hidden.bs.modal', function (e) {
    "use strict";
    document.getElementsByTagName('body')[0].classList.remove('update-svg');
});

$('#edit-legend-modal').on('show.bs.modal', function (e) {
    "use strict";
    open_dialog();
});

// Save title and description on legend
$('#edit-legend-modal').on('hidden.bs.modal', function (e) {
    "use strict";
    update_title(true);
});

// Save title and description on copyright
$('#edit-copyright-modal').on('hidden.bs.modal', function (e) {
    "use strict";
    update_title(true);
});

function modal_delete_legend(element) {
    "use strict";
    if (element.classList.contains('disabled'))
        return;
    $('#delete-legend-modal').modal();
}
