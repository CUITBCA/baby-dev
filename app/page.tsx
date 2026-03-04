import Link from "next/link";
import LandingPage from "@/components/landing/LandingPage";

export default function Home() {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          className="rounded-full border border-cyan-300/70 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-500/20 backdrop-blur transition hover:bg-cyan-500/20"
          href="/platform"
        >
          进入任务平台
        </Link>
      </div>
      <LandingPage />
    </>
  );
}
