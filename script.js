/* ========================================
   BAQUE DE CHUVA - Ultra Fluid JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    initRevealAnimations();
    initParallax();
    initRainEffect();
    initInstrumentCards();
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
