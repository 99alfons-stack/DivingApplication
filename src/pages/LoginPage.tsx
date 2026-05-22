import React, { useState } from "react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { Label } from "../Components/ui/label";
import { useAuth } from "../lib/auth";
import { useNavigate, Link } from "react-router-dom";
import { User as UserIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login } = useAuth();
  const navigate = useNavigate();

  function validate() {
    const e: typeof errors = {};
    if (!email) e.email = "Ange e-postadress";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Ogiltig e-post";
    if (!password) e.password = "Ange lösenord";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setErrors({ email: "Inloggningen misslyckades. Kontrollera dina uppgifter." });
    } finally {
      setLoading(false);
    }
  }

   return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 px-6 pb-8 pt-8 text-white">
        <h1 className="text-3xl font-semibold">Life Beneath</h1>
        <p className="text-blue-50">the surface</p>
      </div>

      <div className="flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col items-center">
            <div className="bg-blue-50 rounded-full p-3 mb-4">
              <UserIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Välkommen tillbaka</h1>
            <p className="text-sm text-slate-600 mb-6 text-center">Logga in för att fortsätta till din profil och loggbok.</p>
          </div>

          <form onSubmit={onSubmit} noValidate>
            <div className="mb-4">
              <Label>E-post</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <Label>Lösenord</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ditt lösenord"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? "Dölj" : "Visa"}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <a className="text-sm text-blue-600 hover:underline mb-6 inline-block" href="#/forgot">
              Glömt lösenord?
            </a>

            <Button type="submit" className="w-full mb-3" disabled={loading}>
              {loading ? "Loggar in…" : "Logga in"}
            </Button>

            <div className="text-center text-sm text-slate-600">
              <span>Behöver du ett konto? </span>
              <Link className="text-blue-600 hover:underline" to="/register">Registrera</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}