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
    enabled:                   'Enabled',
    no_title:                  '-- no title --',
    edit_legend:               'Edit legend',
    title:                     'Title',
    source_file:               'Source file',
    undo:                      'Undo',
    redo:                      'Redo',
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
    bug_detected:              'imported bugs detected.',
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
                               + 'Cet éditeur permet d\'ajouter de l\'interactivité à un document statique en lui ajoutant des '
                               + 'zones titrés et commentés ainsi que d\'éventuel zoom.'
                               + '</p>',
    principle:                 'Principe du logiciel',
    principle_description:     '<p>Cet éditeur fonctionne selon 2 modes : un <strong>mode d\'édition</strong> ',
    import:                    'Import d\'un fichier SVG',
    import_description:        '<p>',
    create_legend:             'Création de la légende',
    create_legend_description: '<p>',
    save:                      'Save',
    save_description:          '<p>',
    reopen:                    'Reopen document',
    reopen_description:        '<p>',
    new_import:                'Nouvel import',
    new_import_description:    '<p>',
    view_mode:                 'Mode de visualisation',
    view_mode_description:     '<p>',
    error_import:              'Des soucis d\'import ?',
    error_import_description:  '<p>',
    limitation:                'Limitation',
    limitation_description:    '<ul>',
    english:                   'english',
    french:                    'french'
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
    drag_it_here:              'ou glissez le ici.',
    upload:                    'Upload',
    delete:                    'Supprimer',
    add_to_legend:             'Ajouter à la légende',
    error_try_again:           'Erreur ! Essayez à nouveau !',
    edit_title:                'Éditer un titre et un descriptif',
    enabled:                   'Activer',
    no_title:                  '-- sans titre --',
    edit_legend:               'Édition de la légende',
    title:                     'Titre',
    source_file:               'Fichier source',
    undo:                      'Annuler',
    redo:                      'Rétablir',
    description1:              'Permet de transformer un fichier SVG statique en un contenu interactif avec une légende et un descriptif.',
    description2:              'Pour que ce contenu soit le mieux mis en valeur, il est possible de zoomer sur les zones désignées par un indice.',
    credits:                   'Auteurs',
    zoom:                      'Zoomer',
    yes:                       'Oui',
    no:                        'Non',
    delete_pic_ans:            'Désirez-vous supprimer cette image ?',
    delete_legend:             'Désirez-vous vraiment supprimer les indices sélectionnés ?',
    loading_new_pic:           'Chargez une nouvelle image signifie que vous allez perdre votre travail en cours.',
    are_you_ok:                'Est-ce bien ce que vous souhaitez ?',
    warnings:                  'Avertissements',
    bug_detected:              'Des anomalies ont été détectées à l\'import.',
    warning_style:             'Le fichier importé contient une ou plusieurs balises <strong>&#60;style&#62;</strong>'
                               +' : toutes les règles css présentent ont été préfixés pour des raisons de sécurité.',
    warning_script:            'Le fichier importé contient une ou plusieurs balises <strong>&#60;script&#62;</strong> :'
                               + ' tous les scripts javascript ont été supprimés pour des raisons de sécurité.',
    warning_viewbox:           'Le <strong>viewBox calculé</strong> et le <strong>viewBox pré-enregistré</strong>'
                               + ' dans le document sont radicalement différent.<br />'
                               + 'Si vous constatez qu\'après l\'import, le fichier n\'est pas centré, il est fort probable que le '
                               + 'soucis provienne de cette différence.',
    warning_mask:              'Le fichier importé contient une ou plusieurs balises <strong>&#60;mask&#62;</strong> :'
                               +' la zone visible lors de l\'import peut être radicalement différent du viewBox.',
    warning_clippath:          'Le fichier importé contient une ou plusieurs balises <strong>&#60;clipPath&#62;</strong> :'
                               +'  la zone visible lors de l\'import peut être radicalement différent du viewBox.',
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
                               + 'Ceci se fait soit via un glissé/déposé du dit document dans la zone en pointillé (figure 1) '
                               + 'soit par le clic sur cette zone ouvrant un explorateur de fichiers (figure 2).'
                               + '</p>',
    create_legend:             'Création de la légende',
    create_legend_description: '<p>'
                               + 'Une fois un fichier importé, vous vous retrouvez dans le <strong>mode édition</strong> du logiciel.'
                               + '</p>'
                               + '<p>Ce mode est scindé en 2 parties :</p>'
                               + '<ul>'
                               + '<li>un <strong>panneau latérale gauche</strong> (aussi appelé sidebar) contenant le récapitulatif de la légende composé d\'un ou plusieurs indices.</li>'
                               + '<li>une <strong>zone de prévisualisation</strong> du fichier occupant le reste de l\'espace sur la droite.</li>'
                               + '</ul>'
                               + '<p>'
                               + 'Il est possible d\'ajouter des indices (avec une limite de 99) à votre légende via le bouton vert dédié.<br />'
                               + 'Par défaut, l\'ajout d\'un indice le place au centre de votre illustration, lui attribut un numéro (incrémentée), '
                               + 'le rend visible et lui attribut une couleur aléatoire.<br />'
                               + 'Si vous créer plusieurs indices les un derrières les autres, vous remarquerez que '
                               + 'l\'algoritme d\'attribution des couleurs n\'est pas complétement aléatoire : il évite les doublons.'
                               + '</p>'
                               + '<p>'
                               + 'Une fois cette étape passée, il est possible de déplacer votre indice en le sélectionnant dans '
                               + 'l\'espace de droite via un clic gauche sans relachement + déplacement et relachement pour figer la position.<br />'
                               + 'Tant que vous êtes dans le cadre d\'un déplacement, une croix blanche s\'affiche dans le coin supérieur droit de votre indice.'
                               + '</p>'
                               + '<p>'
                               + 'Chaque indice, peut être masqué via le petit oeil sur ça droite.<br />'
                               + 'Cette fonctionalité est particulièrement appréciable pour gérer ou éviter les chevauchements entre plusieurs indices.'
                               + '</p>'
                               + '<p>'
                               + 'En cliquant sur la petite fléche d\'une indice, il est possible de l\'éditer :'
                               + '</p>'
                               + '<ol>'
                               + '<li>le zoom qui se fait en 2 étapes :'
                               + '<ul>'
                               + '<li>on active le zoom via la case à cocher correspondante</li>'
                               + '<li>on saisie une valeur</li>'
                               + '</ul>'
                               + 'Dès que vous sortez de la zone de saisie, le zoom est pris en compte sur la zone droite de prévisualisation. '
                               + 'Il vous es donc facile d\'ajuster ces règlages.'
                               + '</li>'
                               + '<li>Choix d\'une couleur personalisée :<br />'
                               + 'Comme indiqué précédement, un algorithme choisi à chaque création d\'indice une couleur. '
                               + 'Il vous est bien évidement possible de choisir manuellement cette couleur via une grille d\'échantions.<br />'
                               + 'Un premier appui vous donnera par conséquent une gamme de 64 couleurs standards entièrement suffisantes dans la majorité des cas.<br />'
                               + 'Néanmoins, il reste possible d\'affiner encore cette sélection via un second dialogue donnant accès à une pipette de 16 millions de couleurs.'
                               + '</li>'
                               + '<li>'
                               + 'Un bouton vert dans la zone d\'édition d\'un indice vous donne la possibilité d\'attribuer un titre et un descriptif à votre indice.'
                               + 'L\'appuie en dehors de la zone de dialogue fermera automatiquement le dialogue et enregistrera votre travail.<br />'
                               + 'Les commentaires peuvent être enrichies par des zones en italiques, en gras, des tailles de texte, des images etc.<br />'
                               + 'Su vous désirez des explications avancées sur cet éditeur, le mieux est de consulter le site du plugin correspondant : <br />'
                               + '<a href="https://alex-d.github.io/Trumbowyg" target="_blank">Editeur Trumbowyg</a>'
                               + '</li>'
                               + '<li>'
                               + 'Vous pouvez réordonner les indices : pour celà, rien de plus simple que d\'intervertir 1 ou plusieurs indices par des glissé/déposé.'
                               + '</li>'
                               + '<li>'
                               + 'Enfin, il vous est possible de supprimer 1 ou plusieurs indices en les cochants (case à cocher sur la droite)'
                               + ' puis d\'appuyer sur le bouton de suppression.<br />'
                               + 'Cette manipulation délicate nécessitera de répondre par l\'affirmative dans une '
                               + 'fenêtre modale sous peine de ne pas être pris en compte.'
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
                               + 'Le logiciel récupèrera l\'ensemble des informations et il vous sera possible '
                               + 'de le modifier et d\'enregistrer par la suite un nouveau document.'
                               + '</p>',
    new_import:                'Nouvel import',
    new_import_description:    '<p>'
                               + 'Il est a tout moment, possible de supprimer le fichier en cours.<br />'
                               + 'Pour celà, il vous suffit de cliquer sur le bouton supprimer dans la '
                               + '<strong>zone de prévisualisation</strong> et de confirmer dans la fenêtre modale qui lui succède.'
                               + '</p>'
                               + '<p>'
                               + 'Attention : ce choix est de par sa nature définitif.'
                               + '</p>',
    view_mode:                 'Mode de visualisation',
    view_mode_description:     '<p>'
                               + 'Le mode de visualisation vous permet d\'interagir avec votre illustration exactement comme '
                               + 'si elle venait d\'être publié à ceci près que vous pouvez repassé en édition et continuer votre travail en cours.<br />'
                               + 'Ce mode vous donne donc accès à un contrôle sur votre production définitive.'
                               + '</p>',
    error_import:              'Des soucis d\'import ?',
    error_import_description:  '<p>'
                               + 'Après l\'import d\'un fichier, une série de contrôles qualités est effectué.<br />'
                               + 'Si la moindre anomalie est détecté, une zone d\'avertissement sera visible : il vous '
                               + 'sera possible d\'avoir des informations plus précise sur les anomalies rencontrés si besoin et éventuellement y remédier.'
                               + '</p>',
    limitation:                'Limitation',
    limitation_description:    '<ul>'
                               + '<li>Ce logiciel ne permet pas d\'éditer d\'autres documents que le format SVG. '
                               + 'Il est prévu néanmoins de supporter des formats d\'images (png et jpg) dans une version future.</li>'
                               + '<li>Il n\'est pas possible de joindre des fichiers multimédias dans la zone des commentaires. '
                               + '(prévu dans une version future également)</li>'
                               + '</ul>',
    english:                   'anglais',
    french:                    'français'
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

function translate(local) {
  "use strict";
  if (!local) {
    var local = (navigator.language || navigator.userLanguage).substr(0, 2);
    if (!(local in messages))
      local = "en";
  }
  var i18nList = document.getElementsByClassName("i18n");
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
    element.innerHTML = messages[local]["message"][attr];
  }
  var select_lang = document.getElementById('selected-lang');
  select_lang.className = '';
  select_lang.classList.add('flags');
  select_lang.innerText = document.getElementById('choose-language').getElementsByClassName(local)[0].innerText;
  select_lang.classList.add(local);
  return local;
}

