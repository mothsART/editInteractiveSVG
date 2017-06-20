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


function scale_and_translate(scale, trans_x, trans_y) {
  "use strict";
  var indice_len_x = 14 * SVG.width / 500;
  var indice_len_y = 14 * SVG.height / 500;
  var svg_width = parseInt($("#svg svg").css("width").replace("px", ""));
  var svg_height = parseInt($("#svg svg").css("height").replace("px", ""));
  var x = 50 - 100 * trans_x / SVG.width  - indice_len_x;
  var y = 50 - 100 * trans_y / SVG.height - indice_len_y;
  var x_signe = "";
  var y_signe = "";
  if ((trans_x / SVG.width) > 50)
    x_signe = "-";
  if ((trans_y / SVG.height) > 50)
    y_signe = "-";
  return "scale(" + scale + ") translate(" + x_signe + x + "%," + y_signe + y + "%)";
}

function real_zoom(element) {
  "use strict";
  $("#svg.show").addClass("duration");
  debugger;
  var id = $(element).attr("id");
  if (id.startsWith("indice")) {
    var index = id.substring(7);
  }
  else {
    var index = id.substring(12);
  }
  var indice = document.getElementById("indice-" + index);
  var description = $("#description-" + index);
  if (indice.getAttribute("data-zoom-active") == "true")
  {
    $("#svg.show svg").css("transform", "scale(1)");
    indice.setAttribute("data-zoom-active", false);
    description.addClass("hidden");
  }
  else {
    var scale   = indice.getAttribute("data-zoom") / 100;
    var trans_x = parseFloat(indice.getAttribute("data-translate-x"));
    var trans_y = parseFloat(indice.getAttribute("data-translate-y"));
    $("#svg.show svg").css("transform", scale_and_translate(scale, trans_x, trans_y));
    indice.setAttribute("data-zoom-active", true);
    if (description.find(".description-content").html().trim() != "") {
      description.removeClass("hidden");
    }
  }
}

$( document ).ready(function() {
    SVG.init();
});