const LoadingScreen = ({ isFadingOut = false }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1622] via-[#142334] to-[#1C2D41] text-white transition-opacity duration-500 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      {/* Ambient glowing radial blur behind the logo */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#18B38C]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        {/* Brand Logo with soft aura */}
        <div className="relative group">
          <div className="absolute -inset-3 rounded-2xl bg-[#18B38C]/20 blur-lg animate-pulse" />
          <img
            src="/images/deneme3.png"
            alt="Meyuco"
            className="relative h-12 sm:h-14 w-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* Sleek Animated Progress Bar */}
        <div className="w-48 sm:w-56 h-1.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
          <div className="h-full bg-gradient-to-r from-teal-400 via-[#18B38C] to-teal-300 rounded-full w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
