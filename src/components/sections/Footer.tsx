'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('Footer');

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer className={styles.footer}>
      <motion.div 
        className={`container ${styles.grid}`}
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={itemVars} className={styles.col}>
          <h3 className={styles.logo}>MFORCE</h3>
          <p className={styles.text}>{t('desc')}</p>
        </motion.div>

        <motion.div variants={itemVars} className={styles.col}>
          <h4 className={styles.heading}>{t('links')}</h4>
          <ul className={styles.links}>
            <li><a href="#about">{t('about')}</a></li>
            <li><a href="#services">{t('services')}</a></li>
            <li><a href="#projects">{t('projects')}</a></li>
          </ul>
        </motion.div>

        <motion.div variants={itemVars} className={styles.col}>
          <h4 className={styles.heading}>{t('contact')}</h4>
          <p className={styles.contactText}>
            <Mail size={16} /> info@mforce.com
          </p>
          <p className={styles.contactText}>
            <Phone size={16} /> <span dir="ltr">+(20) 1036925982</span>
          </p>
        </motion.div>
      </motion.div>

      <div className={styles.bottom}>
        <p className={styles.bottomText}>{t('rights')}</p>
      </div>
    </footer>
  );
}
