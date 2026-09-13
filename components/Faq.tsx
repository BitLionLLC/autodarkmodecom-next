"use client";

import { useState } from "react";
import { SectionHeading } from "./Features";
import { FAQS } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-line bg-ink-sunken">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="FAQ" title="The things people ask first." />

        <div className="mt-12 divide-y divide-line border-y border-line">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full cursor-pointer items-start gap-4 py-5 text-left transition-colors hover:text-gold"
                  >
                    <span className="flex-1 font-medium leading-snug tracking-tight text-pretty">
                      {faq.q}
                    </span>
                    <span
                      className={`mt-0.5 shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20" className="size-5">
                        <path
                          d="M10 4.5v11M4.5 10h11"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                >
                  <p className="pb-6 pr-10 text-sm leading-relaxed text-muted text-pretty">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
