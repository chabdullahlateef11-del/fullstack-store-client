import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";

function WithNavbar({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<WithNavbar><Dashboard /></WithNavbar>} />
        <Route path="/blogs" element={<WithNavbar><Blogs /></WithNavbar>} />
      </Routes>
    </BrowserRouter>
  );
}