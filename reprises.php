<?php
$pageTitle = "Reprises - MusicPLZ";
$metaDescription = "Découvrez les quelques reprises d'ost qui ont permis à Lindsey Stirling de se faire connaître";
$metaKeywords = " Lindsey Stirling, albums, musique";
$includeSwiper = false;
include 'includes/head.php';
$dataFile = 'assets/tab/data.json';
$reprises = json_decode(file_get_contents($dataFile), true);
?>

<body class="body__reprises">
  <div class="transition transition__2 transition__isactive"></div>

  <?php include('includes/header.php'); ?>

  <h1 class="title__reprise title__gradient">Reprises</h1>
  <div class="wrapper">
    <?php foreach ($reprises as $reprise): ?>
      <div class="card">
        <img class="card__img" src="<?= htmlspecialchars($reprise['chemin_image']) ?>" aria-hidden="true" alt="<?= htmlspecialchars($reprise['titre']) ?>">
        <div class="card__info">
          <h2 class="card__title"><?= htmlspecialchars($reprise['titre']) ?></h2>
          <a class="card__link" href="<?= htmlspecialchars($reprise['lien']) ?>" target="_blank" rel="noopener noreferrer">Écouter</a>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</body>
</html>
