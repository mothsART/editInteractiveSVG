let add_legend_el = document.getElementById('add-legend-button');

function add_legend(hex_color, avoid_history, title, description, zoom_value, x, y) {
    "use strict";
    let index = parseInt(document.getElementById("nb-indices").getAttribute("value")) + 1;
    if (index > 98) {
        $(add_legend_el).attr("disabled", "disabled").attr("title", "Too lot indices.");
        return;
    }

    $("#show-all-legend").prop('checked', false);
    $("#template-legend").clone().removeAttr("id").removeClass("hidden")
        .appendTo("#list-of-legend tbody").attr("id", "legend-" + index);
    $("#list-of-legend").removeClass('hidden');

    if (!hex_color || title) {
        createEditIndice(index);
        $("#real-template-indice").clone().removeAttr("id").removeClass("hidden").appendTo('#real-legend');
        $("#template-description").clone().removeAttr("id").appendTo('#descriptions');
    }
    if (!hex_color)
        hex_color = random_colors();
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
    if (title) {
        var real_indice = $("#real-indice-" + index);
        var indice = $("#legend-indice-" + index);
        indice.next().remove();
        indice.after("<span class='indice-title' title='"+ title + "'>" + title + "</span>");
        real_indice.find("em").text(title);
        $("#description-" + index + " .title").text(title);
        
        document.getElementById('description-' + index)
            .getElementsByClassName('description-content')[0]
            .innerHTML = description;
        translate_indice(document.getElementById('indice-' + index), x, y);
    }
    if (zoom) {
        var zoom_input_el = document.getElementById('legend-' + index).getElementsByClassName('zoom-input')[0];
        zoom_input_el.defaultValue = zoom_value;
        zoom(zoom_input_el);
    }
    if (!avoid_history) {
        add_history(
            history_add_legend,
            { 'index': index },
            { 'hex_color': hex_color }
        );
    }
    return $("#legend-" + index + " .open-detail");
}
