import { useEffect } from 'react';

export function useShortcut(key, callback, ctrlKey = true) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            const isCtrlOrMeta = event.ctrlKey || event.metaKey;

            if (event.key === key && (ctrlKey ? isCtrlOrMeta : true)) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, callback, ctrlKey]);
}
