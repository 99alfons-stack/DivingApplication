import { useState } from "react";
import { Filter, MapPin, Star, X } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../Components/ui/sheet";
import { Slider } from "../Components/ui/slider";

interface DiveSite {
  id: number;
  name: string;
  country: string;
  lat: number;
  lng: number;
  depth: number;
  difficulty: "Nybörjare" | "Medel" | "Avancerad";
  temperature: number;
  rating: number;
  reviews: number;
}

const diveSites: DiveSite[] = [
  { id: 1, name: "Great Blue Hole", country: "Belize", lat: 17.3, lng: -87.5, depth: 124, difficulty: "Avancerad", temperature: 26, rating: 4.8, reviews: 342 },
  { id: 2, name: "Similan Islands", country: "Thailand", lat: 8.6, lng: 97.6, depth: 30, difficulty: "Medel", temperature: 28, rating: 4.7, reviews: 567 },
  { id: 3, name: "Great Barrier Reef", country: "Australien", lat: -18.3, lng: 147.7, depth: 25, difficulty: "Nybörjare", temperature: 25, rating: 4.9, reviews: 892 },
  { id: 4, name: "Blue Corner", country: "Palau", lat: 7.3, lng: 134.2, depth: 35, difficulty: "Avancerad", temperature: 27, rating: 4.9, reviews: 423 },
  { id: 5, name: "Cenote Dos Ojos", country: "Mexico", lat: 20.3, lng: -87.4, depth: 15, difficulty: "Nybörjare", temperature: 24, rating: 4.6, reviews: 278 },
];

export function Karta() {
  const [selectedSite, setSelectedSite] = useState<DiveSite | null>(null);
  const [maxDepth, setMaxDepth] = useState([150]);
  const [tempRange, setTempRange] = useState([15, 30]);
  const [difficulty, setDifficulty] = useState<string[]>([]);

  const filteredSites = diveSites.filter((site) => {
    if (site.depth > maxDepth[0]) return false;
    if (site.temperature < tempRange[0] || site.temperature > tempRange[1]) return false;
    if (difficulty.length > 0 && !difficulty.includes(site.difficulty)) return false;
    return true;
  });

  const toggleDifficulty = (diff: string) => {
    setDifficulty((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="flex items-center justify-between bg-blue-600 px-6 py-6 text-white">
        <h1 className="text-2xl">Varldskarta</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtrera dykplatser</SheetTitle>
              <SheetDescription>
                Filtrera dykplatser baserat pa djup, temperatur och svarighetsgrad
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div>
                <label className="mb-2 block text-sm text-gray-700">Maxdjup: {maxDepth[0]}m</label>
                <Slider value={maxDepth} onValueChange={setMaxDepth} max={150} min={10} step={5} className="mb-2" />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Temperatur: {tempRange[0]}°C - {tempRange[1]}°C
                </label>
                <Slider value={tempRange} onValueChange={setTempRange} max={35} min={5} step={1} className="mb-2" />
              </div>

              <div>
                <label className="mb-3 block text-sm text-gray-700">Svarighetsgrad</label>
                <div className="space-y-2">
                  {["Nybörjare", "Medel", "Avancerad"].map((diff) => (
                    <Button
                      key={diff}
                      onClick={() => toggleDifficulty(diff)}
                      variant={difficulty.includes(diff) ? "default" : "outline"}
                      className="w-full"
                    >
                      {diff}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setMaxDepth([150]);
                  setTempRange([15, 30]);
                  setDifficulty([]);
                }}
                variant="outline"
                className="w-full"
              >
                Rensa filter
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="relative h-[400px] overflow-hidden bg-blue-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
          {filteredSites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className="absolute -translate-x-1/2 -translate-y-full transform"
              style={{
                left: `${((site.lng + 180) / 360) * 100}%`,
                top: `${((90 - site.lat) / 180) * 100}%`,
              }}
            >
              <MapPin
                className={`h-8 w-8 drop-shadow-lg ${
                  selectedSite?.id === site.id ? "text-red-500" : "text-blue-600"
                }`}
                fill="currentColor"
              />
            </button>
          ))}
        </div>

        {selectedSite && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-white p-4 shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-lg text-gray-900">{selectedSite.name}</h3>
                  <p className="text-sm text-gray-600">{selectedSite.country}</p>
                </div>
                <button onClick={() => setSelectedSite(null)}>
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="mb-3 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-600">Djup</p>
                  <p className="text-blue-600">{selectedSite.depth}m</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Temp</p>
                  <p className="text-blue-600">{selectedSite.temperature}°C</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Niva</p>
                  <p className="text-sm text-blue-600">{selectedSite.difficulty}</p>
                </div>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="ml-1 text-sm text-gray-900">{selectedSite.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({selectedSite.reviews} recensioner)</span>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">Se detaljer</Button>
            </Card>
          </div>
        )}
      </div>

      <div className="px-6 pt-4">
        <h2 className="mb-3 text-lg text-gray-900">Dykplatser ({filteredSites.length})</h2>
        <div className="space-y-3">
          {filteredSites.map((site) => (
            <Card
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className="cursor-pointer border border-gray-100 p-4 transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="text-gray-900">{site.name}</h3>
                  <p className="text-sm text-gray-600">{site.country}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm text-gray-900">{site.rating}</span>
                </div>
              </div>

              <div className="flex gap-4 text-sm">
                <span className="text-blue-600">{site.depth}m</span>
                <span className="text-blue-600">{site.temperature}°C</span>
                <span className="text-blue-600">{site.difficulty}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
