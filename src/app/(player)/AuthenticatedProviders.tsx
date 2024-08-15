import TRPCReactProvider from "@/lib/trpc/TRPCReactProvider";
import { AppStoreProvider } from "@/lib/stores/AppStoreProvider";

export default function AuthenticatedProviders({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string;
}) {
  return (
    <TRPCReactProvider cookies={cookies}>
      <AppStoreProvider>{children}</AppStoreProvider>
    </TRPCReactProvider>
  );
}
