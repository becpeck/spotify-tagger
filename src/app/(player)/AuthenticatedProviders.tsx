import TRPCReactProvider from "@/trpc/TRPCReactProvider";
import { AppStoreProvider } from "@/stores/AppStoreProvider";

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
