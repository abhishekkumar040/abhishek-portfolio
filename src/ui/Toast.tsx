import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, onClose, duration]);

  return (
    <div className="fixed top-6 right-4 sm:right-6 z-[100] max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={`pointer-events-auto rounded-2xl p-4 shadow-2xl border backdrop-blur-xl flex items-start gap-3.5 transition-colors ${
              toast.type === 'success'
                ? 'bg-[#0f1d15]/95 border-emerald-500/40 text-emerald-100 shadow-emerald-950/40'
                : toast.type === 'error'
                ? 'bg-[#201014]/95 border-rose-500/40 text-rose-100 shadow-rose-950/40'
                : 'bg-[#121620]/95 border-blue-500/40 text-blue-100 shadow-blue-950/40'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Info className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <h5 className="text-sm font-semibold tracking-wide uppercase font-['Kanit',sans-serif]">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-xs mt-0.5 opacity-90 leading-relaxed font-normal">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
