"use client";

import { motion } from "framer-motion";
import type { TreatmentItem } from "@/types/treatment";

type Props = { item: TreatmentItem; categoryLabel: string };

export function TreatmentDetails({ item, categoryLabel }: Props) {
  return (
    <motion.div
      className="interactive-detail treatment-detail-panel"
      key={item.id}
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      aria-live="polite"
    >
      <span>{categoryLabel}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div className="detail-actions">
        <a href="#contact">Записаться на консультацию</a>
        <a href="https://wa.me/996706102080" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </motion.div>
  );
}
