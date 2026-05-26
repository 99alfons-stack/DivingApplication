import { useState } from "react";
import { MessageSquare, Plus, Search, Send, ThumbsUp } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialog";
import { Input } from "../Components/ui/input";
import { Textarea } from "../Components/ui/textarea";

interface ForumThread {
  id: number;
  title: string;
  author: string;
  date: string;
  replies: number;
  likes: number;
  preview: string;
  category: string;
}

export function Forum() {
  const [threads, setThreads] = useState<ForumThread[]>([
    {
      id: 1,
      title: "Basta dykplatser i Thailand?",
      author: "Anna_dykare",
      date: "2026-02-15",
      replies: 23,
      likes: 45,
      preview: "Jag planerar en dykresa till Thailand i april. Vilka platser rekommenderar ni?",
      category: "Resmal",
    },
    {
      id: 2,
      title: "Tips pa kamera for undervattensfilm",
      author: "Erik_foto",
      date: "2026-02-14",
      replies: 15,
      likes: 32,
      preview: "Funderar pa att kopa min forsta undervattenskamera. Budget omkring 10 000 kr.",
      category: "Utrustning",
    },
    {
      id: 3,
      title: "Cenote-dykning i Mexico - erfarenheter?",
      author: "Maria_explorer",
      date: "2026-02-13",
      replies: 18,
      likes: 28,
      preview: "Nagon som har dykt i cenoterna? Hur ar sikten och vilken niva kravs?",
      category: "Resmal",
    },
    {
      id: 4,
      title: "Rekommendation: dykdator",
      author: "Johan_tech",
      date: "2026-02-12",
      replies: 31,
      likes: 67,
      preview: "Efter manga ars dykning ar det dags att uppgradera dykdatorn. Vad anvander ni?",
      category: "Utrustning",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [newThread, setNewThread] = useState({
    title: "",
    category: "",
    content: "",
  });

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();

    const preview =
      newThread.content.length > 100
        ? `${newThread.content.substring(0, 100)}...`
        : newThread.content;

    const thread: ForumThread = {
      id: Date.now(),
      title: newThread.title,
      author: "Du",
      date: new Date().toISOString().split("T")[0],
      replies: 0,
      likes: 0,
      preview,
      category: newThread.category,
    };

    setThreads([thread, ...threads]);
    setNewThread({ title: "", category: "", content: "" });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-blue-600 px-6 py-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl">Forum</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                <Plus className="mr-2 h-4 w-4" />
                Ny trad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Skapa nytt inlägg</DialogTitle>
                <DialogDescription>Dela dina frågor eller erfarenheter med andra dykare</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateThread} className="mt-4 space-y-4">
                <Input
                  type="text"
                  placeholder="Titel pa inlagg"
                  value={newThread.title}
                  onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                  required
                />

                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={newThread.category}
                  onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
                  required
                >
                  <option value="">Välj kategori</option>
                  <option value="Resmal">Resmål</option>
                  <option value="Utrustning">Utrustning</option>
                  <option value="Teknik">Teknik</option>
                  <option value="Utbildning">Utbildning</option>
                  <option value="Ovrigt">Övrigt</option>
                </select>

                <Textarea
                  placeholder="Skriv ditt inlagg..."
                  value={newThread.content}
                  onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                  rows={6}
                  required
                />

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 h-4 w-4" />
                  Publicera
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Sok i forum..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/60"
          />
        </div>
      </div>

      <div className="overflow-x-auto px-6 py-4">
        <div className="flex gap-2">
          {["Alla", "Resmal", "Utrustning", "Teknik", "Utbildning"].map((category) => (
            <button
              key={category}
              className="whitespace-nowrap rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="space-y-3">
          {filteredThreads.map((thread) => (
            <Card key={thread.id} className="cursor-pointer border border-gray-100 p-4 transition-shadow hover:shadow-md">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600">
                      {thread.category}
                    </span>
                  </div>
                  <h3 className="mb-1 text-gray-900">{thread.title}</h3>
                  <p className="mb-2 text-sm text-gray-600">{thread.preview}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{thread.author}</span>
                    <span>{thread.date}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MessageSquare className="h-4 w-4" />
                  <span>{thread.replies}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{thread.likes}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredThreads.length === 0 && (
          <div className="py-12 text-center">
            <MessageSquare className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <p className="text-gray-500">Inga trådar hittades</p>
          </div>
        )}
      </div>
    </div>
  );
}
