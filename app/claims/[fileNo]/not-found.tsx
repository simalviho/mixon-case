import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ClaimDetailNotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10">
      <section className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex rounded-2xl bg-amber-50 p-3">
          <AlertCircle className="size-6 text-amber-700" />
        </div>

        <p className="text-sm font-medium text-slate-500">
          Claim details unavailable
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          We can’t access the details for this claim right now.
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
          This demo currently supports the detailed orchestrator flow only for
          the example claim provided in the case study. Please go back and open
          the supported sample claim to continue.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" />
            Back to claims
          </Link>

          <Link
            href="/claims/9239182380"
            className="inline-flex h-11 items-center rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open supported sample claim
          </Link>
        </div>
      </section>
    </main>
  );
}
