import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import StarField from "../components/StarField";
import StoreIllustration from "../components/StoreIllustration";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.post("/analytics/visit", { page: "login" }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="animated-bg min-h-screen flex items-center justify-center gap-10 px-4 relative overflow-hidden">
      <StarField />

      <StoreIllustration />

      <div className="fade-in relative bg-[#e5e9ef]/90 backdrop-blur rounded-3xl p-9 w-full max-w-sm shadow-[8px_8px_16px_#c8ccd2,-8px_-8px_16px_#ffffff]">
        <h2 className="text-slate-700 text-2xl font-bold mb-1">Welcome back</h2>
        <p className="text-slate-400 text-sm mb-6">Log in to your account</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Email address"
            className="bg-[#e5e9ef] rounded-xl px-4 py-3 text-sm text-slate-700 outline-none shadow-[inset_3px_3px_6px_#c8ccd2,inset_-3px_-3px_6px_#ffffff]"
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password"
              className="w-full bg-[#e5e9ef] rounded-xl px-4 py-3 text-sm text-slate-700 outline-none shadow-[inset_3px_3px_6px_#c8ccd2,inset_-3px_-3px_6px_#ffffff]"
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <span className="absolute right-4 top-3.5 text-xs text-indigo-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-slate-400 hover:text-indigo-500">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-[4px_4px_10px_#c8ccd2] hover:bg-indigo-600 transition-colors">
            Log in
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Don't have an account? <Link to="/signup" className="text-indigo-500 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}