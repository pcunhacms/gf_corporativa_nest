import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest, meRequest } from "../../api/auth";
import { authStore } from "../../store/auth.store";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const loginData = await loginRequest(email, password);

      localStorage.setItem("token", loginData.access_token);

      const user = await meRequest();

      localStorage.setItem("user", JSON.stringify(user));

      authStore.setState({
        token: loginData.access_token,
        user,
      });

      navigate("/dashboard");
    } catch {
      setError("Email ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      
      {/* glow background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/30 blur-3xl rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-white">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Finance App
          </h2>
          <p className="text-sm text-white/60 mt-2">
            Entre para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/40"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/40"
          />

          {error && (
            <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}