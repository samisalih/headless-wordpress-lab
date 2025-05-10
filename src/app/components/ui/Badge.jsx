import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Badge({ 
  children, 
  className = '', 
  variant = 'default' 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return 'bg-white text-accent font-headline italic text-md w-fit';
      case 'secondary':
        return 'bg-gray-200 text-gray-800 italic text-md w-fit';
      default:
        return 'bg-white text-accent italic font-headline text-md w-fit';
    }
  };

  return (
    <div className={twMerge(
      'inline-block px-3 py-2 text-sm font-bold uppercase', 
      getVariantStyles(), 
      className
    )}>
      {children}
    </div>
  );
}