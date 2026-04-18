'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, CheckCircle2 } from 'lucide-react';
import styles from './InstantQuote.module.css';

export default function InstantQuote() {
  const t = useTranslations('Quote');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [service, setService] = useState('');
  const [area, setArea]    = useState('');
  const [status, setStatus]  = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      await fetch('https://formsubmit.co/ajax/ahmedessam.uiux@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setService(''); setArea(''); setStatus('');
        form.reset();
      }, 5000);
    } catch(err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quote" className={`section ${styles.quoteSection}`}>
      <div className="container">

        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="sectionLabel">{t('title')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={styles.successMessage}
              >
                <div className={styles.successCircle}>
                  <CheckCircle2 size={44} strokeWidth={2.5} className={styles.successIcon} />
                </div>
                <h3 className={styles.successTitle}>{t('success_title')}</h3>
                <p className={styles.successText}>
                  {t('success_text')}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className={styles.form}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{t('card_title')}</h3>
                  <p className={styles.cardSubtitle}>{t('card_subtitle')}</p>
                </div>

                <input type="hidden" name="_captcha" value="false" />

                <div className={styles.formSections}>
                  {/* Service */}
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>{t('service_type')}</legend>
                    <div className={styles.pillGrid}>
                      {['construction', 'finishing', 'restoration', 'management', 'other'].map((val) => (
                        <label key={val} className={`${styles.pillLabel} ${service === val ? styles.pillActive : ''}`}>
                          <input type="radio" name="service" value={val} checked={service === val} onChange={(e) => setService(e.target.value)} className={styles.srOnly} required />
                          <span className={styles.pillText}>{t(`service_${val}` as any)}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Area */}
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>{t('area_size')}</legend>
                    <div className={styles.pillGrid}>
                      {['small', 'medium', 'large'].map((val) => (
                        <label key={val} className={`${styles.pillLabel} ${area === val ? styles.pillActive : ''}`}>
                          <input type="radio" name="area" value={val} checked={area === val} onChange={(e) => setArea(e.target.value)} className={styles.srOnly} required />
                          <span className={styles.pillText}>{t(`area_${val}` as any)}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Status */}
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>{t('project_status')}</legend>
                    <div className={styles.pillGrid}>
                      {['idea', 'ready', 'existing'].map((val) => (
                        <label key={val} className={`${styles.pillLabel} ${status === val ? styles.pillActive : ''}`}>
                          <input type="radio" name="status" value={val} checked={status === val} onChange={(e) => setStatus(e.target.value)} className={styles.srOnly} required />
                          <span className={styles.pillText}>{t(`status_${val}` as any)}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Contact Info */}
                  <div className={styles.inputsSection}>
                    <div className={styles.inputWrap}>
                      <label className={styles.inputLabel} htmlFor="email_input">{t('email')}</label>
                      <div className={styles.inputInner}>
                        <Mail className={styles.inputIcon} size={20} strokeWidth={2} />
                        <input name="email" id="email_input" type="email" placeholder={t('email_placeholder')} className={styles.inputField} />
                      </div>
                    </div>

                    <div className={styles.inputWrap}>
                      <label className={styles.inputLabel} htmlFor="phone_input">{t('phone')} <span className={styles.required}>*</span></label>
                      <div className={styles.inputInner}>
                        <Phone className={styles.inputIcon} size={20} strokeWidth={2} />
                        <input name="phone" id="phone_input" type="tel" placeholder={t('phone_placeholder')} className={styles.inputField} required />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? '...' : t('submit')}
                </button>
                <p className={styles.footerNote}>{t('footer_note')}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
