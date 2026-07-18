"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Check, X } from "lucide-react";
import type { TreatmentItem } from "@/types/treatment";

type Props = {
  item: TreatmentItem | null;
  categoryLabel: string;
  onClose: () => void;
};

export function TreatmentInfoSheet({ item, categoryLabel, onClose }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!item) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [item, onClose]);

  const duration = reduceMotion ? 0 : 0.28;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="treatment-sheet-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
        >
          <button className="treatment-sheet-backdrop" type="button" onClick={onClose} aria-label="Закрыть описание" />
          <motion.aside
            ref={panelRef}
            className="treatment-info-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="treatment-sheet-title"
            initial={reduceMotion ? false : { x: "104%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "104%" }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="treatment-sheet-header">
              <div>
                <span>{categoryLabel}</span>
                <h3 id="treatment-sheet-title">{item.title}</h3>
              </div>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Закрыть">
                <X size={22} aria-hidden="true" />
              </button>
            </header>

            <div className="treatment-sheet-body">
              <section>
                <span className="treatment-sheet-kicker">Что это</span>
                <p className="treatment-sheet-lead">{item.description}</p>
              </section>

              <section>
                <span className="treatment-sheet-kicker">На что обратить внимание</span>
                <ul className="treatment-symptoms">
                  {item.symptoms.map((symptom) => (
                    <li key={symptom}><Check size={17} aria-hidden="true" />{symptom}</li>
                  ))}
                </ul>
              </section>

              {item.urgentNote && (
                <div className="treatment-urgent-note">
                  <AlertCircle size={20} aria-hidden="true" />
                  <p>{item.urgentNote}</p>
                </div>
              )}

              <section>
                <span className="treatment-sheet-kicker">Как уточняют диагноз</span>
                <p>{item.diagnostics}</p>
              </section>

              <section>
                <span className="treatment-sheet-kicker">Подход к лечению</span>
                <p>{item.text}</p>
              </section>

              <p className="treatment-disclaimer">
                Информация носит ознакомительный характер. Диагноз и план лечения определяются после очного осмотра.
              </p>
            </div>

            <footer className="treatment-sheet-actions">
              <a href="#contact" onClick={onClose}>Записаться <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href="https://wa.me/996706102080" target="_blank" rel="noreferrer">WhatsApp</a>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
