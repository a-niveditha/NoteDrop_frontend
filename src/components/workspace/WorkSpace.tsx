"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Users,
  LogOut,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { clearSession, getSession, SessionUser } from "@/lib/auth";

export function Workspace() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      window.location.href = "/";
      return;
    }

    setUser(session);
  }, []);

  function logout() {
    clearSession();
    window.location.href = "/";
  }

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-linen">
        <div className="text-sm text-black/50">Loading workspace…</div>
      </main>
    );
  }

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-linen text-black">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden border-r border-black/10 lg:flex lg:flex-col">
          <div className="border-b border-black/10 p-6">
            <div className="text-xl tracking-tight">NoteDrop</div>
          </div>

          <div className="flex-1 p-4">
            <Button
              className="mb-6 h-11 w-full justify-start rounded-[5px] bg-darkslate text-white hover:bg-darkslate/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              New room
            </Button>

            <div className="space-y-1">
              {["Research", "Current project", "Reading list"].map(
                (room, index) => (
                  <button
                    key={room}
                    type="button"
                    className={`w-full rounded-[5px] px-3 py-2 text-left text-sm transition-colors ${
                      index === 0
                        ? "bg-black/5 text-darkslate"
                        : "text-black/60 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {room}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="border-t border-black/10 p-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-[5px] px-3 py-3 text-left hover:bg-black/5"
            >
              <Settings className="h-4 w-4 text-black/50" />
              <span className="text-sm">Settings</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-[5px] px-3 py-3 text-left text-black/60 hover:bg-black/5 hover:text-black"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Log out</span>
            </button>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="border-b border-black/10">
            <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 sm:px-8">
              <div className="min-w-0">
                <p className="truncate text-sm text-black/50">
                  Research room
                </p>
                <h1 className="truncate text-xl tracking-tight sm:text-2xl">
                  Welcome back, {user.name}
                </h1>
              </div>

              <Avatar className="h-10 w-10 rounded-[5px] border border-black/10">
                <AvatarFallback className="rounded-[5px] bg-darkslate text-sm text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <div className="grid gap-5 p-5 sm:p-8 xl:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="xl:col-span-8"
            >
              <Card className="rounded-[5px] border-black bg-white p-5 shadow-none sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-black/45">Active room</p>
                    <h2 className="mt-2 text-2xl tracking-tight">
                      Research
                    </h2>
                  </div>

                  <Button
                    variant="outline"
                    className="rounded-[5px] border-black"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    4
                  </Button>
                </div>

                <Separator className="my-6 bg-black/10" />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-[5px] bg-linen p-5">
                    <FileText className="h-5 w-5 text-darkslate" />
                    <p className="mt-8 text-2xl tracking-tight">0</p>
                    <p className="mt-1 text-sm text-black/50">Papers</p>
                  </div>

                  <div className="rounded-[5px] bg-linen p-5">
                    <MessageSquare className="h-5 w-5 text-chocolate" />
                    <p className="mt-8 text-2xl tracking-tight">0</p>
                    <p className="mt-1 text-sm text-black/50">Shared notes</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.07 }}
              className="xl:col-span-4"
            >
              <Card className="h-full rounded-[5px] border-black bg-darkslate p-5 text-white shadow-none sm:p-6">
                <p className="text-sm text-white/55">Quick access</p>

                <div className="mt-8 grid gap-2">
                  <Button className="justify-start rounded-[5px] bg-white text-black hover:bg-white/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add paper
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start rounded-[5px] text-white hover:bg-white/10 hover:text-white"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search research
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.14 }}
              className="xl:col-span-8"
            >
              <Card className="rounded-[5px] border-black bg-white p-5 shadow-none sm:p-6">
                <div className="mb-5">
                  <p className="text-sm text-black/45">Research papers</p>
                  <h2 className="mt-2 text-2xl tracking-tight">
                    Your reading space
                  </h2>
                </div>

                <div className="grid min-h-[220px] place-items-center rounded-[5px] border border-dashed border-black/15">
                  <div className="text-center">
                    <FileText className="mx-auto h-6 w-6 text-black/30" />
                    <p className="mt-4 text-sm text-black/50">
                      No papers added yet.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 rounded-[5px] border-black"
                    >
                      Add your first paper
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.21 }}
              className="xl:col-span-4"
            >
              <Card className="rounded-[5px] border-black bg-white p-5 shadow-none sm:p-6">
                <p className="text-sm text-black/45">AI research</p>
                <h2 className="mt-2 text-2xl tracking-tight">
                  Ask your room
                </h2>

                <div className="mt-8 rounded-[5px] bg-linen p-4">
                  <p className="text-sm leading-6 text-black/60">
                    Ask questions about the papers and shared knowledge in
                    this room.
                  </p>

                  <Button className="mt-5 w-full rounded-[5px] bg-chocolate text-white hover:bg-chocolate/90">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Open research chat
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}