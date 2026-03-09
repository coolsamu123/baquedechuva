/* ========================================
   BAQUE DE CHUVA - Ultra Fluid JavaScript
   ======================================== */

let siteContent = null;

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    initRevealAnimations();
    initParallax();
    initRainEffect();
    initInstrumentCards();
    loadContent();
});

/* ========================================
   Page Loader
   ======================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 800);
    });

    // Fallback: hide loader after 3 seconds regardless
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 3000);
}

/* ========================================
   Rain Effect on Hero
   ======================================== */
function initRainEffect() {
    const container = document.getElementById('rainContainer');
    if (!container) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dropCount = 40;

    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.height = (Math.random() * 30 + 15) + 'px';
        drop.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
        drop.style.animationDelay = (Math.random() * 3) + 's';
        drop.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(drop);
    }
}

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    handleScroll();
}

/* ========================================
   Mobile Navigation
   ======================================== */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            toggleMenu();
        }
    });
}

/* ========================================
   Smooth Scrolling
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            history.pushState(null, null, href);
        });
    });
}

/* ========================================
   Reveal Animations on Scroll
   ======================================== */
function initRevealAnimations() {
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    addRevealToElements('.instrument-card', 100);
    addRevealToElements('.feature', 100);
    addRevealToElements('.parade-option', 100);
    addRevealToElements('.nacao-tag', 50);
    addRevealToElements('.contact-item', 100);
}

function addRevealToElements(selector, staggerDelay) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
            el.dataset.delay = index * staggerDelay;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('active');
                        }, entry.target.dataset.delay || 0);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            observer.observe(el);
        }
    });
}

/* ========================================
   Parallax Effects
   ======================================== */
function initParallax() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    if (parallaxBgs.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;

        parallaxBgs.forEach(bg => {
            const section = bg.parentElement;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrolled + window.innerHeight > sectionTop &&
                scrolled < sectionTop + sectionHeight) {
                const yPos = (scrolled - sectionTop) * 0.3;
                bg.style.transform = `translateY(${yPos}px)`;
            }
        });
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ========================================
   Instrument Cards Interaction
   ======================================== */
function initInstrumentCards() {
    const cards = document.querySelectorAll('.instrument-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const emoji = card.querySelector('.instrument-emoji');
            if (emoji) {
                emoji.style.animation = 'none';
                void emoji.offsetHeight;
                emoji.style.animation = 'instrumentBounce 0.5s ease';
            }
        });
    });
}

// Add bounce animation
const style = document.createElement('style');
style.textContent = `
    @keyframes instrumentBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2) rotate(-5deg); }
    }
`;
document.head.appendChild(style);

/* ========================================
   Loading State
   ======================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

/* ========================================
   Smooth Anchor on Page Load
   ======================================== */
if (window.location.hash) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    });
}

/* ========================================
   Load Content from content.json
   ======================================== */
function loadContent() {
    fetch('content.json?v=' + Date.now())
        .then(res => res.json())
        .then(data => {
            siteContent = data;
            applyImages(data.images);
            applySocial(data.social);
            applyNacoes(data.nacoes);
            applyStats(data.stats);
            applyEstrelaBadge(data.estrela_badge);
            applyGallery(data.images.gallery);
            initLanguageSwitcher(data.translations);
        })
        .catch(() => {
            initLanguageSwitcher(null);
        });
}

function applyImages(images) {
    if (!images) return;
    const map = {
        hero_background: '.hero-bg-img',
        about_photo: '.about-image img',
        maracatu_background: '.parallax-bg img',
        estrela_photo: '.estrela-image img',
        parades_photo: '.parades-image img',
        contact_photo: '.contact-image img'
    };
    for (const [key, selector] of Object.entries(map)) {
        if (images[key]) {
            const el = document.querySelector(selector);
            if (el) el.src = images[key];
        }
    }
}

function applySocial(social) {
    if (!social) return;
    const igLinks = document.querySelectorAll('a[href*="instagram.com"]');
    const fbLinks = document.querySelectorAll('a[href*="facebook.com"]');
    if (social.instagram) igLinks.forEach(a => a.href = social.instagram);
    if (social.facebook) fbLinks.forEach(a => a.href = social.facebook);
}

function applyNacoes(nacoes) {
    if (!nacoes) return;
    const container = document.querySelector('.nacoes-tags');
    if (!container) return;
    container.innerHTML = nacoes.map(n => '<span class="nacao-tag">' + n + '</span>').join('');
}

function applyStats(stats) {
    if (!stats) return;
    const numbers = document.querySelectorAll('.stat-number');
    if (numbers[0] && stats.number1) numbers[0].textContent = stats.number1;
    if (numbers[1] && stats.number2) numbers[1].textContent = stats.number2;
    if (numbers[2] && stats.number3) numbers[2].textContent = stats.number3;
}

function applyEstrelaBadge(text) {
    if (!text) return;
    const badge = document.querySelector('.estrela-badge span');
    if (badge) badge.textContent = text;
}

function applyGallery(galleryImages) {
    if (!galleryImages || galleryImages.length === 0) return;
    const track = document.querySelector('.gallery-track');
    if (!track) return;
    const imgs = galleryImages.map(src => '<img src="' + src + '" alt="" loading="lazy">').join('');
    track.innerHTML = imgs + imgs;
}

/* ========================================
   Language Switcher & Translations
   ======================================== */
const FALLBACK_TRANSLATIONS = {
    en: {
        'nav.about': 'About',
        'nav.maracatu': 'Maracatu',
        'nav.parades': 'Parades',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',
        'hero.subtitle': 'Brussels Maracatu \u2022 Founded in 2016',
        'hero.tagline': 'The Rain Beat of Pernambuco in the Heart of Europe',
        'hero.discover': 'Discover',
        'hero.join': 'Join Us',
        'hero.scroll': 'Scroll',
        'about.tag': 'Who We Are',
        'about.title': 'Born in Brussels,<br>Rooted in Recife',
        'about.lead': 'A Brazilian fanfare bringing the power of maracatu to Europe since 2016.',
        'about.text1': 'Baque de Chuva is a Brussels-based percussion collective made up of residents from diverse musical traditions and origins. United by a shared passion for the ancestral rhythms of Pernambuco, we reappropriate traditional <strong>Maracatu de Baque Virado</strong> \u2014 a festive, powerful, and deeply danceable music that accompanies popular carnivals in northeastern Brazil.',
        'about.text2': 'Our name, <em>\u201CBaque de Chuva\u201D</em> (the Rain Beat), evokes the thunderous power of our drums echoing like tropical rain \u2014 unstoppable, cleansing, and full of life.',
        'about.founded': 'Founded',
        'about.members': 'Members',
        'about.homebase': 'Home Base',
        'maracatu.tag': 'Tradition',
        'maracatu.lead': 'An Afro-Brazilian tradition of strength and resistance born in Pernambuco',
        'maracatu.text1': 'Maracatu Na\u00e7\u00e3o is a musical rhythm, dance, and ritual that originated in Recife, Pernambuco. Rooted in the coronation ceremonies of the <em>Reis do Congo</em> (Kings of Congo) \u2014 enslaved Africans who were granted symbolic leadership \u2014 maracatu carries centuries of resistance, spirituality, and cultural identity.',
        'maracatu.text2': 'With its hypnotic percussion and royal processions, maracatu transforms streets into sacred spaces during Carnival, when the Na\u00e7\u00f5es (nations) parade through Recife and Olinda.',
        'maracatu.nacao_title': 'Na\u00e7\u00e3o',
        'maracatu.nacao_desc': 'Traditional maracatu group, organized as a \u201Cnation\u201D with its own identity, songs, and spiritual foundation',
        'maracatu.carnival_title': 'Carnival',
        'maracatu.carnival_desc': 'The sacred moment when nations parade through the streets of Recife in royal processions',
        'maracatu.resistance_title': 'Resistance',
        'maracatu.resistance_desc': 'An expression of Black culture and Afro-Brazilian identity, fundamental to Pernambuco\u2019s heritage',
        'maracatu.legendary': 'Legendary Na\u00e7\u00f5es',
        'estrela.tag': 'Our Connection',
        'estrela.lead': 'Trov\u00e3o Azul \u2014 The Blue Thunder',
        'estrela.text1': 'Baque de Chuva maintains a deep connection to <strong>Maracatu Na\u00e7\u00e3o Estrela Brilhante do Recife</strong>, one of the most legendary and traditional maracatu nations, founded in <strong>1906</strong>. Known as <em>Trov\u00e3o Azul</em> (Blue Thunder), this Na\u00e7\u00e3o is a cornerstone of Pernambuco\u2019s cultural identity.',
        'estrela.text2': 'Through regular exchanges, workshops, and pilgrimages to Recife, we stay connected to the living source of maracatu. This relationship shapes our musical identity and deepens our respect for the tradition we carry across the Atlantic.',
        'parades.tag': 'Events',
        'parades.title': 'Parades &amp; Performances',
        'parades.lead': 'Maracatu: music made to move through the streets',
        'parades.text': 'Explosive and captivating, maracatu transforms every parade into an unforgettable experience. The percussive energy of the group sweeps everything in its path, filling public spaces with the ancestral power of Pernambuco.',
        'parades.street_title': 'Street Parades',
        'parades.street_desc': 'Full cort\u00e8ge with drums, dancers in traditional costumes, and the iconic royal court procession.',
        'parades.festival_title': 'Festival Performances',
        'parades.festival_desc': 'High-energy stage and street performances for festivals, carnivals, and cultural events across Belgium and Europe.',
        'parades.workshop_title': 'Workshops',
        'parades.workshop_desc': 'Interactive percussion workshops introducing participants to the rhythms and instruments of maracatu.',
        'parades.book': 'Book Us',
        'gallery.tag': 'Moments',
        'gallery.title': 'Gallery',
        'gallery.subtitle': 'Capturing the energy and joy of Baque de Chuva',
        'contact.tag': 'Join Us',
        'contact.title': 'Become Part of the Rain',
        'contact.intro': 'Whether you\u2019re an experienced percussionist or a complete beginner, Baque de Chuva welcomes everyone who feels the call of the drum.',
        'contact.location': 'Location',
        'contact.location_city': 'Brussels, Belgium',
        'contact.location_sub': 'Rehearsals in the heart of the city',
        'contact.rehearsals': 'Rehearsals',
        'contact.rehearsals_freq': 'Weekly sessions',
        'contact.rehearsals_sub': 'All levels welcome \u2014 no experience needed',
        'contact.community': 'Community',
        'contact.community_sub': 'A vibrant multicultural collective',
        'footer.tagline': 'Brussels Maracatu \u2022 Founded 2016 \u2022 ASBL KWA!'
    },
    fr: {
        'nav.about': '\u00C0 propos',
        'nav.maracatu': 'Maracatu',
        'nav.parades': 'Cort\u00e8ges',
        'nav.gallery': 'Galerie',
        'nav.contact': 'Contact',
        'hero.subtitle': 'Maracatu de Bruxelles \u2022 Fond\u00e9 en 2016',
        'hero.tagline': 'Le Rythme de la Pluie du Pernambouc au C\u0153ur de l\u2019Europe',
        'hero.discover': 'D\u00e9couvrir',
        'hero.join': 'Rejoignez-nous',
        'hero.scroll': 'D\u00e9filer',
        'about.tag': 'Qui sommes-nous',
        'about.title': 'N\u00e9s \u00e0 Bruxelles,<br>Enracin\u00e9s \u00e0 Recife',
        'about.lead': 'Une fanfare br\u00e9silienne qui apporte la puissance du maracatu en Europe depuis 2016.',
        'about.text1': 'Baque de Chuva est un collectif de percussion bas\u00e9 \u00e0 Bruxelles, compos\u00e9 de r\u00e9sidents issus de traditions musicales et d\u2019origines diverses. Unis par une passion commune pour les rythmes ancestraux du Pernambouc, nous nous r\u00e9approprions le <strong>Maracatu de Baque Virado</strong> traditionnel \u2014 une musique festive, puissante et profond\u00e9ment dan\u00e7ante qui accompagne les carnavals populaires du nord-est du Br\u00e9sil.',
        'about.text2': 'Notre nom, <em>\u00ABBaque de Chuva\u00BB</em> (le Rythme de la Pluie), \u00e9voque la puissance tonitruante de nos tambours r\u00e9sonnant comme une pluie tropicale \u2014 imparable, purificatrice et pleine de vie.',
        'about.founded': 'Fondation',
        'about.members': 'Membres',
        'about.homebase': 'Si\u00e8ge',
        'maracatu.tag': 'Tradition',
        'maracatu.lead': 'Une tradition afro-br\u00e9silienne de force et de r\u00e9sistance n\u00e9e au Pernambouc',
        'maracatu.text1': 'Le Maracatu Na\u00e7\u00e3o est un rythme musical, une danse et un rituel n\u00e9s \u00e0 Recife, au Pernambouc. Enracin\u00e9 dans les c\u00e9r\u00e9monies de couronnement des <em>Reis do Congo</em> (Rois du Congo) \u2014 des Africains r\u00e9duits en esclavage \u00e0 qui l\u2019on accordait un leadership symbolique \u2014 le maracatu porte des si\u00e8cles de r\u00e9sistance, de spiritualit\u00e9 et d\u2019identit\u00e9 culturelle.',
        'maracatu.text2': 'Avec ses percussions hypnotiques et ses processions royales, le maracatu transforme les rues en espaces sacr\u00e9s pendant le Carnaval, lorsque les Na\u00e7\u00f5es (nations) d\u00e9filent dans Recife et Olinda.',
        'maracatu.nacao_title': 'Na\u00e7\u00e3o',
        'maracatu.nacao_desc': 'Groupe traditionnel de maracatu, organis\u00e9 en \u00ABnation\u00BB avec sa propre identit\u00e9, ses chants et sa fondation spirituelle',
        'maracatu.carnival_title': 'Carnaval',
        'maracatu.carnival_desc': 'Le moment sacr\u00e9 o\u00f9 les nations d\u00e9filent dans les rues de Recife en processions royales',
        'maracatu.resistance_title': 'R\u00e9sistance',
        'maracatu.resistance_desc': 'Une expression de la culture noire et de l\u2019identit\u00e9 afro-br\u00e9silienne, fondamentale pour le patrimoine du Pernambouc',
        'maracatu.legendary': 'Na\u00e7\u00f5es L\u00e9gendaires',
        'estrela.tag': 'Notre Lien',
        'estrela.lead': 'Trov\u00e3o Azul \u2014 Le Tonnerre Bleu',
        'estrela.text1': 'Baque de Chuva entretient un lien profond avec le <strong>Maracatu Na\u00e7\u00e3o Estrela Brilhante do Recife</strong>, l\u2019une des nations de maracatu les plus l\u00e9gendaires et traditionnelles, fond\u00e9e en <strong>1906</strong>. Connu sous le nom de <em>Trov\u00e3o Azul</em> (Tonnerre Bleu), cette Na\u00e7\u00e3o est un pilier de l\u2019identit\u00e9 culturelle du Pernambouc.',
        'estrela.text2': 'Gr\u00e2ce \u00e0 des \u00e9changes r\u00e9guliers, des ateliers et des p\u00e8lerinages \u00e0 Recife, nous restons connect\u00e9s \u00e0 la source vivante du maracatu. Cette relation fa\u00e7onne notre identit\u00e9 musicale et approfondit notre respect pour la tradition que nous portons de l\u2019autre c\u00f4t\u00e9 de l\u2019Atlantique.',
        'parades.tag': '\u00c9v\u00e9nements',
        'parades.title': 'Cort\u00e8ges &amp; Spectacles',
        'parades.lead': 'Maracatu : une musique faite pour envahir les rues',
        'parades.text': 'Explosif et captivant, le maracatu transforme chaque cort\u00e8ge en une exp\u00e9rience inoubliable. L\u2019\u00e9nergie percussive du groupe emporte tout sur son passage, remplissant les espaces publics de la puissance ancestrale du Pernambouc.',
        'parades.street_title': 'Cort\u00e8ges de rue',
        'parades.street_desc': 'Cort\u00e8ge complet avec tambours, danseurs en costumes traditionnels et l\u2019embl\u00e9matique procession de la cour royale.',
        'parades.festival_title': 'Spectacles de festival',
        'parades.festival_desc': 'Spectacles \u00e9nergiques sur sc\u00e8ne et dans la rue pour les festivals, carnavals et \u00e9v\u00e9nements culturels en Belgique et en Europe.',
        'parades.workshop_title': 'Ateliers',
        'parades.workshop_desc': 'Ateliers de percussion interactifs initiant les participants aux rythmes et instruments du maracatu.',
        'parades.book': 'R\u00e9servez-nous',
        'gallery.tag': 'Moments',
        'gallery.title': 'Galerie',
        'gallery.subtitle': 'Capturer l\u2019\u00e9nergie et la joie de Baque de Chuva',
        'contact.tag': 'Rejoignez-nous',
        'contact.title': 'Faites partie de la Pluie',
        'contact.intro': 'Que vous soyez percussionniste exp\u00e9riment\u00e9 ou d\u00e9butant complet, Baque de Chuva accueille tous ceux qui ressentent l\u2019appel du tambour.',
        'contact.location': 'Lieu',
        'contact.location_city': 'Bruxelles, Belgique',
        'contact.location_sub': 'R\u00e9p\u00e9titions au c\u0153ur de la ville',
        'contact.rehearsals': 'R\u00e9p\u00e9titions',
        'contact.rehearsals_freq': 'Sessions hebdomadaires',
        'contact.rehearsals_sub': 'Tous niveaux bienvenus \u2014 aucune exp\u00e9rience requise',
        'contact.community': 'Communaut\u00e9',
        'contact.community_sub': 'Un collectif multiculturel dynamique',
        'footer.tagline': 'Maracatu de Bruxelles \u2022 Fond\u00e9 en 2016 \u2022 ASBL KWA!'
    },
    pt: {
        'nav.about': 'Sobre',
        'nav.maracatu': 'Maracatu',
        'nav.parades': 'Cortejos',
        'nav.gallery': 'Galeria',
        'nav.contact': 'Contato',
        'hero.subtitle': 'Maracatu de Bruxelas \u2022 Fundado em 2016',
        'hero.tagline': 'O Baque da Chuva de Pernambuco no Cora\u00e7\u00e3o da Europa',
        'hero.discover': 'Descubra',
        'hero.join': 'Junte-se a n\u00f3s',
        'hero.scroll': 'Rolar',
        'about.tag': 'Quem somos',
        'about.title': 'Nascidos em Bruxelas,<br>Enraizados no Recife',
        'about.lead': 'Uma fanfarra brasileira trazendo a for\u00e7a do maracatu para a Europa desde 2016.',
        'about.text1': 'Baque de Chuva \u00e9 um coletivo de percuss\u00e3o baseado em Bruxelas, formado por residentes de diversas tradi\u00e7\u00f5es musicais e origens. Unidos pela paix\u00e3o compartilhada pelos ritmos ancestrais de Pernambuco, nos reapropriamos do <strong>Maracatu de Baque Virado</strong> tradicional \u2014 uma m\u00fasica festiva, poderosa e profundamente dan\u00e7ante que acompanha os carnavais populares do nordeste do Brasil.',
        'about.text2': 'Nosso nome, <em>\u201CBaque de Chuva\u201D</em>, evoca a for\u00e7a estrondosa dos nossos tambores ecoando como chuva tropical \u2014 impar\u00e1vel, purificadora e cheia de vida.',
        'about.founded': 'Funda\u00e7\u00e3o',
        'about.members': 'Membros',
        'about.homebase': 'Sede',
        'maracatu.tag': 'Tradi\u00e7\u00e3o',
        'maracatu.lead': 'Uma tradi\u00e7\u00e3o afro-brasileira de for\u00e7a e resist\u00eancia nascida em Pernambuco',
        'maracatu.text1': 'Maracatu Na\u00e7\u00e3o \u00e9 um ritmo musical, dan\u00e7a e ritual que se originou no Recife, Pernambuco. Enraizado nas cerim\u00f4nias de coroa\u00e7\u00e3o dos <em>Reis do Congo</em> \u2014 africanos escravizados a quem era concedida lideran\u00e7a simb\u00f3lica \u2014 o maracatu carrega s\u00e9culos de resist\u00eancia, espiritualidade e identidade cultural.',
        'maracatu.text2': 'Com sua percuss\u00e3o hipn\u00f3tica e prociss\u00f5es reais, o maracatu transforma as ruas em espa\u00e7os sagrados durante o Carnaval, quando as Na\u00e7\u00f5es desfilam pelo Recife e Olinda.',
        'maracatu.nacao_title': 'Na\u00e7\u00e3o',
        'maracatu.nacao_desc': 'Grupo tradicional de maracatu, organizado como uma \u201Cna\u00e7\u00e3o\u201D com sua pr\u00f3pria identidade, cantos e funda\u00e7\u00e3o espiritual',
        'maracatu.carnival_title': 'Carnaval',
        'maracatu.carnival_desc': 'O momento sagrado em que as na\u00e7\u00f5es desfilam pelas ruas do Recife em prociss\u00f5es reais',
        'maracatu.resistance_title': 'Resist\u00eancia',
        'maracatu.resistance_desc': 'Uma express\u00e3o da cultura negra e da identidade afro-brasileira, fundamental para o patrim\u00f4nio de Pernambuco',
        'maracatu.legendary': 'Na\u00e7\u00f5es Lend\u00e1rias',
        'estrela.tag': 'Nossa Conex\u00e3o',
        'estrela.lead': 'Trov\u00e3o Azul',
        'estrela.text1': 'Baque de Chuva mant\u00e9m uma conex\u00e3o profunda com o <strong>Maracatu Na\u00e7\u00e3o Estrela Brilhante do Recife</strong>, uma das na\u00e7\u00f5es de maracatu mais lend\u00e1rias e tradicionais, fundada em <strong>1906</strong>. Conhecida como <em>Trov\u00e3o Azul</em>, esta Na\u00e7\u00e3o \u00e9 um pilar da identidade cultural de Pernambuco.',
        'estrela.text2': 'Atrav\u00e9s de interc\u00e2mbios regulares, oficinas e peregrina\u00e7\u00f5es ao Recife, permanecemos conectados \u00e0 fonte viva do maracatu. Essa rela\u00e7\u00e3o molda nossa identidade musical e aprofunda nosso respeito pela tradi\u00e7\u00e3o que carregamos atrav\u00e9s do Atl\u00e2ntico.',
        'parades.tag': 'Eventos',
        'parades.title': 'Cortejos &amp; Apresenta\u00e7\u00f5es',
        'parades.lead': 'Maracatu: m\u00fasica feita para tomar as ruas',
        'parades.text': 'Explosivo e cativante, o maracatu transforma cada cortejo em uma experi\u00eancia inesquec\u00edvel. A energia percussiva do grupo arrasta tudo em seu caminho, preenchendo os espa\u00e7os p\u00fablicos com a for\u00e7a ancestral de Pernambuco.',
        'parades.street_title': 'Cortejos de Rua',
        'parades.street_desc': 'Cortejo completo com tambores, dan\u00e7arinos em trajes tradicionais e a ic\u00f4nica prociss\u00e3o da corte real.',
        'parades.festival_title': 'Apresenta\u00e7\u00f5es em Festivais',
        'parades.festival_desc': 'Apresenta\u00e7\u00f5es en\u00e9rgicas no palco e na rua para festivais, carnavais e eventos culturais na B\u00e9lgica e Europa.',
        'parades.workshop_title': 'Oficinas',
        'parades.workshop_desc': 'Oficinas interativas de percuss\u00e3o apresentando aos participantes os ritmos e instrumentos do maracatu.',
        'parades.book': 'Contrate-nos',
        'gallery.tag': 'Momentos',
        'gallery.title': 'Galeria',
        'gallery.subtitle': 'Capturando a energia e a alegria do Baque de Chuva',
        'contact.tag': 'Junte-se a n\u00f3s',
        'contact.title': 'Fa\u00e7a parte da Chuva',
        'contact.intro': 'Seja voc\u00ea um percussionista experiente ou um iniciante completo, o Baque de Chuva recebe todos que sentem o chamado do tambor.',
        'contact.location': 'Localiza\u00e7\u00e3o',
        'contact.location_city': 'Bruxelas, B\u00e9lgica',
        'contact.location_sub': 'Ensaios no cora\u00e7\u00e3o da cidade',
        'contact.rehearsals': 'Ensaios',
        'contact.rehearsals_freq': 'Sess\u00f5es semanais',
        'contact.rehearsals_sub': 'Todos os n\u00edveis s\u00e3o bem-vindos \u2014 nenhuma experi\u00eancia necess\u00e1ria',
        'contact.community': 'Comunidade',
        'contact.community_sub': 'Um coletivo multicultural vibrante',
        'footer.tagline': 'Maracatu de Bruxelas \u2022 Fundado em 2016 \u2022 ASBL KWA!'
    }
};

function initLanguageSwitcher(externalTranslations) {
    const translations = externalTranslations || FALLBACK_TRANSLATIONS;
    const buttons = document.querySelectorAll('.lang-btn');
    const saved = localStorage.getItem('bdc-lang') || 'en';

    setLanguage(saved, translations);

    buttons.forEach(btn => {
        if (btn.dataset.lang === saved) {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setLanguage(lang, translations);
            localStorage.setItem('bdc-lang', lang);
        });
    });
}

function setLanguage(lang, translations) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });
}
