import TRPCReactProvider from "@/trpc/TRPCReactProvider";
import { PlaybackStoreProvider } from "@/stores/PlaybackStoreProvider";

export default function AuthenticatedProviders({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string;
}) {
  return (
    <TRPCReactProvider cookies={cookies}>
      <PlaybackStoreProvider>{children}</PlaybackStoreProvider>
    </TRPCReactProvider>
  );
}
