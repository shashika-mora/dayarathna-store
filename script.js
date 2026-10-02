const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.querySelector('#year').textContent = new Date().getFullYear();

let frame = false;
window.addEventListener('scroll', () => {
    if (!frame) {
        requestAnimationFrame(() => {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            document.querySelector('.progress').style.width = (height > 0 ? scrollY / height * 100 : 0) + '%';
            frame = false;
        });
        frame = true;
    }
}, { passive: true });

document.querySelector('#copy-email')?.addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
        await navigator.clipboard.writeText('shashikatheekshana67@gmail.com');
        status.textContent = 'Email copied: shashikatheekshana67@gmail.com';
    } catch {
        status.textContent = 'shashikatheekshana67@gmail.com';
    }
    setTimeout(() => { status.textContent = ''; }, 6000);
});

if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
    }), { rootMargin: '-15% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
}

const backTop = document.querySelector('.back-top');
let spaceFrame = false;
function updateSpace() {
    const visible = window.scrollY > 80;
    backTop?.classList.toggle('shown', visible);
    backTop?.setAttribute('aria-hidden', String(!visible));
    if (backTop) backTop.tabIndex = visible ? 0 : -1;
    spaceFrame = false;
}
window.addEventListener('scroll', () => {
    if (!spaceFrame) {
        spaceFrame = true;
        requestAnimationFrame(updateSpace);
    }
}, { passive: true });
updateSpace();

// Gathering waits for the actual shape to be visible; scattering follows scroll directly.
(() => {
    const canvas = document.querySelector('#starfield'), ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const pref = matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = n => Math.max(0, Math.min(1, n));
    const smooth = n => n * n * (3 - 2 * n);
    let width = 0, height = 0, stars = [], shapes = [], raf = 0, last = 0, elapsed = 0, px = 0, py = 0, tx = 0, ty = 0;

    function resize() {
        width = innerWidth;
        height = innerHeight;
        const dpr = Math.min(devicePixelRatio || 1, 1.6);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stars = Array.from({ length: Math.min(200, Math.max(85, Math.round(width * height / 7000))) }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: 0.35 + Math.random(),
            d: 0.25 + Math.random() * 0.75,
            phase: Math.random() * 6.28
        }));
        draw(0);
    }

    function dot(x, y, r, a, lime = false) {
        ctx.fillStyle = 'rgba(' + (lime ? '190,225,154' : '190,212,247') + ',' + a + ')';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    function draw(dt) {
        elapsed += dt;
        ctx.clearRect(0, 0, width, height);
        const motion = !pref.matches;
        px += (tx - px) * 0.025;
        py += (ty - py) * 0.025;

        for (const s of stars) {
            const x = (s.x * width + (motion ? elapsed * 0.004 * s.d + px * s.d : 0) + width) % width;
            const y = (s.y * height + (motion ? -elapsed * 0.0018 * s.d + py * s.d - scrollY * 0.018 * s.d : 0) + height * 100) % height;
            dot(x, y, s.r, motion ? 0.35 + 0.25 * (0.5 + 0.5 * Math.sin(elapsed * 0.0006 + s.phase)) : 0.5);
        }

        for (const shape of shapes) {
            const section = shape.section.getBoundingClientRect(), box = shape.anchor.getBoundingClientRect();
            const visibleHeight = Math.max(0, Math.min(box.bottom, height * 0.94) - Math.max(box.top, 100));
            const visibleRatio = visibleHeight / Math.max(1, Math.min(box.height, height * 0.8));
            if (visibleHeight === 0) { shape.armed = false; shape.progress = 0; }
            if (section.bottom < -height * 0.25 || section.top > height * 1.25) continue;
            if (visibleRatio >= 0.55) shape.armed = true;
            const entering = clamp((height * 0.95 - section.top) / (height * 0.4));
            const leaving = clamp((section.bottom - height * 0.15) / (height * 0.65));
            const target = shape.armed ? smooth(Math.min(entering, leaving)) : 0;
            if (target > shape.progress) shape.progress = Math.min(target, shape.progress + dt / 2200);
            else shape.progress = target;
            const progress = motion ? shape.progress : 1;
            const visible = clamp((height * 1.12 - section.top) / (height * 0.25)) * clamp((section.bottom + height * 0.15) / (height * 0.25));
            if (!visible) continue;
            const sw = Math.min(box.width, box.height * shape.ratio), sh = sw / shape.ratio, ox = box.left + (box.width - sw) / 2, oy = box.top + (box.height - sh) / 2;
            for (const p of shape.points) {
                const targetX = ox + p.u * sw, targetY = oy + p.v * sh;
                const spreadX = p.x * width, spreadY = p.y * height;
                const x = spreadX * (1 - progress) + targetX * progress, y = spreadY * (1 - progress) + targetY * progress;
                const shimmer = motion ? 0.75 + 0.15 * Math.sin(elapsed * 0.001 + p.phase) : 0.85;
                dot(x, y, p.r, ((shape.armed ? 0.13 : 0.025) + 0.575 * progress) * visible * shimmer, p.lime);
            }
        }
    }

    function tick(now) {
        raf = 0;
        if (document.hidden || pref.matches) return;
        const delta = last ? Math.min(now - last, 50) : 0;
        last = now;
        draw(delta);
        raf = requestAnimationFrame(tick);
    }

    function start() {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
        if (pref.matches) { draw(0); return; }
        if (!document.hidden) raf = requestAnimationFrame(tick);
    }

    addEventListener('resize', resize, { passive: true });
    addEventListener('scroll', () => { if (pref.matches) draw(0); }, { passive: true });
    addEventListener('pointermove', e => {
        if (e.pointerType === 'mouse') {
            tx = (e.clientX / width - 0.5) * 15;
            ty = (e.clientY / height - 0.5) * 15;
        }
    }, { passive: true });
    document.addEventListener('visibilitychange', start);
    pref.addEventListener('change', start);
    resize();
    start();

    fetch('particle-shapes.json?v=2.1').then(r => {
        if (!r.ok) throw Error('Shapes unavailable');
        return r.json();
    }).then(data => {
        shapes = [...document.querySelectorAll('[data-particle]')].map(anchor => {
            const spec = data[anchor.dataset.particle];
            if (!spec) return null;
            return {
                anchor,
                armed: false,
                progress: 0,
                section: anchor.closest('section') || anchor.parentElement,
                ratio: spec.ratio,
                points: spec.points.map(([u, v], i) => ({
                    u, v,
                    x: Math.random(),
                    y: Math.random(),
                    r: 0.65 + Math.random() * 0.65,
                    phase: Math.random() * 6.28,
                    lime: i % 8 === 0
                }))
            };
        }).filter(Boolean);
        draw(0);
    }).catch(e => {
        console.warn('Particle shapes fallback:', e);
    });
})();
