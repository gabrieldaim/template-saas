import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Protected Dashboard</h1>
            <p>{session?.user?.email ? "Email do usuário: " + session?.user?.email : "Usuário não está logado"}</p>
            <p>{session?.user?.name ? "Nome do usuário: " + session?.user?.name : "Usuário não está logado"}</p>
            {session?.user?.email && (
                <form action={handleAuth}>
                    <button type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >Sign out

                    </button>
                </form>

            )}
            <Link href={"/pagamentos"}>
            <button className="border rounded-md px-1">Pagamentos</button>
            </Link>
        </div>)
}