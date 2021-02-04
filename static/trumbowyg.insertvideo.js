(function ($) {
    'use strict';

    var isSupported = function () {
        return typeof FileReader !== 'undefined';
    };

    var isValidVideo = function (type) {
        return /^data:video\/[a-z]?/i.test(type);
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                insertVideo: 'Insert video',
                file: 'File',
                errFileReaderNotSupported: 'FileReader is not supported by your browser.',
                errInvalidVideo: 'Invalid video file.'
            },
            fr: {
                insertVideo: 'Insérer une vidéo',
                file: 'Fichier',
                errFileReaderNotSupported: "FileReader n'est pas supporté dans votre navigateur.",
                errInvalidVideo: 'fichier vidéo invalide.'
            },
        },
        plugins: {
            insertVideo: {
                shouldInit: isSupported,
                init: function (trumbowyg) {
                    var btnDef = {
                        isSupported: isSupported,
                        fn: function () {
                            trumbowyg.saveRange();

                            var file;
                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.insertVideo,

                                // Fields
                                {
                                    file: {
                                        type: 'file',
                                        required: true,
                                        attributes: {
                                            accept: 'video/*'
                                        }
                                    },
                                    alt: {
                                        label: 'description',
                                        value: trumbowyg.getRangeText()
                                    }
                                },

                                // Callback
                                function (values) {
                                    var fReader = new FileReader();

                                    fReader.onloadend = function (e) {
                                        if (isValidVideo(e.target.result)) {
                                            trumbowyg.execCmd(
                                                'insertHTML', 
                                                '<video controls>'
                                                    + '<source src="' + fReader.result + '" alt="' + values.alt + '" >'
                                                + '</video>',
                                                false,
                                                true
                                            );
                                            trumbowyg.closeModal();
                                        } else {
                                            trumbowyg.addErrorOnModalField(
                                                $('input[type=file]', $modal),
                                                trumbowyg.lang.errInvalidVideo
                                            );
                                        }
                                    };

                                    fReader.readAsDataURL(file);
                                }
                            );

                            $('input[type=file]').on('change', function (e) {
                                file = e.target.files[0];
                            });
                        }
                    };
                    trumbowyg.addBtnDef('insertVideo', btnDef);
                }
            }
        }
    });
})(jQuery);
