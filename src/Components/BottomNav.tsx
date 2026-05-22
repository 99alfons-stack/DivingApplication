import { BookOpen, Home, Map, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";

export function BottomNav() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { path: "/", icon: Home, label: "Hem" },
    { path: "/karta", icon: Map, label: "Karta" },
    { path: "/loggbok", icon: BookOpen, label: "Loggbok" },
    { path: "/forum", icon: MessageSquare, label: "Forum" },
    isAuthenticated
      ? { path: "/profil", icon: User, label: "Profil" }
      : { path: "/login", icon: User, label: "Logga in" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="flex h-full flex-1 flex-col items-center justify-center">
              <Icon className={`mb-1 h-6 w-6 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
              <span className={`text-xs ${isActive ? "text-blue-600" : "text-gray-600"}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}