
<?php
$pageTitle = "Discographie - MusicPLZ";
$metaDescription = "Explorez la discographie complète de Lindsey Stirling, ses albums et ses succès.";
$metaKeywords = "Discographie, Lindsey Stirling, albums, musique";
$includeSwiper = true; // Inclure Swiper uniquement sur cette page
include 'includes/head.php';
?>

<body class="body__anim">
  <div class="transition transition__3 transition__isactive"></div>
  <?php include('includes/header.php'); ?>
  <h1 class="title__discographie title__gradient">Discographie</h1>
  <?php
  // Charger le fichier JSON
  $json = file_get_contents('assets/tab/album.json');
  $data = json_decode($json, true);

  // Récupérer la liste des albums
  $albums = $data['albums'];
  ?>

<div class="container">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <?php
            // Boucle sur les albums pour générer chaque slide
            foreach ($albums as $index => $album) :
                // Récupérer le titre, la date et l'image
                $albumTitle = $album['album_title'];
                $date = $album['date'];
                $slug = $album['slug'];

                // Déterminer la classe swiper-slide
                $slideIndex = $index + 1;
                $slideClass = "swiper-slide-$slideIndex";

                // Vérifier si on doit ajouter la classe well__link--reverse
                $addReverseClass = in_array($slideIndex, [2, 3, 5]);
                ?>
                <div class="swiper-slide <?php echo $slideClass; ?>">
                    <div class="well"></div>
                    <div class="well">
                        <a class="well__link <?php echo $addReverseClass ? 'well__link--reverse' : ''; ?>" href="album.php?slug=<?php echo $slug; ?>">Écouter l'album<span></span></a>

                        <h2 class="album__title">
                            <?php
                            // Vérifier si le titre de l'album est "Warmer in the Winter"
                            if ($albumTitle == "Warmer in the Winter") {
                                // Cas spécial pour "Warmer in the Winter"
                                echo "<span>Warmer in</span> <span>the Winter</span>";
                            } else {
                                // Séparer le titre de l'album par espaces pour les autres titres
                                $albumTitleWords = explode(' ', $albumTitle);

                                // Afficher chaque mot dans un span
                                foreach ($albumTitleWords as $word) {
                                    echo "<span>$word</span> ";
                                }
                            }
                            ?>
                        </h2>

                        <p class="album__date"><?php echo $date; ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</div>


</body>
</html>