import { motion } from "framer-motion";
import { useState } from "react";
import { type Card } from "@shared/schema";
import { RotateCw, GraduationCap } from "lucide-react";

interface FlashcardProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
}

export function Flashcard({ card, isFlipped, onFlip }: FlashcardProps) {
  return (
    <div 
      className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-w-2xl mx-auto cursor-pointer perspective-1000 group"
      onClick={onFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* FRONT */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        >
          <div className="h-full w-full bg-card rounded-3xl border border-border shadow-xl shadow-black/5 p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wider uppercase">
                Term
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                {card.term}
              </h2>
              <p className="text-muted-foreground text-sm font-medium flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <RotateCw className="w-4 h-4" />
                Click to flip
              </p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 backface-hidden rotate-y-180"
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="h-full w-full bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-3xl shadow-xl shadow-primary/25 p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-white/20" />
            <div className="absolute bottom-12 left-12 w-8 h-8 rounded-full bg-white/10" />
            
            <div className="relative z-10 w-full max-w-lg">
              <div className="flex justify-center mb-6">
                 <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wider uppercase backdrop-blur-md border border-white/10">
                   {card.category}
                </span>
              </div>
              
              <p className="text-lg sm:text-2xl font-medium leading-relaxed font-sans text-white/95">
                {card.definition}
              </p>

              <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-center gap-2 text-white/60 text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>Definition</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
