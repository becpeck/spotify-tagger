import { GetServerSideProps } from 'next';
import { useSession, getSession, signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export default function Home(props: Props) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <div>AUTHENTICATED PLACEHOLDER</div>
        <button onClick={() => signOut()}>Log Out</button>
        <p>Authenticated: {`${props.authenticated}`}</p>
        <p>Username: {`${session?.user?.name}`}</p>
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
  session?: Session;
  authenticated: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
	const session = await getSession({ req });

  if (!session) {
    return {
      props: { authenticated: false }
    };
  } else {
    console.log(session);
  }

  return { props: { session: session, authenticated: true } };
};
