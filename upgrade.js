// node dependances
const path = require('path');
const fs = require('fs');

// npm 
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// project files
eval(fs.readFileSync('./static/retro_compatibility.js') + '');
eval(fs.readFileSync('./static/export.js') + '');

const examplesPath = path.join(__dirname, 'examples');
const staticPath = path.join(__dirname, 'static');
const contents = {
    'script': fs.readFileSync(
        path.join(staticPath, 'export', 'script.js'),
        'utf8'
    ),
    'action_keys': fs.readFileSync(
        path.join(staticPath, 'action_key.js'),
        'utf8'
    ),
    'event': fs.readFileSync(
        path.join(staticPath, 'export', 'event.js'),
        'utf8'
    ),
    'css': fs.readFileSync(
        path.join(staticPath, 'export', 'style.css'),
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
        console.log(filepath);
        // synchronous
        let data = fs.readFileSync(filepath, 'utf8');
        let dom = new JSDOM(data);
        let doc_version = dom.window
            .document.getElementsByTagName('body')[0]
            .getAttribute('data-version');
        let document = converting(
            dom.window.document,
            doc_version
        );
        let str_svg = document.getElementById('svg').innerHTML;
        let html = create_HTML(contents, str_svg, __version__());
        let bytes = new Uint8Array(Buffer.from(html));
        fs.writeFileSync(filepath, bytes);
        //process.exit();
    });
});
