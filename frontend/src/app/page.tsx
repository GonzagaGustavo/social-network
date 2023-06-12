import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  redirect("/feed");
}
