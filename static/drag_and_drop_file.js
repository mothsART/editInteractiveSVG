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
                label.textContent = files.length > 1 ? (input.getAttribute('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name;
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
                showFiles( droppedFiles );
                triggerFormSubmit();
            });
        }
        // if the form was submitted
        form.addEventListener('submit', function(e)
        {
            if ($(form).hasClass('is-uploading')) return false;
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
                            $("#content").append(reader.result);
                            $("#upload-zone").addClass('hidden');
                            $("#edit-menu, #edit-zone").removeClass('hidden');
                            resize_indices();
                        }
                    });
                }
            }
            e.preventDefault();
        });
        /*
        // restart the form if has a state of error/success
        Array.prototype.forEach.call( restart, function(entry)
        {
            entry.addEventListener('click', function(e)
            {
                e.preventDefault();
                form.classList.remove('is-error','is-success');
                input.click();
            });
        });

        // Firefox focus bug fix for file input
        input.addEventListener('focus', function(){ input.classList.add('has-focus'); });
        input.addEventListener('blur', function(){ input.classList.remove('has-focus'); });
        */
    });
}( document, window, 0 ));