import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Products", path: "/dashboard" },
  { name: "Blogs", path: "/blogs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");
  const isLoggedIn = !!localStorage.getItem("token");
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <nav className="bg-[#e5e9ef] px-6 py-4 relative z-50 shadow-[0_4px_10px_#c8ccd2]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-slate-700 font-bold text-xl">
          Your<span className="text-indigo-500">Store</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-slate-500 hover:text-indigo-500 text-sm font-medium">
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-9 h-9 rounded-full bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center shadow-[3px_3px_6px_#c8ccd2,-3px_-3px_6px_#ffffff]"
              >
                {firstLetter}
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 bg-[#e5e9ef] rounded-xl shadow-[8px_8px_16px_#c8ccd2,-8px_-8px_16px_#ffffff] py-2 px-4 fade-in">
                  <p className="text-slate-500 text-xs mb-2">{userName}</p>
                  <button onClick={handleLogout} className="text-red-500 text-sm">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/" className="text-slate-500 hover:text-indigo-500 text-sm font-medium">Login</Link>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 w-9 h-9 items-center justify-center rounded-lg shadow-[4px_4px_8px_#c8ccd2,-4px_-4px_8px_#ffffff]"
        >
          <span className={`block h-0.5 w-5 bg-slate-600 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-slate-600 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-slate-600 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-60 mt-4" : "max-h-0"}`}>
        <div className="flex flex-col gap-4 pb-2">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setOpen(false)} className="text-slate-500 hover:text-indigo-500 text-sm">
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-500 text-sm text-left">Logout ({userName})</button>
          ) : (
            <Link to="/" onClick={() => setOpen(false)} className="text-slate-500 hover:text-indigo-500 text-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}