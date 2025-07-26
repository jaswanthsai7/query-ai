export default function Hero() {
  return (
    <section
      class="relative flex items-center justify-center text-center 
         min-h-[calc(100vh-8rem)] 
         bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)] 
         overflow-hidden rounded-3xl mx-5"
    >
      {/* Decorative Floating Blobs */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]"></div>

      {/* Content with Side Gaps */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-white">
        <h1 class="text-5xl md:text-6xl font-extrabold leading-tight 
           tracking-wider drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]
           bg-gradient-to-r from-yellow-300 via-white to-yellow-100 
           bg-clip-text text-transparent animate-gradient">
          Master Your
          <span class="bg-gradient-to-r from-pink-300 via-yellow-200 to-pink-100 bg-clip-text text-transparent">
            Finances
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed 
                      [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]">
          A modern platform to track, analyze, and optimize your expenses—designed for simplicity and insight.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-full font-semibold text-white bg-white/20 border border-white/30
                       hover:bg-white/30 hover:scale-105 transition-transform duration-300 shadow-lg
                       backdrop-blur-md"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 text-pink-400/40"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M0,0V46.29c47.79,22,103.74,29,158,17.39,70.36-15.48,136.88-57.69,207-57.69,66.92,0,130.33,40.8,196,54.48,69.37,14.55,136.62-4.75,201-24.44,56.4-17.41,111.15-39.35,167-37.3,74.74,2.85,138.58,44.48,206,69.26,53.93,20.39,108,22.19,161,0V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
