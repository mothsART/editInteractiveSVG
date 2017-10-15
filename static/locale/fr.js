const en_messages = {
  message: {
    save:             'Save',
    about:            'About',
    help:             'Help',
    show:             'Show',
    edit:             'Edit',
    see_more:         'See more ...',
    load_examples:    'Load examples',
    choose_a_file:    'Choose a file',
    drag_it_here:     'or drag it here.',
    upload:           'Upload',
    delete:           'Delete',
    add_to_legend:    'Add to Legend',
    error_try_again:  'Error! Try again!',
    edit_title:       'Edit title and description',
    enabled:          'Enabled',
    no_title:         '-- no title --',
    edit_legend:      'Edit legend',
    title:            'Title',
    source_file:      'Source file',
    undo:             'Undo',
    redo:             'Redo',
    description1:     'Edit a static SVG with legend and description to be an interactive content.',
    description2:     'In order to be the most relevant, it is possible to add zooms to focus on a particular element.',
    credits:          'Credits',
    zoom:             'Zoom',
    yes:              'Yes',
    no:               'No',
    delete_pic_ans:   'Would you delete this picture ?',
    delete_legend:    'Would you delete the selected legends ?',
    loading_new_pic:  'Loading a new image means that you will delete your current job.',
    are_you_ok:       'Are you ok with that ?',
    warnings:         'Warnings',
    bug_detected:     'imported bugs detected.',
    warning_style:    'File import contain <strong>&#60;style&#62;</strong> tag(s) : all CSS rules was automaticaly prefixed for safety reasons.',
    warning_script:   'File import contain <strong>&#60;script&#62;</strong> tag(s) : all javascript will be erase before import for safety reasons.',
    warning_viewbox:  'The <strong>calculate viewBox</strong> and the <strong>viewBox</strong>'
                      + ' of the <strong>pre-filled</strong> imported file are radically different.<br />'
                      + 'If the SVG illustration does not seem to be centered, it\'s very likely that it comes from there!',
    warning_mask:     'File import contain <strong>&#60;mask&#62;</strong> tag(s) : visible zone can be extremly different of viewBox.',
    warning_clippath: 'File import contain <strong>&#60;clipPath&#62;</strong> tag(s) : visible zone can be extremly different of viewBox.'
  }
}

const fr_messages = {
  message: {
    save:             'Enregistrer',
    about:            'À propos',
    help:             'Aide',
    show:             'Visualiser',
    edit:             'Éditer',
    see_more:         'En savoir d\'avantage ...',
    load_examples:    'Charger des exemples',
    choose_a_file:    'Sélectionnez un fichier',
    drag_it_here:     'ou glissez le ici.',
    upload:           'Upload',
    delete:           'Supprimer',
    add_to_legend:    'Ajouter à la légende',
    error_try_again:  'Erreur ! Essayez à nouveau !',
    edit_title:       'Éditer un titre et un descriptif',
    enabled:          'Activer',
    no_title:         '-- sans titre --',
    edit_legend:      'Édition de la légende',
    title:            'Titre',
    source_file:      'Fichier source',
    undo:             'Annuler',
    redo:             'Rétablir',
    description1:     'Permet de transformer un fichier SVG statique en un contenu interactif avec une légende et un descriptif.',
    description2:     'Pour que ce contenu soit le mieux mis en valeur, il est possible de zoomer sur les zones désignées par un indice.',
    credits:          'Auteurs',
    zoom:             'Zoomer',
    yes:              'Oui',
    no:               'Non',
    delete_pic_ans:   'Désirez-vous supprimer cette image ?',
    delete_legend:    'Désirez-vous vraiment supprimer les indices sélectionnés ?',
    loading_new_pic:  'Chargez une nouvelle image signifie que vous allez perdre votre travail en cours.',
    are_you_ok:       'Est-ce bien ce que vous souhaitez ?',
    warnings:         'Avertissements',
    bug_detected:     'Des anomalies ont été détectées à l\'import.',
    warning_style:    'Le fichier importé contient une ou plusieurs balises <strong>&#60;style&#62;</strong>'
                      +' : toutes les règles css présentent ont été préfixés pour des raisons de sécurité.',
    warning_script:   'Le fichier importé contient une ou plusieurs balises <strong>&#60;script&#62;</strong> :'
                      + ' tous les scripts javascript ont été supprimés pour des raisons de sécurité.',
    warning_viewbox:  'Le <strong>viewBox calculé</strong> et le <strong>viewBox pré-enregistré</strong>'
                      + ' dans le document sont radicalement différent.<br />'
                      + 'Si vous constatez qu\'après l\'import, le fichier n\'est pas centré, il est fort probable que le soucis provienne de cette différence.',
    warning_mask:     'Le fichier importé contient une ou plusieurs balises <strong>&#60;mask&#62;</strong> :'
                      +' la zone visible lors de l\'import peut être radicalement différent du viewBox.',
    warning_clippath: 'Le fichier importé contient une ou plusieurs balises <strong>&#60;clipPath&#62;</strong> :'
                      +'  la zone visible lors de l\'import peut être radicalement différent du viewBox.'
  }
}

const messages = {
  en: en_messages,
  fr: fr_messages
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: (navigator.language || navigator.userLanguage).substr(0, 2),
  messages,
})


// Create a Vue instance with `i18n` option
new Vue({ i18n }).$mount('#locales')