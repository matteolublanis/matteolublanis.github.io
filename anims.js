document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasObserver = 'IntersectionObserver' in window;

    const sectionLinks = [...document.querySelectorAll('nav a[href^="#"]')];
    if (hasObserver && sectionLinks.length) {
        const linkForSection = new Map();
        sectionLinks.forEach(link => {
            const section = document.getElementById(link.getAttribute('href').slice(1));
            if (section) linkForSection.set(section, link);
        });

        const setActive = (link) => {
            sectionLinks.forEach(l => {
                l.classList.remove('highlight');
                l.removeAttribute('aria-current');
            });
            link.classList.add('highlight');
            link.setAttribute('aria-current', 'true');
        };

        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(linkForSection.get(entry.target));
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        linkForSection.forEach((_, section) => spy.observe(section));
    }

    const targets = document.querySelectorAll(
        '.card, .bio-card, .entry, .skill-category, .contact-list li'
    );

    if (reduceMotion || !hasObserver) {
        targets.forEach(el => el.classList.add('visible'));
        return;
    }

    targets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const i = [...entry.target.parentElement.children].indexOf(entry.target);
            entry.target.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
});
