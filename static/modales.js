function open_dialog() {
    "use strict";
    var index = parseInt($("#last-folded-indice").val().substring(14));
    var text = $("#" + $("#last-folded-indice").val()).next().text();
    var description =  $("#description-" + index + " .description-content")[0].innerHTML;
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

function hide_description_dialog() {
    "use strict";
    var text = $("#legend-title").val();
    var index = $("#modal-legend-id").val();
    var indice = $("#legend-indice-" + index);
    var real_indice = $("#real-indice-" + index);
    indice.next().remove();
    if (text == '' || text == '-- no title --') {
        indice.after("<em>-- no title --</em>");
        real_indice.find("em").text("");
    }
    else {
        indice.after("<span class='indice-title' title='"+ text + "'>" + text + "</span>");
        real_indice.find("em").text(text);
        $("#description-" + index + " .title").text(text);
    }
    var html = document.getElementById('indice-description').innerHTML;
    document.getElementById('description-' + index)
          .getElementsByClassName('description-content')[0]
          .innerHTML = add_blank(html);
    document.getElementById('indice-description').innerText = '';
}

function hide_copyright_dialog() {
    "use strict";
    var html = $("#edit-copyright").trumbowyg('html');
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

// Save title and description
$('#edit-legend-modal').on('hidden.bs.modal', function (e) {
    "use strict";
    hide_description_dialog();
});

// Save title and description
$('#edit-copyright-modal').on('hidden.bs.modal', function (e) {
    "use strict";
    hide_copyright_dialog();
});

function modal_delete_legend(element) {
    "use strict";
    if (element.classList.contains('disabled'))
        return;
    $('#delete-legend-modal').modal();
}
