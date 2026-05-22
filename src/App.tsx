import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BottomNav } from "./Components/BottomNav";
import { Forum } from "./pages/Forum";
import { Hem } from "./pages/Hem";
import { Karta } from "./pages/Karta";
import { Loggbok } from "./pages/Loggbok";
import { Profil } from "./pages/Profil";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./lib/auth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Hem />} />
            <Route path="/karta" element={<Karta />} />
            <Route path="/loggbok" element={<Loggbok />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}