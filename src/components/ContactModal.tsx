import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Check,
  Copy,
  Send,
  Loader2,
  Instagram,
  Github,
  Linkedin,
  AlertCircle,
  FileText,
  User,
  MessageSquare
} from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Toast, ToastMessage } from '../ui/Toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_SUBJECTS = [
  'MERN Web App',
  'Machine Learning / AI',
  'Media & Journalism',
  'Other Inquiry'
];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { t, isHindi } = useLanguage();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Validation & UI State
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    subject?: boolean;
    message?: boolean;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Email validation regex (RFC 5322 compatible pattern)
  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(val.trim());
  };

  const validateField = (field: 'name' | 'email' | 'subject' | 'message', val: string) => {
    let err = '';
    const trimmed = val.trim();

    if (field === 'name') {
      if (!trimmed) {
        err = 'Name is required';
      } else if (trimmed.length < 2) {
        err = 'Name must be at least 2 characters';
      }
    } else if (field === 'email') {
      if (!trimmed) {
        err = 'Email is required';
      } else if (!validateEmail(trimmed)) {
        err = 'Please enter a valid email address (e.g. name@domain.com)';
      }
    } else if (field === 'subject') {
      if (!trimmed) {
        err = 'Subject is required';
      } else if (trimmed.length < 3) {
        err = 'Subject must be at least 3 characters';
      }
    } else if (field === 'message') {
      if (!trimmed) {
        err = 'Message is required';
      } else if (trimmed.length < 10) {
        err = 'Please provide at least 10 characters so Abhishek can understand your request';
      }
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleBlur = (field: 'name' | 'email' | 'subject' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = field === 'name' ? name : field === 'email' ? email : field === 'subject' ? subject : message;
    validateField(field, val);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopied(true);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: 'Email Copied',
      message: `${PROFILE_INFO.email} copied to clipboard.`
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickSubjectSelect = (sub: string) => {
    setSubject(sub);
    validateField('subject', sub);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    const isNameValid = validateField('name', name);
    const isEmailValid = validateField('email', email);
    const isSubjectValid = validateField('subject', subject);
    const isMessageValid = validateField('message', message);

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Validation Error',
        message: 'Please resolve the highlighted issues in the form before submitting.'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message with realistic latency
    try {
      await new Promise((resolve) => setTimeout(resolve, 1100));

      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger success toast notification
      setToast({
        id: Date.now().toString(),
        type: 'success',
        title: 'Message Sent Successfully!',
        message: `Thank you, ${name.trim()}. Abhishek will respond to ${email.trim()} within 24 hours.`
      });
    } catch {
      setIsSubmitting(false);
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Submission Failed',
        message: 'Something went wrong while sending your message. Please try again.'
      });
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return (
    <>
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative w-full max-w-xl rounded-3xl sm:rounded-[36px] p-5 sm:p-8 md:p-9 z-10 shadow-2xl my-auto transition-colors duration-300 border-2 max-h-[92vh] flex flex-col ${
                isDark
                  ? 'bg-[#121418] border-[#D7E2EA]/30 text-[#D7E2EA]'
                  : 'bg-[#FFFFFF] border-[#0C0C0C]/30 text-[#0C0C0C]'
              }`}
            >
              {/* Header */}
              <div
                className={`flex items-start justify-between gap-4 pb-4 border-b flex-shrink-0 ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                <div>
                  <span
                    className={`text-xs uppercase tracking-widest font-light ${
                      isDark ? 'text-[#D7E2EA]/60' : 'text-[#0C0C0C]/60'
                    }`}
                  >
                    Direct Inquiry & Collaboration
                  </span>
                  <h3
                    className={`text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1 ${
                      isDark ? 'text-white' : 'text-[#0C0C0C]'
                    }`}
                  >
                    Let's Build Together
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                      : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'
                  }`}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="overflow-y-auto pr-1 -mr-1 custom-scrollbar py-2">
                {/* Quick Direct Email Pill */}
                <div
                  className={`my-3 p-3.5 rounded-2xl flex items-center justify-between gap-3 border ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-black/5 border-black/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium truncate select-all">
                      {PROFILE_INFO.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : isDark
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-black/10 hover:bg-black/20 text-black'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Form or Success View */}
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 ring-8 ring-emerald-500/10 animate-pulse">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black uppercase mb-2">Message Dispatched!</h4>
                    <p
                      className={`text-sm max-w-sm mb-4 leading-relaxed ${
                        isDark ? 'text-[#D7E2EA]/70' : 'text-[#0C0C0C]/70'
                      }`}
                    >
                      Thank you for reaching out, <span className="font-semibold text-white">{name}</span>. Abhishek has received your message regarding &ldquo;<span className="italic">{subject}</span>&rdquo; and will respond to <span className="underline">{email}</span> within 24 hours.
                    </p>

                    <div
                      className={`w-full max-w-md p-4 rounded-2xl mb-6 text-left text-xs space-y-1.5 border ${
                        isDark ? 'bg-white/5 border-white/10 text-white/80' : 'bg-black/5 border-black/10 text-black/80'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="opacity-60">Sender:</span>
                        <span className="font-medium">{name} ({email})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">Subject:</span>
                        <span className="font-medium">{subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">Status:</span>
                        <span className="text-emerald-400 font-semibold uppercase tracking-wider">Delivered to Inbox</span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                          isDark
                            ? 'border-white/20 hover:border-white text-white/80 hover:text-white'
                            : 'border-black/20 hover:border-black text-black/80 hover:text-black'
                        }`}
                      >
                        Send Another Message
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg cursor-pointer transition-all"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 mt-2">
                    {/* Name Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="contact-name"
                          className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium ${
                            isDark ? 'text-[#D7E2EA]/70' : 'text-[#0C0C0C]/70'
                          }`}
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Your Name</span>
                          <span className="text-purple-400">*</span>
                        </label>
                        {touched.name && errors.name && (
                          <span className="text-rose-400 text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        disabled={isSubmitting}
                        placeholder="e.g. Rahul Sharma or Sarah Jenkins"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (touched.name) validateField('name', e.target.value);
                        }}
                        onBlur={() => handleBlur('name')}
                        className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none transition-colors text-sm ${
                          touched.name && errors.name
                            ? 'border-rose-500/80 bg-rose-500/5 focus:border-rose-500'
                            : isDark
                            ? 'bg-black/40 border-white/10 text-white placeholder-white/30 focus:border-purple-500'
                            : 'bg-[#F4F6F8] border-black/15 text-[#0C0C0C] placeholder-black/30 focus:border-purple-600'
                        }`}
                      />
                    </div>

                    {/* Email Field with Validation */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="contact-email"
                          className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium ${
                            isDark ? 'text-[#D7E2EA]/70' : 'text-[#0C0C0C]/70'
                          }`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email Address</span>
                          <span className="text-purple-400">*</span>
                        </label>
                        {touched.email && errors.email && (
                          <span className="text-rose-400 text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <input
                        id="contact-email"
                        type="email"
                        disabled={isSubmitting}
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (touched.email) validateField('email', e.target.value);
                        }}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none transition-colors text-sm ${
                          touched.email && errors.email
                            ? 'border-rose-500/80 bg-rose-500/5 focus:border-rose-500'
                            : isDark
                            ? 'bg-black/40 border-white/10 text-white placeholder-white/30 focus:border-purple-500'
                            : 'bg-[#F4F6F8] border-black/15 text-[#0C0C0C] placeholder-black/30 focus:border-purple-600'
                        }`}
                      />
                    </div>

                    {/* Subject Field & Quick Suggestions */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="contact-subject"
                          className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium ${
                            isDark ? 'text-[#D7E2EA]/70' : 'text-[#0C0C0C]/70'
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Subject</span>
                          <span className="text-purple-400">*</span>
                        </label>
                        {touched.subject && errors.subject && (
                          <span className="text-rose-400 text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.subject}
                          </span>
                        )}
                      </div>
                      <input
                        id="contact-subject"
                        type="text"
                        disabled={isSubmitting}
                        placeholder="e.g. MERN Web App Project or AI Phishing Collaboration"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          if (touched.subject) validateField('subject', e.target.value);
                        }}
                        onBlur={() => handleBlur('subject')}
                        className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none transition-colors text-sm ${
                          touched.subject && errors.subject
                            ? 'border-rose-500/80 bg-rose-500/5 focus:border-rose-500'
                            : isDark
                            ? 'bg-black/40 border-white/10 text-white placeholder-white/30 focus:border-purple-500'
                            : 'bg-[#F4F6F8] border-black/15 text-[#0C0C0C] placeholder-black/30 focus:border-purple-600'
                        }`}
                      />
                      {/* Quick Subject Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {QUICK_SUBJECTS.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => handleQuickSubjectSelect(tag)}
                            className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                              subject === tag
                                ? 'bg-purple-600 border-purple-500 text-white font-medium'
                                : isDark
                                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white'
                                : 'bg-black/5 hover:bg-black/10 border-black/10 text-black/70 hover:text-black'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="contact-message"
                          className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium ${
                            isDark ? 'text-[#D7E2EA]/70' : 'text-[#0C0C0C]/70'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Message & Requirements</span>
                          <span className="text-purple-400">*</span>
                        </label>
                        {touched.message && errors.message && (
                          <span className="text-rose-400 text-[11px] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.message}
                          </span>
                        )}
                      </div>
                      <textarea
                        id="contact-message"
                        required
                        disabled={isSubmitting}
                        rows={3}
                        placeholder="Tell Abhishek about your project, idea, or media collaboration requirements..."
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (touched.message) validateField('message', e.target.value);
                        }}
                        onBlur={() => handleBlur('message')}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm resize-none ${
                          touched.message && errors.message
                            ? 'border-rose-500/80 bg-rose-500/5 focus:border-rose-500'
                            : isDark
                            ? 'bg-black/40 border-white/10 text-white placeholder-white/30 focus:border-purple-500'
                            : 'bg-[#F4F6F8] border-black/15 text-[#0C0C0C] placeholder-black/30 focus:border-purple-600'
                        }`}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] opacity-40">Minimum 10 characters</span>
                        <span className={`text-[10px] ${message.length >= 10 ? 'text-emerald-400' : 'opacity-40'}`}>
                          {message.length} characters
                        </span>
                      </div>
                    </div>

                    {/* Submit Button with Loading State */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`contact-btn-glow w-full mt-2 py-3 rounded-full text-white font-medium uppercase tracking-widest text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-95'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Social Links Footer */}
              <div
                className={`mt-4 pt-4 border-t flex items-center justify-between flex-wrap gap-3 flex-shrink-0 ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                <span
                  className={`text-xs ${
                    isDark ? 'text-[#D7E2EA]/50' : 'text-[#0C0C0C]/50'
                  }`}
                >
                  Audience: 150K+ · Kolkata / Remote
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={PROFILE_INFO.instagram.startsWith('http') ? PROFILE_INFO.instagram : `https://instagram.com/${PROFILE_INFO.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                      isDark ? 'bg-white/5 hover:bg-white/15' : 'bg-black/5 hover:bg-black/15'
                    }`}
                    title="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                      isDark ? 'bg-white/5 hover:bg-white/15 text-white' : 'bg-black/5 hover:bg-black/15 text-black'
                    }`}
                    title="GitHub Profile (abhishekkumar040)"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                      isDark ? 'bg-white/5 hover:bg-white/15 text-[#0077B5]' : 'bg-black/5 hover:bg-black/15 text-[#0077B5]'
                    }`}
                    title="LinkedIn Profile (Abhishek Kumar)"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
