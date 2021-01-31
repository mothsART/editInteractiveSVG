var palette = [
    ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
    ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
    ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
    ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
    ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
    ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
    ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
    ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
];

var colors = []
for (var i = 0; i < palette.length; i++) {
    for (var j = 0; j < palette[i].length; j++) {
        colors.push(palette[i][j]);
    }
}
var remaining_colors = [];

function hexToRgb(hex) {
    "use strict";
    if (hex.length == 4) hex = "#" + hex.substr(1) + hex.substr(1);
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * Converts an RGB color value to Luminance. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {number}  l       luminance
 */
function rgbToHsl(r, g, b) {
    "use strict";
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var l = (max + min) / 2;
    return l;
}

function componentToHex(c) {
    "use strict";
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    "use strict";
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function cssRgbToHex(value) {
    "use strict";
    let r = parseInt(value.substring(4, value.indexOf(',')));
    let substr = value.substring(value.indexOf(',') + 1);
    let g = parseInt(substr.substring(0, substr.indexOf(',')));
    let b = parseInt(substr.substring(substr.indexOf(',') + 1, substr.indexOf(')')));
    return rgbToHex(r, g, b);
}

function random_colors() {
    "use strict";
    if (remaining_colors.length == 0)
        remaining_colors = colors;
    var new_value = colors[parseInt(Math.random() * remaining_colors.length)];
    var index = remaining_colors.indexOf(new_value);
    remaining_colors.splice(index, 1);
    return new_value;
}

function change_indice_color(indice_id, hex_color, record_history) {
    "use strict";
    let indice = $("#" + indice_id);
    let id = parseInt(indice.attr("id").substring(14));
    let old_color = document.getElementById("legend-indice-" + id).style.backgroundColor;
    indice.css("background-color", hex_color);
    $("#description-" + id).find(".indice").css(
        "background-color", hex_color
    );
    $("#real-" + indice.attr("id").substring(7)).find("span").css(
        "background-color", hex_color
    );
    let rgb = hexToRgb(hex_color);
    let luminance = rgbToHsl(rgb.r, rgb.g, rgb.b);
    let color = "white";
    if (luminance > 0.4 && hex_color != '#0000ff')
        color = "black";
    if (id < 10)
        indice[0].classList.remove('number');
    else
        indice[0].classList.add('number');
    indice.css("color", color).css("border", color + " solid 3px");
    $("#" + indice.attr("id").substring(7)).find("rect.backgroundColor").css(
        "fill", hex_color
    ).css("stroke", color);
    $("#" + indice.attr("id").substring(7)).find(".indice-text").css(
        "fill", color
    );
    $("#" + indice.attr("id").substring(7)).css("color", color);
    $("#description-" + id).find(".indice")
    .css("color", color);
    $("#real-" + indice.attr("id").substring(7)).find("span").css("color", color);
    if (record_history) {
        add_history(
            history_color_legend,
            {
                'id': id,
                'indice_id': indice_id,
                'title': elements.title.get(id),
                'color': cssRgbToHex(old_color)
            },
            {
                'id': id,
                'indice_id': indice_id,
                'color': hex_color
            }
        );
    }
}
