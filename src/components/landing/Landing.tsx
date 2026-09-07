"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/AuthDialog";

export function Landing() {
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function enterWorkspace() {
    setAuthOpen(true);
  }

  return (
    <>
      <main className="min-h-screen bg-linen text-black">
        <header className="border-b border-black/10">
          <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl tracking-tight"
            >
              NoteDrop
            </button>

            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#about"
                className="text-sm text-black/70 transition-colors hover:text-darkslate"
              >
                About
              </a>

              <a
                href="#how-it-works"
                className="text-sm text-black/70 transition-colors hover:text-darkslate"
              >
                How it works
              </a>

              <Button
                onClick={enterWorkspace}
                variant="outline"
                className="h-10 rounded-[5px] border-black bg-transparent px-5 text-black hover:bg-black hover:text-white"
              >
                Sign in
              </Button>
            </nav>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-black/10 md:hidden"
              >
                <div className="grid gap-4 px-5 py-5">
                  <a
                    href="#about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm"
                  >
                    About
                  </a>

                  <a
                    href="#how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm"
                  >
                    How it works
                  </a>

                  <Button
                    onClick={enterWorkspace}
                    className="h-11 rounded-[5px] bg-darkslate text-white hover:bg-darkslate/90"
                  >
                    Sign in
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </header>

        <section className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <p className="mb-5 text-sm uppercase tracking-[0.18em] text-darkslate">
              Collaborative research
            </p>

            <h1 className="max-w-4xl text-5xl font-normal leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
              Research that
              <br />
              stays together.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-black/70 sm:text-lg">
              Keep papers, ideas, findings, questions, and conversations in
              one shared research space.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={enterWorkspace}
                className="group h-12 rounded-[5px] bg-darkslate px-6 text-white hover:bg-darkslate/90"
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <Button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="outline"
                className="h-12 rounded-[5px] border-black bg-transparent px-6 text-black hover:bg-black hover:text-white"
              >
                See how it works
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="grid gap-3">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="min-h-[180px] rounded-[5px] border border-black bg-white p-6"
              >
                <p className="text-sm text-black/50">01</p>
                <h2 className="mt-12 text-2xl tracking-tight">Collect</h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-black/60">
                  Keep the papers your team is actually working with.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[180px] rounded-[5px] border border-black bg-darkslate p-6 text-white"
                >
                  <p className="text-sm text-white/60">02</p>
                  <h2 className="mt-12 text-2xl tracking-tight">Connect</h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Capture shared findings and your own thoughts.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[180px] rounded-[5px] border border-black bg-chocolate p-6 text-white"
                >
                  <p className="text-sm text-white/70">03</p>
                  <h2 className="mt-12 text-2xl tracking-tight">Understand</h2>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    Ask questions across the research your team has collected.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="about"
          className="border-t border-black/10 px-5 py-20 sm:px-8 lg:px-12"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-sm uppercase tracking-[0.18em] text-darkslate">
                About NoteDrop
              </p>
            </div>

            <div className="md:col-span-8">
              <p className="max-w-4xl text-3xl leading-tight tracking-tight sm:text-4xl">
                A research workspace where your team's notes become part of
                the knowledge surrounding the papers.
              </p>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-black/10 px-5 py-20 sm:px-8 lg:px-12"
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-px overflow-hidden border border-black bg-black sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "Create a room"],
              ["02", "Bring in papers"],
              ["03", "Build shared knowledge"],
            ].map(([number, title]) => (
              <div
                key={number}
                className="bg-linen p-7 sm:min-h-[220px]"
              >
                <p className="text-sm text-black/45">{number}</p>
                <h3 className="mt-20 text-2xl tracking-tight">{title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        onSuccess={() => {
          window.location.href = "/workspace";
        }}
      />
    </>
  );
}