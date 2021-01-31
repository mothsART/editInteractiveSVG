var add_legend_el = document.getElementById('add-legend-button');

function add_legend(hex_color, avoid_history, title, description, zoom_value, x, y) {
    "use strict";
    var index = parseInt(document.getElementById("nb-indices").getAttribute("value")) + 1;
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

function delete_selected_legend() {
    "use strict";
    let tr_list = $("#list-of-legend tbody tr .select:checked").closest("tr");
    let nb_tr = tr_list.length;
    $("#nb-indices").val(parseInt($("#nb-indices").val()) - nb_tr);
    $("#count-nb-selected").val(0);
    $("#select-all-legend").prop('checked', false);
    let list = [];
    tr_list.each(function(index, el) {
        var index = $(el).find(".indice").attr("id").substring(14);
        var indice_el = document.getElementById('indice-' + index);
        list.push({
            'index': index,
            'hex_color': document.getElementById("legend-indice-" + index).style.backgroundColor,
            'zoom': 200,
            'x': parseFloat(indice_el.getAttribute("data-translate-x")),
            'y': parseFloat(indice_el.getAttribute("data-translate-y")),
            'title': document.getElementById("legend-" + index).getElementsByClassName('indice-title')[0].innerText,
            'description': document.getElementById('description-' + index).getElementsByClassName('description-content')[0].innerHTML
        });
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
    } else
        reorder_legend();
    add_history(
        history_delete_legend,
        { 'list': list },
        { 'list': list }
    );
    $("#add-legend-button").removeAttr('disabled').removeAttr("title");
}

function delete_legend(index) {
    "use strict";
    $("#nb-indices").val(parseInt($("#nb-indices").val()) - 1);
    $("#indice-" + index).remove();
    $("#description-" + index).remove();
    $("#real-indice-" + index).remove();
    if ($('#legend-' + index + " .display-indice").hasClass('show'))
        $("#count-nb-display").val(parseInt($("#count-nb-display").val()) - 1);
    if (parseInt(document.getElementById("last-folded-indice").getAttribute("value").substring(14)) === parseInt(index))
        document.getElementById("last-folded-indice").setAttribute("value", "");
    $("#legend-" + index).remove();
}

function reorder_legend() {
    "use strict";
    var tr_list = document.getElementById("list-of-legend").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (var i = 0, len = tr_list.length; i < len; i++) {
        if (i != 0)
            tr_list[i].setAttribute('id', 'legend-' + i);
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
