'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Image from 'next/image';
import styles from './Projects.module.css';

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function Projects() {
  const t = useTranslations('Projects');

  const projects = [
    {
      img: '/images/project_1.png',
      title: t('p1'),
      category: t('c1'),
    },
    {
      img: '/images/project_2.png',
      title: t('p2'),
      category: t('c2'),
    },
    {
      img: '/images/project_1.png',
      title: t('p3'),
      category: t('c3'),
    },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const cardVars = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring' as const, stiffness: 160, damping: 22 },
    },
  } satisfies Variants;

  return (
    <section id="projects" className={`section ${styles.projectsSection}`}>
      <div className="container">

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easeCurve }}
        >
          <div className={styles.headerLeft}>
            <span className="sectionLabel">{t('title')}</span>
            <h2 className={styles.sectionTitle}>
              {t('title')}{' '}
              <span className={styles.titleAccent}>{t('title_accent')}</span>
            </h2>
          </div>
          <a href="#" className={styles.viewAllBtn}>
            {t('view_all')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className={styles.grid}
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVars}
              className={styles.projectCard}
            >
              <div className={styles.imageWrap}>
                <Image 
                  src={p.img} 
                  alt={p.title}
                  fill 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.projectImg}
                />
              </div>

              {/* Index tag */}
              <span className={styles.cardIndex}>
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className={styles.overlay}>
                <p className={styles.projectCategory}>{p.category}</p>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <span className={styles.projectArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
