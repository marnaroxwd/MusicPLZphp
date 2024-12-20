<header>
    <!-- Navigation principale -->
    <nav class="menu__container">
      <!-- Bouton du menu -->
      <button class="menu__button" id="menuButton">
        <svg class="menu__svg" viewBox="0 0 100 100">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>

          <!-- Ajout du cercle pour créer le "trou" -->
          <circle cx="50" cy="50" r="20" fill="none"/>

          <text class="menu__text">
            <textPath href="#circlePath" startOffset="50%">
              Menu
            </textPath>
          </text>
        </svg>

      </button>

      <!-- Menu plein écran -->
      <div class="menu__overlay" id="menuOverlay">
        <ul class="menu__list">
          <li class="menu__el">
            <a class="menu__link" href="index.php">
              <span class="menu__link--text">Home</span>
              <span class="menu__link--image">
                <img src="assets/images/accueil.webp" alt="" aria-hidden="true" class="menu__icon">
              </span>
            </a>
          </li>
          <li class="menu__el">
            <a class="menu__link" href="discographie.php">
              <span class="menu__link--text">Discographie</span>
              <span class="menu__link--image">
                <img src="assets/images/album.webp" alt="" aria-hidden="true" class="menu__icon">
              </span>
            </a>
          </li>
          <li class="menu__el">
            <a class="menu__link" href="reprises.php">
              <span class="menu__link--text">Reprises</span>
              <span class="menu__link--image">
                <img src="assets/images/reprise.webp" alt="" aria-hidden="true" class="menu__icon">
              </span>
            </a>
          </li>
        </ul>
        <div class="menu__footer-links">
          <a href="credits.html" class="menu__footer-link menu__footer-link--L">Crédits</a>
          <a href="https://maxime-baldan.be" class="menu__footer-link menu__footer-link--R">Maxime Baldan</a>
        </div>
      </div>
    </nav>
  </header>