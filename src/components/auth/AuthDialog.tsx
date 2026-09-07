"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { createUser } from "@/lib/api";
import { saveSession } from "@/lib/auth";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function AuthDialog({
  open,
  onOpenChange,
  onSuccess,
}: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError("Enter your email address.");
      return;
    }

    if (!cleanEmail.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const localName =
        cleanEmail.split("@")[0].replace(/[._-]/g, " ").trim() ||
        "Researcher";

      const user = await createUser(localName);

      saveSession({
        id: user.id,
        email: cleanEmail,
        name: user.name || localName,
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md border border-gainsboro bg-linen p-0 shadow-2xl">
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-2xl font-normal tracking-tight text-black">
              Welcome to NoteDrop
            </DialogTitle>

            <DialogDescription className="text-black/70">
              Continue to your research workspace.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
                className="h-12 rounded-[5px] border-gainsboro bg-white px-4 text-black placeholder:text-black/40 focus-visible:ring-darkslate"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={loading}
                  className="h-12 rounded-[5px] border-gainsboro bg-white px-4 pr-12 text-black placeholder:text-black/40 focus-visible:ring-darkslate"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black/50 transition-colors hover:text-darkslate"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error ? (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm text-chocolate"
                >
                  {error}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={loading}
              className="group h-12 w-full rounded-[5px] bg-darkslate text-white transition-all hover:bg-darkslate/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entering workspace
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-5 text-xs leading-relaxed text-black/50">
            Email/password authentication will be connected to the backend
            auth service. Google authentication is not enabled yet.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}