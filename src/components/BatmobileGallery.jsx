import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

const filters = [
  { key: 'All', value: 'All' },
  { key: 'Film', value: 'Film' },
  { key: 'Animated', value: 'Animated' },
  { key: 'Game', value: 'Game' },
  { key: 'TV', value: 'TV' },
];

export default function BatmobileGallery() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/batmobiles`);
        if (!res.ok) throw new Error('Failed to fetch batmobiles');
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    if (active === 'All') return items;
    return items.filter(i => (i.universe || '').toLowerCase() === active.toLowerCase());
  }, [items, active]);

  return (
    <section id="batmobiles" className="relative bg-gradient-to-b from-slate-950 to-black py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Batmobiles</h2>
            <p className="text-slate-300 mt-2">Every iconic ride from across continuities.</p>
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActive(f.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition border ${active===f.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'}`}
              >
                {f.key}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="mt-8 text-slate-400">Loading batmobiles...</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b, idx) => (
              <div key={idx} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-500 text-sm">
                  {b.image_url ? (
                    <img src={b.image_url} alt={b.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="px-3">{b.title || b.name}</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">{b.name}</h3>
                    {b.year && <span className="text-xs text-slate-400">{b.year}</span>}
                  </div>
                  <p className="text-xs text-blue-300/80 mt-1">{b.universe} • {b.media}</p>
                  {b.description && (<p className="mt-2 text-sm text-slate-300 line-clamp-3">{b.description}</p>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
