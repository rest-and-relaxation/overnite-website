import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const assets = {
  logo: '/assets/overnite-logo.png',
  presentCompany: '/assets/present-company-logo.png',
  work: '/assets/work-source-1.png',
  sun: '/assets/icon-sun.png',
  skull: '/assets/icon-skull.png',
  moon: '/assets/icon-moon.png',
  time: '/assets/icon-time.png',
  folder: '/assets/icon-folder.png',
  pagination: '/assets/icon-pagination.png',
};

const galleryPositions = ['center', '35% center', '65% center'];

function LocalClock() {
  const [time, setTime] = useState(() => formatTime());

  useEffect(() => {
    const interval = window.setInterval(() => setTime(formatTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="local-clock" aria-label={`Bandung local time ${time}`}>
      <img className="clock-icon" src={assets.time} alt="" />
      <span className="clock-label">Local time</span>
      <span className="clock-arrow" aria-hidden="true">→</span>
      <time>{time}</time>
    </div>
  );
}

function formatTime() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date());
}

function Header({ theme, setTheme }) {
  const modes = [
    ['sun', 'Light theme'],
    ['skull', 'Pink theme'],
    ['moon', 'Dark theme'],
  ];

  return (
    <header className="site-header page-inner">
      <a className="header-brand" href="#top" aria-label="Overnite Studio, back to top">
        <img src={assets.logo} alt="Overnite" />
      </a>
      <LocalClock />
      <div className="theme-switcher" aria-label="Colour theme">
        {modes.map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            className={theme === mode ? 'theme-button is-active' : 'theme-button'}
            aria-label={label}
            aria-pressed={theme === mode}
            onClick={() => setTheme(mode)}
          >
            <img src={assets[mode]} alt="" />
          </button>
        ))}
      </div>
    </header>
  );
}

function Gallery() {
  const [frame, setFrame] = useState(0);
  const advance = (direction) => setFrame((current) =>
    (current + direction + galleryPositions.length) % galleryPositions.length
  );

  return (
    <section className="work-section page-inner" id="work" aria-label="Selected work">
      <div className="work-viewer" data-reveal>
        <img
          className="work-image"
          src={assets.work}
          alt="Colourful illustrated music studio with speakers, lips, and a keyboard"
          style={{ objectPosition: galleryPositions[frame] }}
        />
        <button className="gallery-arrow gallery-arrow-prev" type="button" onClick={() => advance(-1)} aria-label="Previous artwork view">←</button>
        <button className="gallery-arrow gallery-arrow-next" type="button" onClick={() => advance(1)} aria-label="Next artwork view">→</button>
        <div className="gallery-pagination" aria-label={`Artwork view ${frame + 1} of ${galleryPositions.length}`}>
          <img src={assets.pagination} alt="" />
          <span className="visually-hidden">View {frame + 1} of {galleryPositions.length}</span>
        </div>
      </div>
      <div className="work-caption meta-grid" data-reveal>
        <div className="client-logo"><img src={assets.presentCompany} alt="Present Company" /></div>
        <span className="section-number">2.0</span>
        <p>Collection of work in collaboration with Present Company.</p>
        <span className="caption-location">Sydney, Australia</span>
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState('sun');
  const rootRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.site-header > *', { autoAlpha: 0, y: -16, duration: 0.65, stagger: 0.08, ease: 'power2.out' });
      gsap.from('.hero-logo', { autoAlpha: 0, y: 28, scale: 0.96, duration: 1.15, delay: 0.13, ease: 'power3.out' });
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 34,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: rootRef });

  return (
    <div className="site-shell" data-theme={theme} ref={rootRef} id="top">
      <div className="page-wrap">
        <Header theme={theme} setTheme={setTheme} />

        <main>
          <section className="hero page-inner" aria-label="Overnite Studio">
            <h1><img className="hero-logo" src={assets.logo} alt="Overnite" /></h1>
          </section>

          <section className="intro page-inner meta-grid" aria-label="About the studio" data-reveal>
            <div className="intro-place"><span>Studio.</span><span>Bandung, Indonesia</span></div>
            <span className="section-number intro-number">1.0</span>
            <div className="intro-main">
              <p>We’re a team of diverse visual designers and artists, expertly crafting high-quality visualisations to transform and realise creative concepts for creative agencies. Our mission is to bring ideas to life with exceptional visuals, ensuring each project reaches its highest potential from inception to final production.</p>
              <a className="talk-link" href="mailto:info@overnite.com?subject=Let's%20talk">
                <span className="talk-arrow" aria-hidden="true">→</span>
                <span>Let’s talk</span>
              </a>
            </div>
            <div className="intro-year"><img src={assets.folder} alt="" /><span>2024</span></div>
          </section>

          <Gallery />
        </main>

        <footer className="site-footer page-inner" id="contact">
          <div className="footer-top" data-reveal>
            <h2>Interested in joining us?<br />Let’s chat.</h2>
            <div className="footer-contact">
              <a href="mailto:info@overnite.com">info@overnite.com</a>
              <a href="tel:+61295380853">(02) 9538 0853</a>
              <nav aria-label="Social and careers links">
                <span>Instagram</span>
                <a href="https://www.linkedin.com/company/overnite-studio-by-present-company/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                <a href="mailto:info@overnite.com?subject=Careers%20at%20Overnite">Careers</a>
              </nav>
            </div>
            <address>493 Bourke St, Surry Hills<br />NSW 2010, Australia</address>
          </div>
          <div className="footer-bottom">
            <small>All content © Overnite Studio</small>
            <a href="#top" aria-label="Overnite Studio, back to top"><img src={assets.logo} alt="Overnite" /></a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
