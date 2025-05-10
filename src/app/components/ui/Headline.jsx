import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Headline({ 
  level = 1, 
  title, 
  className = '', 
  fake = false,
  color = 'text-white'
}) {
  const getHeadingStyles = () => {
    const baseStyles = `font-bold ${color}`;
    
    switch (level) {
      case 1:
        return `text-[40px] leading-[120%] md:text-[56px] md:leading-[120%] ${baseStyles}`;
      case 2:
        return `text-[36px] leading-[120%] md:text-[48px] md:leading-[120%] ${baseStyles}`;
      case 3:
        return `text-[32px] leading-[120%] md:text-[40px] md:leading-[120%] ${baseStyles}`;
      case 4:
        return `text-[24px] leading-[140%] md:text-[32px] md:leading-[130%] ${baseStyles}`;
      case 5:
        return `text-[20px] leading-[140%] md:text-[24px] md:leading-[140%] ${baseStyles}`;
      case 6:
        return `text-[18px] leading-[140%] md:text-[20px] md:leading-[140%] ${baseStyles}`;
      default:
        return `text-[40px] leading-[120%] md:text-[56px] md:leading-[120%] ${baseStyles}`;
    }
  };

  if (fake) {
    return (
      <div 
        className={twMerge(getHeadingStyles(), className)} 
        role="heading" 
        aria-level={level}
      >
        {title}
      </div>
    );
  }
  
  const HeadingTag = `h${level}`;
  return (
    <HeadingTag className={twMerge(getHeadingStyles(), className)}>
      {title}
    </HeadingTag>
  );
}
