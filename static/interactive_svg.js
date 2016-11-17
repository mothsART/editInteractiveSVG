var Zoom = {
    init_trans_x:       0,
    init_trans_y:       0,
    init_scale:         0,
    trans_x:            0,
    trans_y:            0,
    scale:              1,
    final_trans_x:      0,
    final_trans_y:      0,
    final_scale:        0,
    interval:          10,
    inc_trans_x:        0,
    inc_trans_y:        0,
    inc_scale:          0,
    interval_func:   null,
    node:            null,
    count_duration:     0,
    duration:           0,
    id:                 '',
    init: function(node, final_trans_x, final_trans_y, final_scale, duration) {
        "using strict"
        this.final_trans_x  = final_trans_x;
        this.final_trans_y  = final_trans_y;
        this.final_scale    = final_scale;
        this.inc_trans_x    = final_trans_x / duration * this.interval;
        this.inc_trans_y    = final_trans_y / duration * this.interval;
        this.inc_scale      = (final_scale - this.scale) / duration * this.interval;
        this.interval_func;
        this.duration = duration;
        this.node = node;
    },
    _reset: function(id) {
        "using strict"
        this.id = id;
        $("#" + this.id + '-description').removeClass('show');
        $("#" + this.id + '-indice').addClass('hidden');
        if (this.interval_func != null) {
            clearInterval(this.interval_func);
            this.count_duration = this.duration - this.count_duration;
        }
        else {
            this.count_duration = 0;
        }
    },
    _zoom: function(trans_x, trans_y, scale, sign) {
        "using strict"
        this.trans_x += this.inc_trans_x * sign;
        this.trans_y += this.inc_trans_y * sign;
        this.scale   += this.inc_scale * sign;
        this.node.attr(
            'transform',
            'translate(' + trans_x + ' ' + trans_y + ') scale(' + scale +')'
        );
        this.count_duration += this.interval;
        if (this.count_duration === this.duration) {
            clearInterval(this.interval_func);
            if (sign == 1) {
                $("#" + this.id + '-description').addClass('show');
            }
            else {
                $("#" + this.id + '-indice').removeClass('hidden');
            }
        }
    },
    in: function(id) {
        "using strict"
        this._reset(id);
        zoom_obj = this;
        this.interval_func = setInterval(
          function() {
            zoom_obj._zoom(zoom_obj.trans_x, zoom_obj.trans_y, zoom_obj.scale, 1);
          },
          this.interval
        );
    },
    out: function(id) {
        "using strict"
        this._reset(id);
        zoom_obj = this;
        this.interval_func = setInterval(
          function(){
            zoom_obj._zoom(zoom_obj.trans_x, zoom_obj.trans_y, zoom_obj.scale, -1);
          },
          this.interval
        );
    }
};

var svgholder = document.getElementById("campement");
svgholder.onload = function() {
    "using strict"
    var svgRoot = svgholder.contentDocument.documentElement;
    Zoom.init($("#root", svgRoot), -250, -850, 8, 1000);
    $(".zoom-trigger").click(function() {
        var id = $(this).attr("id");
        id = id.substring(0, id.length - 5);
        if ($(this).is(':checked')) {
            Zoom.in(id);
        }
        else {
            Zoom.out(id);
        }
    });
}