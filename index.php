<?php
$pageTitle = "Accueil - MusicPLZ";
$metaDescription = "Découvrez qui est Lindsey Stirling";
$metaKeywords = " Lindsey Stirling, albums, musique";
$includeSwiper = false;
include 'includes/head.php';
?>

<body class="index__body body__anim">
  <div class="transition transition__1 transition__isactive"></div>

  <?php include('includes/header.php'); ?>
  
  <div class="container__index">
  
    <div class="content__left">
      <img class="content__left-img" src="assets/images/LS.jpg" alt="">
    </div>
  
    <div class="content content__right">
      <h1 class="title title__gradient">Lindsey Stirling</h1>
      <div class="animated-title">
        <div class="text-top">
          <div>
            <span>L'art de mélanger</span>
            <span>le classique</span>
          </div>
        </div>
        <div class="text-bottom">
          <div>à la mordernité</div>
        </div>
      </div>
      <a class="content__link-discover" href="discographie.php">Découvrir<span></span></a>
    </div>
  
  
  </div>
</body>

</html>
