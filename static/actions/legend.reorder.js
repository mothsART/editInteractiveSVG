function reorder_legend() {
    "use strict";
    let tr_list = document.getElementById("list-of-legend").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (let i = 0, len = tr_list.length; i < len; i++) {
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
