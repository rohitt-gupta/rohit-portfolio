"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Shows the address in full — it's the fastest path for anyone who'd rather just read
 * it — and copies on click for everyone else.
 */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, denied permission) — the address is on
      // screen anyway, so there's nothing useful to say here.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group border-connection hover:border-accent inline-flex cursor-pointer items-center gap-2.5 rounded-md border px-3.5 py-2 transition-colors",
        className,
      )}
    >
      <span className="text-foreground font-mono text-[0.8125rem]">{SITE.email}</span>
      {copied ? (
        <IconCheck className="text-accent size-3.5" stroke={2} aria-hidden />
      ) : (
        <IconCopy
          className="text-faint group-hover:text-accent size-3.5"
          stroke={1.6}
          aria-hidden
        />
      )}
      <span className="sr-only" role="status">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
