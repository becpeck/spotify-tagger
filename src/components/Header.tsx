import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
	const { data: session, status } = useSession();

	return (
		<nav>
			{ 
				status && session
					? <div>
							{session.user?.name}
							<button onClick={() => signOut()}></button>
						</div>
					: <Link href='/api/auth/signin'>
							<a>Log In</a>
						</Link>
			}
		</nav>
	)
}