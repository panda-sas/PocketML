import { useCards, useDeleteCard } from "@/hooks/use-cards";
import { Navigation } from "@/components/Navigation";
import { CreateCardDialog } from "@/components/CreateCardDialog";
import { EditCardDialog } from "@/components/EditCardDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Loader2, 
  Trash2, 
  Search, 
  Inbox,
  ArrowUpDown,
  Edit
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function List() {
  const { data: cards, isLoading } = useCards();
  const deleteCard = useDeleteCard();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: number) => {
    deleteCard.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Card deleted",
          description: "The term has been removed from your library.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete the card.",
          variant: "destructive",
        });
      }
    });
  };

  const filteredCards = cards?.filter(card => 
    card.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 pt-20">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Library</h1>
            <p className="text-muted-foreground mt-2">Manage your collection of ML concepts</p>
          </div>
          <div className="flex-shrink-0">
            <CreateCardDialog />
          </div>
        </div>

        {/* Search & Stats Bar */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search terms, definitions, or categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl bg-card border-border/50 focus-visible:ring-primary/20"
            />
          </div>
          <div className="bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center h-12 px-4 gap-2 text-primary font-medium">
            <Inbox className="h-4 w-4" />
            <span>{cards?.length || 0} Total Cards</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Loading library...</p>
            </div>
          ) : filteredCards?.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">No cards found</h3>
              <p className="text-muted-foreground max-w-sm">
                {searchTerm 
                  ? "Try adjusting your search terms to find what you're looking for."
                  : "Get started by adding your first flashcard using the button above."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[25%] font-semibold">
                      <div className="flex items-center gap-2">Term <ArrowUpDown className="h-3 w-3" /></div>
                    </TableHead>
                    <TableHead className="w-[50%] font-semibold">Definition</TableHead>
                    <TableHead className="w-[15%] font-semibold">Category</TableHead>
                    <TableHead className="w-[10%] text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCards?.map((card) => (
                    <TableRow key={card.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-foreground">
                        {card.term}
                      </TableCell>
                      <TableCell className="text-muted-foreground line-clamp-2 leading-relaxed">
                        {card.definition}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                          {card.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <EditCardDialog 
                            card={card}
                            trigger={
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-display">Delete Card</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete <span className="font-semibold text-foreground">"{card.term}"</span>? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl border-2">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(card.id)}
                                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {deleteCard.isPending ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
