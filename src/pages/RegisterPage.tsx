import React, { useState } from "react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { Label } from "../Components/ui/label";
import { useAuth } from "../lib/auth";
import { Link, useNavigate } from "react-router-dom";
import { User as UserIcon } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  function validate() {
    const e: typeof errors = {};
    if (!name) e.name = "Ange namn";
    if (!email) e.email = "Ange e-postadress";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Ogiltig e-post";
    if (!password) e.password = "Ange lösenord";
    else if (password.length < 6) e.password = "Lösenordet måste vara minst 6 tecken";
    if (password !== confirmPassword) e.confirmPassword = "Lösenorden matchar inte";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      setServerError(null);
      await register(email, password, name);
      navigate("/");
    } catch (err: any) {
      const msg = err?.message || "Registreringen misslyckades. Försök igen.";
      setServerError(msg);
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
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Skapa konto</h1>
            <p className="text-sm text-slate-600 mb-6 text-center">Registrera dig för att komma igång</p>
          </div>

          <form onSubmit={onSubmit} noValidate>
            {serverError && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{serverError}</div>}
            <div className="mb-4">
              <Label>Namn</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ditt namn"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

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

            <div className="mb-4">
              <Label>Lösenord</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minst 6 tecken"
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

            <div className="mb-6">
              <Label>Bekräfta lösenord</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Bekräfta lösenord"
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" className="w-full mb-2" disabled={loading}>
              {loading ? "Registrerar…" : "Registrera"}
            </Button>

            <div className="mt-4 text-center text-sm text-slate-600">
              <span>Redan registrerad? </span>
              <Link className="text-blue-600 hover:underline" to="/login">
                Logga in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
