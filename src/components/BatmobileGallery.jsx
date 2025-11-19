import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

const universeFilters = [
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
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('year-desc');
  const [open, setOpen] = useState(null); // selected item for modal

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

  const filteredSorted = useMemo(() => {
    let data = items;
    if (active !== 'All') {
      data = data.filter(i => (i.universe || '').toLowerCase() === active.toLowerCase());
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(i =>
        (i.name || '').toLowerCase().includes(q) ||
        (i.title || '').toLowerCase().includes(q) ||
        (i.era || '').toLowerCase().includes(q)
      );
    }
    const sorter = {
      'year-desc': (a, b) => (b.year || 0) - (a.year || 0),
      'year-asc': (a, b) => (a.year || 0) - (b.year || 0),
      'name-asc': (a, b) => (a.name || '').localeCompare(b.name || ''),
    }[sort];
    return [...data].sort(sorter);
  }, [items, active, query, sort]);

  return (
    <section id="batmobiles" className="relative bg-gradient-to-b from-slate-950 to-black py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Batmobiles</h2>
              <p className="text-slate-300 mt-2">Every iconic ride from across continuities.</p>
            </div>
            <div className="flex gap-2">
              {universeFilters.map(f => (
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

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search name, title, era..."
              className="w-full sm:max-w-sm rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <div className="flex items-center gap-2">
              <label className="text-slate-400 text-sm">Sort by</label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="year-desc">Year (new → old)</option>
                <option value="year-asc">Year (old → new)</option>
                <option value="name-asc">Name (A → Z)</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="mt-8 text-slate-400">Loading batmobiles...</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSorted.map((b, idx) => (
              <button
                key={idx}
                onClick={() => setOpen(b)}
                className="text-left group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
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
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(null)} />
          <div className="relative w-full sm:max-w-2xl m-0 sm:m-6 overflow-hidden rounded-t-2xl sm:rounded-2xl border border-white/10 bg-black/80 backdrop-blur">
            <div className="aspect-video bg-slate-900/50">
              {open.image_url ? (
                <img src={open.image_url} alt={open.name} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{open.name}</h3>
                  <p className="text-sm text-blue-300/80 mt-1">{open.year || '—'} • {open.universe} • {open.media}</p>
                  {open.title && <p className="text-slate-300 mt-1">{open.title}</p>}
                </div>
                <button onClick={() => setOpen(null)} className="rounded-full px-3 py-1 text-sm bg-white/10 border border-white/10 text-slate-200 hover:bg-white/20">Close</button>
              </div>
              {open.description && <p className="mt-3 text-slate-200 text-sm">{open.description}</p>}
              {open.specs && open.specs.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white font-semibold">Key specs</h4>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {open.specs.map((s, i) => (
                      <li key={i} className="text-sm text-slate-300 bg-white/5 border border-white/10 rounded-lg px-3 py-2">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
