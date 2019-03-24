var get_blob;

function import_file(files, contents, str_svg) {
  "use strict";
  var file = files.next().value;
  if (!file)
    return save_file(contents, str_svg);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", file[1], true);
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      contents[file[0]] = xmlhttp.responseText;
      import_file(files, contents, str_svg);
    }
  }
  xmlhttp.send();
}

function save_file(contents, str_svg) {
  var BB = get_blob();
  saveAs(
    new BB(
      [
        "<!DOCTYPE html>\n<html>\n<head>\n"
        + '<style type="text/css">\n'
        + contents["css"]
        + "\n</style>\n"
        + "</head>\n<body>\n"
        + '<div id="svg" class="show">\n'
        + str_svg
        + "</div>\n"
        + '<script type="text/javascript">\n'
        + contents["jquery"]
        + '\n</script>\n'
        + '<script type="text/javascript">\n'
        + contents["script"]
        + "</script>\n"
        + "</body>\n</html>\n"
      ]
      , {type: "application/xhtml+xml;charset=UTF-8"}
   )
   , "interactive_illustration.html"
  );
}

(function(view) {
  "use strict";
  get_blob = function() {
    return view.Blob;
  }
  document.getElementById("save-form")
          .addEventListener("submit", export_html);
  dragula($("#list-of-legend"));
}(self));

function export_html(element) {
  "use strict";
  if (element.classList.contains('disabled'))
    return;
  var svg = $("#svg").clone();
  svg.find("svg").removeAttr("onmousedown")
                 .removeAttr("onmousemove").removeAttr("onmouseup");
  svg.find("svg").css("transform", "scale(1)");
  svg.find("#root-svg").css("transform", "initial");
  svg.find("#delete-svg, #update-svg").remove();
  svg.find("#real-legend").removeClass("hidden");
  svg[0].querySelector("#help-button").classList.remove('hidden');
  var str_svg = svg.html();
  str_svg = str_svg.replace('<br>', '<br />');
  var files = new Map();
  files.set("css",    "static/export_style.css");
  files.set("jquery", "static/jquery.min.js");
  files.set("script", "static/export_js.js");
  var contents = [];
  import_file(files.entries(), contents, str_svg);
}
