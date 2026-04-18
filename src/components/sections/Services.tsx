'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PenTool, Boxes, Zap } from 'lucide-react';
import styles from './Services.module.css';

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVars = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 180, damping: 22 },
  },
};

export default function Services() {
  const t = useTranslations('Services');

  const servicesList = [
    {
      id: 'design',
      icon: PenTool,
      gradient: 'linear-gradient(135deg,#e8c07a,#c08a3e)',
    },
    {
      id: 'interior',
      icon: Boxes,
      gradient: 'linear-gradient(135deg,#c08a3e,#8a5e24)',
    },
    {
      id: 'mechanical',
      icon: Zap,
      gradient: 'linear-gradient(135deg,#d4a055,#b07030)',
    },
  ];

  return (
    <section id="services" className={`section ${styles.servicesSection}`}>
      <div className="container">

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="sectionLabel">{t('title')}</span>
          <h2 className={styles.title}>
            {t('title')}{' '}
            <span className={styles.titleAccent}>{t('title_accent')}</span>
          </h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className={styles.grid}
        >
          {servicesList.map((srv) => {
            const Icon = srv.icon;
            return (
              <motion.div variants={itemVars} key={srv.id} className={styles.card}>
                <div className={styles.iconBox}>
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <h3 className={styles.cardTitle}>{t(`list.${srv.id}`)}</h3>
                <p className={styles.cardDesc}>{t(`list.${srv.id}_desc`)}</p>
                <span className={styles.cardLink}>
                  {t('learn_more')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
