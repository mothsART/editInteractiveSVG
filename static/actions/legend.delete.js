function delete_selected_legend(record_history) {
    "use strict";
    let tr_list = $("#list-of-legend tbody tr .select:checked").closest("tr");
    let nb_tr = tr_list.length;
    $("#nb-indices").val(parseInt($("#nb-indices").val()) - nb_tr);
    $("#count-nb-selected").val(0);
    $("#select-all-legend").prop('checked', false);
    let list = [];
    tr_list.each(function(_, el) {
        let index = $(el).find(".indice").attr("id").substring(14);
        let indice_el = document.getElementById('indice-' + index);

        let description = '';
        list.push({
            'index': index,
            'hex_color': document.getElementById("legend-indice-" + index).style.backgroundColor,
            'zoom': 200,
            'x': parseFloat(indice_el.getAttribute("data-translate-x")),
            'y': parseFloat(indice_el.getAttribute("data-translate-y")),
            'title': elements.title(index),
            'description': elements.description.get(index)
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
    if (record_history) {
        add_history(
            history_delete_legend,
            { 'list': list },
            { 'list': list }
        );
    }
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
