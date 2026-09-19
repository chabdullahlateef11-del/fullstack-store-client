import { useEffect, useState } from "react";
import API from "../api/axios";

const permanentBlogs = [
  {
    _id: "feature-1",
    title: "Secure Login & Signup System",
    content:
      "Our website uses password encryption and secure JWT-based authentication, so every customer account stays protected. Signing up takes seconds, and returning customers can log in instantly to manage their orders.",
    imageUrl: "https://picsum.photos/seed/security1/700/400",
    likes: 15,
  },
  {
    _id: "feature-2",
    title: "Easy Product Management",
    content:
      "Adding, editing, and removing products is simple — just upload a picture, set a price, and it's live on the store instantly. Every product card shows a clean image, price, and description for customers to browse easily.",
    imageUrl: "https://picsum.photos/seed/products2/700/400",
    likes: 22,
  },
  {
    _id: "feature-3",
    title: "Live Website Analytics",
    content:
      "The dashboard includes a real-time chart showing how many people visit each page of the store — Login, Products, and Blogs. This helps track which parts of the website customers use the most.",
    imageUrl: "https://picsum.photos/seed/analytics3/700/400",
    likes: 9,
  },
  {
    _id: "feature-4",
    title: "Mobile-Friendly Design",
    content:
      "Whether you're browsing on a phone or a laptop, the store adjusts perfectly. The navigation menu switches to a simple tap-to-open menu on mobile, making shopping smooth on any screen size.",
    imageUrl: "https://picsum.photos/seed/mobile4/700/400",
    likes: 18,
  },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    API.post("/analytics/visit", { page: "blogs" }).catch(() => {});
    loadBlogs();
  }, []);

  const handleLike = async (id) => {
    if (id.toString().startsWith("feature-")) return;
    await API.put(`/blogs/${id}/like`);
    loadBlogs();
  };

  const displayBlogs = [...blogs, ...permanentBlogs];

  return (
    <div className="animated-bg min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="fade-in mb-8">
          <span className="text-indigo-500 text-xs font-semibold tracking-[0.2em] uppercase">Insights</span>
          <h1 className="text-slate-700 text-3xl font-bold mt-1">From Our Blog</h1>
          <p className="text-slate-500 text-sm mt-2">Updates, guides, and what's new at the store.</p>
        </div>

        <div className="flex flex-col gap-7">
          {displayBlogs.map((b, i) => (
            <div
              key={b._id}
              style={{ animationDelay: `${i * 0.08}s` }}
              className="fade-in bg-[#e5e9ef] rounded-3xl overflow-hidden shadow-[8px_8px_16px_#c8ccd2,-8px_-8px_16px_#ffffff] hover:shadow-[10px_10px_22px_#c8ccd2,-10px_-10px_22px_#ffffff] hover:-translate-y-1 transition-all duration-300"
            >
              <img src={b.imageUrl || "https://picsum.photos/seed/blogplaceholder/600/300"} alt={b.title} className="w-full h-52 object-cover" />
              <div className="p-6">
                <span className="text-indigo-500 text-[10px] font-semibold tracking-widest uppercase">Blog</span>
                <h3 className="text-slate-700 font-bold text-xl mt-1">{b.title}</h3>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{b.content}</p>
                <button onClick={() => handleLike(b._id)} className="mt-5 flex items-center gap-2 text-sm text-indigo-500 font-medium">
                  ❤️ {b.likes} Like{b.likes !== 1 ? "s" : ""}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}