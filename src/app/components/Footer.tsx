import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-xl">
              Digital
            </div>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span>© {currentYear} Digital Agency.</span>
            <span>{t('footer.rights')}</span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by Digital Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
