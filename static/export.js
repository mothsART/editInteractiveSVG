var get_blob;

(function(view) {
  "use strict";
  get_blob = function() {
    return view.Blob;
  }
  document.getElementById("save-form").addEventListener("submit", export_html);
  dragula($("#list-of-legend"));
  $('#indice-description').trumbowyg();
}(self));

function export_html() {
  "use strict";
  var BB = get_blob();
  var svg = $("#svg").clone();
  svg.find("svg").removeAttr("onmousedown").removeAttr("onmousemove").removeAttr("onmouseup");
  svg.find("#delete-svg").remove();
  svg.find("#real-legend").removeClass("hidden");
  var str_svg = svg.html();
  $.when(
    $.ajax("static/export_style.css"),
    $.ajax("./static/jquery.min.js"),
    $.ajax("static/export_js.js")
  )
  .done(function(style, jquery_file, js_file) {
    saveAs(
      new BB(
        [
          "<!DOCTYPE html>\n<html>\n<head>\n"
          + '<style type="text/css">\n'
          + style[0]
          + "\n</style>\n"
          + "</head>\n<body>\n"
          + '<div id="svg" class="show">\n'
          + str_svg
          + "</div>\n"
          + '<script type="text/javascript">\n'
          + jquery_file[0]
          + '\n</script>\n'
          + '<script type="text/javascript">\n'
          + js_file[0]
          + "</script>\n"
          + "</body>\n</html>\n"
        ]
        , {type: "application/xhtml+xml;charset=UTF-8"}
     )
     , "interactive_illustration.html"
    );
  });
}
