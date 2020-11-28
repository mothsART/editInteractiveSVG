var add_legend_el = document.getElementById('add-legend-button');

function add_legend(hex_color, avoid_history) {
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
    if (!hex_color) {
        createEditIndice(index);
        $("#real-template-indice").clone().removeAttr("id").removeClass("hidden").appendTo('#real-legend');
        $("#template-description").clone().removeAttr("id").appendTo('#descriptions');
        hex_color = random_colors();
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
    } else
        reorder_legend();
    add_history(history_delete_legend);
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
