import { useEffect } from 'react';
import { followingDotCursor } from 'cursor-effects';

export const CursorEffect = () => {
    useEffect(() => {
        // Initialize the cursor effect
        const cursor = new followingDotCursor({
            color: '#D2955B', // Use the gold accent color
        });

        // Cleanup on unmount
        return () => {
            if (cursor && typeof cursor.destroy === 'function') {
                cursor.destroy();
            } else {
                // If destroy is not available, we might need to manually remove elements
                // but usually these libraries handle their own cleanup or are meant to be global.
                // For cursor-effects specifically, it often adds a canvas or div to the body.
                const elements = document.querySelectorAll('canvas[style*="pointer-events: none"]');
                elements.forEach(el => el.remove());
            }
        };
    }, []);

    return null; // This component doesn't render anything itself
};
