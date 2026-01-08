import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCardSchema, type InsertCard } from "@shared/schema";
import { useCreateCard } from "@/hooks/use-cards";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreateCardDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createCard = useCreateCard();
  
  const form = useForm<InsertCard>({
    resolver: zodResolver(insertCardSchema),
    defaultValues: {
      term: "",
      definition: "",
      category: "",
    },
  });

  const onSubmit = (data: InsertCard) => {
    createCard.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast({
          title: "Success",
          description: "New flashcard created successfully.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Add New Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Create Flashcard</DialogTitle>
          <DialogDescription>
            Add a new term to your learning library.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-semibold">Term</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Supervised Learning" 
                      className="rounded-xl border-2 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-semibold">Category</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Core Concepts" 
                      className="rounded-xl border-2 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="definition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-semibold">Definition</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explain the concept simply..." 
                      className="min-h-[120px] rounded-xl border-2 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl border-2">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createCard.isPending}
                className="rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                {createCard.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Card"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
