import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return children;
}
