import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="bg-linear-to-br from-accent to-accent-darker text-white py-8">
        <div className="container mx-auto px-4">
          <div className="mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Viktoria 03 Fussball e.V. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </>
  );
}