import { useState, useEffect } from "react";
import { useCards } from "@/hooks/use-cards";
import { Flashcard } from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { EditCardDialog } from "@/components/EditCardDialog";
import { Navigation } from "@/components/Navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  Shuffle, 
  RefreshCw,
  Loader2,
  AlertCircle,
  Edit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Practice() {
  const { data: cards, isLoading, error } = useCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  // Initialize order when cards load
  useEffect(() => {
    if (cards?.length) {
      setShuffledIndices(Array.from({ length: cards.length }, (_, i) => i));
    }
  }, [cards]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % (cards?.length || 1));
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + (cards?.length || 1)) % (cards?.length || 1));
    }, 200);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const newIndices = [...shuffledIndices];
      for (let i = newIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newIndices[i], newIndices[j]] = [newIndices[j], newIndices[i]];
      }
      setShuffledIndices(newIndices);
      setCurrentIndex(0);
    }, 200);
  };

  const currentCardIndex = shuffledIndices[currentIndex];
  const currentCard = cards?.[currentCardIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading concepts...</p>
        </div>
      </div>
    );
  }

  if (error || !cards) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md text-center p-8 rounded-2xl bg-destructive/5 border border-destructive/20">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold text-destructive mb-2">Failed to load cards</h2>
          <p className="text-muted-foreground mb-6">Something went wrong while fetching your flashcards.</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-destructive/20 hover:bg-destructive/10">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-4">
          <div className="text-center max-w-lg">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">No cards yet</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your library is empty. Switch to the Library view to add your first machine learning concept!
            </p>
            <Button asChild size="lg" className="rounded-full px-8 text-lg font-semibold">
              <a href="/list">Go to Library</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 pt-24 relative overflow-hidden">
        {/* Ambient background blur */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10" />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-12">
          
          <div className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground px-2">
            <span>Card {currentIndex + 1} of {cards.length}</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Study Mode</span>
              {currentCard && (
                <EditCardDialog 
                  card={currentCard} 
                  trigger={
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2 hover:bg-background/20">
                      <Edit className="h-3 w-3" />
                    </Button>
                  }
                />
              )}
            </div>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {currentCard && (
                <Flashcard 
                  key={currentCard.id}
                  card={currentCard} 
                  isFlipped={isFlipped} 
                  onFlip={() => setIsFlipped(!isFlipped)} 
                />
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 md:gap-6 bg-card/50 backdrop-blur-sm p-2 rounded-2xl border border-border/50 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="h-12 w-12 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleShuffle}
              className="h-12 gap-2 rounded-xl px-6 font-medium border-2 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all"
            >
              <Shuffle className="h-5 w-5" />
              <span className="hidden sm:inline">Shuffle</span>
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={handleNext}
              className="h-12 w-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Keyboard hint */}
          <p className="text-xs text-muted-foreground/60 hidden md:block">
            Tip: Click card to flip • Use arrows to navigate
          </p>
        </div>
      </main>
    </div>
  );
}
