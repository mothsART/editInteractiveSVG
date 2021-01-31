function update_title(record_history, title, description) {
    "use strict";
    if (title === undefined)
        title = $("#legend-title").val();
    if (description === undefined)
        description = elements.buf_description();

    let index = $("#modal-legend-id").val();
    let indice = $("#legend-indice-" + index);
    let real_indice = $("#real-indice-" + index);
    let old_title = elements.title(index); 
    let old_description = elements.description.get(index); 

    if (title === old_title && description === old_description)
        return;

    indice.next().remove();
    if (title == '' || title == '-- no title --') {
        indice.after("<em>-- no title --</em>");
        real_indice.find("em").text('');
    }
    else {
        indice.after("<span class='indice-title' title='"+ title + "'>" + title + "</span>");
        real_indice.find("em").text(title);
        $("#description-" + index + " .title").text(title);
    }
    elements.description.set(index, add_blank(description));
    document.getElementById('indice-description').innerText = '';
    if (record_history) {
        add_history(
            history_title_legend,
            {
                'index': index,
                'title': old_title,
                'description': old_description
            },
            {
                'index': index,
                'title': title,
                'description': description
            }
        );
    }
}
