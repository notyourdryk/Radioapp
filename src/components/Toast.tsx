import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, WifiOff } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="text-emerald-500" size={18} />,
    error: <AlertCircle className="text-red-500" size={18} />,
    info: <WifiOff className="text-blue-500" size={18} />,
    warning: <AlertCircle className="text-amber-500" size={18} />
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="bg-secondary border border-border rounded-xl p-4 shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md"
    >
      <div className="shrink-0">{icons[type]}</div>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

export function ToastContainer({ toasts, onClose }: { toasts: any[], onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-24 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
