<?php
// Charger et décoder le fichier JSON
$json_data = file_get_contents('assets/tab/album.json');
$albums = json_decode($json_data, true); // Décoder en tableau associatif

// Vérifier si les données ont été correctement récupérées
if (!$albums) {
    die('Erreur de lecture du fichier JSON');
}

// Récupérer le slug passé en paramètre URL
if (isset($_GET['slug'])) {
    $slug = $_GET['slug'];

    // Rechercher l'album correspondant au slug
    $album = null;
    foreach ($albums['albums'] as $a) {
        if ($a['slug'] === $slug) {
            $album = $a;
            break;
        }
    }

    // Si l'album n'existe pas, afficher une erreur
    if (!$album) {
        die('Album introuvable');
    }

    // Définir dynamiquement le titre de la page avec le titre de l'album
    $pageTitle = $album['album_title'] . " - MusicPLZ";
    $metaDescription = "Découvrez l'album \"" . $album['album_title'] . "\" de Lindsey Stirling.";
    $metaKeywords = "Lindsey Stirling, " . $album['album_title'] . ", musique, albums";
    $includeSwiper = false;

} else {
    die('Aucun album sélectionné');
}

include 'includes/head.php';
?>

<body class="body__anim body__album">

    <div class="transition transition__4 transition__isactive"></div>
    <?php include('includes/header.php'); ?>

    <?php
    // Charger et décoder le fichier JSON
    $json_data = file_get_contents('assets/tab/album.json');
    $albums = json_decode($json_data, true); // Décoder en tableau associatif

    // Vérifier si les données ont été correctement récupérées
    if (!$albums) {
        die('Erreur de lecture du fichier JSON');
    }

    // Récupérer le slug passé en paramètre URL
    if (isset($_GET['slug'])) {
        $slug = $_GET['slug'];

        // Rechercher l'album correspondant au slug
        $album = null;
        foreach ($albums['albums'] as $a) {
            if ($a['slug'] === $slug) {
                $album = $a;
                break;
            }
        }

        // Si l'album n'existe pas, afficher une erreur
        if (!$album) {
            die('Album introuvable');
        }
    } else {
        die('Aucun album sélectionné');
    }
    ?>

    <a class="retour__btn" href="discographie.php">Retour</a>

    <!-- Affichage de la couverture de l'album -->
    <div class="cover__container">
        <img class="cover" src="<?php echo $album['image']; ?>" alt="Cover de <?php echo $album['album_title']; ?>">
    </div>

    <!-- Affichage de la liste des morceaux -->
    <div class="slider">
        <div class="box">
            <?php foreach ($album['tracklist'] as $track): ?>
                <p class="item" data-src="assets/albums/<?php echo strtolower(str_replace(' ', '', $track['track_title'])); ?>.mp3" data-artist="<?php echo $track['artist']; ?>">
                    <?php echo $track['track_title']; ?>
                </p>

            <?php endforeach; ?>
        </div>
    </div>

    <!-- Titre de la chanson active et artiste -->
    <h2 class="music__title"></h2>
    <h3 class="artist"></h3>

    <div class="progress-bar">
        <div class="progress"></div>
    </div>

    <div class="buttons">
        <button class="prev" aria-label="Musique précédente">prev</button>
        <button class="play" aria-label="Jouer la musique">Play</button>
        <button class="next" aria-label="Prochaine musique">next</button>
    </div>

</body>
</html>
