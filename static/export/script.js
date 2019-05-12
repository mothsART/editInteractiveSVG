const SVG = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    ratio: 0,
    content_ratio: 0,
    indice_left: 0,
    indice_top: 0,
    indice_height: 0,
    indice_width: 0,
    biggest: 0,
    scale: 0,
    init: function() {
        "use strict";
        let svg_container = document.getElementById('svg');
        let svg_box  = svg_container
            .getElementsByTagName('svg')[0]
            .getBBox();
        this.x = svg_box.x;
        this.y = svg_box.y;
        this.width = svg_box.width;
        this.height = svg_box.height;
        this.ratio = this.width / this.height;
        this.biggest = Math.max(this.width, this.height);
        this.scale = this.biggest / 300;
        this.content_ratio = (
            svg_container.offsetWidth / svg_container.offsetHeight
        );
        if (this.ratio > this.content_ratio) {
            this.indice_left = 0;
            this.indice_top = parseInt(
                (
                    svg_container.offsetHeight 
                    - svg_container.offsetWidth / this.ratio
                ) / 2
            );
            this.indice_height = 5 + parseInt(
                svg_container.offsetWidth / this.ratio
            );
            this.indice_width = svg_container.offsetWidth;
        }
        else {
            this.indice_left = parseInt(
                (
                    svg_container.offsetWidth
                    - svg_container.offsetHeight * this.ratio
                ) / 2
            );
            this.indice_top = 0;
            this.indice_width = 5 + parseInt(
                svg_container.offsetHeight * this.ratio
            );
            this.indice_height = svg_container.offsetHeight;
        }
    }
};

function css_translate(trans_x, trans_y) {
    "use strict";
    let root_svg = document.getElementById('root-svg');
    let indice_len_x = 14 * SVG.width / 500;
    let indice_len_y = 14 * SVG.height / 500;
    let svg_width = parseInt(
        root_svg.style.width.replace("px", "")
    );
    let svg_height = parseInt(
        root_svg.style.height.replace("px", "")
    );
    let x = Math.abs(50 - 100 * trans_x / SVG.width);
    let y = Math.abs(50 - 100 * trans_y / SVG.height);
    let x_signe = "";
    let y_signe = "";
    if ((100 * trans_x / SVG.width) > 50)
        x_signe = "-";
    if ((100 * trans_y / SVG.height) > 50)
        y_signe = "-";
    return "translate(" + x_signe + x + "%," + y_signe + y + "%)";
}

function addclassToElement(elements, _class) {
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].classList.add(_class);
    }
}

function fit_page_to_drawing() {
    "use strict";
    let svg = document.getElementById('svg')
        .getElementsByTagName('svg')[0];
    let root_svg = document.getElementById('root-svg');
    addclassToElement(
        document.getElementsByClassName('description'),
        'hidden'
    );
    svg.style.transform = "scale(1)";
    root_svg.style.transform = "initial";
}

function indice_zoom(element) {
    "use strict";
    let svg_container = document.getElementById('svg');
    let svg = svg_container.getElementsByTagName('svg')[0];
    let root_svg = document.getElementById('root-svg');

    let id = element.getAttribute('id');
    let index = id.substring(12);
    if (id.startsWith("indice"))
        index = id.substring(7);
    let indice = document.getElementById("indice-" + index);
    let description = document.getElementById('description-' + index);
    if (
        document.getElementById('content').getAttribute('data-real-zoom-indice') == index
        && indice.getAttribute("data-zoom-active") == "true"
    ) {
      svg.style.transform = 'scale(1)';
      indice.setAttribute("data-zoom-active", false);
      description.classList.add("hidden");
      return;
    }
    let scale = indice.getAttribute("data-zoom") / 100;
    let trans_x = parseFloat(
        indice.getAttribute("data-translate-x") - SVG.x
    );
    let trans_y = parseFloat(
        indice.getAttribute("data-translate-y") - SVG.y
    );
    svg.style.transform = "scale(" + scale + ")";
    root_svg.style.transform = css_translate(trans_x, trans_y);
    indice.setAttribute("data-zoom-active", true);
    document.getElementById('content').setAttribute(
        'data-real-zoom-indice',
        index
    );
    addclassToElement(
        document.getElementsByClassName('description'),
        'hidden'
    );
    if (description.getElementsByClassName("description-content")[0].innerHTML.trim()) {
        description.classList.remove('hidden');
    }
}

function show_help() {
    "use strict";
    document.getElementsByTagName('body')[0].classList.add('mask');
    document.getElementById('help-dialog').classList.remove('hidden');
}

function show_copyright() {
    "use strict";
    document.getElementsByTagName('body')[0].classList.add('mask');
    document.getElementById('copyright-dialog').classList.remove('hidden');
}

function closeDialog(element) {
    "use strict";
    document.getElementsByTagName('body')[0].classList.remove('mask');
    element.parentNode.classList.add('hidden');
}
