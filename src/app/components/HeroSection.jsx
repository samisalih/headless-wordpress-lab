import Image from 'next/image';
import Badge from './ui/Badge';
import Headline from './ui/Headline';

export default function HeroSection({ image, alt, category, title }) {
  return (
    <section className="relative h-[837px] flex items-center">
      <div className="absolute inset-0 z-0">
        {/* <Image 
          src={image} 
          alt={alt} 
          fill
          style={{ objectFit: 'cover' }}
          priority
        /> */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center max-w-[820px] flex flex-col items-center gap-2">
        <Badge>
          {category}
        </Badge>
        <Headline level={2} title={title} fake={false} />
      </div>
    </section>
  );
}
