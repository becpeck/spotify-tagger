import { signIn } from "@/server/auth/auth";
import LoginButton from "@/app/(unauthenticated)/login/LoginButton";

async function signInWithSpotify() {
  "use server";
  await signIn("spotify");
}

export default function Login() {
  return (
    <div className="flex flex-col gap-6 h-full items-center justify-center p-6">
      <h1 className="text-4xl font-bold">Spotify Tagger</h1>
      <form action={signInWithSpotify}>
        <LoginButton />
      </form>
    </div>
  );
}
