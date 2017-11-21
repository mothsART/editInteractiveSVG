var DragTarget = null;
var DEBUG      = false;
var NS="http://www.w3.org/2000/svg";
var palette = [
  ["#000"   , "#444"   , "#666"   , "#999"   , "#ccc"   , "#eee"   , "#f3f3f3", "#fff"],
  ["#f00"   , "#f90"   , "#ff0"   , "#0f0"   , "#0ff"   , "#00f"   , "#90f"   , "#f0f"],
  ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
  ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
  ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
  ["#c00"   , "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
  ["#900"   , "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
  ["#600"   , "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
];

var colors = []
for (var i = 0; i < palette.length; i++) {
  for (var j = 0; j < palette[i].length; j++) {
    colors.push(palette[i][j]);
  }
}
var remaining_colors = [];

var Editor = {
  local: 'en'
}

var SVG = {
  x:             0,
  y:             0,
  width:         0,
  height:        0,
  ratio:         0,
  content_ratio: 0,
  indice_left:   0,
  indice_top:    0,
  indice_height: 0,
  indice_width:  0,
  biggest:       0,
  scale:         0,
  init: function() {
    "use strict";
    var svg_box  = $("#svg svg")[0].getBBox();
    this.x       = svg_box.x;
    this.y       = svg_box.y;
    this.width   = svg_box.width;
    this.height  = svg_box.height;
    this.ratio   = this.width / this.height;
    this.biggest = Math.max(this.width, this.height);
    this.scale   = this.biggest / 300;
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
  }
};

function hexToRgb(hex) {
  "use strict";
  if (hex.length == 4) hex = "#" + hex.substr(1) + hex.substr(1);
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

/**
 * Converts an RGB color value to Luminance. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {number}  l       luminance
 */
function rgbToHsl(r, g, b) {
  "use strict";
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var l = (max + min) / 2;
  return l;
}

function componentToHex(c) {
  "use strict";
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  "use strict";
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
dragAndDrop.init();

function translate_app(local) {
  "use strict";
  Editor.local = translateElementsByClassName("i18n", local);
  $("#indice-description").trumbowyg('destroy');
  $("#indice-description").trumbowyg({
    lang: Editor.local,
    btns: [
        ['viewHTML'],
        ['formatting'],
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['link'],
        ['base64'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat']
    ]
  });
  var localization = $.spectrum.localization[local] = {
      cancelText:            translate(Editor.local, 'cancel'),
      chooseText:            translate(Editor.local, 'choose'),
      togglePaletteMoreText: translate(Editor.local, 'more'),
      togglePaletteLessText: translate(Editor.local, 'less'),
  };
  $.extend($.fn.spectrum.defaults, localization);

}

function load() {
  "use strict";
  translate_app();
  if (document.getElementsByTagName('body')[0].classList.contains('debug'))
    document.getElementById('release-menu').classList.add('hidden');
  else
    document.getElementById('debug-menu').classList.add('hidden');
};

function reorder_legend() {
  "use strict";
  var tr_list = document.getElementById("list-of-legend").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (var i = 0, len = tr_list.length; i < len; i++) {
    if (i != 0) {
      tr_list[i].setAttribute('id', 'legend-' + i);
    }
    tr_list[i].getElementsByClassName("indice")[0].setAttribute("id", "legend-indice-" + i);
    tr_list[i].getElementsByClassName("indice")[0].childNodes[0].nodeValue = i;
    if($("#legend-indice-" + (i + 1)).parent().find(".open-detail").hasClass('unfolded')) {
      document.getElementById("last-folded-indice").setAttribute(
        "value", "legend-indice-" + (i + 1)
      );
    }
  };
  $("#svg g.indice").each(function(index, el) {
    $(el).find(".indice-text").text(index + 1);
    $(el).attr("id", "indice-" + (index + 1));
  });
  $("#descriptions .description").each(function(index, el) {
    if ($(el).attr("id") != "template-description") {
      $(el).find(".indice").text(index);
      $(el).attr("id", "description-" + (index));
    }
  });
  $("#real-legend .indice").each(function(index, el) {
    if ($(el).attr("id") != "real-template-indice") {
      $(el).find("span").text(index);
      $(el).attr("id", "real-indice-" + index);
    }
  });
}

function Grab(evt)
{
  "use strict";
  // exclude drag when zoom is in
  var scale = parseFloat(document.getElementById("svg").getAttribute("data-scale"));
  if (scale)
    return;
  // find out which element we moused down on
  var targetElement = evt.target;
  if (
    targetElement == null
    || !targetElement.classList.contains('mask')
    || document.getElementById("svg").classList.contains("show")
  )
    return;
  DragTarget = targetElement;
  $(DragTarget.parentNode).find(".indice-cross")[0].classList.remove("hidden");
};

function translate_indice(element, x, y) {
  "use strict";
  var indice_width = element.getBBox().width / 2;
  if (x < SVG.x)
    x = SVG.x;
  if (y < SVG.y)
    y = SVG.y;
  if (x > (SVG.width + SVG.x - indice_width))
    x = SVG.width + SVG.x - indice_width;
  if (y > (SVG.height + SVG.y - indice_width))
    y = SVG.height + SVG.y - indice_width;
  element.setAttribute("data-translate-x", x);
  element.setAttribute("data-translate-y", y);
  element.style.transform = "translate(" + x.toFixed(12) + "px, " + y.toFixed(12) + "px)";
}

function Drag(evt) {
  "use strict";
  if (DragTarget == null) {
    return;
  }
  var e = evt;
  if (!$("#svg").hasClass("edit-mode") || (e.clientX == 0 && e.clientY == 0))
  {
    return;
  }
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

function percentage_change(value1, value2, size) {
  "use strict";
  if (value1 == 0 && value2 == 0)
    return 0;
  value1  = Math.abs(value1);
  value2  = Math.abs(value2);
  var max = Math.max(value1, value2);
  var min = Math.min(value1, value2);
  if (!size || size == 0)
  {
    if (min == 0)
      return 100 * max
    return 100 * ((max - min) / min);
  }
  return 100 * ((max - min) / size);
}

function createForeignObject() {
  "use strict";
  /*var switchE = document.createElementNS("http://www.w3.org/2000/svg", "switch");
  var foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  var xhtmlNS = "http://www.w3.org/1999/xhtml";
  foreignObject.setAttributeNS(null, "x", "0");
  foreignObject.setAttributeNS(null, "y", "0");
  foreignObject.setAttributeNS(null, "width", "100%");
  foreignObject.setAttributeNS(null, "height", "100%");
  var section = document.createElementNS("http://www.w3.org/1999/xhtml", "section");
  var subsituteText = document.createElement("text");
  var substituteContent = document.createTextNode("[Not supported by viewer]");
  subsituteText.appendChild(substituteContent);
  section.id = "indices";
  foreignObject.appendChild(section);
  switchE.appendChild(foreignObject);
  switchE.appendChild(subsituteText);
  */
  var svg = $("#svg svg")[0];
  var rootElement = document.createElementNS(NS, "g");
  rootElement.setAttribute("id", "root-svg");
  rootElement.innerHTML = svg.innerHTML;
  svg.innerHTML   = '';
  svg.append(rootElement);
  //svg.appendChild(switchE);
  SVG.init();
  var SVG_Rect = svg.viewBox.baseVal;
  if (
    !(SVG_Rect.x == 0 && SVG_Rect.y == 0 && SVG_Rect.width == 0 && SVG_Rect.height == 0)
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
  svg.setAttribute("onmousedown", "Grab(evt)");
  svg.setAttribute("onmousemove", "Drag(evt)");
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

function random_colors() {
  "use strict";
  if (remaining_colors.length == 0)
    remaining_colors = colors;
  var new_value = colors[parseInt(Math.random() * remaining_colors.length)];
  var index = remaining_colors.indexOf(new_value);
  remaining_colors.splice(index, 1);
  return new_value;
}

function add_legend(element, hex_color) {
  "use strict";
  var index = parseInt(document.getElementById("nb-indices").getAttribute("value")) + 1;
  $("#show-all-legend").prop('checked', false);
  $("#template-legend").clone().removeAttr("id").removeClass("hidden")
    .appendTo("#list-of-legend tbody").attr("id", "legend-" + index);
  $("#list-of-legend").removeClass('hidden');
  if (!hex_color) {
    createEditIndice(index);
    $("#real-template-indice").clone().removeAttr("id").removeClass("hidden").appendTo('#real-legend');
    $("#template-description").clone().removeAttr("id").appendTo('#descriptions');
    hex_color = random_colors();
  }
  if (index > 98) {
    $(element).attr("disabled", "disabled").attr("title", "Too lot indices.");
    return;
  }
  document.getElementById("nb-indices").setAttribute("value", index);
  reorder_legend();
  $('#select-all-legend').prop('checked', false);
  change_indice_color(
    "legend-indice-" + index,
    hex_color
  );
  show_legend(
    document.getElementById("legend-indice-" + index)
    .parentElement.parentElement.getElementsByClassName('display-indice')[0]
  );
  return $("#legend-" + index + " .open-detail");
}

function change_indice_color(indice_id, hex_color) {
  "use strict";
  var indice = $("#" + indice_id);
  indice.css("background-color", hex_color);
  $("#description-" + indice.attr("id").substring(14)).find(".indice").css(
    "background-color", hex_color
  );
  $("#real-" + indice.attr("id").substring(7)).find("span").css(
    "background-color", hex_color
  );
  var rgb = hexToRgb(hex_color);
  var luminance = rgbToHsl(rgb.r, rgb.g, rgb.b);
  var color = "white";
  if (luminance > 0.4) {
    color = "black";
  }
  if (parseInt(indice.attr("id").substring(14)) < 10)
    indice[0].classList.remove('number');
  else
    indice[0].classList.add('number');
  indice.css("color", color).css("border", color + " solid 3px");
  $("#" + indice.attr("id").substring(7)).find("rect.backgroundColor").css(
    "fill", hex_color
  ).css("stroke", color);
  $("#" + indice.attr("id").substring(7)).find(".indice-text").css(
    "fill", color
  );
  $("#" + indice.attr("id").substring(7)).css("color", color);
  $("#description-" + indice.attr("id").substring(14)).find(".indice")
  .css("color", color);
  $("#real-" + indice.attr("id").substring(7)).find("span").css("color", color);
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
        change_indice_color(indice.attr("id"), color.toHexString());
      }
    });
  }
}

function modal_delete_legend(element) {
  "use strict";
   if (element.classList.contains('disabled'))
    return;
  $('#delete-legend-modal').modal();
}

function delete_legend() {
  "use strict";
  var tr_list = $("#list-of-legend tbody tr .select:checked").closest("tr");
  var nb_tr = tr_list.length;
  $("#nb-indices").val(parseInt($("#nb-indices").val()) - nb_tr);
  $("#count-nb-selected").val(0);
  $("#select-all-legend").prop('checked', false);
  tr_list.each(function(index, el) {
    var index = $(el).find(".indice").attr("id").substring(14);
    $("#indice-" + index).remove();
    $("#description-" + index).remove();
    $("#real-indice-" + index).remove();
    if ($('#legend-' + index + " .display-indice").hasClass('show'))
      $("#count-nb-display").val(parseInt($("#count-nb-display").val()) - 1);
    if (parseInt(document.getElementById("last-folded-indice").getAttribute("value").substring(14)) === parseInt(index))
      document.getElementById("last-folded-indice").setAttribute("value", "");
  });
  tr_list.remove();
  $('#delete-legend-button').addClass('disabled');
  th_show_legend();
  $("#delete-legend-modal").modal('hide');
  if ($("#list-of-legend tbody tr").length == 1)
    $("#list-of-legend").addClass('hidden');
  else if ($("#list-of-legend tbody tr").length == 2) {
    reorder_legend();
    $("#show-all-legend").removeClass('show').prop('checked', false);
  }
  else
    reorder_legend();
  $("#add-legend-button").removeAttr('disabled').removeAttr("title");
}

function display_result(element) {
  "use strict";
  if (element.classList.contains('disabled'))
    return;
  $("#indices .indice").attr("onclick", "real_zoom(this);");
  $("#edit-menu, #sidebar, #delete-svg").addClass("hidden");
  $("#svg").removeClass("edit-mode").addClass("show");
  $("#show-menu, #real-legend").removeClass("hidden");
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
  var index      = parseInt($("#last-folded-indice").val().substring(14));
  var indice     = document.getElementById('legend-indice-' + index);
  var zoom_input = null;
  if (indice)
    zoom_input = indice.parentElement.getElementsByClassName('zoom-enabled')[0];
  document.getElementById('content').removeAttribute('data-real-zoom-indice');
  $("#indices .indice").removeAttr("onclick");
  $("#edit-menu, #sidebar, #delete-svg").removeClass("hidden");
  $("#svg").removeClass("show").addClass("edit-mode");
  $("#show-menu, #real-legend").addClass("hidden");
  $(".description").addClass("hidden");
  var svg_element = $("#svg svg")[0];
  svg_element.style.transform =  "scale(1)";
  svg_element.classList.remove("duration");
  $("#indices .indice").each(function(index, el) {
    if ($(el).data('hidden') == true)
      $(el).addClass('hidden');
    else
      $(el).removeClass('hidden');
  });
  if (zoom_input && zoom_input.checked)
    active_zoom(zoom_input);
}

function delete_pic(replace) {
  "use strict";
  checked_all();
  delete_legend();
  $("#nb-indices, #count-nb-display").val(0);
  $("#svg svg").remove();
  document.getElementById('content').setAttribute('data-full', false);
  if (!replace) {
    $("#edit-zone, #upload-text").addClass("hidden");
    $("#upload-zone, #choose-file").removeClass("hidden");
    $("#delete-picture-modal").modal('hide');
  }
  Warnings.clear();
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

function css_translate(trans_x, trans_y) {
  "use strict";
  var indice_len_x = 14 * SVG.width / 500;
  var indice_len_y = 14 * SVG.height / 500;
  var svg_width = parseInt($("#root-svg").css("width").replace("px", ""));
  var svg_height = parseInt($("#root-svg").css("height").replace("px", ""));
  var x = Math.abs(50 - 100 * trans_x / SVG.width);
  var y = Math.abs(50 - 100 * trans_y / SVG.height);
  var x_signe = "";
  var y_signe = "";
  if ((100 * trans_x / SVG.width) > 50)
    x_signe = "-";
  if ((100 * trans_y / SVG.height) > 50)
    y_signe = "-";
  return "translate(" + x_signe + x + "%," + y_signe + y + "%)";
}


function UpdateCssTransform() {
  "use strict";
  var index      = parseInt($("#last-folded-indice").val().substring(14));
  var indice     = document.getElementById('legend-indice-' + index);
  var zoom_input = null;
  if (indice)
    zoom_input = indice.parentElement.getElementsByClassName('zoom-enabled')[0];
  var svg_indice = document.getElementById('indice-' + index);
  var trans_x = parseFloat(svg_indice.getAttribute("data-translate-x") - SVG.x);
  var trans_y = parseFloat(svg_indice.getAttribute("data-translate-y") - SVG.y);
  document.getElementById("root-svg").style.transform = "";
  document.getElementById("root-svg").style.transform = css_translate(trans_x, trans_y);
}

function zoom_edit_mode(value, trans_x, trans_y, scale_enabled) {
  "use strict";
  var scale = value / 100;
  if (scale_enabled) {
    document.getElementById("svg").setAttribute("data-scale", scale);
    document.getElementById("svg").classList.add('scale');
  }
  else {
    document.getElementById("svg").removeAttribute("data-scale");
    document.getElementById("svg").classList.remove('scale');
  }
  $("#svg svg").css("transform", "scale(" + scale + ")");
  document.getElementById("root-svg").style.transform = "";
  document.getElementById("root-svg").style.transform = css_translate(trans_x, trans_y);
  setTimeout(UpdateCssTransform, 1);
}

function zoom_on(index, value, zoom_svg, scale_enabled) {
  "use strict";
  var svg_indice = document.getElementById('indice-' + index);
  var trans_x = parseFloat(svg_indice.getAttribute("data-translate-x") - SVG.x);
  var trans_y = parseFloat(svg_indice.getAttribute("data-translate-y") - SVG.y);
  svg_indice.setAttribute("data-zoom", value);
  $("#legend-" + index + " .zoom-input").val(value);
  if (zoom_svg)
    zoom_edit_mode(value, trans_x, trans_y, scale_enabled);
}

function zoom(element) {
  "use strict";
  var index = parseInt(
    $(element.parentNode.parentNode.parentNode).find(".indice").attr("id").replace("legend-indice-", "")
  );
  var value = parseInt($(element.parentNode.parentNode.parentNode).find(".zoom-input").val());
  var scale_enabled = false;
  if (element.parentNode.getElementsByClassName('zoom-enabled')[0].checked)
    scale_enabled = true;
  zoom_on(index, value, true, scale_enabled);
}

function active_zoom(element) {
  "use strict";
  var svg_width = parseInt($("#root-svg").css("width").replace("px", ""));
  var svg_height = parseInt($("#root-svg").css("height").replace("px", ""));
  var zoom_input = $(element).parent().find(".zoom-input");
  var id = $(element.parentNode.parentNode.parentNode).find(".indice").attr("id").replace("legend-", "");
  var indice_element = $("#root-svg #" + id);
  if($(element).prop('checked')) {
    zoom_input.attr("disabled", false);
    zoom(element);
  }
  else {
    zoom_input.attr("disabled", true);
    var indice = $("#" + zoom_input.data("indice-id"));
    indice.data("zoom", zoom_input.val());
    document.getElementById("svg").removeAttribute("data-scale");
    document.getElementById("svg").classList.remove('scale');
    $("#svg svg").css("transform", "scale(1)");
    $("#root-svg").css("transform", "initial");
  }
}

function real_zoom(element) {
  "use strict";
  if (DragTarget) {
    $(DragTarget.parentNode).find(".indice-cross")[0].classList.add("hidden");
    DragTarget = null;
    return;
  }
  if (document.getElementById('svg').classList.contains('edit-mode'))
    return;
  $("#svg.show").addClass("duration");
  var id = $(element).attr("id");
  if (id.startsWith("indice"))
    var index = id.substring(7);
  else
    var index = id.substring(12);
  var indice = document.getElementById("indice-" + index);
  var description = $("#description-" + index);
  if (
    document.getElementById('content').getAttribute('data-real-zoom-indice') == index
    && indice.getAttribute("data-zoom-active") == "true"
  )
  {
    $("#svg svg").css("transform", "scale(1)");
    $("#root-svg").css("transform", "initial");
    indice.setAttribute("data-zoom-active", false);
    description.addClass("hidden");
  }
  else {
    var scale   = indice.getAttribute("data-zoom") / 100;
    var trans_x = parseFloat(indice.getAttribute("data-translate-x") - SVG.x);
    var trans_y = parseFloat(indice.getAttribute("data-translate-y") - SVG.y);
    $("#svg svg").css("transform", "scale(" + scale + ")");
    $("#root-svg").css("transform", css_translate(trans_x, trans_y));
    indice.setAttribute("data-zoom-active", true);
    document.getElementById('content').setAttribute('data-real-zoom-indice', index);
    $('.description').addClass('hidden');
    if (description.find(".description-content").html().trim() != "") {
      description.removeClass("hidden");
    }
  }
}

function open_dialog() {
  "use strict";
  var index = parseInt($("#last-folded-indice").val().substring(14));
  var text = $("#" + $("#last-folded-indice").val()).next().text();
  var description =  $("#description-" + index + " .description-content").html();
  if (!description) {
    description = '';
  }
  $("#indice-description").html(description);
  $("#modal-legend-id").val(index);
  if (text == translate(Editor.local, 'no_title')) {
    $("#legend-title").attr("placeholder", "-- no title --");
    $("#legend-title").val('');
  }
  else
    $("#legend-title").val(text);
}

function hide_dialog() {
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
  var html = $("#indice-description").trumbowyg('html');
  if (html != "")
    $("#description-" + index + " .description-content").html(html);
}

$('#edit-legend-modal').on('show.bs.modal', function (e) {
  "use strict";
  open_dialog();
});

// Save title and description
$('#edit-legend-modal').on('hidden.bs.modal', function (e) {
  "use strict";
  hide_dialog();
});
