import React, { useState, useEffect, useRef, useCallback, useId } from 'react';

const SLIDES = [
  { category: 'Accessibility', categoryClass: '',        title: 'Building Accessible Forms',       excerpt: 'Labels, errors, and input modes — the complete checklist for form accessibility that goes beyond just adding aria-label.' },
  { category: 'Performance',   categoryClass: 'green',   title: 'Core Web Vitals: A Practical Guide', excerpt: 'LCP, CLS, INP — what they measure, how they affect your Google ranking, and the ten changes that move the needle most.' },
  { category: 'CSS',           categoryClass: 'yellow',  title: 'CSS Grid for Complex Layouts',    excerpt: 'Two-dimensional control without a framework. Grid makes the layouts that used to require JavaScript trivial to express in CSS.' },
  { category: 'TypeScript',    categoryClass: 'purple',  title: 'TypeScript Generics Explained',   excerpt: "Generics are the feature that makes TypeScript genuinely powerful. Here's how to read, write, and constrain them with confidence." },
];

const CATEGORY_COLORS = {
  '':       { color: '#1e40af', background: '#dbeafe' },
  green:    { color: '#166534', background: '#dcfce7' },
  yellow:   { color: '#854d0e', background: '#fef9c3' },
  purple:   { color: '#6b21a8', background: '#f3e8ff' },
};

export default function AccessibleCarousel() {
  const [current,   setCurrent]   = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselId  = useId();

  const stopAutoAdvance = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsPlaying(false);
  }, []);

  const startAutoAdvance = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 3000);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    startAutoAdvance();
    return () => clearInterval(intervalRef.current);
  }, [startAutoAdvance]);

  const goTo = useCallback((index, announce = false) => {
    setCurrent(index);
    if (announce) setStatusMsg(`Slide ${index + 1} of ${SLIDES.length}`);
  }, []);

  const handleFocusIn  = useCallback(stopAutoAdvance, [stopAutoAdvance]);
  const handleFocusOut = useCallback((e) => {
    if (!carouselRef.current?.contains(e.relatedTarget)) startAutoAdvance();
  }, [startAutoAdvance]);
  const handleMouseEnter = useCallback(stopAutoAdvance, [stopAutoAdvance]);
  const handleMouseLeave = useCallback(startAutoAdvance, [startAutoAdvance]);

  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>Featured Articles</h1>

      <p style={styles.srOnly} aria-live="polite" aria-atomic="true">{statusMsg}</p>

      {/* FIX: <section> with aria-label + aria-roledescription */}
      <section
        ref={carouselRef}
        style={styles.carousel}
        aria-label="Featured articles"
        aria-roledescription="carousel"
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={styles.track}>
          {SLIDES.map((slide, i) => (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              style={{ ...styles.slide, ...(i === current ? styles.slideActive : styles.slideHidden) }}
              aria-hidden={i !== current}
            >
              <span style={{ ...styles.category, ...CATEGORY_COLORS[slide.categoryClass] }}>
                {slide.category}
              </span>
              <h2 style={styles.slideTitle}>{slide.title}</h2>
              <p style={styles.excerpt}>{slide.excerpt}</p>
            </div>
          ))}
        </div>

        <div style={styles.controls}>
          {/* FIX: Pause button first — keyboard users can stop auto-advance immediately */}
          <button
            style={styles.pauseBtn}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            onClick={() => isPlaying ? stopAutoAdvance() : startAutoAdvance()}
          >
            <span aria-hidden="true">{isPlaying ? '⏸' : '▶'}</span>
          </button>
          <button
            style={styles.navBtn}
            aria-label="Previous slide"
            onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length, true)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div style={styles.dots} aria-hidden="true">
            {SLIDES.map((_, i) => (
              <div key={i} style={{ ...styles.dot, ...(i === current ? styles.dotActive : {}) }} />
            ))}
          </div>
          <button
            style={styles.navBtn}
            aria-label="Next slide"
            onClick={() => goTo((current + 1) % SLIDES.length, true)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>
    </div>
  );
}

const btnBase = {
  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#f3f4f6', border: '1px solid transparent', borderRadius: '50%',
  fontSize: '1.25rem', color: '#374151', cursor: 'pointer',
};

const styles = {
  page:       { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', padding: '2rem' },
  pageTitle:  { fontSize: '1.75rem', fontWeight: 700, maxWidth: 700, margin: '0 auto 1.5rem' },
  srOnly:     { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 },
  carousel:   { maxWidth: 700, margin: '0 auto', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' },
  track:      { position: 'relative' },
  slide:      { padding: '2rem' },
  slideActive: {},
  slideHidden: { display: 'none' },
  category:   { display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.25rem 0.625rem', borderRadius: 4, marginBottom: '0.875rem' },
  slideTitle: { fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.625rem' },
  excerpt:    { fontSize: '0.9375rem', lineHeight: 1.7, color: '#374151' },
  controls:   { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', borderTop: '1px solid #e5e7eb' },
  pauseBtn:   { ...btnBase },
  navBtn:     { ...btnBase },
  dots:       { display: 'flex', gap: '0.5rem' },
  dot:        { width: 8, height: 8, borderRadius: '50%', background: '#d1d5db' },
  dotActive:  { background: '#2563eb' },
};
