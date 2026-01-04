"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlickeringGrid, useMediaQuery } from "./flickering-footer";

export function Footer() {
  const tablet = useMediaQuery("(max-width: 1024px)");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      // Call Web3Forms directly from browser (required for free plan)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "c00ad907-df29-4e5a-97f3-ab287a4db712",
          subject: `New Artemis Signup: ${email}`,
          from_name: "Artemis Website",
          email: email,
          message: `New email signup:\n\n${email}\n\nSource: Newsletter`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer id="footer" className="w-full pb-20 md:pb-0">
      {/* Email capture section */}
      <div className="bg-muted/50 py-12">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl mb-2">Get STEM Learning Tips</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Weekly tips on helping students build real understanding. No spam, unsubscribe anytime.
          </p>
          {status === "success" ? (
            <p className="text-accent font-medium py-3">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="h-11" disabled={status === "loading"}>
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          )}
          {status === "error" && (
            <p className="text-destructive text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between p-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-start justify-start gap-y-4 max-w-xs">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl tracking-tight">Artemis</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            The Socratic AI tutor. Building real understanding, one question at a time.
          </p>
        </div>
        <div className="flex gap-12 mt-8 md:mt-0">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Product</span>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</Link>
            <Link href="#for-parents" className="text-sm text-muted-foreground hover:text-foreground">For Parents</Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Company</span>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Legal</span>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-xs text-muted-foreground border-t border-border/50">
        © {new Date().getFullYear()} Artemis. All rights reserved.
      </div>
      <div className="w-full h-32 md:h-48 relative z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background z-10 from-40%" />
        <div className="absolute inset-0 mx-6">
          <FlickeringGrid
            text={tablet ? "Artemis" : "Learn by thinking"}
            fontSize={tablet ? 60 : 80}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#2F5D8C"
            maxOpacity={0.3}
            flickerChance={0.1}
          />
        </div>
      </div>
    </footer>
  );
}
