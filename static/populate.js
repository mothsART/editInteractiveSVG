function ipsum(value) {
  "use strict";
  var text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ' +
          'At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, ' +
          'quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, ' +
          'qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ' +
          'Et harum quidem rerum facilis est et expedita distinctio. ' +
          'Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, ' +
          'facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.';
  if (!value)
    return text;
  return text.substring(0, value);
}

function html_ipsum(value) {
  "use strict";
  var text = '<h1>Lorem ipsum</h1> dolor sit amet, <strong>consectetur adipisicing</strong> elit, <em>sed do eiusmod</em> tempor <strike>incididunt</strike> ut labore et dolore magna aliqua. ' +
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
          '<em><strike><strong>Duis aute irure dolor</em></strike></strong> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ' +
          'At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, ' +
          'quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, ' +
          'qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ' +
          'Et harum quidem rerum facilis est et expedita distinctio. ' +
          'Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, ' +
          'facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.';
  if (!value)
    return text;
  return text.substring(0, value);
}

function launch(nb, callback) {
  "use strict";
  var values = new Array();
  for (var i = 0; i < nb; i++) {
    values[i] = callback.apply(arguments);
  }
  return values;
}

function populate(nb) {
  "use strict";
  var values = launch(nb, add_legend, $("#add-legend-button"));
  for (var i = 0; i < nb; i++) {
    var index = values[i];
    open_detail(index);
    index.parent().find(".related-target-editor").click();
    $("#legend-title").val(ipsum(50));
    $("#indice-description").html(html_ipsum(500));
    $(".modal-header > button").click();
    //hide_dialog();
  }
}

function populate_without_action(nb) {
  "use strict";
  var values = launch(nb, add_legend, $("#add-legend-button"));
  for (var i = 0; i < nb; i++) {
    var index = values[i];
    open_detail(index);
    open_dialog();
    // add an ipsum title
    $("#legend-title").val(ipsum(50));
    hide_dialog();
    // add an ipusm description
    $("#description-" + parseInt(i + 1) + " .description-content").html(html_ipsum(500));
    translate_indice(
      document.getElementById("indice-" + (i + 1)),
      50 * SVG.width / 100, 50 * SVG.height / 100
    );
  }
  // show all indices
  $("#show-all-legend").click();
}