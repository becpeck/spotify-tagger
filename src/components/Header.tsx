// import React from 'react';
import Link from 'next/link';

export default function Header() {
	return (
    <header className="flex items-center px-4 py-4">
      <nav>
        <Link href="">
          <h1 className="text-xl font-semibold">Spotify Tagger</h1>
        </Link>
      </nav>
    </header>
	);
}
