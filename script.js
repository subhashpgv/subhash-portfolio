document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });

        // Close menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Smooth Scroll for Anchor Links with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();

            if (href === '#home' || href === '#hero') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scrollspy — Active Navigation Item on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    // 4. Scroll Triggered Entrance Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animateObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Targets for scroll animations
    const animTargets = document.querySelectorAll(
        '.glass-card, .timeline-item, .journey-node, .hero-content, .hero-visual, .section-header'
    );

    animTargets.forEach(el => {
        el.classList.add('animate-on-scroll');
        animateObserver.observe(el);
    });

    // 5. Clean Video Player Initializer
    const projectVideo = document.querySelector('.project-video-player');
    if (projectVideo) {
        projectVideo.play().catch(() => {
            // Browser autoplay policy catch block
        });
    }

    // 6. Experience Accordion Toggle Handler
    const expToggleBtns = document.querySelectorAll('.exp-toggle-btn');
    expToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.timeline-content');
            if (card) {
                const accordionContainer = card.querySelector('.resp-accordion-container');
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';

                if (accordionContainer) {
                    if (isExpanded) {
                        accordionContainer.classList.remove('open');
                        btn.classList.remove('open');
                        btn.setAttribute('aria-expanded', 'false');
                        const toggleText = btn.querySelector('.toggle-text');
                        if (toggleText) {
                            toggleText.innerText = toggleText.innerText.replace('Hide', 'View Full');
                        }
                    } else {
                        accordionContainer.classList.add('open');
                        btn.classList.add('open');
                        btn.setAttribute('aria-expanded', 'true');
                        const toggleText = btn.querySelector('.toggle-text');
                        if (toggleText) {
                            toggleText.innerText = toggleText.innerText.replace('View Full', 'Hide');
                        }
                    }
                }
            }
        });
    });

    // 7. Mobile Quick Nav Active Scrollspy
    const qnavItems = document.querySelectorAll('.qnav-item');
    if (qnavItems.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 180)) {
                    current = section.getAttribute('id');
                }
            });

            qnavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }
});
