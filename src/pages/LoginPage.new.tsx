import React, { useState } from "react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { Label } from "../Components/ui/label";
import { useAuth } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { User as UserIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
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
    } catch (error) {
      setErrors({ email: "Inloggningen misslyckades. Kontrollera e-post och lösenord." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center">
          <div className="bg-blue-50 rounded-full p-3 mb-4">
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 mb-1">Välkommen tillbaka</h1>
          <p className="text-sm text-slate-600 mb-4 text-center">Logga in för att fortsätta till din profil och loggbok.</p>
        </div>

        <Button variant="outline" className="w-full mb-3">Logga in med Google</Button>

        <div className="flex items-center my-3">
          <span className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-sm text-gray-400">eller</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={onSubmit} noValidate>
          <div className="mb-4">
            <Label> E-post </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="mb-2">
            <Label> Lösenord </Label>
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

          <div className="flex items-center justify-between mt-4 mb-6">
            <label className="inline-flex items-center text-sm text-slate-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2 h-4 w-4 rounded border-gray-300"
              />
              Kom ihåg mig
            </label>
            <a className="text-sm text-blue-600 hover:underline" href="#/forgot">
              Glömt lösenord?
            </a>
          </div>

          <Button type="submit" className="w-full mb-2" disabled={loading}>
            {loading ? "Loggar in…" : "Logga in"}
          </Button>

          <div className="mt-3 text-center text-sm text-slate-600">
            <span>Behöver du ett konto? </span>
            <a className="text-blue-600 hover:underline" href="#/register">Registrera</a>
          </div>
        </form>
      </div>
    </div>
  );
}
