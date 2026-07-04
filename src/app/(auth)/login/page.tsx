import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AuthForm } from "../auth-form";
import { logIn } from "../actions";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Log in</h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            Welcome back to paper.
          </p>
        </div>

        <AuthForm action={logIn} submitLabel="Log in" />

        <p className="text-center text-sm text-black/60 dark:text-white/60">
          No account?{" "}
          <Link href="/signup" className="underline underline-offset-2">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
