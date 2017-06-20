function replace_with_example() {
  "use strict";
  var modal = $('#load-picture-modal');
  $('#load-picture-modal').modal('hide');
  delete_pic(true);
  load_example(modal.data('url'), modal.data('name'));
}

function load_example(url, name) {
  "use strict";
  if ($("#content").data('full'))
  {
    var modal = $('#load-picture-modal');
    modal.data('url', url);
    modal.data('name', name);
    modal.modal('show');
  }
  else {
    $("#source-file").text(name);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        $("#content").append(xmlhttp.responseText);
        $("#content").data('full', true);
        $("#upload-zone").addClass('hidden');
        $("#edit-zone").removeClass('hidden');
        $("#save-form, #undo-button, #redo-button, #nav-right").removeClass('disabled');
        $("#delete-legend-button").addClass('disabled');
        createForeignObject();
        //resize_indices();
        populate_without_action(2);
      }
    }
    xmlhttp.send();
  }
}