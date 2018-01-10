function replace_with_example() {
  "use strict";
  var modal = $('#load-picture-modal');
  $('#load-picture-modal').modal('hide');
  delete_pic(true);
  load_example(modal.data('url'), modal.data('name'));
}

function replace_css(prefix, css) {
    "use strict";
    var new_css = "";
    while (true) {
        var rule_pos = css.indexOf("{");
        if (rule_pos == -1)
            break;
        var rule = css.substr(0, rule_pos).trim();
        var new_rule = "";
        while (true) {
            var sub_rule_pos = rule.indexOf(",");
            if (sub_rule_pos == -1) {
                new_rule += prefix + rule;
                break;
            }
            new_rule += prefix + rule.substr(0, sub_rule_pos + 1);
            rule = rule.substr(sub_rule_pos + 1);
        }
        new_css += new_rule;
        css = css.substr(rule_pos);
        rule_pos = css.indexOf("}");
        new_css += css.substr(0, rule_pos + 1);
        css = css.substr(rule_pos + 1);
    }
    return new_css;
}

function load_file(stream) {
  "use strict";
  var el = document.createElement('div');
  el.innerHTML = stream;
  if ($(el).find('svg script').length > 0)
  {
    Warnings.new('warning-script-detected');
    $(el).find('svg script').remove();
  }
  if ($(el).find('svg clipPath').length > 0)
    Warnings.new('warning-clipPath-tag-detected');
  if ($(el).find('svg mask').length > 0)
    Warnings.new('warning-mask-tag-detected');
  if (el.getElementsByTagName("svg").length == 0)
  {
    Errors.new("error-file-not-supported");
    return;
  }
  var style_list = el.getElementsByTagName("svg")[0].getElementsByTagName("style");
  if (style_list.length > 0) {
    Warnings.new('warning-style-detected');
    for (var i = 0, len = style_list.length; i < len; i++) {
        style_list[i].innerHTML = replace_css("#content svg ", style_list[i].innerHTML);
    }
  }
  $("#content").append($(el).find('svg'));
  document.getElementById('content').setAttribute('data-full', true);
  $("#upload-zone, #error-zone").addClass('hidden');
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
      if (title.trim() != '') {
        $('#legend-' + index).find('em').remove();
        $("<span class='indice-title' title='"+ title + "'>" + title + "</span>").insertAfter(
          '#legend-' + index + " .indice"
        );
      }
      $('#legend-' + index).find('.zoom-input').val(
        $('#indice-' + index).data('zoom')
      );
    }
  });
  $('#upload-zone form').removeClass('is-uploading');
}

function load_example(url, name) {
  "use strict";
  if (document.getElementById('content').getAttribute('data-full') == 'true')
  {
    var modal = $('#load-picture-modal');
    modal.data('url', url);
    modal.data('name', name);
    modal.modal('show');
  }
  else {
    $("#source-file").text(name);
    $("#source-file").attr('title', name);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        if (DEBUG) {
          $("#content").append(xmlhttp.responseText);
          document.getElementById('content').setAttribute('data-full', true);
          $("#upload-zone, #error-zone").addClass('hidden');
          $("#edit-zone").removeClass('hidden');
          $("#save-form, #undo-button, #redo-button, #nav-right").removeClass('disabled');
          $("#delete-legend-button").addClass('disabled');
          createForeignObject();
          populate_without_action(10);
        }
        else
          load_file(xmlhttp.responseText);
      }
    }
    xmlhttp.send();
  }
}
