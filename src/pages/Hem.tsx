import { MapPin, TrendingUp, Users, Waves } from "lucide-react";
import { ImageWithFallback } from "../Components/figma/ImageWithFallback";
import { Card } from "../Components/ui/card";

export function Hem() {
  const stats = [
    { icon: MapPin, label: "Dykplatser", value: "1,234" },
    { icon: TrendingUp, label: "Loggade dyk", value: "45" },
    { icon: Users, label: "Dykare", value: "8,567" },
  ];

  const recentDives = [
    { location: "Similan Islands, Thailand", depth: "28m", date: "2026-02-10" },
    { location: "Great Barrier Reef, Australien", depth: "22m", date: "2026-01-28" },
    { location: "Cenotes, Mexico", depth: "15m", date: "2026-01-15" },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 px-6 pb-12 pt-8 text-white">
        <div className="mb-6 flex items-center gap-3">
          <Waves className="h-10 w-10" />
          <h1 className="text-3xl">DykLogg</h1>
        </div>
        <p className="text-blue-50">Utforska varldens basta dykplatser</p>
      </div>

      <div className="-mt-8 px-6">
        <div className="mb-6 grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <Icon className="mb-2 h-5 w-5 text-blue-600" />
                <div className="mb-1 text-2xl text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="mb-6">
          <h2 className="mb-3 text-xl text-gray-900">Upptack nya platser</h2>
          <div className="relative h-48 overflow-hidden rounded-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1682957205538-7ba9957b01a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3ViYSUyMGRpdmluZyUyMHVuZGVyd2F0ZXIlMjBvY2VhbnxlbnwxfHx8fDE3NzEzMTA2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Scuba diving underwater"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="mb-1 text-xl">Tropiska korallrev</h3>
              <p className="text-sm text-white/90">Perfekt for alla nivaer</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 text-xl text-gray-900">Senaste dyken</h2>
          <div className="space-y-3">
            {recentDives.map((dive, idx) => (
              <Card key={idx} className="border border-gray-100 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-gray-900">{dive.location}</h3>
                  <span className="text-sm text-blue-600">{dive.depth}</span>
                </div>
                <p className="text-sm text-gray-600">{dive.date}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
