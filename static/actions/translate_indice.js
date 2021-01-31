function translate_indice(el, x, y) {
    "use strict";
    let indice_width = el.getBBox().width / 2;
    let old_x = elements.indice.x.get(el);
    let old_y = elements.indice.y.get(el);
    if (x < SVG.x)
        x = SVG.x;
    if (y < SVG.y)
        y = SVG.y;
    if (x > (SVG.width + SVG.x - indice_width))
        x = SVG.width + SVG.x - indice_width;
    if (y > (SVG.height + SVG.y - indice_width))
        y = SVG.height + SVG.y - indice_width;
    elements.indice.x.set(el, x);
    elements.indice.y.set(el, y);
    el.style.transform = "translate(" + x.toFixed(12) + "px, " + y.toFixed(12) + "px)";
}
