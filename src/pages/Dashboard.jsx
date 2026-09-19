import { useEffect, useState } from "react";
import API from "../api/axios";
import AnalyticsChart from "../components/AnalyticsChart";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", imageUrl: "" });
  const [editId, setEditId] = useState(null);

  const loadProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    API.post("/analytics/visit", { page: "dashboard" }).catch(() => {});
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/products/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/products", form);
    }
    setForm({ name: "", price: "", description: "", imageUrl: "" });
    loadProducts();
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, description: product.description, imageUrl: product.imageUrl });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    loadProducts();
  };

  return (
    <div className="animated-bg min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="fade-in mb-8">
          <span className="text-indigo-500 text-xs font-semibold tracking-[0.2em] uppercase">Store Catalog</span>
          <h1 className="text-slate-700 text-3xl font-bold mt-1">Our Products</h1>
          <p className="text-slate-500 text-sm mt-2 max-w-lg">
            Handpicked electronics and home appliances — quality tested, competitively priced,
            and ready to ship.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="fade-in bg-[#dde1e8]/90 backdrop-blur rounded-2xl p-6 mb-10 grid gap-4 md:grid-cols-5 shadow-[8px_8px_16px_#c8ccd2,-8px_-8px_16px_#ffffff]"
        >
          <input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-[#e5e9ef] rounded-xl px-3 py-2 text-sm text-slate-700 outline-none shadow-[inset_3px_3px_6px_#c8ccd2,inset_-3px_-3px_6px_#ffffff]" required />
          <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="bg-[#e5e9ef] rounded-xl px-3 py-2 text-sm text-slate-700 outline-none shadow-[inset_3px_3px_6px_#c8ccd2,inset_-3px_-3px_6px_#ffffff]" required />
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-[#e5e9ef] rounded-xl px-3 py-2 text-sm text-slate-700 outline-none shadow-[inset_3px_3px_6px_#c8ccd2,inset_-3px_-3px_6px_#ffffff]" />
          <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="bg-[#e5e9ef] rounded-xl px-3 py-2 text-sm text-slate-700 outline-none shadow-[inset_3px_3px_6px_#c8ccd2,inset_-3px_-3px_6px_#ffffff]" />
          <button className="bg-indigo-500 text-white font-semibold rounded-xl py-2 text-sm shadow-[4px_4px_10px_#c8ccd2] hover:bg-indigo-600 transition-colors">
            {editId ? "Update" : "+ Add"}
          </button>
        </form>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <div
              key={p._id}
              style={{ animationDelay: `${i * 0.06}s` }}
              className="fade-in group relative bg-[#dde1e8] rounded-2xl overflow-hidden shadow-[8px_8px_16px_#c8ccd2,-8px_-8px_16px_#ffffff] hover:shadow-[10px_10px_24px_#c8ccd2,-10px_-10px_24px_#ffffff] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400" />
              <img
                src={p.imageUrl || "https://picsum.photos/seed/placeholder/400/250"}
                alt={p.name}
                className="w-full h-40 object-cover bg-slate-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://picsum.photos/seed/placeholder/400/250";
                }}
              />
              <div className="p-4">
                <h3 className="text-slate-700 font-semibold">{p.name}</h3>
                <p className="inline-block bg-indigo-500/10 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full mt-2">
                  Rs. {p.price}
                </p>
                {p.description && <p className="text-slate-500 text-xs mt-2">{p.description}</p>}
                <div className="flex gap-3 mt-4 text-xs">
                  <button onClick={() => handleEdit(p)} className="text-indigo-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-slate-400 text-sm text-center mt-10">No product available-please add from above</p>
        )}

        <div className="mt-14">
          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
}