import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-[#00aa53] text-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Viktoria 03 Logo" 
            width={40} 
            height={40}
            className="mr-2"
          />
          <div>
            <h1 className="font-bold text-xl">Viktoria 03</h1>
            <p className="text-xs">Fussball e.V.</p>
          </div>
        </Link>
      </div>
      <button className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/news" className="hover:underline">News</Link></li>
          <li><Link href="/teams" className="hover:underline">Teams</Link></li>
          <li><Link href="/schedule" className="hover:underline">Spielplan</Link></li>
          <li><Link href="/contact" className="hover:underline">Kontakt</Link></li>
        </ul>
      </nav>
    </header>
  );
}