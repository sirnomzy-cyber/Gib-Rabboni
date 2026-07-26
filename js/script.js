/* ====================================================================
   GIB RABBONI LIMITED — SITE JAVASCRIPT
   js/script.js
   Vanilla ES6+. No frameworks or external dependencies.

   MODULES
   1.  Configuration
   2.  Utilities
   3.  DOM Cache
   4.  Navigation (sticky header, mobile menu, active link)
   5.  Smooth Scrolling
   6.  Scroll Reveal (Intersection Observer)
   7.  Statistics Counters
   8.  Project / Gallery Filtering
   9.  Lightbox
   10. Testimonial Slider
   11. FAQ Accordion
   12. Contact Form + WhatsApp Integration
   13. Back-to-Top Button
   14. Scroll Progress Indicator
   15. Footer Year
   16. Initialization
   ==================================================================== */

(function () {
    'use strict';

    /* ================================================================
       1. CONFIGURATION
       ================================================================ */
    const CONFIG = {
        whatsappNumber: '234XXXXXXXXXX', // digits only, no + or spaces
        headerScrollThreshold: 60,
        backToTopThreshold: 480,
        revealMargin: '0px 0px -80px 0px',
        testimonialAutoplayMs: 6000,
        counterDurationMs: 1600
    };

    /* ================================================================
       2. UTILITIES
       ================================================================ */
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    function debounce(fn, wait = 150) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), wait);
        };
    }

    function throttle(fn, wait = 100) {
        let last = 0;
        let scheduled = false;
        return (...args) => {
            const now = Date.now();
            if (now - last >= wait) {
                last = now;
                fn(...args);
            } else if (!scheduled) {
                scheduled = true;
                setTimeout(() => {
                    scheduled = false;
                    last = Date.now();
                    fn(...args);
                }, wait - (now - last));
            }
        };
    }

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function safeInit(name, fn) {
        try {
            fn();
        } catch (err) {
            console.error(`[script.js] Module "${name}" failed to initialize:`, err);
        }
    }

    /* ================================================================
       3. DOM CACHE (populated on init; guarded per-module)
       ================================================================ */
    const dom = {};

    /* ================================================================
       4. NAVIGATION
       ================================================================ */
    /* ================================================================
       3b. HERO IMAGE SLIDESHOW
       ================================================================ */
    function initHeroSlideshow() {
        const images = $$('.hero__bg-image');
        if (images.length < 2) return;
        if (prefersReducedMotion()) return;

        let current = images.findIndex((img) => img.classList.contains('is-active'));
        if (current === -1) current = 0;

        setInterval(() => {
            images[current].classList.remove('is-active');
            current = (current + 1) % images.length;
            images[current].classList.add('is-active');
        }, 5000);
    }

    function initNavigation() {
        dom.header = $('#site-header');
        dom.hamburger = $('#hamburger-btn');
        dom.mobileMenu = $('#mobile-menu');

        // Sticky / glass header on scroll
        if (dom.header) {
            const onScroll = throttle(() => {
                if (window.scrollY > CONFIG.headerScrollThreshold) {
                    dom.header.classList.add('is-scrolled');
                } else {
                    dom.header.classList.remove('is-scrolled');
                }
            }, 50);
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        // Mobile menu open/close
        if (dom.hamburger && dom.mobileMenu) {
            let lastFocused = null;

            const openMenu = () => {
                lastFocused = document.activeElement;
                dom.mobileMenu.hidden = false;
                requestAnimationFrame(() => dom.mobileMenu.classList.add('is-open'));
                dom.hamburger.setAttribute('aria-expanded', 'true');
                dom.hamburger.setAttribute('aria-label', 'Close menu');
                document.body.style.overflow = 'hidden';
                const firstLink = $('a', dom.mobileMenu);
                if (firstLink) firstLink.focus();
            };

            const closeMenu = () => {
                dom.mobileMenu.classList.remove('is-open');
                dom.hamburger.setAttribute('aria-expanded', 'false');
                dom.hamburger.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
                setTimeout(() => { dom.mobileMenu.hidden = true; }, 320);
                if (lastFocused) lastFocused.focus();
            };

            dom.hamburger.addEventListener('click', () => {
                const isOpen = dom.hamburger.getAttribute('aria-expanded') === 'true';
                isOpen ? closeMenu() : openMenu();
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                const isOpen = dom.hamburger.getAttribute('aria-expanded') === 'true';
                if (isOpen && !dom.mobileMenu.contains(e.target) && !dom.hamburger.contains(e.target)) {
                    closeMenu();
                }
            });

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && dom.hamburger.getAttribute('aria-expanded') === 'true') {
                    closeMenu();
                }
            });

            // Close when a nav link is tapped
            $$('.mobile-menu__link', dom.mobileMenu).forEach((link) => {
                link.addEventListener('click', closeMenu);
            });
        }

        initActiveNav();
    }

    function initActiveNav() {
        // Highlight active section on long pages (e.g. Services) as user scrolls
        const sections = $$('main section[id]');
        const navLinks = $$('.main-nav__link, .mobile-menu__link');
        if (!sections.length || !navLinks.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach((link) => {
                            const href = link.getAttribute('href') || '';
                            if (href.includes(`#${id}`)) {
                                link.classList.add('is-active');
                            }
                        });
                    }
                });
            },
            { rootMargin: '-40% 0px -50% 0px' }
        );

        sections.forEach((section) => observer.observe(section));
    }

    /* ================================================================
       5. SMOOTH SCROLLING
       ================================================================ */
    function initSmoothScroll() {
        const headerHeight = () => (dom.header ? dom.header.offsetHeight : 0);

        $$('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').slice(1);
                if (!targetId) return;
                const target = document.getElementById(targetId);
                if (!target) return;

                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() - 16;
                window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
            });
        });
    }

    /* ================================================================
       6. SCROLL REVEAL
       ================================================================ */
    function initScrollReveal() {
        // Two-column "split" layouts: first element flies in from the left,
        // second flies in from the right (image+text pairs, Mission/Vision, etc.)
        const splitContainers = $$(
            '.service-block__grid, .company-story__grid, .company-philosophy__grid, .contact-main__grid, .mvv-top, .contact-info__primary'
        );
        splitContainers.forEach((grid) => {
            const children = Array.from(grid.children);
            if (children.length === 2) {
                children[0].setAttribute('data-animate', 'fade-left');
                children[1].setAttribute('data-animate', 'fade-right');
            }
        });

        // Multi-item card / gallery grids: alternate left/right per item for a
        // zig-zag entrance, indexed per-grid so each row starts clean.
        const gridContainers = $$('.card-grid, .masonry-grid');
        gridContainers.forEach((grid) => {
            const items = Array.from(grid.children).filter((el) =>
                el.matches('.card:not(.testimonial-card), .gallery-item')
            );
            items.forEach((el, i) => {
                el.setAttribute('data-animate', i % 2 === 0 ? 'fade-left' : 'fade-right');
            });
        });

        // Prominent standalone buttons: pop/zoom in rather than fly sideways
        $$('.hero__actions .btn, .cta-band__actions .btn, .enquiry-form button[type="submit"]').forEach((btn) => {
            btn.setAttribute('data-animate', 'zoom');
        });

        const targets = $$(
            '.card:not(.testimonial-card), .gallery-item, ' +
            '.service-block__grid > *, .company-story__grid > *, .company-philosophy__grid > *, ' +
            '.contact-main__grid > *, .mvv-top > *, .contact-info__primary > *, ' +
            '.hero__actions .btn, .cta-band__actions .btn, .enquiry-form button[type="submit"], [data-animate]'
        );
        if (!targets.length) return;

        const seen = new Set();
        const uniqueTargets = targets.filter((el) => {
            if (seen.has(el)) return false;
            seen.add(el);
            return true;
        });

        uniqueTargets.forEach((el, i) => {
            if (!el.hasAttribute('data-animate')) {
                el.setAttribute('data-animate', 'fade-up');
            }
            el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
        });

        if (prefersReducedMotion()) {
            uniqueTargets.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: CONFIG.revealMargin }
        );

        uniqueTargets.forEach((el) => observer.observe(el));
    }

    /* ================================================================
       7. STATISTICS COUNTERS
       ================================================================ */
    function initCounters() {
        const stats = $$('.stat[data-count]');
        if (!stats.length) return;

        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-count'), 10) || 0;
            const numberEl = $('.stat__number', el);
            if (!numberEl) return;

            if (prefersReducedMotion()) {
                numberEl.textContent = target;
                return;
            }

            const start = performance.now();
            const duration = CONFIG.counterDurationMs;

            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
                numberEl.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    numberEl.textContent = target;
                }
            }
            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        stats.forEach((stat) => observer.observe(stat));
    }

    /* ================================================================
       8. PROJECT / GALLERY FILTERING
       ================================================================ */
    function initFiltering() {
        const filterBars = $$('.filter-bar');
        if (!filterBars.length) return;

        filterBars.forEach((bar) => {
            const grid = bar.closest('section').nextElementSibling
                ? $('#projects-grid') || $('#gallery-grid')
                : null;
            const targetGrid = $('#projects-grid') || $('#gallery-grid');
            const emptyState = $('#projects-empty-state') || $('#gallery-empty-state');
            if (!targetGrid) return;

            const items = $$('[data-category]', targetGrid);

            bar.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-bar__btn');
                if (!btn) return;

                $$('.filter-bar__btn', bar).forEach((b) => {
                    b.classList.remove('is-active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('is-active');
                btn.setAttribute('aria-pressed', 'true');

                const filter = btn.getAttribute('data-filter');
                let visibleCount = 0;

                items.forEach((item) => {
                    const matches = filter === 'all' || item.getAttribute('data-category') === filter;
                    item.style.display = matches ? '' : 'none';
                    if (matches) visibleCount++;
                });

                if (emptyState) {
                    emptyState.hidden = visibleCount !== 0;
                }
            });
        });
    }

    /* ================================================================
       9. LIGHTBOX
       ================================================================ */
    function initLightbox() {
        const lightbox = $('#lightbox');
        if (!lightbox) return;

        const links = $$('[data-lightbox="gallery"]');
        if (!links.length) return;

        const imgEl = $('#lightbox-image', lightbox);
        const captionEl = $('#lightbox-caption', lightbox);
        const closeBtn = $('#lightbox-close', lightbox);
        const prevBtn = $('#lightbox-prev', lightbox);
        const nextBtn = $('#lightbox-next', lightbox);

        let currentIndex = 0;
        let lastFocused = null;

        function getVisibleLinks() {
            return links.filter((link) => {
                const item = link.closest('[data-category]');
                return !item || item.style.display !== 'none';
            });
        }

        function preload(src) {
            const img = new Image();
            img.src = src;
        }

        function openLightbox(index) {
            const visible = getVisibleLinks();
            if (!visible.length) return;
            currentIndex = index;
            lastFocused = document.activeElement;

            const link = visible[currentIndex];
            imgEl.src = link.getAttribute('href');
            imgEl.alt = link.getAttribute('data-caption') || '';
            captionEl.textContent = link.getAttribute('data-caption') || '';

            lightbox.hidden = false;
            document.body.style.overflow = 'hidden';
            closeBtn.focus();

            // Preload neighbors
            const nextLink = visible[(currentIndex + 1) % visible.length];
            const prevLink = visible[(currentIndex - 1 + visible.length) % visible.length];
            if (nextLink) preload(nextLink.getAttribute('href'));
            if (prevLink) preload(prevLink.getAttribute('href'));
        }

        function closeLightbox() {
            lightbox.hidden = true;
            document.body.style.overflow = '';
            if (lastFocused) lastFocused.focus();
        }

        function showRelative(delta) {
            const visible = getVisibleLinks();
            if (!visible.length) return;
            currentIndex = (currentIndex + delta + visible.length) % visible.length;
            const link = visible[currentIndex];
            imgEl.src = link.getAttribute('href');
            imgEl.alt = link.getAttribute('data-caption') || '';
            captionEl.textContent = link.getAttribute('data-caption') || '';
        }

        links.forEach((link, i) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(getVisibleLinks().indexOf(link));
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', () => showRelative(-1));
        nextBtn.addEventListener('click', () => showRelative(1));

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.hidden) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showRelative(-1);
            if (e.key === 'ArrowRight') showRelative(1);
        });

        // Basic swipe support
        let touchStartX = 0;
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        lightbox.addEventListener('touchend', (e) => {
            const delta = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(delta) > 50) showRelative(delta > 0 ? -1 : 1);
        }, { passive: true });
    }

    /* ================================================================
       10. TESTIMONIAL SLIDER
       ================================================================ */
    function initTestimonialSlider() {
        const slider = $('[data-component="testimonial-slider"]');
        if (!slider) return;

        const track = $('.testimonial-slider__track', slider);
        const slides = $$('.testimonial-slider__slide', slider);
        const prevBtn = $('.testimonial-slider__prev', slider);
        const nextBtn = $('.testimonial-slider__next', slider);
        const dotsContainer = $('.testimonial-slider__dots', slider);
        if (!track || !slides.length) return;

        let currentSlide = 0;
        let autoplayTimer = null;

        // Build pagination dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
            if (i === 0) dot.classList.add('is-active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });
        const dots = $$('button', dotsContainer);

        function goTo(index) {
            currentSlide = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('is-active', i === currentSlide));
        }

        function next() { goTo(currentSlide + 1); }
        function prev() { goTo(currentSlide - 1); }

        if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });

        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { next(); restartAutoplay(); }
            if (e.key === 'ArrowLeft') { prev(); restartAutoplay(); }
        });

        // Swipe support
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        track.addEventListener('touchend', (e) => {
            const delta = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(delta) > 50) {
                delta > 0 ? prev() : next();
                restartAutoplay();
            }
        }, { passive: true });

        function startAutoplay() {
            if (prefersReducedMotion() || slides.length < 2) return;
            autoplayTimer = setInterval(next, CONFIG.testimonialAutoplayMs);
        }
        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }
        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }

    /* ================================================================
       11. FAQ ACCORDION
       ================================================================ */
    function initAccordions() {
        const accordions = $$('.accordion');
        if (!accordions.length) return;

        accordions.forEach((accordion) => {
            const triggers = $$('.accordion__trigger', accordion);

            triggers.forEach((trigger) => {
                trigger.addEventListener('click', () => {
                    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
                    const panel = document.getElementById(trigger.getAttribute('aria-controls'));

                    // Close all other panels in this accordion (one open at a time)
                    triggers.forEach((t) => {
                        if (t !== trigger) {
                            t.setAttribute('aria-expanded', 'false');
                            const p = document.getElementById(t.getAttribute('aria-controls'));
                            if (p) p.hidden = true;
                        }
                    });

                    trigger.setAttribute('aria-expanded', String(!isOpen));
                    if (panel) panel.hidden = isOpen;
                });
            });
        });
    }

    /* ================================================================
       12. CONTACT FORM + WHATSAPP INTEGRATION
       ================================================================ */
    function initContactForm() {
        const form = $('#enquiry-form');
        if (!form) return;

        const feedback = $('#form-feedback', form);
        let isSubmitting = false;

        function setFieldError(field, message) {
            field.setAttribute('aria-invalid', 'true');
            let errorEl = field.parentElement.querySelector('.field-error');
            if (!errorEl) {
                errorEl = document.createElement('p');
                errorEl.className = 'field-error';
                errorEl.style.color = 'var(--color-warning)';
                errorEl.style.fontSize = '0.8125rem';
                errorEl.style.marginTop = '0.35rem';
                field.parentElement.appendChild(errorEl);
            }
            errorEl.textContent = message;
        }

        function clearFieldError(field) {
            field.removeAttribute('aria-invalid');
            const errorEl = field.parentElement.querySelector('.field-error');
            if (errorEl) errorEl.remove();
        }

        function validateEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        function validatePhone(value) {
            return /^[0-9+()\s-]{7,20}$/.test(value);
        }

        function validateForm() {
            let isValid = true;
            const requiredFields = $$('[required]', form);

            requiredFields.forEach((field) => {
                clearFieldError(field);

                if (field.type === 'checkbox' && !field.checked) {
                    setFieldError(field, 'Please confirm you agree to be contacted.');
                    isValid = false;
                    return;
                }

                if (field.type !== 'checkbox' && !field.value.trim()) {
                    setFieldError(field, 'This field is required.');
                    isValid = false;
                    return;
                }

                if (field.type === 'email' && field.value && !validateEmail(field.value)) {
                    setFieldError(field, 'Please enter a valid email address.');
                    isValid = false;
                    return;
                }

                if (field.type === 'tel' && field.value && !validatePhone(field.value)) {
                    setFieldError(field, 'Please enter a valid phone number.');
                    isValid = false;
                    return;
                }

                if (field.tagName === 'TEXTAREA' && field.value.trim().length < 10) {
                    setFieldError(field, 'Please provide a little more detail (at least 10 characters).');
                    isValid = false;
                }
            });

            return isValid;
        }

        function buildWhatsAppMessage(data) {
            const lines = [
                `Hello Gib Rabboni Limited,`,
                ``,
                `I would like to request a quotation for ${data.serviceRequired || 'your services'}.`,
                ``,
                `Name: ${data.fullName || '-'}`,
                data.company ? `Company: ${data.company}` : null,
                `Phone: ${data.phone || '-'}`,
                `Email: ${data.email || '-'}`,
                `Project Location: ${data.projectLocation || '-'}`,
                data.budgetRange ? `Budget Range: ${data.budgetRange}` : null,
                ``,
                `Message: ${data.message || '-'}`
            ].filter(Boolean);
            return lines.join('\n');
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (isSubmitting) return;

            if (!validateForm()) {
                feedback.textContent = 'Please correct the highlighted fields before submitting.';
                feedback.className = 'form-feedback is-error';
                return;
            }

            isSubmitting = true;
            const submitBtn = $('button[type="submit"]', form);
            if (submitBtn) submitBtn.disabled = true;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const serviceSelect = $('#service-required', form);
            const serviceLabel = serviceSelect && serviceSelect.selectedOptions.length
                ? serviceSelect.selectedOptions[0].textContent
                : data.serviceRequired;

            const budgetSelect = $('#budget-range', form);
            const budgetLabel = budgetSelect && budgetSelect.selectedOptions.length
                ? budgetSelect.selectedOptions[0].textContent
                : data.budgetRange;

            const message = buildWhatsAppMessage({
                ...data,
                serviceRequired: serviceLabel,
                budgetRange: budgetLabel
            });

            feedback.textContent = 'Thank you — opening WhatsApp to send your enquiry.';
            feedback.className = 'form-feedback is-success';

            const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank', 'noopener');

            setTimeout(() => {
                form.reset();
                if (submitBtn) submitBtn.disabled = false;
                isSubmitting = false;
            }, 1200);
        });

        // Clear field errors as user corrects them
        $$('input, select, textarea', form).forEach((field) => {
            field.addEventListener('input', () => clearFieldError(field));
            field.addEventListener('change', () => clearFieldError(field));
        });
    }

    /* ================================================================
       13. BACK-TO-TOP BUTTON
       ================================================================ */
    function initBackToTop() {
        const btn = $('#back-to-top');
        if (!btn) return;

        const onScroll = throttle(() => {
            btn.hidden = false;
            if (window.scrollY > CONFIG.backToTopThreshold) {
                btn.classList.add('is-visible');
            } else {
                btn.classList.remove('is-visible');
            }
        }, 100);

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        });
    }

    /* ================================================================
       14. SCROLL PROGRESS INDICATOR
       ================================================================ */
    function initScrollProgress() {
        const bar = $('#scroll-progress');
        if (!bar) return;

        const onScroll = throttle(() => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            bar.style.width = `${progress}%`;
        }, 50);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', debounce(onScroll, 150));
        onScroll();
    }

    /* ================================================================
       15. FOOTER YEAR
       ================================================================ */
    function initFooterYear() {
        const yearEl = $('#current-year');
        if (!yearEl) return;
        yearEl.textContent = new Date().getFullYear();
    }

    /* ================================================================
       16. INITIALIZATION
       ================================================================ */
    function init() {
        safeInit('HeroSlideshow', initHeroSlideshow);
        safeInit('Navigation', initNavigation);
        safeInit('SmoothScroll', initSmoothScroll);
        safeInit('ScrollReveal', initScrollReveal);
        safeInit('Counters', initCounters);
        safeInit('Filtering', initFiltering);
        safeInit('Lightbox', initLightbox);
        safeInit('TestimonialSlider', initTestimonialSlider);
        safeInit('Accordions', initAccordions);
        safeInit('ContactForm', initContactForm);
        safeInit('BackToTop', initBackToTop);
        safeInit('ScrollProgress', initScrollProgress);
        safeInit('FooterYear', initFooterYear);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
