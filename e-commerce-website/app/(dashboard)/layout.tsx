import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/dasboard/sidebar";
import Header from "@/components/dasboard/header";
import { Toaster } from "sonner";
import { getUser } from "@/lib/actions/users";
import { authUserId } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    template: "Dashboard | %s",
    default: "Dashboard",
  },
  description: "This is the description for the dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await authUserId();
  const user = await getUser(userId);
  const role = user.publicMetadata.role;

  return (
    <html>
      <body>
        <div className="flex">
          <Sidebar role={role} />
          <div className="grow p-3 w-3xl md:w-4xl lg:w-5xl xl:w-6xl overflow-x-hidden">
            <Header />
            {children}
            <Toaster richColors={true} />
          </div>
        </div>
      </body>
    </html>
  );
}
