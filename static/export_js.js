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

var DragTarget = false;

function translate(trans_x, trans_y) {
  "use strict";
  var indice_len_x = 14 * SVG.width / 500;
  var indice_len_y = 14 * SVG.height / 500;
  var svg_width = parseInt($("#root-svg").css("width").replace("px", ""));
  var svg_height = parseInt($("#root-svg").css("height").replace("px", ""));
  var x = Math.abs(50 - 100 * trans_x / SVG.width); // - indice_len_x);
  var y = Math.abs(50 - 100 * trans_y / SVG.height); // - indice_len_y);
  var x_signe = "";
  var y_signe = "";
  if ((100 * trans_x / SVG.width) > 50)
    x_signe = "-";
  if ((100 * trans_y / SVG.height) > 50)
    y_signe = "-";
  return "translate(" + x_signe + x + "%," + y_signe + y + "%)";
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
  if (id.startsWith("indice")) {
    var index = id.substring(7);
  }
  else {
    var index = id.substring(12);
  }
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
    var trans_x = parseFloat(indice.getAttribute("data-translate-x"));
    var trans_y = parseFloat(indice.getAttribute("data-translate-y"));
    $("#svg svg").css("transform", "scale(" + scale + ")");
    $("#root-svg").css("transform", translate(trans_x, trans_y));
    indice.setAttribute("data-zoom-active", true);
    document.getElementById('content').setAttribute('data-real-zoom-indice', index);
    if (description.find(".description-content").html().trim() != "") {
      description.removeClass("hidden");
    }
  }
}

$(document).ready(function() {
    SVG.init();
});