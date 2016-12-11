var SVG = {
    width:         0,
    height:        0,
    ratio:         0,
    content_ratio: 0,
    indice_left:   0,
    indice_top:    0,
    indice_height: 0,
    indice_width:  0,
    init: function() {
        this.width = parseInt($("#svg svg").attr("width").replace(/[^0-9]+/, ''));
        this.height = parseInt($("#svg svg").attr("height").replace(/[^0-9]+/, ''));
        this.ratio = this.width / this.height;
        this.content_ratio = $("#svg").width() / $("#svg").height();
        if (this.ratio > this.content_ratio) {
            this.indice_left = 0;
            this.indice_top = parseInt(($("#svg").height() - $("#svg").width() / this.ratio) / 2);
            this.indice_height = 5 + parseInt($("#svg").width() / this.ratio);
            this.indice_width = $("#svg").width();
        }
        else {
            this.indice_left = parseInt(($("#svg").width() - $("#svg").height() * this.ratio) / 2);
            this.indice_top = 0;
            this.indice_width = 5 + parseInt($("#svg").height() * this.ratio);
            this.indice_height = $("#svg").height();
        }
    }
};

$(window).resize(function() {
    resize_indices();
});

function resize_indices() {
    "use strict";
    SVG.init();
    $("#indices").css("margin-left", SVG.indice_left);
    $("#indices").css("margin-top", SVG.indice_top);
    $("#indices").css("height", SVG.indice_height);
    $("#indices").css("width", SVG.indice_width);
}