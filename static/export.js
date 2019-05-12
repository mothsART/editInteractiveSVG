function import_file(files, contents, str_svg) {
    "use strict";
    var file = files.next().value;
    if (!file) {
        var version = __version__();
        var blob = new Blob([
            create_HTML(contents, str_svg, version),
            ], { type: "application/xhtml+xml;charset=UTF-8" }
        );
        return save_file(blob);
    }
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

function create_HTML(contents, str_svg, version) {
    "use strict";
    return "<!DOCTYPE html><html><head>"
    + '<style type="text/css">'
    + contents["css"]
    + "</style>"
    + "</head>"
    + '<body data-version="' + version + '" >'
    + '<div id="svg" class="show duration">'
    + str_svg
    + "</div>"
    + '<script type="text/javascript">'
    + contents["script"]
    + contents["action_keys"]
    + contents["event"]
    + "</script>"
    + "</body></html>";
}

function save_file(blob) {
    "use strict";
    saveAs(
        blob,
        "interactive_illustration.html"
    );
}

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
  if (document.getElementById('copyright-content').innerText.trim())
      svg[0].querySelector('#copyright-button').classList.remove('hidden');
  var str_svg = svg.html();
  var files = new Map();
  files.set("css", "static/export/style.css");
  files.set("script", "static/export/script.js");
  files.set("action_keys", "static/action_key.js");
  files.set("event", "static/export/event.js");
  var contents = [];
  import_file(files.entries(), contents, str_svg);
}
