'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

/**
 * Themed Toaster wrapper that inherits the app's design tokens.
 * Renders Sonner with system-aware theme detection by default.
 */
function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
