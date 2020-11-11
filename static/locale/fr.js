const en_messages = {
  message: {
    save:                      'Save',
    about:                     'About',
    help:                      'Help',
    show:                      'Show',
    edit:                      'Edit',
    see_more:                  'See more ...',
    load_examples:             'Load examples',
    choose_a_file:             'Choose a file',
    drag_it_here:              'or drag it here.',
    upload:                    'Upload',
    delete:                    'Delete',
    add_to_legend:             'Add to Legend',
    error_try_again:           'Error! Try again!',
    edit_title:                'Edit title and description',
    preview:                   'Preview',
    no_title:                  '-- no title --',
    edit_legend:               'Edit legend',
    title:                     'Title',
    source_file:               'Source file:',
    undo:                      'Undo',
    redo:                      'Redo',
    history:                   'History',
    description1:              'Edit a static SVG with legend and description to be an interactive content.',
    description2:              'In order to be the most relevant, it is possible to add zooms to focus on a particular element.',
    credits:                   'Credits',
    zoom:                      'Zoom',
    yes:                       'Yes',
    no:                        'No',
    delete_pic_ans:            'Would you delete this picture ?',
    delete_legend:             'Would you delete the selected legends ?',
    loading_new_pic:           'Loading a new image means that you will delete your current job.',
    are_you_ok:                'Are you ok with that ?',
    warnings:                  'Warnings',
    errors:                    'Errors',
    errors_detected:           'imported errors detected.',
    error_file_not_supported:  'This type of file is not supported',
    warnings_detected:         'imported warnings detected.',
    warning_style:             'File import contain <strong>&#60;style&#62;</strong> tag(s) : all CSS rules was automaticaly prefixed for safety reasons.',
    warning_script:            'File import contain <strong>&#60;script&#62;</strong> tag(s) : all javascript will be erase before import for safety reasons.',
    warning_viewbox:           'The <strong>calculate viewBox</strong> and the <strong>viewBox</strong>'
                               + ' of the <strong>pre-filled</strong> imported file are radically different.<br />'
                               + 'If the SVG illustration does not seem to be centered, it\'s very likely that it comes from there!',
    warning_mask:              'File import contain <strong>&#60;mask&#62;</strong> tag(s) : visible zone can be extremly different of viewBox.',
    warning_clippath:          'File import contain <strong>&#60;clipPath&#62;</strong> tag(s) : visible zone can be extremly different of viewBox.',
    github_repo:               'Github Repository',
    translators:               'Translators',
    license:                   'License',
    intro:                     'Introduction',
    intro_description:         '<p>'
                               + 'This editor allows you to add interactivity to a static document by adding titled, comments and zoom (as well as possible).'
                               + 'At first use, it\'s recommended to open an example (the drop down on the top left corner) '
                               + 'to discover how a finished illustration look like.'
                               + '</p>',
    principle:                 'Software principle',
    principle_description:     '<p>'
                               + 'This editor is separate into 2 modes : an <strong>edition modes</strong> and a <strong>preview mode</strong>.<br />'
                               + 'The preview mode can simulate the finished work after saving.'
                               + '</p>',
    import:                    'SVG file import',
    import_description:        '<p>'
                               + 'For a new project, you must selected firstly a static SVG file, '
                               + 'in preference without javascript (it will be disabled anyway). <br />'
                               + 'This can be do either by drag and drop inside the dotted area (<a href="#figure-1">FIG. 1</a>) '
                               + 'or by clicking on this area opening a file explorer (<a href="#figure-2">FIG. 2</a>).'
                               + '</p>',
    create_legend:             'Create the legend',
    create_legend_description: '<p>'
                               + 'After importing a SVG file, you will switch to the <strong>editing mode</strong> of the software.'
                               + '</p>'
                               + 'This mode is split into two parts:'
                               + '<ul>'
                               + '<li>a left sidebar containing the summary of the legend composed of one or more indices.</li>'
                               + '<li>a preview area of ​​the file occupying the rest of the space on the right.</li>'
                               + '</ul>'
                               + '<p>'
                               + 'You can add indices (with a limit of 99) to your legend via the dedicated green button.<br />'
                               + 'By default, adding an index puts it in the center of your illustration, assigns it an (incremented) number, '
                               + 'makes it visiblen and give it a random color.<br />'
                               + 'If you create several indices one behind the other, you will notice that the algorithm '
                               + 'of attribution colors is not completely random: it avoids duplicates.'
                               + '</p><p>'
                               + 'Once this step is over, it is possible to move your index by selecting it in the space on the right via a left click '
                               + 'without releasing + move and release to freeze the position.<br />'
                               + 'As long as you are traveling, a white cross appears in the upper right corner of your index.'
                               + '</p><p>'
                               + 'Each indice, can be hidden via the little eye\'s icon on the right.<br />'
                               + 'This feature is particularly useful for managing or avoiding overlaps between indices.'
                               + '</p><p>'
                               + 'By clicking on the small arrow of a indice, it is possible to edit it:'
                               + '</p>'
                               + '<ol>'
                               + '<li>Zoom is done in 2 steps:'
                               + '<ul>'
                               + '<li>activate the zoom via the corresponding check box</li>'
                               + '<li>we enter a value</li>'
                               + '</ul>'
                               + 'As soon as you exit the input area, the zoom is taken into account on the right preview area. '
                               + 'It is therefore easy to adjust these settings.</li>'
                               + '<li>Choice of a personalized color:<br />'
                               + 'As previously indicated, an algorithm chosen at each index creation a color. <br />'
                               + 'It is obviously possible for you to manually choose this color via a grid of swings.<br />'
                               + 'A first support will therefore give you a range of 64 standard colors that are entirely sufficient '
                               + 'in the majority of cases.<br />'
                               + 'Nevertheless, it remains possible to further refine this selection via a second dialogue '
                               + 'giving access to a pipette of 16 million colors.'
                               + '</li><li>'
                               + 'A green button in the index editing area gives you the ability '
                               + 'to assign a title and description to your index.<br />'
                               + 'Pressing outside the dialog will automatically close the dialog and save your work.'
                               + '</li><li>'
                               + 'Comments can be enriched by italic, bold, text, image, and so on.<br />'
                               + 'If you want advanced explanations on this editor, the best is to consult the site of the corresponding plugin: '
                               + '<a href="https://alex-d.github.io/Trumbowyg" target="_blank">Trumbowyg Editor</a>'
                               + '</li><li>'
                               + 'You can reorder indices: for that, nothing is easier than to swap 1 or more indices by dragged / dropped.'
                               + '</li><li>'
                               + 'Finally, you can delete 1 or more indices by checking (check box on the right) and then pressing the delete button.<br />'
                               + 'This delicate manipulation will require answering yes in a modal window, '
                               + 'otherwise it will not be taken into account.'
                               + '</li>'
                               + '</ol>',
    save:                      'Save your work',
    save_description:          '<p>'
                               + 'When you are satisfied with your work, it is useful to register it.<br />'
                               + 'To do this, there\'s a dedicated button that transforms your work into a single document in HTML format.<br />'
                               + 'The generated HTML file is currently both the export format '
                               + '(final file that can be read in a browser) as an editing format.'
                               + '</p>',
    reopen:                    'Reopen document',
    reopen_description:        '<p>'
                               + 'The HTML file previously saved is actually reeditable at will.<br />'
                               + 'To do this, you just need to go through the same process as an SVG file import '
                               + '(dragged / dropped or search file with the explorer) .<br />'
                               + 'The software will recover the file. information and you will be able to edit it and save a new document later.'
                               + '</p>',
    new_import:                'New import',
    new_import_description:    '<p>'
                               + 'It is possible at any time to delete the current file.'
                               + 'To do this, simply click on the delete button in the preview area and confirm in the modal window that follows.'
                               + '</p><p>'
                               + 'Warning: this choice is by its nature definitive.'
                               + '</p>',
    view_mode:                 'Preview Mode',
    view_mode_description:     '<p>'
                               + 'The view mode allows you to interact with your artwork just as if it were just published, '
                               + 'except that you can re-edit and continue your current work.<br />'
                               + 'This mode gives you access to control over your final production.'
                               + '</p>',
    error_import:              'Import anomalies ?',
    error_import_description:  '<p>'
                               + 'After importing a file, a series of quality checks is performed.<br />'
                               + 'If the slightest anomaly is detected, a warning zone will be visible: '
                               + 'you will be able to have more precise information on the anomalies '
                               + 'encountered if necessary and possibly to remedy them.'
                               + '</p>',
    limitation:                'Limitation',
    limitation_description:    '<ul>'
                               + '<li>This software does not allow you to edit other documents than the SVG format. '
                               + 'It is nevertheless planned to support image formats (png and jpg) in a future version.</li>'
                               + '<li>It is not possible to attach media files in the comments area. '
                               + '(planned in a future version as well)</li>'
                               + '</ul>',
    english:                   'english',
    french:                    'french',
    cancel:                    'cancel',
    choose:                    'choose',
    more:                      'more',
    less:                      'less',
    fit_page_to_drawing:       'Fit page to drawing',
    update:                    'Update',
    update_pic:                'Would you update this picture ?',
    edit_copyright:            'Edit copyright',
    example:                   'example',
    unstable_errors:           'unstable version detected.',
    error_unstable_version:    "This version (" + __version__() + ") is unstable. It is therefore not recommended to use it."
  }
}

const fr_messages = {
  message: {
    save:                      'Enregistrer',
    about:                     'À propos',
    help:                      'Aide',
    show:                      'Visualiser',
    edit:                      'Éditer',
    see_more:                  'En savoir d\'avantage ...',
    load_examples:             'Charger des exemples',
    choose_a_file:             'Sélectionnez un fichier',
    drag_it_here:              'ou glissez-le ici.',
    upload:                    'Upload',
    delete:                    'Supprimer',
    add_to_legend:             'Ajouter à la légende',
    error_try_again:           'Erreur ! Essayez à nouveau !',
    edit_title:                'Éditer un titre et un descriptif',
    preview:                   'Prévisualisation',
    no_title:                  '-- sans titre --',
    edit_legend:               'Édition de la légende',
    title:                     'Titre',
    source_file:               'Fichier source :',
    undo:                      'Annuler',
    redo:                      'Rétablir',
    history:                   'Historique',
    description1:              'Permet de transformer un fichier SVG statique en un contenu interactif avec une légende et un descriptif.',
    description2:              'Pour que ce contenu soit le mieux mis en valeur, il est possible de zoomer sur les zones désignées par un indice.',
    credits:                   'Auteurs',
    zoom:                      'Zoomer',
    yes:                       'Oui',
    no:                        'Non',
    delete_pic_ans:            'Désirez-vous supprimer cette image ?',
    delete_legend:             'Désirez-vous vraiment supprimer les indices sélectionnés ?',
    loading_new_pic:           'Charger une nouvelle image signifie que vous allez perdre votre travail en cours.',
    are_you_ok:                'Est-ce bien ce que vous souhaitez ?',
    warnings:                  'Avertissements',
    errors:                    'Erreurs',
    errors_detected:           'Des anomalies majeures ont été détectées à l\'import.',
    error_file_not_supported:  'Le type de fichier n\est pas supporté',
    warnings_detected:         'Des anomalies mineures ont été détectées à l\'import.',
    warning_style:             'Le fichier importé contient une ou plusieurs balises <strong>&#60;style&#62;</strong>'
                               +' : toutes les règles css présentes ont été préfixées pour des raisons de sécurité.',
    warning_script:            'Le fichier importé contient une ou plusieurs balises <strong>&#60;script&#62;</strong> :'
                               + ' tous les scripts javascript ont été supprimés pour des raisons de sécurité.',
    warning_viewbox:           'Le <strong>viewBox calculé</strong> et le <strong>viewBox pré-enregistré</strong>'
                               + ' dans le document sont radicalement différents.<br />'
                               + 'Si vous constatez qu\'après l\'import, le fichier n\'est pas centré, il est fort probable que le '
                               + 'souci provienne de cette différence.',
    warning_mask:              'Le fichier importé contient une ou plusieurs balises <strong>&#60;mask&#62;</strong> :'
                               +' la zone visible lors de l\'import peut être radicalement différente du viewBox.',
    warning_clippath:          'Le fichier importé contient une ou plusieurs balises <strong>&#60;clipPath&#62;</strong> :'
                               +'  la zone visible lors de l\'import peut être radicalement différente du viewBox.',
    github_repo:               'Dépôt Github',
    translators:               'Traducteurs',
    license:                   'Licence',
    intro:                     'Introduction',
    intro_description:         '<p>'
                               + 'Cet éditeur permet d\'ajouter de l\'interactivité à un document statique en lui ajoutant des '
                               + 'zones titrées et commentées ainsi que d\'éventuels zooms.'
                               + '</p>'
                               + 'Pour vos premiers usages, il est fortement recommandé d\'ouvrir un des exemples '
                               + '(liste en haut à gauche) afin de découvrir à quoi peu ressembler une illustration interactive terminée.'
                               + '</p>',
    principle:                 'Principe du logiciel',
    principle_description:     '<p>Cet éditeur fonctionne selon 2 modes : un <strong>mode d\'édition</strong> '
                               + 'et un <strong>mode de visualisation</strong>.'
                               + '</p><p>'
                               + 'Le mode de visualisation permet de simuler le résultat de votre travail tel qu\il s\'affichera après enregistrement.'
                               + '</p>',
    import:                    'Import d\'un fichier SVG',
    import_description:        '<p>'
                               + 'Pour un nouveau projet, vous devez sélectionner dans un premier temps un fichier SVG statique, '
                               + 'de préférence sans javascript (si le fichier contient du javascript, il sera désactivé).<br />'
                               + 'Ceci se fait soit via un glisser/déposer du dit document dans la zone en pointillés (<a href="#figure-1">figure 1</a>) '
                               + 'soit par le clic sur cette zone ouvrant un explorateur de fichiers (<a href="#figure-2">figure 2</a>).'
                               + '</p>',
    create_legend:             'Création de la légende',
    create_legend_description: '<p>'
                               + 'Une fois un fichier importé, vous vous retrouvez dans le <strong>mode édition</strong> du logiciel.'
                               + '</p>'
                               + '<p>Ce mode est scindé en 2 parties :</p>'
                               + '<ul>'
                               + '<li>un <strong>panneau latéral gauche</strong> (aussi appelé sidebar) contenant le récapitulatif de la légende composé d\'un ou plusieurs indices.</li>'
                               + '<li>une <strong>zone de prévisualisation</strong> du fichier occupant le reste de l\'espace sur la droite.</li>'
                               + '</ul>'
                               + '<p>'
                               + 'Il est possible d\'ajouter des indices (avec une limite de 99) à votre légende via le bouton vert dédié.<br />'
                               + 'Par défaut, l\'ajout d\'un indice le place au centre de votre illustration, lui attribue un numéro (incrémenté), '
                               + 'le rend visible et lui attribue une couleur aléatoire.<br />'
                               + 'Si vous créez plusieurs indices les un derrière les autres, vous remarquerez que '
                               + 'l\'algoritme d\'attribution des couleurs n\'est pas complètement aléatoire : il évite les doublons.'
                               + '</p>'
                               + '<p>'
                               + 'Une fois cette étape passée, il est possible de déplacer votre indice en le sélectionnant dans '
                               + 'l\'espace de droite via un clic gauche sans relâchement + déplacement et relâchement pour figer la position.<br />'
                               + 'Tant que vous êtes dans le cadre d\'un déplacement, une croix blanche s\'affiche dans le coin supérieur droit de votre indice.'
                               + '</p>'
                               + '<p>'
                               + 'Chaque indice, peut être masqué via le petit œil sur sa droite.<br />'
                               + 'Cette fonctionalité est particulièrement appréciable pour gérer ou éviter les chevauchements entre plusieurs indices.'
                               + '</p>'
                               + '<p>'
                               + 'En cliquant sur la petite fléche d\'un indice, il est possible de l\'éditer :'
                               + '</p>'
                               + '<ol>'
                               + '<li>le zoom qui se fait en 2 étapes :'
                               + '<ul>'
                               + '<li>on active le zoom via la case à cocher correspondante</li>'
                               + '<li>on saisit une valeur</li>'
                               + '</ul>'
                               + 'Dès que vous sortez de la zone de saisie, le zoom est pris en compte sur la zone droite de prévisualisation. '
                               + 'Il vous est donc facile d\'ajuster ces règlages.'
                               + '</li>'
                               + '<li>Choix d\'une couleur personalisée :<br />'
                               + 'Comme indiqué précédemment, un algorithme choisit à chaque création d\'indice une couleur. '
                               + 'Il vous est bien évidement possible de choisir manuellement cette couleur via une grille d\'échantillons.<br />'
                               + 'Un premier appui vous donnera par conséquent une gamme de 64 couleurs standards entièrement suffisantes dans la majorité des cas.<br />'
                               + 'Néanmoins, il reste possible d\'affiner encore cette sélection via un second dialogue donnant accès à une pipette de 16 millions de couleurs.'
                               + '</li>'
                               + '<li>'
                               + 'Un bouton vert dans la zone d\'édition d\'un indice vous donne la possibilité d\'attribuer un titre et un descriptif à votre indice.'
                               + 'L\'appui en dehors de la zone de dialogue fermera automatiquement le dialogue et enregistrera votre travail.<br />'
                               + 'Les commentaires peuvent être enrichis par des zones en italique, en gras, des tailles de texte, des images etc.<br />'
                               + 'Su vous désirez des explications avancées sur cet éditeur, le mieux est de consulter le site du plugin correspondant : <br />'
                               + '<a href="https://alex-d.github.io/Trumbowyg" target="_blank">Editeur Trumbowyg</a>'
                               + '</li>'
                               + '<li>'
                               + 'Vous pouvez réordonner les indices : pour celà, rien de plus simple que d\'intervertir 1 ou plusieurs indices par des glissé/déposé.'
                               + '</li>'
                               + '<li>'
                               + 'Enfin, il vous est possible de supprimer 1 ou plusieurs indices en les cochant (case à cocher sur la droite)'
                               + ' puis d\'appuyer sur le bouton de suppression.<br />'
                               + 'Cette manipulation délicate nécessitera de répondre par l\'affirmative dans une '
                               + 'fenêtre modale sous peine de ne pas être prise en compte.'
                               + '</li>'
                               + '</ol>',
    save:                      'Enregistrer son travail',
    save_description:          '<p>'
                               + 'Une fois que vous êtes satisfait de votre travail, il est utile de l\'enregistrer.<br />'
                               + 'Pour ce faire, vous avez un bouton dédié qui se charge de transformer votre travail en un document unique au format HTML.<br />'
                               + 'Le fichier HTML généré est actuellement aussi bien le format '
                               + 'd\'export (fichier définitif pouvant être lu dans un navigateur) qu\'un format d\'édition.'
                               + '</p>',
    reopen:                    'Réouvrir un document',
    reopen_description:        '<p>'
                               + 'Le fichier HTML précédement sauvegardé est effectivement rééditable à volonté.'
                               + 'Pour ce faire, il vous suffit de passer par le même procédé qu\'un import '
                               + 'de fichier SVG (glissé/déposé ou recherche du fichier avec l\'explorateur).'
                               + 'Le logiciel récupérera l\'ensemble des informations et il vous sera possible '
                               + 'de le modifier et d\'enregistrer par la suite un nouveau document.'
                               + '</p>',
    new_import:                'Nouvel import',
    new_import_description:    '<p>'
                               + 'Il est à tout moment, possible de supprimer le fichier en cours.<br />'
                               + 'Pour celà, il vous suffit de cliquer sur le bouton supprimer dans la '
                               + '<strong>zone de prévisualisation</strong> et de confirmer dans la fenêtre modale qui lui succède.'
                               + '</p>'
                               + '<p>'
                               + 'Attention : ce choix est de par sa nature définitif.'
                               + '</p>',
    view_mode:                 'Mode de visualisation',
    view_mode_description:     '<p>'
                               + 'Le mode de visualisation vous permet d\'interagir avec votre illustration exactement comme '
                               + 'si elle venait d\'être publiée à ceci près que vous pouvez repasser en édition et continuer votre travail en cours.<br />'
                               + 'Ce mode vous donne donc accès à un contrôle sur votre production définitive.'
                               + '</p>',
    error_import:              'Des soucis d\'import ?',
    error_import_description:  '<p>'
                               + 'Après l\'import d\'un fichier, une série de contrôles qualité est effectué.<br />'
                               + 'Si la moindre anomalie est détectée, une zone d\'avertissement sera visible : il vous '
                               + 'sera possible d\'avoir des informations plus précises sur les anomalies rencontrées si besoin et éventuellement y remédier.'
                               + '</p>',
    limitation:                'Limitation',
    limitation_description:    '<ul>'
                               + '<li>Ce logiciel ne permet pas d\'éditer d\'autres documents que le format SVG. '
                               + 'Il est prévu néanmoins de supporter des formats d\'images (png et jpg) dans une version future.</li>'
                               + '<li>Il n\'est pas possible de joindre des fichiers multimédias dans la zone des commentaires. '
                               + '(prévu dans une version future également)</li>'
                               + '</ul>',
    english:                   'anglais',
    french:                    'français',
    cancel:                    'Annuler',
    choose:                    'Choisir',
    more:                      'Plus',
    less:                      'Moins',
    fit_page_to_drawing:       'Ajuster la page à l\'illustration',
    update:                    'Mise à jour',
    update_pic:                'Vous désirez mettre à jour le fichier svg ?',
    edit_copyright:            'Edition des crédits',
    example:                   'exemple',
    unstable_errors:           'version instable détectée',
    error_unstable_version:    "Cette version (" + __version__() + ") est instable. Il est donc déconseillé de l'utiliser."
  }
}

const messages = {
  en: en_messages,
  fr: fr_messages
}

function I18nException(message) {
  "use strict";
  this.message = message;
  this.name = "I18nException";
}

function translate(local, key) {
  "use strict";
  return messages[local].message[key];
}

function translateExportInterface(local) {
  "use strict";
  var fitPageIcon = document.getElementById("fit-page-to-drawing");
  fitPageIcon.setAttribute("title", translate(local, fitPageIcon.getAttribute("data-i18n")));
}

function translateElementsByClassName(name, local) {
  "use strict";
  if (!local) {
    var local = (navigator.language || navigator.userLanguage).substr(0, 2);
    if (!(local in messages))
      local = "en";
  }
  var i18nList = document.getElementsByClassName(name);
  for (var i = 0, len = i18nList.length; i < len; i++) {
    var element = i18nList[i];
    var attr = element.getAttribute("data-i18n");
    if (!attr)
      throw new I18nException("element tag to be translate without a data-i18n string");
    if (!(attr in messages[local]["message"])) {
      if (!(attr in messages["en"]["message"]))
        throw new I18nException('translate string "' + attr + '" did not exist!');
      element.innerHTML = messages["en"]["message"][attr];
      continue;
    }
    element.innerHTML = translate(local, attr);
  }
  var select_lang = document.getElementById('selected-lang');
  select_lang.className = '';
  select_lang.classList.add('flags');
  select_lang.innerText = document.getElementById('choose-language').getElementsByClassName(local)[0].innerText;
  select_lang.classList.add(local);
  return local;
}
