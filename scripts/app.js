"use strict"
const reprisePage= document.querySelector('.body__reprises')
const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const albumPage = document.querySelector('.body__album');
const ifswiper = document.querySelector('.swiper-container');


//Boutton de ma nav
menuButton.addEventListener("click", () => {
    const isOpen = menuOverlay.classList.toggle("open");
    menuButton.classList.toggle("opened", isOpen);


    const textPath = menuButton.querySelector("textPath");
    textPath.textContent = isOpen ? "Fermer" : "Menu";
});



//Transition de page
window.onload = () => {
    const transition_el = document.querySelector('.transition');
    const anchors = document.querySelectorAll('a');
    setTimeout(() => {
        transition_el.classList.remove('transition__isactive');
    }, 500);

    for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];

        anchor.addEventListener('click', e => {
            // Ignorer les liens avec target="_blank"
            if (anchor.target === "_blank") {
                return;
            }

            e.preventDefault();
            let target = e.currentTarget.href;

            transition_el.classList.add('transition__isactive');
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    }
}


//Animation des liens avec position aware
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
    
        // Ajustement basé sur la largeur de la fenêtre
        const scaleFactor = window.innerWidth / 1920; // 1920 est une référence pour les écrans larges
    
        images.forEach(image => {
            const containerWidth = image.parentElement.offsetWidth;
    
            // Ajustement du pourcentage en fonction du facteur
            const translateX = Math.min(
                Math.max((scrollX / containerWidth) * 10 * scaleFactor, -maxScroll),
                maxScroll
            );
    
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




// album.js

if (albumPage) {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const playButton = document.querySelector('.play');
    const box = document.querySelector('.box');
    const title = document.querySelector('.music__title');
    const artist = document.querySelector('.artist');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const tracks = document.querySelectorAll('.item');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    let currentTrackIndex = 0; // L'index du premier élément est 0

    // Fonction pour vérifier si le fichier audio existe
    function checkAudioFile(url) {
        return fetch(url, { method: 'HEAD' })
            .then(response => response.ok)
            .catch(() => false);
    }

    // Fonction pour changer la musique
    async function playTrack(index) {
        const track = tracks[index];
        const audioUrl = track.getAttribute('data-audio');
        const artistName = track.getAttribute('data-artist');
        const trackTitle = track.textContent.trim();

        // Vérifier si le fichier audio existe
        const fileExists = await checkAudioFile(audioUrl);

        if (fileExists) {
            // Mettre à jour l'élément audio
            audioSource.src = audioUrl;
            audioPlayer.load(); // Recharger le player avec le nouveau fichier audio
            audioPlayer.play();

            // Mettre à jour le titre et l'artiste
            updateTitleAndArtist(trackTitle, artistName);
            // Mettre à jour l'icône du bouton Play en pause
            playButton.style.backgroundImage = "url('assets/images/pause.svg')";
        } else {
            // Si le fichier n'existe pas, afficher un avertissement
            console.warn(`Le fichier audio "${audioUrl}" n'a pas été trouvé.`);
        }
    }

    // Mettre à jour la barre de progression
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration > 0) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progress.style.width = progressPercent + '%';
        }
    });

    // Fonction pour mettre à jour le titre et l'artiste avec animation
    function updateTitleAndArtist(activeTrackTitle, activeArtist) {
        const cleanedTitle = activeTrackTitle.trim();
        const cleanedArtist = activeArtist.trim();

        // Effacer le contenu précédent
        title.innerHTML = '';
        artist.innerHTML = '';

        // Séparer le titre et l'artiste en lettres
        const titleLetters = cleanedTitle.split('');
        const artistLetters = cleanedArtist.split('');

        // Ajouter chaque lettre du titre
        titleLetters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
            title.appendChild(span);
            span.style.animationDelay = `${index * 0.05}s`;
        });

        setTimeout(() => {
            title.classList.add('show');
        }, 100);

        // Ajouter chaque lettre de l'artiste
        artistLetters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
            artist.appendChild(span);
            span.style.animationDelay = `${index * 0.05}s`;
        });

        setTimeout(() => {
            artist.classList.add('show');
        }, 100);
    }

    // Fonction pour mettre à jour les classes d'opacité, de position et le titre
    function updateOpacity() {
        const items = document.querySelectorAll('.item');
        const middleIndex = Math.floor(items.length / 2);

        items.forEach((item, index) => {
            item.classList.remove('item--active', 'item--sibling', 'item--following');

            if (index === middleIndex) {
                item.classList.add('item--active');
                const trackTitle = item.textContent;
                const artistName = item.getAttribute('data-artist');
                updateTitleAndArtist(trackTitle, artistName);
            } else if (index === middleIndex - 1 || index === middleIndex + 1) {
                item.classList.add('item--sibling');
            } else {
                item.classList.add('item--following');
            }
        });
    }

    // Fonction pour avancer à la chanson suivante
    function moveNext() {
        const items = document.querySelectorAll('.item');
        let firstItem = items[0];
        box.appendChild(firstItem);
        updateOpacity();
    }

    // Fonction pour revenir à la chanson précédente
    function movePrev() {
        const items = document.querySelectorAll('.item');
        let lastItem = items[items.length - 1];
        box.insertBefore(lastItem, items[0]);
        updateOpacity();
    }

    // Ajouter les écouteurs d'événements pour les boutons
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

    // Écouteur pour la molette
    window.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            moveNext();
        } else {
            movePrev();
        }
    });

    // Fonction pour mettre en pause ou démarrer la musique
    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            // Mettre l'icône en pause
            playButton.style.backgroundImage = "url('assets/images/pause.svg')";
        } else {
            audioPlayer.pause();
            // Mettre l'icône en play
            playButton.style.backgroundImage = "url('assets/images/play.svg')";
        }
    });

    // Initialiser la page avec le premier titre actif
    updateOpacity(); // Mettre à jour les classes d'opacité
}
