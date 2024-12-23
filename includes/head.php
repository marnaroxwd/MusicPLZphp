<?php
// Définit les valeurs dynamiques avec des valeurs par défaut si elles ne sont pas définies
$pageTitle = $pageTitle ?? "MusicPLZ";
$metaDescription = $metaDescription ?? "Découvrez les albums et reprises de Lindsey Stirling.";
$metaKeywords = $metaKeywords ?? "Lindsey Stirling, musique, albums, reprises";
$metaLanguage = $metaLanguage ?? "fr";
$pageSpecificClass = basename($_SERVER['PHP_SELF'], '.php') === 'reprises' ? 'ow_hidden' : '';
?>
<!DOCTYPE html>
<html lang="fr" class="<?= htmlspecialchars($pageSpecificClass) ?>">
<head>
  <!-- Métadonnées générales -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- Métadonnées SEO -->
  <meta name="title" content="<?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>">
  <meta name="description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
  <meta name="keywords" content="<?= htmlspecialchars($metaKeywords, ENT_QUOTES, 'UTF-8'); ?>">
  <meta name="language" content="<?= htmlspecialchars($metaLanguage, ENT_QUOTES, 'UTF-8'); ?>">

  <!-- Favicon -->
  <link rel="icon" href="assets/images/icon/favicon.ico" type="image/x-icon">

  <!-- Préchargements -->
  <link rel="preload" href="assets/images/signature_jaune.svg" as="image">

  <!-- Titre de la page -->
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>

  <!-- Stylesheets -->
  <link rel="stylesheet" href="styles/app.css">
  <link rel="preload" href="assets/images/signature_jaune.svg" as="image">
  <script src="scripts/app.js" defer></script>
  <?php if (isset($includeSwiper) && $includeSwiper): ?>
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
  <?php endif; ?>
</head>
