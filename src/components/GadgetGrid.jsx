import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function GadgetGrid() {
  const [gadgets, setGadgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/gadgets`);
        if (!res.ok) throw new Error('Failed to fetch gadgets');
        const data = await res.json();
        setGadgets(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section id="gadgets" className="relative bg-gradient-to-b from-black to-slate-950 py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white">Gadgets</h2>
        <p className="text-slate-300 mt-2">Essential tools of the Caped Crusader.</p>

        {loading ? (
          <p className="mt-8 text-slate-400">Loading gadgets...</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gadgets.map((g, idx) => (
              <div key={idx} className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden hover:bg-white/10 transition">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-500 text-sm">
                  {g.image_url ? (
                    <img src={g.image_url} alt={g.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="px-3">{g.name}</span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{g.name}</h3>
                      <p className="text-xs text-blue-300/80 mt-0.5">{g.category}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{g.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
