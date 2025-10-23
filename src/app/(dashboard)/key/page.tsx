import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthenticatedPage from "./authenticatedpage";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  return <AuthenticatedPage />;
}
