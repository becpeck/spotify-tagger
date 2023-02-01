import { GetServerSideProps } from 'next';
import { useSession, getSession, signIn, signOut } from 'next-auth/react';

export default function Home(props: Props) {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div>
        <div>AUTHENTICATED PLACEHOLDER</div>
        <button onClick={() => signOut()}>Log Out</button>
        <p>Authenticated: {`${props.authenticated}`}</p>
        <p>Username: {`${session?.user?.name}`}</p>
        <p>Session JSON: {JSON.stringify(session)}</p>
        <p>Access Token: {props.accessToken}</p>
        <ul>
          {
            props.playlists?.map((playlist: any) => (
              <li key={playlist.id}>{playlist.name}</li>
            ))
          }
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <div>UNAUTHENTICATED PLACEHOLDER</div>
        <button onClick={() => signIn('spotify')}>Log In</button>
        <p>Authenticated: {`${props.authenticated}`}</p>
      </div>
    );
  }
};

type Props = {
  authenticated: boolean;
  accessToken?: 'none' | 'expired' | 'valid';
  playlists?: unknown[];
  error?: unknown;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const session = await getSession({ req });
  console.log(`\nINSIDE getServerSideProps, `);
  console.log(session);

  if (!session || !session.user) {
    return {
      props: { authenticated: false }
    };
  } else if (!session.user.accessToken) {
    return {
      props: {
        authenticated: true,
        accessToken: 'none',
      }
    }
  } else if (session.user.expiresAt! <= Math.floor(Date.now() / 1000)) {
    return {
      props: {
        authenticated: true,
        accessToken: 'expired',
      }
    }
  } else {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });
    const data = await response.json();

    console.log(`GOT DATA`)
    console.log(Object.keys(data))
    if (response.ok) {
      const playlists = data.items.map((item: { id: string, name: string, [ key: string ]: unknown }) => (
        { id: item.id, name: item.name }
      ))
      return { 
        props: {
          authenticated: true,
          accessToken: 'valid',
          playlists: playlists
        }
      }
    } else {
      const error = data;
      console.error(error)
      return {
        props: {
          authenticated: true,
          accessToken: 'valid',
          error: error,
        }
      }
    }
  }
};
