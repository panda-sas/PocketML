import { Link, useLocation } from "wouter";
import { BrainCircuit, Library } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location === path;
    return `
      flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
      ${isActive 
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-semibold" 
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 font-medium"}
    `;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <BrainCircuit size={18} />
          </div>
          <span className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            PocketML
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href="/" className={getLinkClass("/")}>
            <BrainCircuit className="w-4 h-4" />
            <span className="hidden sm:inline">Practice</span>
          </Link>
          <Link href="/list" className={getLinkClass("/list")}>
            <Library className="w-4 h-4" />
            <span className="hidden sm:inline">Library</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
