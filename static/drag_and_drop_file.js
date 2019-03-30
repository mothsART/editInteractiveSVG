;(function(document, window, index)
{
    "use strict";
    // inspiration https://css-tricks.com/examples/DragAndDropFileUploading/
    // feature detection for drag&drop upload
    var isAdvancedUpload = function()
    {
        var div = document.createElement('div');
        return (
                ('draggable' in div)
                || ('ondragstart' in div && 'ondrop' in div)
            )
            && 'FormData' in window && 'FileReader' in window;
    }();
    // applying the effect for every form
    var forms = document.querySelectorAll('.box');
    Array.prototype.forEach.call( forms, function(form)
    {
        var input        = form.querySelector('input[type="file"]'),
            label        = form.querySelector('#upload-text'),
            errorMsg     = form.querySelector('.box__error span'),
            restart      = form.querySelectorAll('.box__restart'),
            droppedFiles = false,
            showFiles    = function(files)
            {
                $("#choose-file").addClass("hidden");
                $("#upload-text").removeClass("hidden");
                label.textContent = files[0].name;
                $("#source-file").text(label.textContent);
                $("#source-file").attr('title', label.textContent);
            },
            triggerFormSubmit = function()
            {
                var event = document.createEvent('HTMLEvents');
                event.initEvent('submit', true, true);
                form.dispatchEvent(event);
            };
        // automatically submit the form on file select
        input.addEventListener('change', function(e)
        {
            droppedFiles = e.target.files;
            showFiles(e.target.files);
            triggerFormSubmit();
        });
        // drag&drop files if the feature is available
        if(isAdvancedUpload)
        {
            form.classList.add('has-advanced-upload'); // letting the CSS part to know drag&drop is supported by the browser
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( event )
            {
                form.addEventListener(event, function(e)
                {
                    // preventing the unwanted behaviours
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
            ['dragover', 'dragenter'].forEach( function( event )
            {
                form.addEventListener( event, function()
                {
                    form.classList.add('is-dragover');
                });
            });
            ['dragleave', 'dragend', 'drop'].forEach( function( event )
            {
                form.addEventListener( event, function()
                {
                    form.classList.remove('is-dragover');
                });
            });
            form.addEventListener('drop', function(e)
            {
                droppedFiles = e.dataTransfer.files; // the files that were dropped
                showFiles(droppedFiles);
                triggerFormSubmit();
            });
        }
        // if the form was submitted
        form.addEventListener('submit', function(e)
        {
            if ($(form).hasClass('is-uploading'))
              return false;
            form.classList.add('is-uploading');
            form.classList.remove('is-error');
            if(window.FileReader)
            {
                if(droppedFiles)
                {
                    Array.prototype.forEach.call( droppedFiles, function(file)
                    {
                        var reader = new FileReader();
                        reader.readAsText(file);
                        reader.onload = function(e) {
                            "using strict";
                            load_file(reader.result);
                            translateExportInterface(Editor.local);
                        }
                    });
                }
            }
            e.preventDefault();
        });
    });
}(document, window, 0));
