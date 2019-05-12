// node dependances
const path = require('path');
const fs = require('fs');

// npm 
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// project files
eval(fs.readFileSync('./static/export.js') + '');
eval(fs.readFileSync('./static/retro_compatibility.js') + '');

const examplesPath = path.join(__dirname, 'examples');
const staticPath = path.join(__dirname, 'static');
const contents = {
    'jquery': fs.readFileSync(
        path.join(staticPath, 'jquery.min.js'),
        'utf8'
    ),
    'script': fs.readFileSync(
        path.join(staticPath, 'export_js.js'),
        'utf8'
    ),
    'css': fs.readFileSync(
        path.join(staticPath, 'export_style.css'),
        'utf8'
    )
};

fs.readdir(examplesPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (filename) {
        if (!filename.endsWith('.html')) {
            return;
        }
        let filepath = path.join(examplesPath, filename);
        // synchronous
        let data = fs.readFileSync(filepath, 'utf8');
        let dom = new JSDOM(data);
        let document = converting(dom.window.document);
        let str_svg = document.getElementById('svg').innerHTML;
        let html = create_HTML(contents, str_svg, '1.1');
        let bytes = new Uint8Array(Buffer.from(html));
        fs.writeFileSync(filepath, bytes);
    });
});
