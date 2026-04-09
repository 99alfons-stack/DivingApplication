import { useState } from "react";
import { Calendar, Clock, Image, Plus, Thermometer } from "lucide-react";
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
import { Label } from "../Components/ui/label";
import { Textarea } from "../Components/ui/textarea";

interface Dive {
  id: number;
  date: string;
  location: string;
  maxDepth: number;
  bottomTime: number;
  temperature: number;
  notes: string;
  image?: string;
}

export function Loggbok() {
  const [dives, setDives] = useState<Dive[]>([
    {
      id: 1,
      date: "2026-02-10",
      location: "Similan Islands, Thailand",
      maxDepth: 28,
      bottomTime: 45,
      temperature: 28,
      notes: "Sag en valhajs och mangder av koraller. Fantastiskt dyk!",
    },
    {
      id: 2,
      date: "2026-01-28",
      location: "Great Barrier Reef, Australien",
      maxDepth: 22,
      bottomTime: 52,
      temperature: 25,
      notes: "Underbart klart vatten. Manga tropiska fiskar.",
    },
  ]);

  const [newDive, setNewDive] = useState({
    date: "",
    location: "",
    maxDepth: "",
    bottomTime: "",
    temperature: "",
    notes: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dive: Dive = {
      id: Date.now(),
      date: newDive.date,
      location: newDive.location,
      maxDepth: Number(newDive.maxDepth),
      bottomTime: Number(newDive.bottomTime),
      temperature: Number(newDive.temperature),
      notes: newDive.notes,
    };

    setDives([dive, ...dives]);
    setNewDive({
      date: "",
      location: "",
      maxDepth: "",
      bottomTime: "",
      temperature: "",
      notes: "",
    });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="flex items-center justify-between bg-blue-600 px-6 py-6 text-white">
        <h1 className="text-2xl">Loggbok</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              <Plus className="mr-2 h-4 w-4" />
              Nytt dyk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Logga nytt dyk</DialogTitle>
              <DialogDescription>Fyll i informationen om ditt dyk nedan</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={newDive.date}
                  onChange={(e) => setNewDive({ ...newDive, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Plats</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="t.ex. Similan Islands, Thailand"
                  value={newDive.location}
                  onChange={(e) => setNewDive({ ...newDive, location: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="maxDepth">Maxdjup (m)</Label>
                  <Input
                    id="maxDepth"
                    type="number"
                    placeholder="28"
                    value={newDive.maxDepth}
                    onChange={(e) => setNewDive({ ...newDive, maxDepth: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bottomTime">Bottentid (min)</Label>
                  <Input
                    id="bottomTime"
                    type="number"
                    placeholder="45"
                    value={newDive.bottomTime}
                    onChange={(e) => setNewDive({ ...newDive, bottomTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="temperature">Temperatur (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="28"
                  value={newDive.temperature}
                  onChange={(e) => setNewDive({ ...newDive, temperature: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">Anteckningar</Label>
                <Textarea
                  id="notes"
                  placeholder="Beskriv ditt dyk..."
                  value={newDive.notes}
                  onChange={(e) => setNewDive({ ...newDive, notes: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="image">Ladda upp bild</Label>
                <div className="mt-2 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-400">
                  <Image className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">Klicka for att ladda upp</p>
                  <p className="mt-1 text-xs text-gray-500">eller dra och slapp</p>
                  <input id="image" type="file" accept="image/*" className="hidden" />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Spara dyk
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-blue-50 px-6 py-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl text-blue-600">{dives.length}</p>
            <p className="text-xs text-gray-600">Totalt dyk</p>
          </div>
          <div>
            <p className="text-2xl text-blue-600">
              {Math.round(dives.reduce((sum, dive) => sum + dive.maxDepth, 0) / dives.length || 0)}m
            </p>
            <p className="text-xs text-gray-600">Snitt djup</p>
          </div>
          <div>
            <p className="text-2xl text-blue-600">{dives.reduce((sum, dive) => sum + dive.bottomTime, 0)}min</p>
            <p className="text-xs text-gray-600">Total tid</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <h2 className="mb-4 text-lg text-gray-900">Alla dyk</h2>
        <div className="space-y-4">
          {dives.map((dive) => (
            <Card key={dive.id} className="border border-gray-100 p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="mb-1 text-gray-900">{dive.location}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{dive.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl text-blue-600">{dive.maxDepth}m</p>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{dive.bottomTime} min</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Thermometer className="h-4 w-4 text-gray-400" />
                  <span>{dive.temperature}°C</span>
                </div>
              </div>

              {dive.notes && <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">{dive.notes}</p>}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
