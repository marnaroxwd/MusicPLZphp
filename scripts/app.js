"use strict"
const reprisePage= document.querySelector('.body__reprises')
const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const albumPage = document.querySelector('.body__album');

menuButton.addEventListener("click", () => {
    const isOpen = menuOverlay.classList.toggle("open");
    menuButton.classList.toggle("opened", isOpen);


    const textPath = menuButton.querySelector("textPath");
    textPath.textContent = isOpen ? "Fermer" : "Menu";
});


document.addEventListener('DOMContentLoaded', function() {
    // Appliquer l'effet à la fois pour .content__link-discover et .well__link
    document.querySelectorAll('.content__link-discover, .well__link').forEach(function(link) {
        link.addEventListener('mouseenter', function(e) {
            var parentOffset = link.getBoundingClientRect(),
                relX = e.clientX - parentOffset.left,
                relY = e.clientY - parentOffset.top;
            var span = link.querySelector('span');
            if (span) {
                span.style.top = relY + 'px';
                span.style.left = relX + 'px';
            }
        });

        link.addEventListener('mouseout', function(e) {
            var parentOffset = link.getBoundingClientRect(),
                relX = e.clientX - parentOffset.left,
                relY = e.clientY - parentOffset.top;
            var span = link.querySelector('span');
            if (span) {
                span.style.top = relY + 'px';
                span.style.left = relX + 'px';
            }
        });
    });

    // Empêcher l'action par défaut sur les liens avec href="#"
    document.querySelectorAll('[href="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});


const ifswiper = document.querySelector('.swiper-container');
if(ifswiper){
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        speed: 500,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slideChange: function () {
            // Retirer la classe active de tous les éléments .well
            document.querySelectorAll('.swiper-slide .well').forEach(well => {
                well.classList.remove('active');
            });

            // Ajouter la classe active à .well de la slide active
            const activeSlide = this.slides[this.activeIndex];
            const firstWell = activeSlide.querySelector('.well:nth-child(1)');
            firstWell.classList.add('active');
        }
    });
}




if (reprisePage) {
    let isScrolling = false;
    let targetScrollX = 0;
    let currentScrollX = 0;
    const scrollContainer = document.documentElement;

    window.addEventListener('load', function () {
        const maxScrollX = scrollContainer.scrollWidth - window.innerWidth;
        const initialScroll = maxScrollX / 2;

        // Set initial scroll position
        scrollContainer.scrollLeft = initialScroll;
        targetScrollX = initialScroll;
        currentScrollX = initialScroll;

        // Apply parallax effect
        applyParallax(0, initialScroll);
    });

    window.addEventListener('scroll', function () {
        const maxScrollX = scrollContainer.scrollWidth - window.innerWidth;
        const scrollX = scrollContainer.scrollLeft - maxScrollX / 2;

        // Apply parallax effect on scroll
        applyParallax(scrollX);
    });

    function applyParallax(scrollX) {
        const images = document.querySelectorAll('.card__img');
        const maxScroll = 2000;

        images.forEach(image => {
            const containerWidth = image.parentElement.offsetWidth;
            const translateX = Math.min(Math.max((scrollX / containerWidth) * 10, -maxScroll), maxScroll);

            image.style.transform = `translate(-50%, -50%) translateX(${translateX}%)`;
        });
    }

    window.addEventListener('wheel', function (e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            targetScrollX += e.deltaY;

            // Clamp targetScrollX between 0 and the maximum scrollable width
            const maxScrollX = scrollContainer.scrollWidth - window.innerWidth;
            targetScrollX = Math.max(0, Math.min(targetScrollX, maxScrollX));

            // Disable immediate smooth scroll behavior
            scrollContainer.style.scrollBehavior = 'auto';
            if (!isScrolling) {
                requestAnimationFrame(scrollInertia);
                isScrolling = true;
            }
        }
    }, { passive: false });

    function scrollInertia() {
        const speed = 0.05; // How fast the scroll should slow down
        const inertia = targetScrollX - currentScrollX;

        // Apply inertia for continuous smooth scroll
        if (Math.abs(inertia) > 0.2) {
            currentScrollX += inertia * speed;

            // Clamp currentScrollX between 0 and the maximum scrollable width
            const maxScrollX = scrollContainer.scrollWidth - window.innerWidth;
            currentScrollX = Math.max(0, Math.min(currentScrollX, maxScrollX));

            scrollContainer.scrollLeft = currentScrollX;

            // Continue the scroll effect
            requestAnimationFrame(scrollInertia);
        } else {
            isScrolling = false; // Stop the scrolling once the inertia is negligible
        }
    }

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Prevent event propagation to the document
            e.stopPropagation();

            // Remove 'active' class from all cards and add it to the clicked card
            document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add a click event listener on the document to remove 'active' class when clicking outside of a card
    document.addEventListener('click', function () {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
    });
}


//Transition de page
window.onload = () => {
    const transition_el = document.querySelector('.transition');
    const anchors = document.querySelectorAll('a');
    setTimeout(() => {
        transition_el.classList.remove('transition__isactive');
    }, 500);

    for (let i = 0; i < anchors.length; i++ ) {
        const anchor = anchors[i];

        anchor.addEventListener('click', e => {
            e.preventDefault();
            let target = e.currentTarget.href;

            transition_el.classList.add('transition__isactive');
            setTimeout(() => {
                window.location.href = target
            }, 500);
        });
    }
}



if (albumPage) {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const playButton = document.querySelector('.play');
    const box = document.querySelector('.box');
    const title = document.querySelector('.music__title'); // Sélection du titre
    const artist = document.querySelector('.artist'); // Sélection de l'artiste

    playButton.addEventListener('click', () => {
        // Vérifier si le bouton est actuellement en mode "Play" ou "Pause"
        const isPlaying = playButton.classList.contains('is-playing');

        if (isPlaying) {
            // Passer en mode "Play"
            playButton.classList.remove('is-playing');
            playButton.style.backgroundImage = "url('../assets/images/play.svg')"; // Image Play
            playButton.setAttribute('aria-label', 'Jouer la musique'); // Met à jour l'aria-label
            playButton.textContent = 'Play'; // Change le texte
        } else {
            // Passer en mode "Pause"
            playButton.classList.add('is-playing');
            playButton.style.backgroundImage = "url('../assets/images/pause.svg')"; // Image Pause
            playButton.setAttribute('aria-label', 'Mettre en pause la musique'); // Met à jour l'aria-label
            playButton.textContent = 'Pause'; // Change le texte
        }
    });
    function updateTitleAndArtist(activeTrackTitle, activeArtist) {
        // Nettoyer le texte en supprimant les espaces inutiles
        const cleanedTitle = activeTrackTitle.trim();
        const cleanedArtist = activeArtist.trim();

        // Effacer le contenu précédent du titre et de l'artiste
        title.innerHTML = '';
        artist.innerHTML = '';

        // Séparer le titre en lettres
        const titleLetters = cleanedTitle.split('');
        // Séparer l'artiste en lettres
        const artistLetters = cleanedArtist.split('');

        // Ajouter chaque lettre ou espace en tant qu'élément span dans le titre
        titleLetters.forEach((letter, index) => {
            const span = document.createElement('span');
            if (letter === ' ') {
                span.innerHTML = '&nbsp;'; // Ajouter un espace insécable pour les espaces
            } else {
                span.textContent = letter; // Placer la lettre dans le span
            }
            title.appendChild(span); // Ajouter le span au titre

            // Appliquer un délai de type 'stagger' sur l'apparition des lettres
            span.style.animationDelay = `${index * 0.05}s`;

        });

        // Ajouter la classe 'show' pour lancer l'animation d'apparition
        setTimeout(() => {
            title.classList.add('show');
        }, 100);

        // Ajouter chaque lettre ou espace en tant qu'élément span pour l'artiste
        artistLetters.forEach((letter, index) => {
            const span = document.createElement('span');
            if (letter === ' ') {
                span.innerHTML = '&nbsp;'; // Ajouter un espace insécable pour les espaces
            } else {
                span.textContent = letter; // Placer la lettre dans le span
            }
            artist.appendChild(span); // Ajouter le span à l'artiste

            // Appliquer un délai de type 'stagger' sur l'apparition des lettres
            span.style.animationDelay = `${index * 0.05}s`;

        });

        // Ajouter la classe 'show' pour lancer l'animation d'apparition
        setTimeout(() => {
            artist.classList.add('show');
        }, 100);
    }


    // Fonction pour mettre à jour les classes d'opacité, de position et le titre
    function updateOpacity() {
        const items = document.querySelectorAll('.item');
        const middleIndex = Math.floor(items.length / 2); // Calcul du milieu de la liste

        items.forEach((item, index) => {
            item.classList.remove('item--active', 'item--sibling', 'item--following'); // Enlève les anciennes classes

            if (index === middleIndex) { // L'élément du milieu devient l'actif
                item.classList.add('item--active');
                const trackTitle = item.textContent;
                const artistName = item.getAttribute('data-artist');
                updateTitleAndArtist(trackTitle, artistName);
            } else if (index === middleIndex - 1 || index === middleIndex + 1) { // Les frères directs
                item.classList.add('item--sibling');
            } else { // Les éléments plus éloignés
                item.classList.add('item--following');
            }
        });
    }

    function moveNext() {
        const items = document.querySelectorAll('.item');
        let firstItem = items[0]; // Le premier élément
        box.appendChild(firstItem); // Déplace le premier élément à la fin
        updateOpacity(); // Met à jour les opacités après le déplacement
    }

    function movePrev() {
        const items = document.querySelectorAll('.item');
        let lastItem = items[items.length - 1]; // Le dernier élément
        box.insertBefore(lastItem, items[0]); // Déplace le dernier élément au début
        updateOpacity(); // Met à jour les opacités après le déplacement
    }

    // Écouteurs d'événements pour les boutons
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

    // Écouteur d'événement pour la molette
    window.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            moveNext();
        } else {
            movePrev();
        }
    });

    // Initialiser les opacités et le titre dès le début
    updateOpacity();

}
