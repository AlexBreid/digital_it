import React, { useState, useRef } from 'react';
import { Send, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';

type IconProps = { className?: string };

function TelegramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z" />
    </svg>
  );
}

// ============================================================
// НАСТРОЙКА EmailJS (3 простых шага):
// 1. Зарегистрируйтесь на https://www.emailjs.com (бесплатно — 200 писем/мес)
// 2. Подключите свой email-сервис (Gmail, Outlook и т.д.)
//    - Скопируйте Service ID → вставьте в EMAILJS_SERVICE_ID
// 3. Создайте шаблон письма с переменными: {{from_name}}, {{from_email}}, {{message}}
//    - Скопируйте Template ID → вставьте в EMAILJS_TEMPLATE_ID
// 4. В разделе Account → General скопируйте Public Key → вставьте в EMAILJS_PUBLIC_KEY
// ============================================================
const EMAILJS_SERVICE_ID = 'service_5n6xa2f';   // замените на ваш Service ID
const EMAILJS_TEMPLATE_ID = 'template_59g1ino'; // замените на ваш Template ID
const EMAILJS_PUBLIC_KEY = 's_zC9D5ZUNGK-VSjF';    // замените на ваш Public Key

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactChannels = [
    {
      key: 'telegram',
      labelKey: 'contact.channel.telegram' as const,
      value: '@Jimbo3233',
      href: 'https://t.me/Jimbo3233',
      Icon: TelegramIcon,
      iconWrapClass: 'bg-[#229ED9] shadow-lg shadow-cyan-500/40',
      cardClass:
        'bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-slate-900 dark:to-slate-800 border-2 border-cyan-400/70 dark:border-cyan-400/50 shadow-lg shadow-cyan-500/15 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/25',
    },
    {
      key: 'telegram-admin',
      labelKey: 'contact.channel.telegramAdmin' as const,
      value: '@d1gitaladmin',
      href: 'https://t.me/d1gitaladmin',
      Icon: TelegramIcon,
      iconWrapClass: 'bg-[#229ED9] shadow-lg shadow-cyan-500/40',
      cardClass:
        'bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-slate-900 dark:to-slate-800 border-2 border-cyan-400/70 dark:border-cyan-400/50 shadow-lg shadow-cyan-500/15 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/25',
    },
    {
      key: 'email',
      labelKey: 'contact.email' as const,
      value: 'digitallagencyhr@gmail.com',
      href: 'mailto:digitallagencyhr@gmail.com',
      Icon: Mail,
      iconWrapClass: 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/40',
      cardClass:
        'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-2 border-blue-400/70 dark:border-blue-400/50 shadow-lg shadow-blue-500/15 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/25',
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-gradient-to-b from-slate-50 via-blue-50/40 to-violet-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/25 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/25 to-fuchsia-500/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/35 mb-4 ring-2 ring-white/50 dark:ring-white/10"
          >
            <Send className="w-4 h-4" />
            <span>{t('contact.badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-slate-900 dark:text-white"
          >
            {t('contact.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-400 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2 text-slate-700 dark:text-slate-300">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 text-white font-semibold shadow-xl shadow-violet-500/35 ring-2 ring-white/30 dark:ring-white/10 hover:brightness-110 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('contact.send')}</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{t('contact.success')}</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{t('contact.error')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl mb-6 text-slate-900 dark:text-white font-semibold">
                {t('contact.info')}
              </h3>
              <div className="space-y-4">
                {contactChannels.map((channel) => (
                  <a
                    key={channel.key}
                    href={channel.href}
                    target={channel.key === 'email' ? undefined : '_blank'}
                    rel={channel.key === 'email' ? undefined : 'noopener noreferrer'}
                    className={`group flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-[1.02] ${channel.cardClass}`}
                  >
                    <div className={`p-3 rounded-xl text-white shrink-0 ${channel.iconWrapClass}`}>
                      <channel.Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                        {t(channel.labelKey)}
                      </div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {channel.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative Element */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500 via-violet-600 to-fuchsia-600 overflow-hidden shadow-xl shadow-violet-500/30 ring-2 ring-white/40 dark:ring-white/15">
              <div className="absolute inset-0 opacity-25">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
              </div>
              <div className="relative">
                <h4 className="text-xl mb-2 text-white font-bold drop-shadow-sm">{t('contact.cta.title')}</h4>
                <p className="text-white/95 text-base leading-relaxed">{t('contact.cta.desc')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
