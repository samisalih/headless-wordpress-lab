import Image from 'next/image';
import Link from 'next/link';

import Button from './ui/Button';

export default function MatchResult() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Letzter Spieltag</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-center mb-6 md:mb-0">
              <div className="w-24 h-24 relative mb-3">
                {/* <Image 
                  src="" 
                  alt="SV Viktoria Wappen" 
                  fill
                  style={{ objectFit: 'contain' }}
                /> */}
              </div>
              <span className="text-lg font-semibold font-sans">SV Viktoria</span>
              <div className="text-7xl font-bold font-headline">7</div>
            </div>
            
            {/* Away Team */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 relative mb-3">
                {/* <Image 
                  src="" 
                  alt="SpVgg Diepersdorf 37 Wappen" 
                  fill
                  style={{ objectFit: 'contain' }}
                /> */}
              </div>
              <span className="text-lg font-semibold">SpVgg Diepersdorf 37</span>
              <div className="text-7xl font-bold font-headline">1</div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button kind="primary" to="home">Spielbericht</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
