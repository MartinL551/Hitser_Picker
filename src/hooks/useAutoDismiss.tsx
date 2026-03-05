import { useEffect } from 'react';

export function useAutoDismiss(
  isOpen: boolean,
  onClose: () => void,
  delayMs: number
) {
  useEffect(() => {
    if (!isOpen) return;

    const t = setTimeout(onClose, delayMs);
    return () => clearTimeout(t);
  }, [isOpen, onClose, delayMs]);
}