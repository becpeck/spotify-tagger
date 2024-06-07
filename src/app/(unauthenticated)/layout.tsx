import { redirect } from "next/navigation";
import { auth } from "@/server/auth/auth";

export default async function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return <div>{children}</div>;
}
