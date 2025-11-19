import Hero from './components/Hero';
import GadgetGrid from './components/GadgetGrid';
import BatmobileGallery from './components/BatmobileGallery';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <main className="relative">
        <GadgetGrid />
        <BatmobileGallery />
        <footer className="border-t border-white/10 bg-black/60">
          <div className="mx-auto max-w-6xl px-6 py-10 text-slate-400 text-sm">
            <p>Fan project. Batman and related characters are trademarks of DC Comics and Warner Bros.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App
