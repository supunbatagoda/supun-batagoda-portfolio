import type { ReactNode } from "react";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

const grid =
  "repeating-linear-gradient(0deg,transparent 0 19px,rgba(230,232,236,0.04) 19px 20px), repeating-linear-gradient(90deg,transparent 0 19px,rgba(230,232,236,0.04) 19px 20px)";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: grid, backgroundSize: "40px 40px" }} />
      <div className="pointer-events-none absolute -right-32 -top-44 z-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(242,169,59,0.14),transparent_65%)] blur-[20px]" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
