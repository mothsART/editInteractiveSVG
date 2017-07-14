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
        if (DEBUG) {
          $("#content").append(xmlhttp.responseText);
          $("#content").data('full', true);
          $("#upload-zone").addClass('hidden');
          $("#edit-zone").removeClass('hidden');
          $("#save-form, #undo-button, #redo-button, #nav-right").removeClass('disabled');
          $("#delete-legend-button").addClass('disabled');
          createForeignObject();
          populate_without_action(10);
        }
        else {
          var el = document.createElement('div');
          el.innerHTML = xmlhttp.responseText;
          $("#content").append($(el).find('svg'));
          $("#content").data('full', true);
          $("#upload-zone").addClass('hidden');
          $("#edit-zone").removeClass('hidden');
          $("#save-form, #undo-button, #redo-button, #nav-right").removeClass('disabled');
          $("#delete-legend-button").addClass('disabled');
          createForeignObject();
          // clone legend on view mode
          var real_legend = $(el).find('#real-legend');
          if (real_legend.length != 0)
            $('#real-legend').html(real_legend.clone().html());
          // clone descriptions
          var descriptions = $(el).find('#descriptions');
          if (descriptions.length != 0)
            $("#descriptions").html(descriptions.clone().html());
          // add indices and details
          $("#real-legend .indice").each(function(index, el) {
            if (el.getAttribute('id') != 'real-template-indice')
            {
              var rgb_value = $('#real-indice-' + index + ' span').css('background-color');
              var rgb_array = rgb_value.split("(")[1].split(")")[0].split(',');
              var hex_color = rgbToHex(
                parseInt(rgb_array[0]),
                parseInt(rgb_array[1]),
                parseInt(rgb_array[2])
              );
              add_legend(el, hex_color);
              var title = $(el).find('em').text();
              if (title.trim() != '')
                $('#legend-' + index).find('em').text(title);
              $('#legend-' + index).find('.zoom-input').val(
                $('#indice-' + index).data('zoom')
              );
            }
          });
        }
      }
    }
    xmlhttp.send();
  }
}