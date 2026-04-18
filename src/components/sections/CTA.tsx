'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './CTA.module.css';

export default function CTA() {
  const t = useTranslations('CTA');

  return (
    <section className={styles.ctaSection}>
      <div className={`container ${styles.container}`}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={styles.content}
        >
          <h2 className={styles.title}>{t('title')}</h2>
          
          <a href="https://wa.me/201050242285" target="_blank" rel="noopener noreferrer" className={styles.button}>
            {t('button')}
            <svg 
              className={styles.icon}
              width="20" height="20" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2.5" 
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
