"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export interface ScrollExpandMediaProps {
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  caption?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

// Adapted for a static site: native scrolling, local images and no Next server.
export default function ScrollExpandMedia({ mediaSrc, bgImageSrc,
  title = '', date, scrollToExpand, caption, textBlend = false, children }: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [viewport, setViewport] = useState({ width: 1280, height: 800 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const width = useTransform(scrollYProgress, [0, 1], [Math.min(340, viewport.width * .78), Math.min(1280, viewport.width * .94)]);
  const height = useTransform(scrollYProgress, [0, 1], [Math.min(420, viewport.height * .58), viewport.height * .84]);
  const radius = useTransform(scrollYProgress, [0, 1], [20, 4]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, .8], [.5, .08]);
  const textX = useTransform(scrollYProgress, [0, .85], [0, -viewport.width * .55]);
  const textOpacity = useTransform(scrollYProgress, [0, .65], [1, 0]);

  useEffect(() => {
    const resize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <div className="scroll-expansion-hero">
    <div ref={sectionRef} className={`expansion-track ${reduced ? 'reduced-motion' : ''}`}>
      <section className="expansion-stage" aria-label={`Apresentação de ${title}`}>
        <motion.div className="expansion-background" style={{ opacity: reduced ? .15 : backgroundOpacity }} aria-hidden="true">
          <img src={bgImageSrc} alt="" />
        </motion.div>
        <a className="expansion-skip tw:absolute tw:right-6 tw:top-6 tw:z-30" href="#conteudo">Ir para a ficha ↓</a>
        <motion.div className="expansion-media" style={{ width: reduced ? '94%' : width, height: reduced ? '70svh' : height, borderRadius: reduced ? 4 : radius }}>
          <img className="expansion-poster" src={mediaSrc} alt={title} />
          <div className="expansion-media-shade" />

        </motion.div>
        <motion.div className={`expansion-title ${textBlend ? 'blend-title' : ''}`} style={{ x: reduced ? 0 : textX, opacity: reduced ? 1 : textOpacity }}>
          {date && <p className="expansion-eyebrow">{date}</p>}
          <h2>{title}</h2>
          {scrollToExpand && !reduced && <p className="expansion-instruction">{scrollToExpand} <span aria-hidden="true">↓</span></p>}
        </motion.div>
        {caption && <p className="expansion-caption">{caption}</p>}
      </section>
    </div>
    {children && <section className="expansion-content">{children}</section>}
  </div>;
}
