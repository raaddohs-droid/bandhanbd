"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setMessage("❌ Please fill in all fields"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage("❌ " + error.message);
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: "linear-gradient(135deg, #7f0000, #c0392b, #e74c3c)"}}>
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-6">
          <Link href="/" className="text-4xl font-bold text-white">💍 biyekori</Link>
          <p className="text-red-200 mt-1">Find your life partner</p>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          {/* Tabs */}
          <div className="flex mb-6">
            <button onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 font-bold rounded-l-full ${isLogin ? "bg-red-700 text-white" : "bg-gray-100 text-gray-500"}`}>
              Login
            </button>
            <button onClick={() => router.push("/register")}
              className="flex-1 py-2 font-bold rounded-r-full bg-gray-100 text-gray-500 hover:bg-gray-200">
              Register
            </button>
          </div>

          <h2 className="text-2xl font-bold text-center text-red-700 mb-6">Welcome Back 👋</h2>

          {message && (
            <div className={`mb-4 p-3 rounded-xl text-center text-sm font-bold ${message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {message}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1">Email Address</label>
              <input type="email" placeholder="your@email.com"
                className="border-2 border-gray-200 rounded-xl px-4 py-3 w-full focus:border-red-500 outline-none bg-gray-50 text-gray-800"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1">Password</label>
              <input type="password" placeholder="Enter your password"
                className="border-2 border-gray-200 rounded-xl px-4 py-3 w-full focus:border-red-500 outline-none bg-gray-50 text-gray-800"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-red-600 text-sm hover:underline">Forgot password?</Link>
            </div>

            <button onClick={handleLogin} disabled={loading}
              className="text-white py-3 rounded-full font-bold text-lg shadow-lg disabled:opacity-50 transition-all hover:opacity-90"
              style={{background: "linear-gradient(135deg, #7f0000, #c0392b)"}}>
              {loading ? "Logging in..." : "Login →"}
            </button>

            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-red-700 font-bold">Register Free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}