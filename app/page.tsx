import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession()

  return (
    <h1 className="text-sm">Selamat datang <span className="text-sm text-slate-600">, {session?.user?.name}</span></h1>
  );
}
