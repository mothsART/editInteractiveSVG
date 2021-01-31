function replace_with_example(_id) {
    "use strict";
    var modal = $('#load-picture-modal');
    $('#load-picture-modal').modal('hide');
    delete_pic(true);
    load_example(
        document.getElementById(_id),
        modal.data('url'),
        modal.data('name')
    );
}

function replace_css(prefix, css) {
    "use strict";
    var new_css = "";
    while (true) {
        var rule_pos = css.indexOf("{");
        if (rule_pos == -1)
            break;
        var rule = css.substr(0, rule_pos).trim();
        var new_rule = "";
        while (true) {
            var sub_rule_pos = rule.indexOf(",");
            if (sub_rule_pos == -1) {
                new_rule += prefix + rule;
                break;
            }
            new_rule += prefix + rule.substr(0, sub_rule_pos + 1);
            rule = rule.substr(sub_rule_pos + 1);
        }
        new_css += new_rule;
        css = css.substr(rule_pos);
        rule_pos = css.indexOf("}");
        new_css += css.substr(0, rule_pos + 1);
        css = css.substr(rule_pos + 1);
    }
    return new_css;
}

function add_indices_and_details(indices) {
    "use strict";
    for (var i = 0; i < indices.length; i++) {
        var el = indices[i];
        if (el.getAttribute('id') !== 'real-template-indice')
        {
            var rgb_value = $('#real-indice-' + i + ' span').css('background-color');
            var rgb_array = rgb_value.split("(")[1].split(")")[0].split(',');
            var hex_color = rgbToHex(
                parseInt(rgb_array[0]),
                parseInt(rgb_array[1]),
                parseInt(rgb_array[2])
            );
            add_legend(hex_color, true, null, null, $('#indice-' + i).data('zoom'));
            var title = $(el).find('em').text();
            if (title.trim() != '') {
                $('#legend-' + i).find('em').remove();
                $("<span class='indice-title' title='"+ title + "'>" + title + "</span>").insertAfter(
                  '#legend-' + i + " .indice"
                );
            }
            $('#legend-' + i).find('.zoom-input').val(
                $('#indice-' + i).data('zoom')
            );
        }
    }
}

function add_indices_to_svg(indices) {
    "use strict";
    if (!indices)
        return;
    var root_svg = document.getElementById('root-svg');
    for (var i = 0; i < indices.length; i++) {
        root_svg.appendChild(indices[i].cloneNode(true));
    }
}

function load_file(stream) {
    "use strict";
    var svg = document.getElementById('svg').getElementsByTagName('svg')[0];
    var el = document.createElement('div');
    el.innerHTML = stream;
    // errors and warnings detection
    if (svg) {
        Warnings.clear();
        Errors.clear();
    }
    if ($(el).find('svg script').length > 0) {
        Warnings.new('warning-script-detected');
        $(el).find('svg script').remove();
    }
    if ($(el).find('svg clipPath').length > 0)
        Warnings.new('warning-clipPath-tag-detected');
    if ($(el).find('svg mask').length > 0)
        Warnings.new('warning-mask-tag-detected');
    if (el.getElementsByTagName("svg").length == 0) {
        Errors.new("error-file-not-supported");
        return;
    }
    var indices = null;
    if (svg) {
        indices = svg.getElementsByClassName('indice');
        svg.remove();
    } else {
        let version = new DOMParser()
            .parseFromString(stream, 'text/html')
            .getElementsByTagName('body')[0]
            .getAttribute('data-version');
        el = converting(el, version);
    }
    var style_list = el.getElementsByTagName("svg")[0].getElementsByTagName("style");
    if (style_list.length > 0) {
        Warnings.new('warning-style-detected');
        for (var i = 0, len = style_list.length; i < len; i++) {
            style_list[i].innerHTML = replace_css("#content svg ", style_list[i].innerHTML);
        }
    }
    $("#content").append($(el).find('svg'));
    document.getElementById('content').setAttribute('data-full', true);
    $("#upload-zone, #error-zone").addClass('hidden');
    $("#edit-zone").removeClass('hidden');
    $("#save-form, #nav-right").removeClass('disabled');
    $("#delete-legend-button").addClass('disabled');
    createForeignObject();
    // clone legend on view mode
    var real_legend = $(el).find('#real-legend');
    if (real_legend.length === 0) {
        $('#upload-zone form').removeClass('is-uploading');
        if (document.getElementsByTagName('body')[0].classList.contains('update-svg')) {
            add_indices_to_svg(indices);
            $('#update-picture-modal').modal('hide');
        }
        document.getElementsByTagName('body')[0].classList.remove('update-svg');
        return;
    }
    $('#real-legend').html(real_legend.clone().html());
    // clone descriptions
    var descriptions = $(el).find('#descriptions');
    if (descriptions.length != 0)
        $("#descriptions").html(descriptions.clone().html());
    // add indices and details
    add_indices_and_details(
        real_legend[0].getElementsByClassName('indice')
    );
    // clone copyrights
    var copyright = null;
    var copyright_content = $(el).find('#copyright-content')[0];
    if (copyright_content) {
        copyright= copyright_content.innerHTML.trim();
    }
    if (copyright) {
        document.getElementById('edit-copyright').innerHTML = copyright;
        document.getElementById('copyright-content')
                 .innerHTML = add_blank(copyright);
       }
    $('#upload-zone form').removeClass('is-uploading');
    $('#update-picture-modal').modal('hide');
}

function update_name() {
    "use strict";
    var sourceElement = document.getElementById('source-file');
    var title = sourceElement.getAttribute('data-title');
    if (!title)
        return;
    var example = translate(Editor.local, 'example');
    title = title + ' (' + example + ')';
    sourceElement.innerText = title;
    sourceElement.setAttribute('title', title);
}

function load_example(el, url, name) {
    "use strict";
    if (el.getAttribute('disabled'))
        return;
    if (document.getElementById('content').getAttribute('data-full') == 'true') {
        var modal = $('#load-picture-modal');
        modal.data('url', url);
        modal.data('name', name);
        modal.modal('show');
        document.getElementById('confirm-override-btn').setAttribute(
            'onclick', "replace_with_example('" + el.id + "')"
        );
        return;
    }
    el.setAttribute('disabled', 'disabled');
    document.getElementById('source-file').setAttribute('data-title', name);
    update_name(name);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    var isSVG = false;
    if (url.endsWith(".svg"))
        isSVG = true;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState != 4 || xmlhttp.status != 200)
            return;
        if (DEBUG && isSVG) {
            $("#content").append(xmlhttp.responseText);
            document.getElementById('content').setAttribute('data-full', true);
            $("#upload-zone, #error-zone").addClass('hidden');
            $("#edit-zone").removeClass('hidden');
            $("#save-form, #nav-right").removeClass('disabled');
            $("#delete-legend-button").addClass('disabled');
            createForeignObject();
            populate_without_action(10);
        }
        else
            load_file(xmlhttp.responseText);
    }
    xmlhttp.send();
}
