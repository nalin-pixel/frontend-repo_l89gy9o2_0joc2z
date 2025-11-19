import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/NoYj4XN8s0IlixJM/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-end px-6 pb-10 text-left">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          WayneTech Armory
        </h1>
        <p className="mt-3 text-slate-300 max-w-2xl">
          Explore the Dark Knight’s arsenal and every Batmobile across film, animation, and games.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#gadgets" className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur border border-white/20 hover:bg-white/20 transition">
            Browse Gadgets
          </a>
          <a href="#batmobiles" className="rounded-full bg-blue-500/80 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition">
            See Batmobiles
          </a>
        </div>
      </div>
    </section>
  );
}
