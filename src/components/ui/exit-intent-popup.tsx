"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

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
          message: `New email signup:\n\n${email}\n\nSource: Exit Intent Popup`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {status === "success" ? (
            <>
              <h3 className="font-serif text-2xl mb-2">You're on the list!</h3>
              <p className="text-muted-foreground">
                Check your inbox for the guide.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-2xl mb-2">Wait, before you go...</h3>
              <p className="text-muted-foreground mb-6">
                Get our free guide: <strong className="text-foreground">"5 Signs Your Child Is Becoming AI-Dependent"</strong> and what to do about it.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
                <Button type="submit" className="w-full h-12" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Me the Guide"}
                </Button>
              </form>

              {status === "error" && (
                <p className="text-destructive text-sm mt-3">Something went wrong. Please try again.</p>
              )}

              <p className="text-xs text-muted-foreground mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
