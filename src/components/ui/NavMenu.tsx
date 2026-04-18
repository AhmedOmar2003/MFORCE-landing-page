'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './NavMenu.module.css';

export default function NavMenu() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  const links = [
    { href: '#about',    label: t('about')    },
    { href: '#services', label: t('services') },
    { href: '#projects', label: t('projects') },
    { href: '#why-us',   label: t('why_us')  },
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          <div className={styles.logo}>MFORCE</div>

          <ul className={styles.navLinks}>
            {links.map(l => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>

          <div className={styles.actions}>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={styles.themeBtn}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button onClick={toggleLocale} className={styles.langBtn}>
              {t('switch_lang')}
            </button>
            <a href="#quote" className={styles.contactBtn}>{t('contact')}</a>
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <a
          href="#quote"
          className={styles.contactBtn}
          style={{ marginTop: 8, textAlign: 'center' }}
          onClick={() => setMobileOpen(false)}
        >
          {t('contact')}
        </a>
      </div>
    </>
  );
}
