'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const t = useTranslations('Hero');
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg      = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  const textVariants = {
    hidden: { opacity: 0, y: 36 },
    show:   { opacity: 1, y: 0 },
  };

  return (
    <>
      <section ref={ref} className={styles.heroSection}>
        {/* Parallax Background */}
        <motion.div
          className={styles.bgImageWrap}
          style={{ y: yBg, opacity: opacityBg }}
        >
          <Image 
            src="/images/hero_bg.png" 
            alt="MFORCE Architecture Background"
            fill
            priority
            quality={90}
            className={styles.bgImageNext}
          />
          <div className={styles.overlay} />
        </motion.div>

        {/* Main Content */}
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.flexCenter}>
            <div className={styles.textWrap}>

              {/* Badge */}
              <motion.div
                className={styles.badge}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: easeCurve }}
              >
                <span className={styles.badgeDot} />
                <span className={styles.badgeText}>{t('badge')}</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className={styles.title}
                variants={textVariants}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.85, delay: 0.18, ease: easeCurve }}
              >
                {t('title').split(' ').map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className={styles.titleHighlight}> {word}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className={styles.subtitle}
                variants={textVariants}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.85, delay: 0.3, ease: easeCurve }}
              >
                {t('subtitle')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className={styles.ctaGroup}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.44, ease: easeCurve }}
              >
                <a href="https://wa.me/201050242285" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                  {t('cta')}
                  <svg
                    className={styles.arrowIcon}
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#projects" className={styles.secondaryBtn}>
                  {t('projects')}
                </a>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ── Trust Stats Bar ── */}
      <div className={styles.statsSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeCurve }}
            className={styles.statsGrid}
          >
            <div className={styles.statItem}>
              <span className={styles.statNum}>{t('stat1_num')}</span>
              <span className={styles.statText}>{t('stat1_text')}</span>
            </div>
            <div className={styles.statSeparator} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>{t('stat2_num')}</span>
              <span className={styles.statText}>{t('stat2_text')}</span>
            </div>
            <div className={styles.statSeparator} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>{t('stat3_num')}</span>
              <span className={styles.statText}>{t('stat3_text')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
