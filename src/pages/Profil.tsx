import { Award, MapPin, Settings, Waves } from "lucide-react";
import { ImageWithFallback } from "../Components/figma/ImageWithFallback";
import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";

export function Profil() {
  const user = {
    name: "Erik Andersson",
    username: "@erikdykare",
    level: "Advanced Open Water",
    totalDives: 45,
    countries: 8,
    since: "2023",
  };

  const achievements = [
    { icon: Award, title: "Forsta dyk" },
    { icon: MapPin, title: "Globetrotter" },
    { icon: Waves, title: "Djupdykare" },
  ];

  const recentActivity = [
    { type: "dive", text: "Loggade ett dyk i Similan Islands", date: "2 dagar sedan" },
    { type: "forum", text: 'Kommenterade i "Basta dykplatser i Thailand?"', date: "5 dagar sedan" },
    { type: "dive", text: "Loggade ett dyk i Great Barrier Reef", date: "1 vecka sedan" },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 px-6 pb-16 pt-8 text-white">
        <div className="mb-4 flex justify-end">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-blue-400">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1647222887233-f933843cf5af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZpbmclMjBlcXVpcG1lbnQlMjBzY3ViYSUyMGdlYXJ8ZW58MXx8fHwxNzcxMzE2NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="mb-1 text-2xl">{user.name}</h1>
          <p className="mb-2 text-blue-100">{user.username}</p>
          <div className="rounded-full bg-blue-500/50 px-3 py-1 text-sm">{user.level}</div>
        </div>
      </div>

      <div className="-mt-8 mb-6 px-6">
        <Card className="bg-white p-4 shadow-lg">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="text-center">
              <p className="mb-1 text-2xl text-blue-600">{user.totalDives}</p>
              <p className="text-xs text-gray-600">Dyk</p>
            </div>
            <div className="text-center">
              <p className="mb-1 text-2xl text-blue-600">{user.countries}</p>
              <p className="text-xs text-gray-600">Lander</p>
            </div>
            <div className="text-center">
              <p className="mb-1 text-2xl text-blue-600">{user.since}</p>
              <p className="text-xs text-gray-600">Medlem sedan</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-6 px-6">
        <h2 className="mb-3 text-lg text-gray-900">Utmarkelser</h2>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <Card key={idx} className="border border-gray-100 p-3 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-900">{achievement.title}</p>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mb-6 px-6">
        <h2 className="mb-3 text-lg text-gray-900">Senaste aktivitet</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <Card key={idx} className="border border-gray-100 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                  {activity.type === "dive" ? (
                    <Waves className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Award className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-3 px-6">
        <Button variant="outline" className="w-full">
          Redigera profil
        </Button>
        <Button variant="outline" className="w-full text-gray-600">
          Certifieringar
        </Button>
        <Button variant="outline" className="w-full text-gray-600">
          Installningar
        </Button>
      </div>
    </div>
  );
}
